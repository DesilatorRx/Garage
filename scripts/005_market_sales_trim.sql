-- Add inferred trim to market_sales so we can group/filter comps by trim.
-- E.g. a Gallardo Superleggera comp vs a base Gallardo coupe trade as
-- completely different cars and shouldn't be averaged together.
--
-- Populated by the scraper using the catalog's per-generation trim list;
-- NULL means we couldn't confidently match (titles like "1996 Porsche 911"
-- without a trim word).

alter table public.market_sales
  add column if not exists trim_match text;

create index if not exists market_sales_brand_year_trim_idx
  on public.market_sales (brand, year, trim_match);
