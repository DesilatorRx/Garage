/**
 * Scrape recently-sold auction results from Bring a Trailer and upsert
 * into the `market_sales` table.
 *
 * Run:
 *   pnpm scrape:bat                # default 3 pages (~180 listings)
 *   SCRAPE_PAGES=20 pnpm scrape:bat  # backfill larger window (~1200 listings)
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (bypasses RLS for inserts; keep secret)
 *
 * Notes:
 *  - Uses BaT's REST API (`/wp-json/bringatrailer/1.0/data/listings-filter`)
 *    with state=sold + get_items=true. No HTML parsing needed.
 *  - Pulls per_page=60 (BaT's max).
 *  - Rate-limited to ~1 page/1.5s. Idempotent via UNIQUE(source, source_listing_id).
 */

import { createClient } from '@supabase/supabase-js'
import { extractTrimFromTitle } from '../lib/catalog'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const PAGES_TO_FETCH = parseInt(process.env.SCRAPE_PAGES ?? '3', 10)

const BAT_API_URL =
  'https://bringatrailer.com/wp-json/bringatrailer/1.0/data/listings-filter'
const PER_PAGE = 60
const USER_AGENT =
  'Mozilla/5.0 (compatible; GarageBot/0.1; +https://garage-azure-eight.vercel.app/)'
const PAGE_DELAY_MS = 1500

interface BatItem {
  id: number
  title: string
  url: string
  current_bid: number
  currency: string | null
  sold_text: string
  sold_text_timestamp: number
  year: number | null
  country_code_alpha3: string | null
  thumbnail_url: string | null
  excerpt: string | null
}

interface BatPageData {
  items: BatItem[]
  page_current: number
  pages_total: number
  items_total: number
}

interface MarketSaleRow {
  source: 'bringatrailer'
  source_listing_id: string
  source_url: string
  brand: string | null
  year: number | null
  trim_match: string | null
  raw_title: string
  mileage: number | null
  sold_price: number
  currency: string
  sold_date: string
  country_code: string | null
  thumbnail_url: string | null
  excerpt: string | null
  raw_data: unknown
}

/**
 * Brand matchers run against the raw BaT title. `canonical` must match the
 * brand strings in lib/catalog/<brand>.ts so user cars match comps cleanly.
 * Mercedes-AMG is special-cased: BaT lists as "Mercedes-Benz ... AMG".
 */
const BRAND_MATCHERS: Array<{ canonical: string; pattern: RegExp }> = [
  { canonical: 'Mercedes-AMG', pattern: /\bmercedes(?:-benz)?\b[^]*\bamg\b/i },
  { canonical: 'Aston Martin', pattern: /\baston\s+martin\b/i },
  { canonical: 'Porsche', pattern: /\bporsche\b/i },
  { canonical: 'Ferrari', pattern: /\bferrari\b/i },
  { canonical: 'Lamborghini', pattern: /\blamborghini\b/i },
  { canonical: 'McLaren', pattern: /\bmclaren\b/i },
]

function extractBrand(title: string): string | null {
  for (const { canonical, pattern } of BRAND_MATCHERS) {
    if (pattern.test(title)) return canonical
  }
  return null
}

function extractYear(title: string, fallback: number | null): number | null {
  const m = title.match(/\b(19[3-9]\d|20\d\d)\b/)
  return m ? parseInt(m[1], 10) : fallback
}

function extractMileage(title: string): number | null {
  const k = title.match(/([\d.]+)\s*k[-\s]*mile/i)
  if (k) return Math.round(parseFloat(k[1]) * 1000)
  const m = title.match(/([\d,]+)[-\s]*mile/i)
  if (m) {
    const n = parseInt(m[1].replace(/,/g, ''), 10)
    if (Number.isFinite(n)) return n
  }
  return null
}

