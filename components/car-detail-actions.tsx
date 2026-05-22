'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCar, updateCar } from '@/app/dashboard/actions'
import type { Car } from '@/lib/types'

const PORSCHE_MODELS = [
  '356', '911', '912', '914', '924', '928', '930', '944', '959', '964',
  '968', '986 Boxster', '987 Boxster', '981 Boxster', '718 Boxster',
  '996', '997', '991', '992',
  '986 Cayman', '987 Cayman', '981 Cayman', '718 Cayman',
  'Carrera GT', '918 Spyder', 'Cayenne', 'Macan', 'Panamera', 'Taycan',
]

interface CarDetailActionsProps {
  car: Car
}

export function CarDetailActions({ car }: CarDetailActionsProps) {
  return (
    <div className="flex gap-2">
      <EditCarDialog car={car} />
      <DeleteCarDialog carId={car.id} />
    </div>
  )
}

function EditCarDialog({ car }: { car: Car }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateCar(car.id, formData)

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
        <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent bg-transparent">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Car Details</DialogTitle>
          <DialogDescription>Update the details of your {car.year} {car.model}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-year" className="text-foreground">Year</Label>
              <Input id="edit-year" name="year" type="number" defaultValue={car.year} required min={1948} max={new Date().getFullYear() + 1} className="border-border bg-secondary text-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-model" className="text-foreground">Model</Label>
              <Select name="model" defaultValue={car.model} required>
                <SelectTrigger className="border-border bg-secondary text-foreground"><SelectValue /></SelectTrigger>
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
              <Label htmlFor="edit-variant" className="text-foreground">Variant</Label>
              <Input id="edit-variant" name="variant" defaultValue={car.variant ?? ''} className="border-border bg-secondary text-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-color" className="text-foreground">Color</Label>
              <Input id="edit-color" name="color" defaultValue={car.color ?? ''} className="border-border bg-secondary text-foreground" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-vin" className="text-foreground">VIN</Label>
            <Input id="edit-vin" name="vin" defaultValue={car.vin ?? ''} className="border-border bg-secondary text-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-price" className="text-foreground">Purchase Price</Label>
              <Input id="edit-price" name="purchase_price" type="number" step="0.01" defaultValue={car.purchase_price ?? ''} className="border-border bg-secondary text-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-date" className="text-foreground">Purchase Date</Label>
              <Input id="edit-date" name="purchase_date" type="date" defaultValue={car.purchase_date ?? ''} className="border-border bg-secondary text-foreground" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-notes" className="text-foreground">Notes</Label>
            <Textarea id="edit-notes" name="notes" defaultValue={car.notes ?? ''} rows={3} className="border-border bg-secondary text-foreground" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteCarDialog({ carId }: { carId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteCar(carId)
    router.push('/dashboard')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-border bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Remove from garage?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this car and all its price history. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border text-foreground hover:bg-accent">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete Car'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
