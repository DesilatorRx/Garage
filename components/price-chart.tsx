'use client'

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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

interface PriceChartProps {
  entries: PriceEntry[]
  purchasePrice: number | null
  purchaseDate: string | null
}

const PORSCHE_RED = '#dc2626'
const PORSCHE_RED_FADED = 'rgba(220, 38, 38, 0.15)'

export function PriceChart({ entries, purchasePrice, purchaseDate }: PriceChartProps) {
  const chartData = buildChartData(entries, purchasePrice, purchaseDate)

  if (chartData.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Value Over Time</CardTitle>
          <CardDescription>Add price entries to see your value chart.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No price data yet. Log your first market value below.
          </div>
        </CardContent>
      </Card>
    )
  }

  const prices = chartData.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.1 || 1000

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Value Over Time</CardTitle>
        <CardDescription>
          {chartData.length} data {chartData.length === 1 ? 'point' : 'points'} tracked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: 'Market Value',
              color: PORSCHE_RED,
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORSCHE_RED} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PORSCHE_RED} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#8b8b8b', fontSize: 12 }}
                tickLine={{ stroke: '#8b8b8b' }}
                axisLine={{ stroke: 'hsl(0, 0%, 16%)' }}
              />
              <YAxis
                domain={[minPrice - padding, maxPrice + padding]}
                tick={{ fill: '#8b8b8b', fontSize: 12 }}
                tickLine={{ stroke: '#8b8b8b' }}
                axisLine={{ stroke: 'hsl(0, 0%, 16%)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => {
                      const num = typeof value === 'number' ? value : Number(value)
                      return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                      }).format(num)
                    }}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={PORSCHE_RED}
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={{ fill: PORSCHE_RED, strokeWidth: 0, r: 4 }}
                activeDot={{ fill: PORSCHE_RED, strokeWidth: 2, stroke: '#fff', r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function buildChartData(
  entries: PriceEntry[],
  purchasePrice: number | null,
  purchaseDate: string | null
) {
  const dataPoints: { date: string; price: number; label: string }[] = []

  if (purchasePrice && purchaseDate) {
    dataPoints.push({
      date: purchaseDate,
      price: purchasePrice,
      label: formatDateLabel(purchaseDate),
    })
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime()
  )

  for (const entry of sorted) {
    dataPoints.push({
      date: entry.recorded_date,
      price: entry.price,
      label: formatDateLabel(entry.recorded_date),
    })
  }

  return dataPoints
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}
