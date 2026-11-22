-- Run this in the Supabase SQL Editor for the production database.
create extension if not exists pgcrypto;
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  name text not null,
  email text not null,
  phone text not null,
  business text default '',
  website_type text not null,
  style text default 'Open to suggestions',
  budget text not null,
  timeline text default 'Flexible',
  brief text not null,
  status text not null default 'New' check (status in ('New','In Review','Contacted','In Progress','Completed','Declined')),
  created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
-- No anon/authenticated policies are created. The server uses the service-role key only.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to browser/client code.
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);
