'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  BRANDS,
  CATALOG,
  findGenerationByDisplayName,
  getGenerationsForBrandYear,
  getTrimsForGenerationYear,
  getYearsForBrand,
} from '@/lib/catalog'

interface CarSelectorProps {
  defaultBrand?: string
  defaultYear?: number
  /** Initial generation displayName (matches what's stored in cars.model). */
  defaultModel?: string
  /** Initial trim name (matches what's stored in cars.variant). */
  defaultVariant?: string
}

export function CarSelector({
  defaultBrand,
  defaultYear,
  defaultModel,
  defaultVariant,
}: CarSelectorProps) {
  const currentYear = new Date().getFullYear()

  const [brand, setBrand] = useState<string>(defaultBrand ?? '')
  const [year, setYear] = useState<number | ''>(defaultYear ?? '')
  const [generationId, setGenerationId] = useState<string>(() => {
    if (!defaultBrand || !defaultModel) return ''
    return findGenerationByDisplayName(defaultBrand, defaultModel)?.id ?? ''
  })
  const [trim, setTrim] = useState<string>(defaultVariant ?? '')

  const years = useMemo(() => (brand ? getYearsForBrand(brand) : []), [brand])

  const generations = useMemo(
    () =>
      brand && typeof year === 'number'
        ? getGenerationsForBrandYear(brand, year)
        : [],
    [brand, year],
  )

  const trims = useMemo(
    () =>
      generationId && typeof year === 'number'
        ? getTrimsForGenerationYear(generationId, year)
        : [],
    [generationId, year],
  )

  // Reset year when brand change makes the current year unavailable
  useEffect(() => {
    if (typeof year === 'number' && years.length > 0 && !years.includes(year)) {
      setYear('')
      setGenerationId('')
      setTrim('')
    }
  }, [years, year])

  // Reset model when (brand, year) change makes the current model unavailable
  useEffect(() => {
    if (generationId && !generations.some((g) => g.id === generationId)) {
      setGenerationId('')
      setTrim('')
    }
  }, [generations, generationId])

  // Reset trim when generation change makes the current trim unavailable
  useEffect(() => {
    if (trim && !trims.some((t) => t.name === trim)) {
      setTrim('')
    }
  }, [trims, trim])

  // Group generations by model line for the dropdown
  const groupedGenerations = useMemo(() => {
    const groups = new Map<string, typeof generations>()
    for (const g of generations) {
      const arr = groups.get(g.modelLine) ?? []
      arr.push(g)
      groups.set(g.modelLine, arr)
    }
    return Array.from(groups.entries())
  }, [generations])

  const selectedGeneration = CATALOG.find((g) => g.id === generationId)
  const modelDisplayName = selectedGeneration?.displayName ?? ''

  return (
    <>
      {/* Hidden inputs feed the existing server-action expectations. */}
      <input type="hidden" name="brand" value={brand} />
      <input type="hidden" name="year" value={year === '' ? '' : year} />
      <input type="hidden" name="model" value={modelDisplayName} />
      <input type="hidden" name="variant" value={trim} />

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="brand-select" className="text-foreground">Brand</Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger
              id="brand-select"
              className="border-border bg-secondary text-foreground"
            >
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-card-foreground max-h-72">
              {BRANDS.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="year-select" className="text-foreground">Year</Label>
          <Select
            value={year === '' ? '' : String(year)}
            onValueChange={(v) => setYear(Number(v))}
            disabled={!brand || years.length === 0}
          >
            <SelectTrigger
              id="year-select"
              className="border-border bg-secondary text-foreground"
            >
              <SelectValue
                placeholder={brand ? 'Select year' : 'Pick a brand first'}
              />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-card-foreground max-h-72">
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="model-select" className="text-foreground">Model</Label>
        <Select
          value={generationId}
          onValueChange={setGenerationId}
          disabled={typeof year !== 'number' || generations.length === 0}
        >
          <SelectTrigger
            id="model-select"
            className="border-border bg-secondary text-foreground"
          >
            <SelectValue
              placeholder={
                typeof year !== 'number'
                  ? 'Pick a year first'
                  : generations.length === 0
                  ? 'No models for this year'
                  : 'Select model'
              }
            />
          </SelectTrigger>
          <SelectContent className="border-border bg-card text-card-foreground max-h-72">
            {groupedGenerations.map(([line, gens]) => (
              <SelectGroup key={line}>
                <SelectLabel>{line}</SelectLabel>
                {gens.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.displayName}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="trim-select" className="text-foreground">Trim</Label>
        <Select
          value={trim}
          onValueChange={setTrim}
          disabled={!generationId || trims.length === 0}
        >
          <SelectTrigger
            id="trim-select"
            className="border-border bg-secondary text-foreground"
          >
            <SelectValue
              placeholder={
                !generationId
                  ? 'Pick a model first'
                  : trims.length === 0
                  ? 'No trims for this year'
                  : 'Select trim'
              }
            />
          </SelectTrigger>
          <SelectContent className="border-border bg-card text-card-foreground max-h-72">
            {trims.map((t) => (
              <SelectItem key={t.name} value={t.name}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
