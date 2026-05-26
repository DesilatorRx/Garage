import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CarWithLatestPrice } from '@/lib/types'
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react'

interface CarCardProps {
  car: CarWithLatestPrice
}

export function CarCard({ car }: CarCardProps) {
  const currentValue = car.latest_price ?? car.purchase_price ?? 0
  const changePct = car.price_change_pct ?? 0
  const isPositive = changePct > 0
  const isNegative = changePct < 0

  return (
    <Link href={`/dashboard/car/${car.id}`}>
      <Card className="group border-border bg-card transition-colors hover:border-primary/30 hover:bg-accent/50 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-primary font-bold">{car.year}</span>
                {car.color && (
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                    {car.color}
                  </Badge>
                )}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                <span className="text-muted-foreground font-normal">{car.brand}</span>{' '}{car.model}
              </h3>
              {car.variant && (
                <p className="text-sm text-muted-foreground">{car.variant}</p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Value</p>
              <p className="mt-1 text-xl font-bold font-mono text-foreground">
                {formatCurrency(currentValue)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-right">
              {isPositive && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-primary" />}
              {!isPositive && !isNegative && <Minus className="h-4 w-4 text-muted-foreground" />}
              <span className={`text-sm font-mono font-semibold ${isPositive ? 'text-emerald-500' : isNegative ? 'text-primary' : 'text-muted-foreground'}`}>
                {isPositive ? '+' : ''}{changePct.toFixed(1)}%
              </span>
            </div>
          </div>

          {car.price_entries_count > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {car.price_entries_count} price {car.price_entries_count === 1 ? 'entry' : 'entries'}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
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
