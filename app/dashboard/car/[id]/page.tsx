import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { PriceChart } from '@/components/price-chart'
import { PriceHistoryTable } from '@/components/price-history-table'
import { AddPriceEntryForm } from '@/components/add-price-entry-form'
import { CarDetailActions } from '@/components/car-detail-actions'
import type { Car, PriceEntry } from '@/lib/types'

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!car) {
    notFound()
  }

  const { data: priceEntries } = await supabase
    .from('price_entries')
    .select('*')
    .eq('car_id', id)
    .eq('user_id', user.id)
    .order('recorded_date', { ascending: false })

  const entries = (priceEntries as PriceEntry[]) ?? []
  const typedCar = car as Car

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime()
  )

  const latestPrice = sortedEntries[0]?.price ?? null
  const currentValue = latestPrice ?? typedCar.purchase_price ?? 0
  const purchasePrice = typedCar.purchase_price ?? 0
  const totalChange = purchasePrice > 0 ? currentValue - purchasePrice : 0
  const totalChangePct = purchasePrice > 0 ? (totalChange / purchasePrice) * 100 : 0
  const isPositive = totalChange > 0
  const isNegative = totalChange < 0

  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono font-bold text-primary">{typedCar.year}</span>
            {typedCar.color && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{typedCar.color}</Badge>
            )}
          </div>
          <h2 className="mt-1 text-3xl font-bold text-foreground">
            Porsche {typedCar.model}
          </h2>
          {typedCar.variant && (
            <p className="text-lg text-muted-foreground">{typedCar.variant}</p>
          )}
          {typedCar.vin && (
            <p className="mt-1 text-xs font-mono text-muted-foreground">VIN: {typedCar.vin}</p>
          )}
        </div>
        <CarDetailActions car={typedCar} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Value</p>
            <p className="mt-1 text-xl font-bold font-mono text-foreground">
              {formatCurrency(currentValue)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Purchase Price</p>
            <p className="mt-1 text-xl font-bold font-mono text-foreground">
              {purchasePrice > 0 ? formatCurrency(purchasePrice) : '-'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Change</p>
            <div className="mt-1 flex items-center gap-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-primary" />}
              {!isPositive && !isNegative && <Minus className="h-4 w-4 text-muted-foreground" />}
              <p className={`text-xl font-bold font-mono ${isPositive ? 'text-emerald-500' : isNegative ? 'text-primary' : 'text-muted-foreground'}`}>
                {isPositive ? '+' : ''}{formatCurrency(totalChange)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Return</p>
            <p className={`mt-1 text-xl font-bold font-mono ${isPositive ? 'text-emerald-500' : isNegative ? 'text-primary' : 'text-muted-foreground'}`}>
              {isPositive ? '+' : ''}{totalChangePct.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {typedCar.notes && (
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
            <p className="text-sm text-foreground">{typedCar.notes}</p>
          </CardContent>
        </Card>
      )}

      <PriceChart
        entries={entries}
        purchasePrice={typedCar.purchase_price}
        purchaseDate={typedCar.purchase_date}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <AddPriceEntryForm carId={id} />
        <div className="md:col-span-1" />
      </div>

      <PriceHistoryTable entries={entries} carId={id} />
    </div>
  )
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
