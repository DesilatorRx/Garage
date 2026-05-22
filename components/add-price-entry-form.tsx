'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addPriceEntry } from '@/app/dashboard/actions'

interface AddPriceEntryFormProps {
  carId: string
}

export function AddPriceEntryForm({ carId }: AddPriceEntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    formData.set('car_id', carId)
    const result = await addPriceEntry(formData)

    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
      return
    }

    setSuccess(true)
    setIsSubmitting(false)
    e.currentTarget.reset()
    router.refresh()

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base text-foreground">Log Price Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-foreground">Market Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="95000"
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recorded_date" className="text-foreground">Date</Label>
              <Input
                id="recorded_date"
                name="recorded_date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="source" className="text-foreground">Source</Label>
            <Input
              id="source"
              name="source"
              placeholder="Bring a Trailer, Hagerty, auction..."
              className="border-border bg-secondary text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="entry_notes" className="text-foreground">Notes</Label>
            <Textarea
              id="entry_notes"
              name="notes"
              placeholder="Comparable sale, condition notes..."
              rows={2}
              className="border-border bg-secondary text-foreground"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-emerald-500">Price entry added successfully.</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Log Price'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
