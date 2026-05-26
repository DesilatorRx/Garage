-- Add per-car MSRP override for owners who want to record their actual
-- dealer-sheet sticker price (including options) rather than relying on
-- the catalog's base-trim figure.
--
-- NULL = use the catalog lookup. Non-NULL = trust the owner's number.

alter table public.cars
  add column if not exists msrp_override numeric(12, 2);

alter table public.cars
  drop constraint if exists cars_msrp_override_check,
  add constraint cars_msrp_override_check
    check (msrp_override is null or msrp_override >= 0);
