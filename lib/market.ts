import type { SupabaseClient } from '@supabase/supabase-js'
import { getGenerationsForBrandYear } from './catalog'
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
  /** What year range we filtered comps to (helpful for "8 comps from 2003–2013"). */
  match_year_start: number | null
  match_year_end: number | null
}

const FALLBACK_YEAR_TOLERANCE = 5
const MAX_COMPS = 50

function emptySummary(): CompSummary {
  return {
    comps: [],
    count: 0,
    median_price: null,
    oldest_sale: null,
    newest_sale: null,
    match_year_start: null,
    match_year_end: null,
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

/**
 * Decide the year range to pull comps from. When the catalog has a matching
 * generation (e.g. a 2007 Gallardo lives in the 2003–2013 generation), use
 * that whole generation so the user sees the full price history of that
 * platform. Otherwise fall back to year ± FALLBACK_YEAR_TOLERANCE.
 */
function resolveYearRange(car: Pick<Car, 'brand' | 'year' | 'model'>): {
  yearMin: number
  yearMax: number
} {
  if (car.brand && Number.isFinite(car.year)) {
    const generations = getGenerationsForBrandYear(car.brand, car.year)
    // Pick generation whose modelLine matches or is contained in car.model
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

/**
 * Look up auction comps that approximately match the user's car.
 *  - brand exact match
 *  - year within the matched generation's full range (catalog-driven),
 *    or fall back to year ± 5
 *  - model token substring in raw_title
 *
 * Returns an empty summary (not an error) if nothing matches.
 */
export async function getCompsForCar(
  supabase: SupabaseClient,
  car: Pick<Car, 'brand' | 'year' | 'model'>,
): Promise<CompSummary> {
  if (!car.brand) return emptySummary()

  const { yearMin, yearMax } = resolveYearRange(car)

  let query = supabase
    .from('market_sales')
    .select('*')
    .eq('brand', car.brand)
    .gte('year', yearMin)
    .lte('year', yearMax)
    .order('sold_date', { ascending: false })
    .limit(MAX_COMPS)

  const token = modelToken(car)
  if (token) {
    query = query.ilike('raw_title', `%${token}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('getCompsForCar error', error)
    return emptySummary()
  }

  const comps = (data ?? []) as MarketSale[]
  const prices = comps.map((c) => Number(c.sold_price)).filter((p) => Number.isFinite(p))

  return {
    comps,
    count: comps.length,
    median_price: median(prices),
    oldest_sale: comps.length ? comps[comps.length - 1].sold_date : null,
    newest_sale: comps.length ? comps[0].sold_date : null,
    match_year_start: yearMin,
    match_year_end: yearMax,
  }
}
