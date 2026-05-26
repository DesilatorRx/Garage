import type { SupabaseClient } from '@supabase/supabase-js'
import { extractTrimFromTitle, getGenerationsForBrandYear } from './catalog'
import type { Car } from './types'

export interface MarketSale {
  id: string
  source: string
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
}

/**
 * The mode the comp lookup landed in:
 *  - 'same-trim': we filtered to comps matching the user's exact trim.
 *  - 'all-trims': either user has no trim, or we found zero same-trim comps
 *                  and fell back to showing the whole generation.
 *  - 'no-data':   no comps at all for this brand/year/model combo.
 */
export type CompFilterMode = 'same-trim' | 'all-trims' | 'no-data'

export interface CompSummary {
  comps: MarketSale[]
  count: number
  median_price: number | null
  oldest_sale: string | null
  newest_sale: string | null
  match_year_start: number | null
  match_year_end: number | null
  user_trim: string | null
  filter_mode: CompFilterMode
  /** When filter_mode==='same-trim', how many other-trim comps exist in the same
   *  brand/year/model range (so the UI can offer "Show 45 other-trim comps"). */
  other_trim_count: number
}

const FALLBACK_YEAR_TOLERANCE = 5
const MAX_COMPS = 50
// We pre-fetch a generous slice so the post-filter still gives plenty of comps.
const RAW_FETCH_LIMIT = 400

function emptySummary(userTrim: string | null = null): CompSummary {
  return {
    comps: [],
    count: 0,
    median_price: null,
    oldest_sale: null,
    newest_sale: null,
    match_year_start: null,
    match_year_end: null,
    user_trim: userTrim,
    filter_mode: 'no-data',
    other_trim_count: 0,
  }
}

