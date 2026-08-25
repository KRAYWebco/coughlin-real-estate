-- Christine Coughlin Realty Supabase schema
-- Run this once in the Supabase SQL Editor for the configured project.

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  service text not null,
  message text not null,
  status text not null default 'unread'
    check (status in ('unread', 'read', 'contacted'))
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  property_type text not null
    check (property_type in ('residential', 'commercial')),
  price numeric not null default 0,
  address text not null,
  specs jsonb not null default '{}'::jsonb,
  image_url text not null default '',
  is_past_listing boolean not null default false,
  status text not null default 'Active'
    check (status in ('Active', 'Featured', 'Sold')),
  description text not null default ''
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

create index if not exists listings_created_at_idx
  on public.listings (created_at desc);

alter table public.contact_submissions enable row level security;
alter table public.listings enable row level security;

-- Public visitors may submit leads, but cannot read or modify submissions.
drop policy if exists "Anyone can submit a contact request" on public.contact_submissions;
create policy "Anyone can submit a contact request"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated admin users can manage submissions and listings.
drop policy if exists "Authenticated users can read submissions" on public.contact_submissions;
create policy "Authenticated users can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update submissions" on public.contact_submissions;
create policy "Authenticated users can update submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can read listings" on public.listings;
create policy "Authenticated users can read listings"
  on public.listings
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can create listings" on public.listings;
create policy "Authenticated users can create listings"
  on public.listings
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update listings" on public.listings;
create policy "Authenticated users can update listings"
  on public.listings
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete listings" on public.listings;
create policy "Authenticated users can delete listings"
  on public.listings
  for delete
  to authenticated
  using (true);

-- Allow the public portfolio to read listings without exposing contact submissions.
drop policy if exists "Anyone can read listings" on public.listings;
create policy "Anyone can read listings"
  on public.listings
  for select
  to anon
  using (true);

-- Realtime notifications for the admin submissions feed.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'contact_submissions'
  ) then
    alter publication supabase_realtime add table public.contact_submissions;
  end if;
end
$$;
