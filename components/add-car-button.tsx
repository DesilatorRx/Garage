'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { addCar } from '@/app/dashboard/actions'
import { CarSelector } from '@/components/car-selector'

export function AddCarButton() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await addCar(formData)

    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
      return
    }

    setOpen(false)
    setIsSubmitting(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Car
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add a Car</DialogTitle>
          <DialogDescription>
            Add a new car to your garage collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CarSelector />
          <div className="grid gap-2">
            <Label htmlFor="color" className="text-foreground">Color</Label>
            <Input
              id="color"
              name="color"
              placeholder="Guards Red"
              className="border-border bg-secondary text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="vin" className="text-foreground">VIN (optional)</Label>
            <Input
              id="vin"
              name="vin"
              placeholder="WP0AB2973NS..."
              className="border-border bg-secondary text-foreground"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="purchase_price" className="text-foreground">Purchase Price</Label>
              <Input
                id="purchase_price"
                name="purchase_price"
                type="number"
                step="0.01"
                min="0"
                placeholder="85000"
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purchase_date" className="text-foreground">Purchase Date</Label>
              <Input
                id="purchase_date"
                name="purchase_date"
                type="date"
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="msrp_override" className="text-foreground">
              MSRP Override (optional)
            </Label>
            <Input
              id="msrp_override"
              name="msrp_override"
              type="number"
              step="0.01"
              min="0"
              placeholder="Your dealer-sheet MSRP, e.g. 345000"
              className="border-border bg-secondary text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use the catalog's base-trim figure. Set to record your specific car's MSRP with options.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes" className="text-foreground">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Matching numbers, recent restoration..."
              rows={3}
              className="border-border bg-secondary text-foreground"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add to Garage'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
