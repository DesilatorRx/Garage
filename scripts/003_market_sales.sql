-- Public comp data scraped from auction sites (currently Bring a Trailer).
-- Shared across all authenticated users (readonly to clients; service_role inserts).

-- Trigram extension MUST be created before the GIN trigram index below.
create extension if not exists pg_trgm;

create table if not exists public.market_sales (
  id uuid primary key default gen_random_uuid(),

  -- Source provenance & dedup
  source text not null,                 -- e.g. 'bringatrailer'
  source_listing_id text not null,      -- stable id within source
  source_url text not null,

  -- Parsed / matched fields
  brand text,                           -- matched to lib/catalog brands; null if unmatched
  year integer,
  raw_title text not null,              -- original auction title (search/regex target)
  mileage integer,                      -- parsed from title when "XXk-Mile" present

  -- Sale facts
  sold_price numeric(12, 2) not null,
  currency text not null default 'USD',
  sold_date date not null,
  country_code text,                    -- 3-letter (USA, GBR, ...)

  -- Display / debugging
  thumbnail_url text,
  excerpt text,
  raw_data jsonb,                       -- full source payload for future re-parsing

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (source, source_listing_id)
);

create index if not exists market_sales_brand_year_idx on public.market_sales (brand, year);
create index if not exists market_sales_sold_date_idx  on public.market_sales (sold_date desc);
create index if not exists market_sales_raw_title_trgm on public.market_sales using gin (raw_title gin_trgm_ops);

-- Auto-update updated_at
create or replace function public.set_updated_at_market_sales()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists market_sales_set_updated_at on public.market_sales;
create trigger market_sales_set_updated_at
  before update on public.market_sales
  for each row execute function public.set_updated_at_market_sales();

-- RLS: everyone can read, only service_role writes.
alter table public.market_sales enable row level security;

drop policy if exists market_sales_select_all on public.market_sales;
create policy market_sales_select_all
  on public.market_sales
  for select
  using (true);
-- No insert/update/delete policies → only service_role bypasses RLS.
