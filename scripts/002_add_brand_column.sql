-- Add brand column to cars table to support multi-brand catalog.
-- Existing rows are backfilled to 'Porsche' since the app was single-brand prior to this change.

alter table public.cars
  add column if not exists brand text;

update public.cars
  set brand = 'Porsche'
  where brand is null;

alter table public.cars
  alter column brand set not null;

create index if not exists cars_brand_idx on public.cars (brand);
