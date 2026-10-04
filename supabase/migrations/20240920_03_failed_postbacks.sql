CREATE TABLE IF NOT EXISTS failed_postbacks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  click_id text,
  raw_data jsonb,
  error text,
  source_ip inet,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_failed_postbacks_created_at ON failed_postbacks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_failed_postbacks_click_id ON failed_postbacks (click_id);
