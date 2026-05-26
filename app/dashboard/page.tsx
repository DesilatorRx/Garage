import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CollectionStats } from '@/components/collection-stats'
import { CarCard } from '@/components/car-card'
import { EmptyGarage } from '@/components/empty-garage'
import { AddCarButton } from '@/components/add-car-button'
import { getMarketEstimateForCar } from '@/lib/market'
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

  const carRows = (cars as Car[] | null) ?? []
  const entryRows = (priceEntries as PriceEntry[] | null) ?? []

  // Fetch a per-car market estimate in parallel. Each call hits market_sales
  // with the same brand/year/model/trim filter the detail page uses, so the
  // dashboard and detail page agree on what a car is "worth right now."
  const marketEstimates = await Promise.all(
    carRows.map((car) => getMarketEstimateForCar(supabase, car)),
  )

  const carsWithPrices: CarWithLatestPrice[] = carRows.map((car, i) => {
    const entries = entryRows.filter((e) => e.car_id === car.id)
    const sortedEntries = entries.sort(
      (a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime(),
    )
    const latestEntryPrice = sortedEntries[0]?.price ?? null
    const marketEstimate = marketEstimates[i]

    // Best estimate of current value: manual entry > market median > purchase price
    const currentValue = latestEntryPrice ?? marketEstimate ?? car.purchase_price

    // Total Gain/Loss compares current estimate vs original purchase price
    let priceChange: number | null = null
    let priceChangePct: number | null = null
    if (
      currentValue !== null &&
      car.purchase_price !== null &&
      car.purchase_price > 0
    ) {
      priceChange = currentValue - car.purchase_price
      priceChangePct = (priceChange / car.purchase_price) * 100
    }

    return {
      ...car,
      latest_price: latestEntryPrice,
      market_estimate: marketEstimate,
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
