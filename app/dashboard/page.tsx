import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CollectionStats } from '@/components/collection-stats'
import { CarCard } from '@/components/car-card'
import { EmptyGarage } from '@/components/empty-garage'
import { AddCarButton } from '@/components/add-car-button'
import type { CarWithLatestPrice, Car, PriceEntry } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .eq('user_id', user.id)
    .order('year', { ascending: false })

  const { data: priceEntries } = await supabase
    .from('price_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('recorded_date', { ascending: false })

  const carsWithPrices: CarWithLatestPrice[] = (cars as Car[] ?? []).map((car) => {
    const entries = (priceEntries as PriceEntry[] ?? []).filter((e) => e.car_id === car.id)
    const sortedEntries = entries.sort(
      (a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime()
    )
    const latestPrice = sortedEntries[0]?.price ?? null
    const previousPrice = sortedEntries[1]?.price ?? car.purchase_price ?? null

    let priceChange: number | null = null
    let priceChangePct: number | null = null

    if (latestPrice !== null && previousPrice !== null) {
      priceChange = latestPrice - previousPrice
      priceChangePct = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0
    }

    return {
      ...car,
      latest_price: latestPrice,
      price_change: priceChange,
      price_change_pct: priceChangePct,
      price_entries_count: entries.length,
    }
  })

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Collection</h2>
          <p className="text-sm text-muted-foreground">
            {carsWithPrices.length} {carsWithPrices.length === 1 ? 'car' : 'cars'} in your garage
          </p>
        </div>
        <AddCarButton />
      </div>

      {carsWithPrices.length > 0 && <CollectionStats cars={carsWithPrices} />}

      {carsWithPrices.length === 0 ? (
        <EmptyGarage />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {carsWithPrices.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}
