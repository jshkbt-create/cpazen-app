create table if not exists failed_postbacks (
  id uuid default gen_random_uuid() primary key,
  click_id text,
  raw_data jsonb,
  error text,
  source_ip inet,
  created_at timestamptz default now()
);

create index idx_failed_postbacks_created_at on failed_postbacks(created_at desc);
create index idx_failed_postbacks_click_id on failed_postbacks(click_id);
