create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  lastname text,
  role text not null default 'student' check (role in ('student', 'admin', 'super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exam_id text not null,
  score integer not null check (score >= 0 and score <= 100),
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.document_uploads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  title text not null,
  notes text default '',
  mime_type text not null,
  file_name text not null,
  file_path text not null unique,
  file_size bigint not null default 0,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.support_contributions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  amount numeric(10,2) not null,
  currency text not null default 'USD',
  message text default '',
  provider text not null default 'paypal',
  status text not null default 'pending',
  "paypalOrderId" text,
  "paypalCaptureId" text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'super_admin'), false);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin', false);
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.attempts enable row level security;
alter table public.document_uploads enable row level security;
alter table public.support_contributions enable row level security;

drop policy if exists "Users can view their own user row" on public.users;
create policy "Users can view their own user row"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "Admins can view all users" on public.users;
create policy "Admins can view all users"
on public.users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Users can update their own user row" on public.users;
create policy "Users can update their own user row"
on public.users
for update
using (auth.uid() = id);

drop policy if exists "Admins can update all users" on public.users;
create policy "Admins can update all users"
on public.users
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users can view their own attempts" on public.attempts;
create policy "Users can view their own attempts"
on public.attempts
for select
using (auth.uid() = user_id);

drop policy if exists "Admins can view all attempts" on public.attempts;
create policy "Admins can view all attempts"
on public.attempts
for select
to authenticated
using (public.is_admin());

drop policy if exists "Users can insert their own attempts" on public.attempts;
create policy "Users can insert their own attempts"
on public.attempts
for insert
with check (auth.uid() = user_id);

drop policy if exists "Admins can manage attempts" on public.attempts;
create policy "Admins can manage attempts"
on public.attempts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can insert document uploads" on public.document_uploads;
create policy "Anyone can insert document uploads"
on public.document_uploads
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can view all document uploads" on public.document_uploads;
create policy "Admins can view all document uploads"
on public.document_uploads
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update document uploads" on public.document_uploads;
create policy "Admins can update document uploads"
on public.document_uploads
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can insert support contributions" on public.support_contributions;
create policy "Anyone can insert support contributions"
on public.support_contributions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can view all support contributions" on public.support_contributions;
create policy "Admins can view all support contributions"
on public.support_contributions
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update support contributions" on public.support_contributions;
create policy "Admins can update support contributions"
on public.support_contributions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());
