import type { SupabaseClient } from '@supabase/supabase-js'
import type { Car } from './types'

export interface MarketSale {
  id: string
  source: string
  source_listing_id: string
  source_url: string
  brand: string | null
  year: number | null
  raw_title: string
  mileage: number | null
  sold_price: number
  currency: string
  sold_date: string
  country_code: string | null
  thumbnail_url: string | null
  excerpt: string | null
}

export interface CompSummary {
  comps: MarketSale[]
  count: number
  median_price: number | null
  oldest_sale: string | null
  newest_sale: string | null
}

const YEAR_TOLERANCE = 2
const MAX_COMPS = 20

/**
 * Take the first space-delimited token from the car's model name and use it
 * as a fuzzy title filter. Most catalog model lines are themselves short
 * tokens ("911", "F40", "Huracán"), so this usually behaves correctly.
 *
 * Returns null if no usable token (caller should skip the filter).
 */
function modelToken(car: Pick<Car, 'model'>): string | null {
  if (!car.model) return null
  const first = car.model.trim().split(/\s+/)[0]
  // Strip parens/brackets sometimes present (e.g. "911 (992)")
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

/**
 * Look up auction comps that approximately match the user's car. Filters by
 * brand exact + year ± YEAR_TOLERANCE, and (if available) by model token
 * substring in the raw_title.
 *
 * Returns an empty summary (not an error) if nothing matches — UI shows
 * a "no comps yet" state.
 */
export async function getCompsForCar(
  supabase: SupabaseClient,
  car: Pick<Car, 'brand' | 'year' | 'model'>,
): Promise<CompSummary> {
  if (!car.brand) {
    return { comps: [], count: 0, median_price: null, oldest_sale: null, newest_sale: null }
  }

  let query = supabase
    .from('market_sales')
    .select('*')
    .eq('brand', car.brand)
    .gte('year', car.year - YEAR_TOLERANCE)
    .lte('year', car.year + YEAR_TOLERANCE)
    .order('sold_date', { ascending: false })
    .limit(MAX_COMPS)

  const token = modelToken(car)
  if (token) {
    query = query.ilike('raw_title', `%${token}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('getCompsForCar error', error)
    return { comps: [], count: 0, median_price: null, oldest_sale: null, newest_sale: null }
  }

  const comps = (data ?? []) as MarketSale[]
  const prices = comps.map((c) => Number(c.sold_price)).filter((p) => Number.isFinite(p))

  return {
    comps,
    count: comps.length,
    median_price: median(prices),
    oldest_sale: comps.length ? comps[comps.length - 1].sold_date : null,
    newest_sale: comps.length ? comps[0].sold_date : null,
  }
}
