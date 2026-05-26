import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Gavel } from 'lucide-react'
import type { CompSummary } from '@/lib/market'

interface MarketCompsProps {
  summary: CompSummary
  carCurrentValue: number | null
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function MarketComps({ summary, carCurrentValue }: MarketCompsProps) {
  if (summary.count === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            Market Comparables
          </CardTitle>
          <CardDescription>
            Recent auction results matching this brand, year, and model. None yet — the scraper
            picks up more every day.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const vsMedian =
    carCurrentValue !== null && summary.median_price !== null
      ? ((carCurrentValue - summary.median_price) / summary.median_price) * 100
      : null

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gavel className="h-4 w-4" />
          Market Comparables
        </CardTitle>
        <CardDescription>
          {summary.count} recent auction sale{summary.count === 1 ? '' : 's'}
          {summary.oldest_sale && summary.newest_sale && (
            <> from {formatDate(summary.oldest_sale)} → {formatDate(summary.newest_sale)}</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Stat
            label="Median Sold"
            value={summary.median_price !== null ? formatCurrency(summary.median_price) : '—'}
          />
          <Stat label="Comp Count" value={String(summary.count)} />
          {vsMedian !== null && (
            <Stat
              label="Your Value vs Median"
              value={`${vsMedian >= 0 ? '+' : ''}${vsMedian.toFixed(1)}%`}
              tone={vsMedian >= 0 ? 'positive' : 'negative'}
            />
          )}
        </div>

        <div className="flex flex-col divide-y divide-border">
          {summary.comps.map((comp) => (
            <a
              key={comp.id}
              href={comp.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-4 py-3 hover:bg-accent/40 -mx-2 px-2 rounded transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{comp.raw_title}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(comp.sold_date)}</span>
                  {comp.mileage !== null && (
                    <>
                      <span>•</span>
                      <span>{comp.mileage.toLocaleString()} mi</span>
                    </>
                  )}
                  {comp.country_code && comp.country_code !== 'USA' && (
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">
                      {comp.country_code}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-semibold text-foreground">
                  {formatCurrency(Number(comp.sold_price))}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'positive' | 'negative'
}) {
  const color =
    tone === 'positive' ? 'text-emerald-500' : tone === 'negative' ? 'text-primary' : 'text-foreground'
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`mt-1 text-lg font-bold font-mono ${color}`}>{value}</p>
    </div>
  )
}