function modelToken(car: Pick<Car, 'model'>): string | null {
  if (!car.model) return null
  const first = car.model.trim().split(/\s+/)[0]
  const cleaned = first?.replace(/[()[\]]/g, '').trim()
  return cleaned && cleaned.length >= 2 ? cleaned : null
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

function resolveYearRange(car: Pick<Car, 'brand' | 'year' | 'model'>): {
  yearMin: number
  yearMax: number
} {
  if (car.brand && Number.isFinite(car.year)) {
    const generations = getGenerationsForBrandYear(car.brand, car.year)
    const token = modelToken(car)
    const gen = generations.find((g) => {
      if (!token) return false
      const ml = g.modelLine.toLowerCase()
      const m = car.model.toLowerCase()
      const t = token.toLowerCase()
      return ml === m || ml.includes(t) || m.includes(ml)
    })
    if (gen) {
      return {
        yearMin: gen.yearStart,
        yearMax: gen.yearEnd ?? new Date().getFullYear() + 1,
      }
    }
  }
  return {
    yearMin: car.year - FALLBACK_YEAR_TOLERANCE,
    yearMax: car.year + FALLBACK_YEAR_TOLERANCE,
  }
}

function resolveUserTrim(
  car: Pick<Car, 'brand' | 'year' | 'model' | 'variant'>,
): string | null {
  if (car.variant) {
    const v = car.variant.trim()
    if (v) return v
  }
  return extractTrimFromTitle(car.brand, car.year, car.model)
}

/**
 * Compute trim_match on-the-fly for rows where the stored value is NULL.
 * This means the same filtering works whether the scraper ran the new
 * trim-extracting code or the old one (and means we don't strictly need
 * the trim_match backfill — though it speeds things up at scale).
 */
function ensureTrimMatch(c: MarketSale): MarketSale {
  if (c.trim_match) return c
  const computed = extractTrimFromTitle(c.brand, c.year, c.raw_title)
  return computed ? { ...c, trim_match: computed } : c
}

/**
 * Strict apples-to-apples comp lookup:
 *
 *  - brand exact
 *  - year inside the matching generation (or year ± 5 if no generation match)
 *  - model token substring in raw_title
 *  - **then** filter to exact trim match if the user has a trim
 *
 * If the trim filter would leave zero comps, we fall back to all-trims so
 * the panel isn't empty, but mark filter_mode='all-trims' so the UI can
 * say "no exact-trim comps yet — showing all <generation> trims".
 */
/**
 * Lightweight version of `getCompsForCar` that returns only the median price.
 * Used on the dashboard to estimate "current value" for cars without manual
 * price entries — way faster than the full comp fetch since we skip the
 * heavy raw_data jsonb column and limit to 60 rows.
 *
 * Prefers same-trim median; falls back to all-trims median if zero same-trim.
 * Returns null when there's no comp data for this brand/model at all.
 */
export async function getMarketEstimateForCar(
  supabase: SupabaseClient,
  car: Pick<Car, 'brand' | 'year' | 'model' | 'variant'>,
): Promise<number | null> {
  if (!car.brand) return null

  const { yearMin, yearMax } = resolveYearRange(car)
  const userTrim = resolveUserTrim(car)
  const token = modelToken(car)

  let query = supabase
    .from('market_sales')
    .select('sold_price, raw_title, brand, year, trim_match')
    .eq('brand', car.brand)
    .gte('year', yearMin)
    .lte('year', yearMax)
    .order('sold_date', { ascending: false })
    .limit(60)

  if (token) query = query.ilike('raw_title', `%${token}%`)

  const { data, error } = await query
  if (error || !data || data.length === 0) return null

  const rows = data as Array<{
    sold_price: number
    raw_title: string
    brand: string | null
    year: number | null
    trim_match: string | null
  }>

  if (userTrim) {
    const sameTrim = rows.filter((r) => {
      const tm = r.trim_match ?? extractTrimFromTitle(r.brand, r.year, r.raw_title)
      return tm === userTrim
    })
    if (sameTrim.length > 0) {
      const prices = sameTrim.map((r) => Number(r.sold_price)).filter(Number.isFinite)
      return median(prices)
    }
  }

  const allPrices = rows.map((r) => Number(r.sold_price)).filter(Number.isFinite)
  return median(allPrices)
}

export async function getCompsForCar(
  supabase: SupabaseClient,
  car: Pick<Car, 'brand' | 'year' | 'model' | 'variant'>,
): Promise<CompSummary> {
  const userTrim = resolveUserTrim(car)
  if (!car.brand) return emptySummary(userTrim)

  const { yearMin, yearMax } = resolveYearRange(car)

  let query = supabase
    .from('market_sales')
    .select('*')
    .eq('brand', car.brand)
    .gte('year', yearMin)
    .lte('year', yearMax)
    .order('sold_date', { ascending: false })
    .limit(RAW_FETCH_LIMIT)

  const token = modelToken(car)
  if (token) {
    query = query.ilike('raw_title', `%${token}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('getCompsForCar error', error)
    return emptySummary(userTrim)
  }

  // Enrich each comp with a computed trim_match if the stored one is NULL.
  const fetched = ((data ?? []) as MarketSale[]).map(ensureTrimMatch)

  if (fetched.length === 0) {
    return {
      ...emptySummary(userTrim),
      match_year_start: yearMin,
      match_year_end: yearMax,
    }
  }

  // Default: filter to user's exact trim. Falls back to all-trims if zero.
  let comps = fetched
  let mode: CompFilterMode = 'all-trims'
  let otherTrimCount = 0
  if (userTrim) {
    const sameTrim = fetched.filter((c) => c.trim_match === userTrim)
    if (sameTrim.length > 0) {
      comps = sameTrim
      mode = 'same-trim'
      otherTrimCount = fetched.length - sameTrim.length
    }
  }

  const display = comps.slice(0, MAX_COMPS)
  const prices = display.map((c) => Number(c.sold_price)).filter((p) => Number.isFinite(p))

  return {
    comps: display,
    count: display.length,
    median_price: median(prices),
    oldest_sale: display.length ? display[display.length - 1].sold_date : null,
    newest_sale: display.length ? display[0].sold_date : null,
    match_year_start: yearMin,
    match_year_end: yearMax,
    user_trim: userTrim,
    filter_mode: mode,
    other_trim_count: otherTrimCount,
  }
}
