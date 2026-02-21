-- 1. Enable UUID extension (Required for ID generation)
create extension if not exists "uuid-ossp";

-- 2. Create Tables (IF NOT EXISTS to prevent errors)
create table if not exists content_cards (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  title text not null,
  description text not null,
  icon_name text not null default 'Leaf',
  display_order int default 0
);

create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  ticket_number serial, -- Auto-incrementing human readable number (1, 2, 3...)
  full_name text not null,
  email text not null,
  institution text,
  role text,
  document_type text,
  document_number text,
  cpf text,
  phone text,
  is_foreigner boolean default false
);

-- Ensure ticket_number exists if table already existed without it
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'ticket_number') then
    alter table registrations add column ticket_number serial;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'document_type') then
    alter table registrations add column document_type text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'document_number') then
    alter table registrations add column document_number text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'cpf') then
    alter table registrations add column cpf text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'phone') then
    alter table registrations add column phone text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'registrations' and column_name = 'is_foreigner') then
    alter table registrations add column is_foreigner boolean default false;
  end if;
end $$;

create table if not exists speakers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  institution text,
  image_url text,
  description text,
  display_order int default 0
);

create table if not exists schedule_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  date date not null,
  start_time time not null,
  end_time time not null,
  title text not null,
  type text not null,
  description text,
  location text,
  speaker_id uuid references speakers(id) on delete set null
);

create table if not exists site_content (
  key text primary key,
  value text,
  created_at timestamptz default now()
);

-- 3. Enable Row Level Security (RLS)
alter table content_cards enable row level security;
alter table registrations enable row level security;
alter table speakers enable row level security;
alter table schedule_items enable row level security;
alter table site_content enable row level security;

-- 4. Policies 
-- We are updating policies to allow 'anon' (the public key) to edit, 
-- because we are handling the "admin" check in the React code with a hardcoded password.

-- Content Cards Policies
drop policy if exists "Public can view content cards" on content_cards;
create policy "Public can view content cards" on content_cards for select to anon, authenticated using (true);

drop policy if exists "Admins can manage content cards" on content_cards;
create policy "Admins can manage content cards" on content_cards for all to anon, authenticated using (true) with check (true);

-- Registrations Policies
drop policy if exists "Public can register" on registrations;
create policy "Public can register" on registrations for insert to anon, authenticated with check (true);

drop policy if exists "Admins can view registrations" on registrations;
create policy "Admins can view registrations" on registrations for select to anon, authenticated using (true);

-- Speakers Policies
drop policy if exists "Public can view speakers" on speakers;
create policy "Public can view speakers" on speakers for select to anon, authenticated using (true);

drop policy if exists "Admins can manage speakers" on speakers;
create policy "Admins can manage speakers" on speakers for all to anon, authenticated using (true) with check (true);

-- Schedule Items Policies
drop policy if exists "Public can view schedule" on schedule_items;
create policy "Public can view schedule" on schedule_items for select to anon, authenticated using (true);

drop policy if exists "Admins can manage schedule" on schedule_items;
create policy "Admins can manage schedule" on schedule_items for all to anon, authenticated using (true) with check (true);

-- Site Content Policies
drop policy if exists "Public can view site content" on site_content;
create policy "Public can view site content" on site_content for select to anon, authenticated using (true);

drop policy if exists "Admins can manage site content" on site_content;
create policy "Admins can manage site content" on site_content for all to anon, authenticated using (true) with check (true);

-- 5. Storage Setup
-- Note: 'storage' schema and 'buckets' table usually exist by default in Supabase.
-- We insert the bucket configuration safely.
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage Policies (allowing anon access for simplicity in this demo structure)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Anon Upload"
  on storage.objects for insert
  with check ( bucket_id = 'images' );

create policy "Anon Update"
  on storage.objects for update
  using ( bucket_id = 'images' );

create policy "Anon Delete"
  on storage.objects for delete
  using ( bucket_id = 'images' );

-- 6. Realtime (Add tables to publication if not already added)
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'content_cards') then
    alter publication supabase_realtime add table content_cards;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'speakers') then
    alter publication supabase_realtime add table speakers;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'schedule_items') then
    alter publication supabase_realtime add table schedule_items;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'site_content') then
    alter publication supabase_realtime add table site_content;
  end if;
end;
$$;

-- 7. Insert dummy speaker data (Only if table is empty)
insert into speakers (name, institution, image_url, description, display_order)
select 'Dr. Alejandra Echeverri', 'Universidade de Stanford', 'https://i.pravatar.cc/150?u=a', 'Especialista em ecologia tropical e serviços ecossistêmicos.', 1
where not exists (select 1 from speakers limit 1);

insert into speakers (name, institution, image_url, description, display_order)
select 'Dr. Celio Fernando', 'Itaipu Binacional', 'https://i.pravatar.cc/150?u=b', 'Diretor de Coordenação da Itaipu Binacional, focado em energias renováveis.', 2
where not exists (select 1 from speakers limit 1);

insert into speakers (name, institution, image_url, description, display_order)
select 'Dra. Maria Fátima', 'Universidade Nacional de Assunção', 'https://i.pravatar.cc/150?u=c', 'Pesquisadora em química ambiental e recursos hídricos.', 3
where not exists (select 1 from speakers limit 1);

-- 8. Insert default site content values
insert into site_content (key, value)
values
  ('hero_image_url', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('about_image_url', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('gallery_image_urls', 'https://images.unsplash.com/photo-1578887362357-674f51e0f49c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
on conflict (key) do update set value = excluded.value;