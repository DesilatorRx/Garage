/**
 * Look up the launch MSRP for a user's car by walking the static catalog.
 *
 * Resolution order:
 *   1. Match brand + year against the right Generation (modelLine == model,
 *      or model contains modelLine, or model startsWith modelLine).
 *   2. Find the best matching trim, checking the `variant` field first,
 *      then falling back to scanning the `model` field for trim names.
 *      Matching is normalized (case-insensitive, whitespace-collapsed)
 *      and prefers the longest matching trim name (so "GT3 RS" beats "GT3"
 *      when both appear in the input).
 *   3. Fall back to the matched Generation's `baseMSRP`.
 *   4. Otherwise return null (UI hides the card).
 *
 * No DB lookup, no network — pure static data, safe in server components.
 */

import { CATALOG, type Generation, type MSRP, type TrimAvailability } from './catalog'
import type { Car } from './types'

function yearInRange(year: number, range: [number, number | null]): boolean {
  const [start, end] = range
  return year >= start && (end === null || year <= end)
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim()
}

function matchGeneration(
  brand: string,
  year: number,
  model: string,
): Generation | null {
  if (!model) return null
  const normalizedModel = normalize(model)

  const inYear = CATALOG.filter(
    (g) => g.brand === brand && yearInRange(year, [g.yearStart, g.yearEnd]),
  )

  // 1. modelLine exact match (normalized)
  let candidates = inYear.filter(
    (g) => normalize(g.modelLine) === normalizedModel,
  )
  if (candidates.length === 1) return candidates[0]

  // 2. model contains modelLine, or modelLine contains model
  candidates = inYear.filter((g) => {
    const ml = normalize(g.modelLine)
    return normalizedModel.includes(ml) || ml.includes(normalizedModel)
  })
  if (candidates.length === 1) return candidates[0]

  // 3. displayName contains model token (handles "911 (992)" → 992 specifically)
  candidates = inYear.filter((g) =>
    normalize(g.displayName).includes(normalizedModel),
  )
  if (candidates.length >= 1) return candidates[0]

  // 4. Reverse: model contains displayName
  candidates = inYear.filter((g) =>
    normalizedModel.includes(normalize(g.displayName)),
  )
  return candidates[0] ?? null
}

/**
 * Search a string for the longest trim name that appears as a substring,
 * restricted to trims valid for the given year. Returns null if nothing
 * matches.
 */
function findTrimInText(
  gen: Generation,
  year: number,
  text: string,
): TrimAvailability | null {
  if (!text) return null
  const normalizedText = normalize(text)

  let best: TrimAvailability | null = null
  let bestLen = 0
  for (const trim of gen.trims) {
    if (!yearInRange(year, trim.years)) continue
    const trimName = normalize(trim.name)
    if (trimName.length < 2) continue
    if (normalizedText.includes(trimName) && trimName.length > bestLen) {
      best = trim
      bestLen = trimName.length
    }
  }
  return best
}

function matchTrim(
  gen: Generation,
  year: number,
  variant: string | null,
  model: string,
): TrimAvailability | null {
  // 1. Try the variant field with exact + normalized comparison
  if (variant) {
    const v = variant.trim()
    if (v) {
      const exact = gen.trims.find(
        (t) => t.name === v && yearInRange(year, t.years),
      )
      if (exact) return exact

      const ci = gen.trims.find(
        (t) =>
          normalize(t.name) === normalize(v) && yearInRange(year, t.years),
      )
      if (ci) return ci

      // 2. Variant might contain extra prefix/suffix — fuzzy substring search
      const fuzzy = findTrimInText(gen, year, v)
      if (fuzzy) return fuzzy
    }
  }

  // 3. Last resort — extract trim from the model field (handles cars
  //    saved with the full "911 GT3 RS" in model and no variant)
  return findTrimInText(gen, year, model)
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

  const trim = matchTrim(gen, car.year, car.variant, car.model)
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
