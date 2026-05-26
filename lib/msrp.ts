/**
 * Look up the launch MSRP for a user's car by walking the static catalog.
 *
 * Resolution order:
 *   1. Match brand + year + variant against a Generation + Trim where the
 *      trim has an explicit `msrp` field.
 *   2. Fall back to the matched Generation's `baseMSRP`.
 *   3. Otherwise return null (the UI hides the card).
 *
 * No DB lookup, no network — pure static data, so this is safe to call
 * server-side in a server component.
 */

import { CATALOG, type Generation, type MSRP, type TrimAvailability } from './catalog'
import type { Car } from './types'

function yearInRange(year: number, range: [number, number | null]): boolean {
  const [start, end] = range
  return year >= start && (end === null || year <= end)
}

function matchGeneration(
  brand: string,
  year: number,
  model: string,
): Generation | null {
  // First pass: brand + year + modelLine exact match
  const candidates = CATALOG.filter(
    (g) =>
      g.brand === brand &&
      yearInRange(year, [g.yearStart, g.yearEnd]) &&
      g.modelLine === model,
  )
  if (candidates.length > 0) return candidates[0]

  // Second pass: brand + year + modelLine prefix match (catches "911 (992)" → "911")
  const looser = CATALOG.filter(
    (g) =>
      g.brand === brand &&
      yearInRange(year, [g.yearStart, g.yearEnd]) &&
      (g.modelLine.startsWith(model) || model.startsWith(g.modelLine)),
  )
  return looser[0] ?? null
}

function matchTrim(
  gen: Generation,
  year: number,
  variant: string | null,
): TrimAvailability | null {
  if (!variant) return null
  const trimmedVariant = variant.trim()
  if (!trimmedVariant) return null

  // Exact name match first
  const exact = gen.trims.find(
    (t) => t.name === trimmedVariant && yearInRange(year, t.years),
  )
  if (exact) return exact

  // Case-insensitive
  const ci = gen.trims.find(
    (t) =>
      t.name.toLowerCase() === trimmedVariant.toLowerCase() &&
      yearInRange(year, t.years),
  )
  return ci ?? null
}

export interface MSRPLookup {
  msrp: MSRP
  /** Which trim's MSRP this is — `null` when falling back to the generation base. */
  matchedTrimName: string | null
  generationDisplayName: string
}

export function getMSRPForCar(
  car: Pick<Car, 'brand' | 'year' | 'model' | 'variant'>,
): MSRPLookup | null {
  if (!car.brand) return null

  const gen = matchGeneration(car.brand, car.year, car.model)
  if (!gen) return null

  const trim = matchTrim(gen, car.year, car.variant)
  if (trim?.msrp) {
    return {
      msrp: trim.msrp,
      matchedTrimName: trim.name,
      generationDisplayName: gen.displayName,
    }
  }

  if (gen.baseMSRP) {
    return {
      msrp: gen.baseMSRP,
      matchedTrimName: null,
      generationDisplayName: gen.displayName,
    }
  }

  return null
}
