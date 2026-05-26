/**
 * Brand-agnostic catalog types. Each brand file exports an array of
 * `Generation` objects; the catalog index combines them.
 *
 * Year ranges use [start, end] tuples; `end: null` means still in production.
 * Trim year ranges are inclusive on both ends.
 */

export interface TrimAvailability {
  /** Display name, e.g. "Carrera 4S", "GT3 RS", "Pista Spider". */
  name: string
  /** [first model year, last model year]. end=null means ongoing. */
  years: [number, number | null]
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
}

export const ONGOING = null
