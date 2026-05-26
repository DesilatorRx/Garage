/**
 * Brand-agnostic catalog types. Each brand file exports an array of
 * `Generation` objects; the catalog index combines them.
 *
 * Year ranges use [start, end] tuples; `end: null` means still in production.
 * Trim year ranges are inclusive on both ends.
 */

/**
 * Original launch MSRP for a generation or trim. `year` documents the model
 * year this figure applied to (US market, USD unless stated). Used to anchor
 * the "value journey" panel on the car detail page: MSRP → purchase → current.
 *
 * Single representative figure per trim — not a year-by-year price ladder.
 * Generations with significant mid-cycle MSRP changes should record the most
 * commonly-cited launch figure; if accuracy matters later we can switch to a
 * map keyed by year.
 */
export interface MSRP {
  amount: number
  currency?: 'USD' | 'GBP' | 'EUR'
  year: number
}

export interface TrimAvailability {
  /** Display name, e.g. "Carrera 4S", "GT3 RS", "Pista Spider". */
  name: string
  /** [first model year, last model year]. end=null means ongoing. */
  years: [number, number | null]
  /** Original-launch MSRP for this specific trim (optional, seeded over time). */
  msrp?: MSRP
}

export interface Generation {
  /** Globally unique stable kebab-case slug, prefixed with brand. */
  id: string
  /** Brand name as shown to user, e.g. "Porsche", "Ferrari". */
  brand: string
  /** Display name shown in the dropdown, e.g. "911 (992)". */
  displayName: string
  /** Family / line within the brand, e.g. "911", "488", "Huracán". */
  modelLine: string
  /** Model-year range. end=null means still in production. */
  yearStart: number
  yearEnd: number | null
  /** Trims offered within this generation. */
  trims: TrimAvailability[]
  /** Base-trim launch MSRP, used when the user's specific trim is unknown. */
  baseMSRP?: MSRP
}

export const ONGOING = null
