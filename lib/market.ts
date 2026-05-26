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

export interface CompSummary {
  comps: MarketSale[]
  count: number
  median_price: number | null
  oldest_sale: string | null
  newest_sale: string | null
  match_year_start: number | null
  match_year_end: number | null
  /** Canonical trim name we inferred for the user's car (for highlighting/filtering). */
  user_trim: string | null
  /** Count + median of comps that match user_trim (subset of the full set). */
  same_trim_count: number
  same_trim_median: number | null
}

const FALLBACK_YEAR_TOLERANCE = 5
const MAX_COMPS = 50

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
    same_trim_count: 0,
    same_trim_median: null,
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

/**
 * Resolve the user's canonical trim. Prefer their `variant` field
 * (CarSelector stores the catalog trim name there). Fall back to
 * extracting a trim from the model field for cars saved via legacy forms.
 */
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
 * Look up auction comps that approximately match the user's car.
 *  - brand exact match
 *  - year within the matched generation's full range (catalog-driven),
 *    or fall back to year ± 5
 *  - model token substring in raw_title
 *
 * Same-trim comps are sorted to the top so the user sees the most
 * directly-comparable history first.
 */
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
    .limit(MAX_COMPS)

  const token = modelToken(car)
  if (token) {
    query = query.ilike('raw_title', `%${token}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('getCompsForCar error', error)
    return emptySummary(userTrim)
  }

  const fetched = (data ?? []) as MarketSale[]

  // Sort: same-trim comps first (preserving sold_date desc within each bucket)
  const isSameTrim = (c: MarketSale) =>
    userTrim !== null && c.trim_match !== null && c.trim_match === userTrim
  const comps = [...fetched].sort((a, b) => {
    const aSame = isSameTrim(a)
    const bSame = isSameTrim(b)
    if (aSame && !bSame) return -1
    if (!aSame && bSame) return 1
    return new Date(b.sold_date).getTime() - new Date(a.sold_date).getTime()
  })

  const sameTrimComps = comps.filter(isSameTrim)
  const samePrices = sameTrimComps
    .map((c) => Number(c.sold_price))
    .filter((p) => Number.isFinite(p))
  const allPrices = comps
    .map((c) => Number(c.sold_price))
    .filter((p) => Number.isFinite(p))

  return {
    comps,
    count: comps.length,
    median_price: median(allPrices),
    oldest_sale: comps.length ? comps[comps.length - 1].sold_date : null,
    newest_sale: comps.length ? comps[0].sold_date : null,
    match_year_start: yearMin,
    match_year_end: yearMax,
    user_trim: userTrim,
    same_trim_count: sameTrimComps.length,
    same_trim_median: median(samePrices),
  }
}
