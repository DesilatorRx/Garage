'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { PriceEntry } from '@/lib/types'
import { deletePriceEntry } from '@/app/dashboard/actions'

interface PriceHistoryTableProps {
  entries: PriceEntry[]
  carId: string
}

export function PriceHistoryTable({ entries, carId }: PriceHistoryTableProps) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime()
  )

  if (sorted.length === 0) {
    return null
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base text-foreground">Price History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">Source</TableHead>
              <TableHead className="text-muted-foreground">Notes</TableHead>
              <TableHead className="text-muted-foreground w-12"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((entry, index) => {
              const prevEntry = sorted[index + 1]
              const change = prevEntry ? entry.price - prevEntry.price : null
              const changePct = prevEntry && prevEntry.price > 0
                ? ((entry.price - prevEntry.price) / prevEntry.price) * 100
                : null

              return (
                <PriceHistoryRow
                  key={entry.id}
                  entry={entry}
                  carId={carId}
                  change={change}
                  changePct={changePct}
                />
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function PriceHistoryRow({
  entry,
  carId,
  change,
  changePct,
}: {
  entry: PriceEntry
  carId: string
  change: number | null
  changePct: number | null
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deletePriceEntry(entry.id, carId)
    router.refresh()
  }

  const isPositive = change !== null && change > 0
  const isNegative = change !== null && change < 0

  return (
    <TableRow className="border-border hover:bg-accent/50">
      <TableCell className="font-mono text-sm text-foreground">
        {new Date(entry.recorded_date + 'T00:00:00').toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-mono font-semibold text-foreground">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(entry.price)}
          </span>
          {changePct !== null && (
            <span className={`text-xs font-mono ${isPositive ? 'text-emerald-500' : isNegative ? 'text-primary' : 'text-muted-foreground'}`}>
              {isPositive ? '+' : ''}{changePct.toFixed(1)}%
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">{entry.source || '-'}</TableCell>
      <TableCell className="text-sm text-muted-foreground max-w-48 truncate">{entry.notes || '-'}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete entry</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
