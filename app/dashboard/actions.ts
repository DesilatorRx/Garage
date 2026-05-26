'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCar(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const brand = formData.get('brand') as string
  const year = parseInt(formData.get('year') as string)
  const model = formData.get('model') as string
  const variant = (formData.get('variant') as string) || null
  const color = (formData.get('color') as string) || null
  const vin = (formData.get('vin') as string) || null
  const purchasePrice = formData.get('purchase_price') as string
  const purchaseDate = (formData.get('purchase_date') as string) || null
  const notes = (formData.get('notes') as string) || null

  if (!brand || !model || !year) {
    return { error: 'Brand, year, and model are required' }
  }

  const { data, error } = await supabase.from('cars').insert({
    user_id: user.id,
    brand,
    year,
    model,
    variant,
    color,
    vin,
    purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
    purchase_date: purchaseDate || null,
    notes,
  }).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { data }
}

export async function updateCar(carId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const brand = formData.get('brand') as string
  const year = parseInt(formData.get('year') as string)
  const model = formData.get('model') as string
  const variant = (formData.get('variant') as string) || null
  const color = (formData.get('color') as string) || null
  const vin = (formData.get('vin') as string) || null
  const purchasePrice = formData.get('purchase_price') as string
  const purchaseDate = (formData.get('purchase_date') as string) || null
  const notes = (formData.get('notes') as string) || null

  if (!brand || !model || !year) {
    return { error: 'Brand, year, and model are required' }
  }

  const { error } = await supabase.from('cars').update({
    brand,
    year,
    model,
    variant,
    color,
    vin,
    purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
    purchase_date: purchaseDate || null,
    notes,
    updated_at: new Date().toISOString(),
  }).eq('id', carId).eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/car/${carId}`)
  return { success: true }
}

export async function deleteCar(carId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', carId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function addPriceEntry(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const carId = formData.get('car_id') as string
  const price = parseFloat(formData.get('price') as string)
  const source = (formData.get('source') as string) || null
  const recordedDate = (formData.get('recorded_date') as string) || new Date().toISOString().split('T')[0]
  const notes = (formData.get('notes') as string) || null

  const { error } = await supabase.from('price_entries').insert({
    car_id: carId,
    user_id: user.id,
    price,
    source,
    recorded_date: recordedDate,
    notes,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/car/${carId}`)
  return { success: true }
}

export async function deletePriceEntry(entryId: string, carId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('price_entries')
    .delete()
    .eq('id', entryId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/car/${carId}`)
  return { success: true }
}
