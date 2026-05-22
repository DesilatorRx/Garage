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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { addCar } from '@/app/dashboard/actions'

const PORSCHE_MODELS = [
  '356', '911', '912', '914', '924', '928', '930', '944', '959', '964',
  '968', '986 Boxster', '987 Boxster', '981 Boxster', '718 Boxster',
  '996', '997', '991', '992',
  '986 Cayman', '987 Cayman', '981 Cayman', '718 Cayman',
  'Carrera GT', '918 Spyder', 'Cayenne', 'Macan', 'Panamera', 'Taycan',
]

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
          <DialogTitle className="text-foreground">Add a Porsche</DialogTitle>
          <DialogDescription>
            Add a new car to your garage collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="year" className="text-foreground">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="1973"
                required
                min={1948}
                max={new Date().getFullYear() + 1}
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model" className="text-foreground">Model</Label>
              <Select name="model" required>
                <SelectTrigger className="border-border bg-secondary text-foreground">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  {PORSCHE_MODELS.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="variant" className="text-foreground">Variant / Trim</Label>
              <Input
                id="variant"
                name="variant"
                placeholder="Carrera RS"
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-foreground">Color</Label>
              <Input
                id="color"
                name="color"
                placeholder="Guards Red"
                className="border-border bg-secondary text-foreground"
              />
            </div>
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
