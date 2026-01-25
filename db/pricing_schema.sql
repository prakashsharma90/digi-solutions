-- Database Schema for Pricing System
-- 
-- Run this in your Supabase SQL Editor

-- 1. Services Table (Likely exists, but ensuring structure)
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  status text default 'Draft', -- 'Draft' or 'Published'
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Pricing Plans Table
create table if not exists pricing_plans (
  id uuid default gen_random_uuid() primary key,
  service_id uuid references services(id) on delete cascade not null,
  title text not null, -- e.g., 'Starter', 'Pro'
  price decimal(10, 2) not null,
  currency text default 'INR',
  billing_cycle text default 'monthly', -- 'monthly', 'yearly', 'one-time'
  is_popular boolean default false,
  is_active boolean default true,
  is_active boolean default true,
  owner_id uuid references auth.users(id),
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Plan Features Table
create table if not exists plan_features (
  id uuid default gen_random_uuid() primary key,
  pricing_plan_id uuid references pricing_plans(id) on delete cascade not null,
  feature_text text not null,
  is_included boolean default true,
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS (Row Level Security)
alter table pricing_plans enable row level security;
alter table plan_features enable row level security;

-- 5. Create Policies (Open for now for dev, restrict in prod)
create policy "Enable read access for all users" on pricing_plans for select using (true);
create policy "Enable insert for authenticated users only" on pricing_plans for insert with check (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin' OR (auth.role() = 'authenticated' AND (owner_id = auth.uid() OR owner_id IS NULL)));
create policy "Enable update for authenticated users only" on pricing_plans for update using (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin' OR owner_id = auth.uid());
create policy "Enable delete for authenticated users only" on pricing_plans for delete using (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin' OR owner_id = auth.uid());

create policy "Enable read access for all users" on plan_features for select using (true);
create policy "Enable insert for authenticated users only" on plan_features for insert with check (
  auth.role() = 'service_role' OR
  exists (select 1 from pricing_plans pp where pp.id = pricing_plan_id and (pp.owner_id = auth.uid() OR auth.jwt()->>'role' = 'admin'))
);
create policy "Enable update for authenticated users only" on plan_features for update using (
  auth.role() = 'service_role' OR
  exists (select 1 from pricing_plans pp where pp.id = pricing_plan_id and (pp.owner_id = auth.uid() OR auth.jwt()->>'role' = 'admin'))
);
create policy "Enable delete for authenticated users only" on plan_features for delete using (
  auth.role() = 'service_role' OR
  exists (select 1 from pricing_plans pp where pp.id = pricing_plan_id and (pp.owner_id = auth.uid() OR auth.jwt()->>'role' = 'admin'))
);
