# The Garage

Track the market value of your exotic car collection like a stock portfolio. Multi-brand support — Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, and the Mercedes-AMG halo lineup — with a planned daily market-data scrape so you can watch your collection trend up or down over time.

**Live:** https://garage-azure-eight.vercel.app/

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS + shadcn-style Radix primitives
- **Auth + DB:** Supabase (SSR cookies, Row Level Security)
- **Hosting:** Vercel
- **Package manager:** pnpm 11

## Local setup

Clone, install, and add Supabase credentials:

```bash
git clone https://github.com/DesilatorRx/Garage.git
cd Garage
pnpm install
```

Create `.env.local` with the publishable key + project URL from your Supabase dashboard → **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
```

The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the **publishable / anon public** key, not the `service_role` secret. With Row Level Security enabled it's safe in the browser bundle.

Then:

```bash
pnpm dev
```

## Database

Schema lives in [`scripts/`](scripts/) and is applied via Supabase SQL Editor (or any psql-compatible client).

| File | What it does |
|---|---|
| [scripts/001_create_tables.sql](scripts/001_create_tables.sql) | Creates `cars` + `price_entries` tables with RLS policies |
| [scripts/002_add_brand_column.sql](scripts/002_add_brand_column.sql) | Adds `brand` column to `cars`, backfills existing rows to `'Porsche'` |
| [scripts/003_market_sales.sql](scripts/003_market_sales.sql) | Creates `market_sales` table for scraped auction comps + indexes + trigram extension |

Run them in numerical order on a fresh project.

## Project structure

```
app/                      # Next.js App Router pages
  auth/                   # Login, signup, callback
  dashboard/              # User's collection + per-car detail pages
components/
  car-selector.tsx        # Brand → Year → Model → Trim cascade
  garage-mark.tsx         # Brand logo (SVG)
  ui/                     # shadcn primitives
lib/
  catalog/                # Hard-coded vehicle catalog
    porsche.ts            # 1948+
    ferrari.ts            # 1948+
    lamborghini.ts        # 1964+
    mclaren.ts            # 1992+ (incl. F1)
    aston-martin.ts       # 1948+
    mercedes-amg.ts       # SLR / SLS / AMG GT / AMG ONE
    types.ts              # Generation + TrimAvailability types
    index.ts              # Cross-brand helpers
  supabase/               # SSR + browser + middleware clients
  types.ts                # Car / PriceEntry DTOs
scripts/                  # SQL migrations
```

## Catalog data shape

Each brand file exports an array of `Generation` objects keyed by a stable `id`. The catalog is consumed by the UI dropdowns today and (planned) by the scraper for matching incoming sale listings to user cars. To add a model: edit the relevant brand file and add a generation entry with its trims and year ranges. No DB migration needed — the catalog is purely static TypeScript data.

## Deployment notes

Vercel auto-deploys on push to `main`. A few gotchas baked into config:

- [vercel.json](vercel.json) overrides the install command with `pnpm install --no-frozen-lockfile --ignore-scripts`. Vercel's pnpm refused the build on sharp's `ERR_PNPM_IGNORED_BUILDS` even though sharp is whitelisted in [pnpm-workspace.yaml](pnpm-workspace.yaml). Sharp's native binding isn't needed because Next is configured with `images.unoptimized: true`.
- `packageManager: "pnpm@11.3.0"` is pinned in [package.json](package.json) so local and CI use the same pnpm.
- Supabase env vars must be set in **Vercel → Project Settings → Environment Variables**. Re-deploy without build cache when you add or change them (`NEXT_PUBLIC_*` values are inlined into the bundle at build time).
- In **Supabase → Authentication → URL Configuration**, set the production domain as the Site URL and add `https://<your-vercel-domain>/**`, `http://localhost:3000/**` to Redirect URLs so email confirmation links work.

## Market comparables (BaT scraper)

A daily scraper pulls recently-sold listings from Bring a Trailer and writes them to `market_sales`. Each car's detail page renders a `MarketComps` panel showing recent sales that match (`brand`, `year ± 2`, model-token in title), the median sold price, and a link out to each listing.

### How it works

- [scripts/scrape-bat.ts](scripts/scrape-bat.ts) fetches `https://bringatrailer.com/auctions/results/?page=N`, parses the embedded `auctionsCompletedInitialData` JSON blob (no HTML parsing — BaT serves the listing data straight into the page), brand-matches each title against the catalog, and upserts into `market_sales`. Idempotent via `UNIQUE(source, source_listing_id)`.
- [.github/workflows/scrape-bat.yml](.github/workflows/scrape-bat.yml) runs the script daily at 09:15 UTC, and can be triggered manually with a custom page count for backfills.

### Required secrets (GitHub Actions)

In **Repo → Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|---|---|
| `SUPABASE_URL` | Same as your `NEXT_PUBLIC_SUPABASE_URL` (e.g. `https://abc.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | From **Supabase → Project Settings → API → service_role secret**. Bypasses RLS — never put this in client code. |

### Running locally

```bash
# Adds SUPABASE_SERVICE_ROLE_KEY to .env.local first
SCRAPE_PAGES=3 pnpm scrape:bat   # default: 3 pages = ~108 sold listings
SCRAPE_PAGES=20 pnpm scrape:bat  # one-off backfill: ~720 listings
```

### ToS note

BaT's terms technically prohibit scraping. For low-volume personal use this is low-risk; if the app goes public, switch to the paid Hagerty Valuation Tools API or Classic.com API.

## Roadmap

- ✅ Multi-brand catalog with cascading selector
- ✅ Multi-brand rebrand
- ✅ Daily BaT scraper → `market_sales` table + per-car comp panel
- 🚧 Per-model market trend UI (sparkline, 1m/6m/1y % change)
- 🚧 Additional sources (Cars & Bids, RM Sotheby's, Mecum)
- 🚧 Historical sales backfill
- 🔮 AI buy/sell advisor (Claude-powered) — comp data + trend signals → "buy X for projected Y% gain over Z years"
- 🔮 Ownership-cost intelligence ("$X per 3,000 miles") — requires per-model maintenance interval data
- 🔮 Monetization (subscription tier or affiliate parts links)
