/**
 * One-shot backfill: read every row in market_sales, run the catalog's
 * trim extractor against raw_title, and update trim_match for rows that
 * don't have one yet.
 *
 * Run:
 *   pnpm tsx scripts/backfill-trim-match.ts
 *
 * Required env (same as scrape:bat):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Safe to re-run: only updates rows where trim_match is currently NULL.
 * Won't overwrite a value (if you've manually corrected anything).
 */

import { createClient } from '@supabase/supabase-js'
import { extractTrimFromTitle } from '../lib/catalog'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const PAGE_SIZE = 500

interface Row {
  id: string
  brand: string | null
  year: number | null
  raw_title: string
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  let totalScanned = 0
  let totalUpdated = 0
  let totalSkipped = 0
  let offset = 0

  while (true) {
    const { data, error } = await supabase
      .from('market_sales')
      .select('id, brand, year, raw_title')
      .is('trim_match', null)
      .range(offset, offset + PAGE_SIZE - 1)

    if (error) {
      console.error('Fetch error:', error)
      throw error
    }
    if (!data || data.length === 0) break

    const rows = data as Row[]
    totalScanned += rows.length

    const updates: { id: string; trim_match: string }[] = []
    for (const row of rows) {
      const trim = extractTrimFromTitle(row.brand, row.year, row.raw_title)
      if (trim) {
        updates.push({ id: row.id, trim_match: trim })
      } else {
        totalSkipped++
      }
    }

    if (updates.length > 0) {
      // Supabase JS doesn't have a native batch-by-id update; iterate.
      // For PoC volumes (~thousands) this is fine; if it gets slow we'll
      // switch to a single SQL RPC.
      for (const u of updates) {
        const { error: upErr } = await supabase
          .from('market_sales')
          .update({ trim_match: u.trim_match })
          .eq('id', u.id)
        if (upErr) {
          console.error('Update error for', u.id, upErr)
          throw upErr
        }
      }
      totalUpdated += updates.length
    }

    console.log(
      `Batch @ offset ${offset}: scanned ${rows.length}, updated ${updates.length}, running total ${totalUpdated}/${totalScanned}`,
    )

    if (rows.length < PAGE_SIZE) break
    offset += PAGE_SIZE
  }

  console.log(`\nDone. Scanned ${totalScanned} rows · Updated ${totalUpdated} · Couldn't match trim on ${totalSkipped}.`)
}

main().catch((err) => {
  console.error('FAILED:', err)
  process.exit(1)
})
