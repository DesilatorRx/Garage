import { Card, CardContent } from '@/components/ui/card'
import type { CarWithLatestPrice } from '@/lib/types'
import { Car, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface CollectionStatsProps {
  cars: CarWithLatestPrice[]
}

export function CollectionStats({ cars }: CollectionStatsProps) {
  const totalCars = cars.length
  const totalValue = cars.reduce((sum, car) => sum + (car.latest_price ?? car.purchase_price ?? 0), 0)
  const totalPurchase = cars.reduce((sum, car) => sum + (car.purchase_price ?? 0), 0)
  const totalGain = totalValue - totalPurchase
  const totalGainPct = totalPurchase > 0 ? (totalGain / totalPurchase) * 100 : 0

  const carsUp = cars.filter(c => (c.price_change ?? 0) > 0).length
  const carsDown = cars.filter(c => (c.price_change ?? 0) < 0).length

  const stats = [
    {
      label: 'Total Cars',
      value: totalCars.toString(),
      icon: Car,
      sublabel: `${carsUp} up, ${carsDown} down`,
    },
    {
      label: 'Collection Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      sublabel: 'Current market estimate',
    },
    {
      label: 'Total Gain/Loss',
      value: formatCurrency(totalGain),
      icon: totalGain >= 0 ? TrendingUp : TrendingDown,
      sublabel: `${totalGainPct >= 0 ? '+' : ''}${totalGainPct.toFixed(1)}% overall`,
      positive: totalGain >= 0,
    },
    {
      label: 'Avg. per Car',
      value: totalCars > 0 ? formatCurrency(totalValue / totalCars) : '$0',
      icon: DollarSign,
      sublabel: 'Average current value',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.positive !== undefined ? (stat.positive ? 'text-emerald-500' : 'text-primary') : 'text-muted-foreground'}`} />
            </div>
            <p className={`mt-2 text-2xl font-bold font-mono ${stat.positive !== undefined ? (stat.positive ? 'text-emerald-500' : 'text-primary') : 'text-foreground'}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.sublabel}</p>
          </CardContent>
        </Card>
      ))}
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
