/**
 * Cross-brand catalog index. Combines per-brand generation arrays and
 * exposes lookup helpers used by the CarSelector and (later) scrapers.
 *
 * Cascade order in UI: Brand → Year → Model → Trim.
 */

import type { Generation, MSRP, TrimAvailability } from './types'
import { PORSCHE_GENERATIONS } from './porsche'
import { FERRARI_GENERATIONS } from './ferrari'
import { LAMBORGHINI_GENERATIONS } from './lamborghini'
import { MCLAREN_GENERATIONS } from './mclaren'
import { ASTON_MARTIN_GENERATIONS } from './aston-martin'
import { MERCEDES_AMG_GENERATIONS } from './mercedes-amg'

export type { Generation, MSRP, TrimAvailability } from './types'

export const CATALOG: Generation[] = [
  ...PORSCHE_GENERATIONS,
  ...FERRARI_GENERATIONS,
  ...LAMBORGHINI_GENERATIONS,
  ...MCLAREN_GENERATIONS,
  ...ASTON_MARTIN_GENERATIONS,
  ...MERCEDES_AMG_GENERATIONS,
]

/** All brands in the catalog, alphabetically sorted. */
export const BRANDS: string[] = Array.from(
  new Set(CATALOG.map((g) => g.brand)),
).sort()

/** Earliest production year across the whole catalog. */
export const MIN_YEAR = CATALOG.reduce(
  (min, g) => Math.min(min, g.yearStart),
  Infinity,
)

/** Selectable max year — next calendar year, to allow upcoming model years. */
export const MAX_YEAR = new Date().getFullYear() + 1

function yearInRange(year: number, range: [number, number | null]): boolean {
  const [start, end] = range
  return year >= start && (end === null || year <= end)
}

/**
 * Years (descending) that have at least one generation in production for the
 * given brand. Used to populate the Year dropdown after Brand is chosen.
 */
export function getYearsForBrand(brand: string): number[] {
  const brandGens = CATALOG.filter((g) => g.brand === brand)
  if (brandGens.length === 0) return []
  const minYear = brandGens.reduce((m, g) => Math.min(m, g.yearStart), Infinity)
  const out: number[] = []
  for (let y = MAX_YEAR; y >= minYear; y--) {
    if (brandGens.some((g) => yearInRange(y, [g.yearStart, g.yearEnd]))) {
      out.push(y)
    }
  }
  return out
}

/**
 * All catalog years (descending) regardless of brand. Helpful when the year
 * picker is shown before brand is selected.
 */
export function getAllYears(): number[] {
  const out: number[] = []
  for (let y = MAX_YEAR; y >= MIN_YEAR; y--) out.push(y)
  return out
}

/**
 * Generations of the given brand that are in production in the given year,
 * grouped sensibly (by modelLine, then yearStart).
 */
export function getGenerationsForBrandYear(
  brand: string,
  year: number,
): Generation[] {
  return CATALOG
    .filter(
      (g) => g.brand === brand && yearInRange(year, [g.yearStart, g.yearEnd]),
    )
    .sort((a, b) => {
      if (a.modelLine !== b.modelLine) return a.modelLine.localeCompare(b.modelLine)
      return a.yearStart - b.yearStart
    })
}

/** Trims for a given generation that were offered in the given year. */
export function getTrimsForGenerationYear(
  generationId: string,
  year: number,
): TrimAvailability[] {
  const gen = CATALOG.find((g) => g.id === generationId)
  if (!gen) return []
  return gen.trims.filter((t) => yearInRange(year, t.years))
}

/** Look up a generation by its stable id. */
export function getGeneration(generationId: string): Generation | undefined {
  return CATALOG.find((g) => g.id === generationId)
}

/** Look up the generation that owns a (brand, displayName) pair. */
export function findGenerationByDisplayName(
  brand: string,
  displayName: string,
): Generation | undefined {
  return CATALOG.find(
    (g) => g.brand === brand && g.displayName === displayName,
  )
}

function normalizeForMatch(s: string): string {
  // Lowercase + collapse whitespace + strip common punctuation that varies
  // between catalog ("LP750-4") and BaT titles ("LP750 4" or "LP-750-4").
  return s
    .toLowerCase()
    .replace(/[‐‑‒–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Try to extract a canonical trim name from a free-form auction title.
 *
 * Strategy: among all trims valid for `brand` + `year`, find the LONGEST
 * trim name that appears as a substring in the title. Longer matches win
 * because trim names nest ("GT3 RS" beats "GT3", "488 Pista" beats "488").
 *
 * Returns the canonical trim name (matching catalog spelling) or null
 * when nothing meaningful matches.
 */
export function extractTrimFromTitle(
  brand: string | null,
  year: number | null,
  title: string,
): string | null {
  if (!brand || year === null || year === undefined || !title) return null

  const normalizedTitle = normalizeForMatch(title)
  const generations = getGenerationsForBrandYear(brand, year)
  if (generations.length === 0) return null

  let best: string | null = null
  let bestLen = 0

  for (const gen of generations) {
    for (const trim of gen.trims) {
      if (!yearInRange(year, trim.years)) continue
      const trimName = normalizeForMatch(trim.name)
      if (trimName.length < 3) continue // skip 1-2 char trim names — too noisy
      if (normalizedTitle.includes(trimName) && trimName.length > bestLen) {
        best = trim.name
        bestLen = trimName.length
      }
    }
  }

  return best
}
