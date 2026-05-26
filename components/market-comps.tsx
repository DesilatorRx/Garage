import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Gavel } from 'lucide-react'
import type { CompSummary, MarketSale } from '@/lib/market'

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

  // Pick which median anchors the "vs median" comparison: prefer same-trim
  // (more representative) when there are at least 3 same-trim comps.
  const useTrimMedian = summary.same_trim_count >= 3 && summary.same_trim_median !== null
  const anchorMedian = useTrimMedian ? summary.same_trim_median : summary.median_price
  const anchorLabel = useTrimMedian
    ? `vs ${summary.user_trim} median`
    : 'vs Median (all trims)'

  const vsMedian =
    carCurrentValue !== null && anchorMedian !== null
      ? ((carCurrentValue - anchorMedian) / anchorMedian) * 100
      : null

  const rangeLabel =
    summary.match_year_start && summary.match_year_end
      ? `${summary.match_year_start}–${summary.match_year_end}`
      : null

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gavel className="h-4 w-4" />
          Market Comparables
        </CardTitle>
        <CardDescription>
          {summary.count} sale{summary.count === 1 ? '' : 's'}
          {rangeLabel && <> across {rangeLabel} model years</>}
          {summary.oldest_sale && summary.newest_sale && (
            <> · {formatDate(summary.oldest_sale)} → {formatDate(summary.newest_sale)}</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {summary.user_trim && summary.same_trim_count > 0 ? (
            <Stat
              label={`${summary.user_trim} Comps`}
              value={String(summary.same_trim_count)}
              tone="positive"
            />
          ) : (
            <Stat label="Comp Count" value={String(summary.count)} />
          )}
          <Stat
            label="All-Trims Median"
            value={summary.median_price !== null ? formatCurrency(summary.median_price) : '—'}
          />
          {summary.same_trim_median !== null && (
            <Stat
              label={`${summary.user_trim} Median`}
              value={formatCurrency(summary.same_trim_median)}
              tone="positive"
            />
          )}
          {vsMedian !== null && (
            <Stat
              label={anchorLabel}
              value={`${vsMedian >= 0 ? '+' : ''}${vsMedian.toFixed(1)}%`}
              tone={vsMedian >= 0 ? 'positive' : 'negative'}
            />
          )}
        </div>

        <div className="flex flex-col divide-y divide-border">
          {summary.comps.map((comp) => (
            <CompRow key={comp.id} comp={comp} userTrim={summary.user_trim} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CompRow({ comp, userTrim }: { comp: MarketSale; userTrim: string | null }) {
  const isSameTrim =
    userTrim !== null && comp.trim_match !== null && comp.trim_match === userTrim

  return (
    <a
      href={comp.source_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-start justify-between gap-4 py-3 -mx-2 px-2 rounded transition-colors ${
        isSameTrim ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-accent/40'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {comp.trim_match ? (
            <Badge
              variant="secondary"
              className={
                isSameTrim
                  ? 'bg-primary/20 text-primary border border-primary/40 text-[10px] px-1.5 py-0'
                  : 'bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0'
              }
            >
              {comp.trim_match}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0 italic">
              trim unknown
            </Badge>
          )}
          {comp.year !== null && (
            <span className="text-xs font-mono text-muted-foreground">{comp.year}</span>
          )}
          {comp.country_code && comp.country_code !== 'USA' && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">
              {comp.country_code}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-sm text-foreground truncate">{comp.raw_title}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(comp.sold_date)}</span>
          {comp.mileage !== null && (
            <>
              <span>·</span>
              <span>{comp.mileage.toLocaleString()} mi</span>
            </>
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
