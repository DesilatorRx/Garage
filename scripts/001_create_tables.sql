-- Cars table: stores each Porsche in the user's collection
create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  model text not null,
  variant text,
  color text,
  vin text,
  purchase_price numeric(12,2),
  purchase_date date,
  notes text,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cars enable row level security;

create policy "cars_select_own" on public.cars for select using (auth.uid() = user_id);
create policy "cars_insert_own" on public.cars for insert with check (auth.uid() = user_id);
create policy "cars_update_own" on public.cars for update using (auth.uid() = user_id);
create policy "cars_delete_own" on public.cars for delete using (auth.uid() = user_id);

-- Price entries table: tracks market value over time
create table if not exists public.price_entries (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null references public.cars(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  price numeric(12,2) not null,
  source text,
  recorded_date date not null default current_date,
  notes text,
  created_at timestamptz default now()
);

alter table public.price_entries enable row level security;

create policy "price_entries_select_own" on public.price_entries for select using (auth.uid() = user_id);
create policy "price_entries_insert_own" on public.price_entries for insert with check (auth.uid() = user_id);
create policy "price_entries_update_own" on public.price_entries for update using (auth.uid() = user_id);
create policy "price_entries_delete_own" on public.price_entries for delete using (auth.uid() = user_id);
