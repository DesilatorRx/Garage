'use client'

import {
  Area,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { PriceEntry } from '@/lib/types'
import type { MarketSale } from '@/lib/market'

interface PriceChartProps {
  entries: PriceEntry[]
  purchasePrice: number | null
  purchaseDate: string | null
  /** Auction comps for this exact trim, used to plot the market trend line. */
  comps: MarketSale[]
}

const PORSCHE_RED = '#dc2626'
const MARKET_GRAY = '#9ca3af'

/** One row of unified chart data: x = month timestamp, with optional values. */
interface ChartPoint {
  ts: number
  label: string
  /** Median sold price of same-trim comps in this month. */
  market?: number
  /** Owner's purchase or recorded price for this month. */
  personal?: number
}

function monthKey(dateStr: string): { key: string; ts: number; label: string } {
  const d = new Date(dateStr + (dateStr.length === 10 ? 'T00:00:00' : ''))
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth()
  // Anchor to mid-month for plotting
  const ts = Date.UTC(y, m, 15)
  const key = `${y}-${String(m + 1).padStart(2, '0')}`
  const label = new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  })
  return { key, ts, label }
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

/**
 * Build a unified time-series with at most one row per month. Each row may
 * contain `market` (median of same-trim comps that month), `personal` (the
 * owner's purchase / logged price for that month), or both.
 */
function buildChartData(
  comps: MarketSale[],
  purchasePrice: number | null,
  purchaseDate: string | null,
  entries: PriceEntry[],
): ChartPoint[] {
  const rows = new Map<string, ChartPoint>()

  // Market series: median of same-trim comps grouped by month-of-sale
  const compsByMonth = new Map<string, number[]>()
  for (const c of comps) {
    const price = Number(c.sold_price)
    if (!Number.isFinite(price) || price <= 0) continue
    const { key, ts, label } = monthKey(c.sold_date)
    const arr = compsByMonth.get(key) ?? []
    arr.push(price)
    compsByMonth.set(key, arr)
    if (!rows.has(key)) rows.set(key, { ts, label })
  }
  for (const [key, prices] of compsByMonth.entries()) {
    const r = rows.get(key)!
    r.market = median(prices) ?? undefined
  }

  // Personal series: purchase + each manual entry
  const personalPoints: { date: string; price: number }[] = []
  if (purchasePrice && purchasePrice > 0 && purchaseDate) {
    personalPoints.push({ date: purchaseDate, price: purchasePrice })
  }
  for (const e of entries) {
    if (!e.recorded_date || !Number.isFinite(e.price)) continue
    personalPoints.push({ date: e.recorded_date, price: Number(e.price) })
  }
  for (const p of personalPoints) {
    const { key, ts, label } = monthKey(p.date)
    let r = rows.get(key)
    if (!r) {
      r = { ts, label }
      rows.set(key, r)
    }
    // If multiple personal points in same month, take the latest one
    // (last in iteration wins — entries are already chronological enough).
    r.personal = p.price
  }

  return Array.from(rows.values()).sort((a, b) => a.ts - b.ts)
}

function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)
}

export function PriceChart({
  entries,
  purchasePrice,
  purchaseDate,
  comps,
}: PriceChartProps) {
  const chartData = buildChartData(comps, purchasePrice, purchaseDate, entries)

  const hasMarket = chartData.some((p) => p.market !== undefined)
  const hasPersonal = chartData.some((p) => p.personal !== undefined)

  if (!hasMarket && !hasPersonal) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Value Over Time</CardTitle>
          <CardDescription>
            Set a Purchase Date so we can plot your purchase, or wait for the scraper to gather
            same-trim comps for a market trend line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No data points yet.
          </div>
        </CardContent>
      </Card>
    )
  }

  // Compute Y-axis padding based on the actual rendered range
  const allValues = chartData.flatMap((p) =>
    [p.market, p.personal].filter((v): v is number => v !== undefined),
  )
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const padding = (maxValue - minValue) * 0.1 || 1000

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Value Over Time</CardTitle>
        <CardDescription>
          {hasMarket && hasPersonal
            ? 'Market median (same-trim comps) vs. your purchase and logged entries.'
            : hasMarket
            ? 'Median sold price of same-trim comps by month.'
            : 'Your purchase and any logged price entries.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            market: { label: 'Market Median', color: MARKET_GRAY },
            personal: { label: 'Your Value', color: PORSCHE_RED },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: 16, bottom: 5 }}>
              <defs>
                <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={MARKET_GRAY} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={MARKET_GRAY} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#8b8b8b', fontSize: 12 }}
                tickLine={{ stroke: '#8b8b8b' }}
                axisLine={{ stroke: 'hsl(0, 0%, 16%)' }}
                minTickGap={32}
              />
              <YAxis
                domain={[minValue - padding, maxValue + padding]}
                tick={{ fill: '#8b8b8b', fontSize: 12 }}
                tickLine={{ stroke: '#8b8b8b' }}
                axisLine={{ stroke: 'hsl(0, 0%, 16%)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      const num = typeof value === 'number' ? value : Number(value)
                      const label = name === 'market' ? 'Market median' : 'Your value'
                      return `${label}: ${formatUSD(num)}`
                    }}
                  />
                }
              />
              <Legend
                wrapperStyle={{ paddingTop: 8 }}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">
                    {value === 'market' ? 'Market Median' : 'Your Value'}
                  </span>
                )}
              />
              {hasMarket && (
                <Area
                  type="monotone"
                  dataKey="market"
                  stroke={MARKET_GRAY}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="url(#marketGradient)"
                  dot={{ fill: MARKET_GRAY, strokeWidth: 0, r: 3 }}
                  activeDot={{ fill: MARKET_GRAY, strokeWidth: 2, stroke: '#fff', r: 5 }}
                  connectNulls
                  name="market"
                />
              )}
              {hasPersonal && (
                <Line
                  type="monotone"
                  dataKey="personal"
                  stroke={PORSCHE_RED}
                  strokeWidth={2.5}
                  dot={{ fill: PORSCHE_RED, strokeWidth: 0, r: 5 }}
                  activeDot={{ fill: PORSCHE_RED, strokeWidth: 2, stroke: '#fff', r: 7 }}
                  connectNulls
                  name="personal"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
