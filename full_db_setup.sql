-- !!! WARNING: THIS SCRIPT RESETS THE DATABASE SCHEMA !!!
-- It will delete existing 'profiles', 'properties', 'contracts', AND 'leads'.

-- 1. CLEANUP (Borrar todo lo anterior)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.contracts CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.user_status CASCADE;

-- 2. TYPES
create type user_role as enum ('admin', 'agency', 'investor');
create type user_status as enum ('pending', 'approved', 'rejected');

-- 3. PROFILES TABLE (Must be before Leads because Leads policy references it)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role user_role default 'investor',
  status user_status default 'pending',
  full_name text,
  company_name text,
  tax_id text,
  phone text,
  location text,
  investment_profile jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );

-- 4. LEADS TABLE
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  email text,
  full_name text,
  role user_role,
  intent text,
  target_location text,
  budget text,
  request_access boolean default false,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.leads enable row level security;
create policy "Anyone can insert leads" on leads for insert with check (true);
create policy "Admins can view leads" on leads for select using ( auth.uid() in (select id from profiles where role = 'admin') );

-- 5. TRIGGER FOR NEW USERS
create or replace function public.handle_new_user()
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, company_name, status)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce((new.raw_user_meta_data->>'role'), 'investor')::public.user_role,
    new.raw_user_meta_data->>'company_name',
    'pending'
  );
  return new;
exception when others then
  raise exception 'Profile creation failed: %', SQLERRM;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. PROPERTIES TABLE
create table public.properties (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id),
  title text not null,
  description text,
  price numeric,
  commission_percentage numeric,
  is_exclusive boolean default false,
  location text,
  property_type text,
  status text default 'pending', 
  images text[],
  dossier_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.properties enable row level security;
create policy "Properties are viewable by everyone" on properties for select using ( true );
create policy "Agencies can insert properties" on properties for insert with check ( auth.uid() = owner_id );
create policy "Owners can update their properties" on properties for update using ( auth.uid() = owner_id );

-- 7. CONTRACTS TABLE
create table public.contracts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  type text, 
  signed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  signature_url text
);
alter table public.contracts enable row level security;
create policy "Users view own contracts" on contracts for select using (auth.uid() = user_id);
create policy "Users insert own contracts" on contracts for insert with check (auth.uid() = user_id);
