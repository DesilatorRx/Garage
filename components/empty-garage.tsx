import { Car } from 'lucide-react'

export function EmptyGarage() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Car className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">Your garage is empty</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        Add your first Porsche to start tracking its market value over time. Click the button above to get started.
      </p>
    </div>
  )
}