async function fetchPage(page: number): Promise<BatPageData> {
  const url = new URL(BAT_API_URL)
  url.searchParams.set('page', String(page))
  url.searchParams.set('get_items', 'true')
  url.searchParams.set('state', 'sold')
  url.searchParams.set('per_page', String(PER_PAGE))

  const res = await fetch(url.toString(), {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url.toString()}`)
  }
  return (await res.json()) as BatPageData
}

function toRow(item: BatItem): MarketSaleRow {
  const brand = extractBrand(item.title)
  const year = extractYear(item.title, item.year)
  const trimMatch = extractTrimFromTitle(brand, year, item.title)
  const mileage = extractMileage(item.title)
  const soldDate = new Date(item.sold_text_timestamp * 1000)
    .toISOString()
    .slice(0, 10)

  return {
    source: 'bringatrailer',
    source_listing_id: String(item.id),
    source_url: item.url,
    brand,
    year,
    trim_match: trimMatch,
    raw_title: item.title,
    mileage,
    sold_price: item.current_bid,
    currency: item.currency ?? 'USD',
    sold_date: soldDate,
    country_code: item.country_code_alpha3 ?? null,
    thumbnail_url: item.thumbnail_url ?? null,
    excerpt: item.excerpt ?? null,
    raw_data: item,
  }
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'Missing env: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.',
    )
  }
  if (!Number.isFinite(PAGES_TO_FETCH) || PAGES_TO_FETCH < 1) {
    throw new Error(`Invalid SCRAPE_PAGES=${process.env.SCRAPE_PAGES}`)
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  const rows: MarketSaleRow[] = []
  let pagesAvailable = PAGES_TO_FETCH
  let pagesFetched = 0

  for (let page = 1; page <= Math.min(PAGES_TO_FETCH, pagesAvailable); page++) {
    console.log(`Fetching page ${page}…`)
    const data = await fetchPage(page)
    pagesAvailable = data.pages_total
    pagesFetched++
    for (const item of data.items) {
      rows.push(toRow(item))
    }
    if (page < Math.min(PAGES_TO_FETCH, pagesAvailable)) {
      await new Promise((r) => setTimeout(r, PAGE_DELAY_MS))
    }
  }

  console.log(`\nScraped ${rows.length} listings across ${pagesFetched} page(s) (API reported ${pagesAvailable} total).`)

  // Pagination on BaT overlaps slightly — newly-closed auctions push older ones
  // back, so the same id can land on consecutive pages within one run. Postgres
  // rejects ON CONFLICT against duplicates inside a single statement, so dedupe
  // here. Keep the first occurrence (earlier pages = more recent sales).
  const seen = new Set<string>()
  const dedupedRows: MarketSaleRow[] = []
  for (const r of rows) {
    const key = `${r.source}::${r.source_listing_id}`
    if (seen.has(key)) continue
    seen.add(key)
    dedupedRows.push(r)
  }
  if (dedupedRows.length < rows.length) {
    console.log(`Deduped ${rows.length - dedupedRows.length} cross-page duplicate(s).`)
  }

  // Summary of brand matches before upsert
  const matchedRows = dedupedRows.filter((r) => r.brand !== null)
  console.log(`Brand-matched: ${matchedRows.length}/${dedupedRows.length}`)
  const byBrand = new Map<string, number>()
  for (const r of matchedRows) {
    byBrand.set(r.brand!, (byBrand.get(r.brand!) ?? 0) + 1)
  }
  for (const [brand, n] of [...byBrand.entries()].sort()) {
    console.log(`  ${brand.padEnd(15)} ${n}`)
  }

  // Trim-match diagnostics
  const trimMatched = matchedRows.filter((r) => r.trim_match !== null)
  console.log(`Trim-matched: ${trimMatched.length}/${matchedRows.length} brand-matched rows`)

  // Upsert in batches
  const BATCH = 100
  let upserted = 0
  for (let i = 0; i < dedupedRows.length; i += BATCH) {
    const batch = dedupedRows.slice(i, i + BATCH)
    const { error } = await supabase
      .from('market_sales')
      .upsert(batch, { onConflict: 'source,source_listing_id' })
    if (error) {
      console.error('Upsert error:', error)
      throw error
    }
    upserted += batch.length
  }

  console.log(`\nUpserted ${upserted} rows into market_sales.`)
}

main().catch((err) => {
  console.error('FAILED:', err)
  process.exit(1)
})
