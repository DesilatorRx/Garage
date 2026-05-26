export interface Car {
  id: string
  user_id: string
  brand: string
  year: number
  model: string
  variant: string | null
  color: string | null
  vin: string | null
  purchase_price: number | null
  purchase_date: string | null
  notes: string | null
  image_url: string | null
  /** Owner-provided MSRP (e.g. from a dealer sheet). Beats catalog lookup. */
  msrp_override: number | null
  created_at: string
  updated_at: string
}

export interface PriceEntry {
  id: string
  car_id: string
  user_id: string
  price: number
  source: string | null
  recorded_date: string
  notes: string | null
  created_at: string
}

export interface CarWithLatestPrice extends Car {
  /** Latest manually-logged price entry, if any. */
  latest_price: number | null
  /** Median of recent same-trim auction comps, if available. */
  market_estimate: number | null
  /** Total change vs purchase_price using the best available current-value source. */
  price_change: number | null
  price_change_pct: number | null
  price_entries_count: number
}
