import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus, Tag } from 'lucide-react'
import type { MSRPLookup } from '@/lib/msrp'

interface LaunchMSRPCardProps {
  lookup: MSRPLookup
  /** Current value to compare against. Null = no comparison rendered. */
  currentValue: number | null
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function LaunchMSRPCard({ lookup, currentValue }: LaunchMSRPCardProps) {
  const { msrp, source, matchedTrimName, generationDisplayName } = lookup
  const currency = msrp.currency ?? 'USD'

  const subline =
    source === 'owner-override'
      ? `${msrp.year} • Owner-provided`
      : matchedTrimName
      ? `${msrp.year} ${matchedTrimName}`
      : `${msrp.year} ${generationDisplayName} (base)`

  const label = source === 'owner-override' ? 'MSRP (Yours)' : 'Launch MSRP'

  const change = currentValue !== null && msrp.amount > 0
    ? ((currentValue - msrp.amount) / msrp.amount) * 100
    : null
  const isPositive = change !== null && change > 0
  const isNegative = change !== null && change < 0

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-primary/30 text-primary">
            <Tag className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-lg font-bold font-mono text-foreground">
              {formatCurrency(msrp.amount, currency)}
            </p>
            <p className="text-xs text-muted-foreground">{subline}</p>
          </div>
        </div>
        {change !== null && (
          <div className="flex flex-col sm:items-end">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Current vs MSRP</p>
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-primary" />}
              {!isPositive && !isNegative && <Minus className="h-4 w-4 text-muted-foreground" />}
              <p className={`text-lg font-bold font-mono ${isPositive ? 'text-emerald-500' : isNegative ? 'text-primary' : 'text-muted-foreground'}`}>
                {isPositive ? '+' : ''}{change.toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
