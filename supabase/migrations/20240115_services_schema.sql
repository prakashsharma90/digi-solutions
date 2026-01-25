-- Enable RLS
ALTER TABLE IF EXISTS services ENABLE ROW LEVEL SECURITY;

-- 1. Create the services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_desc TEXT,
  hero_text TEXT,
  description TEXT,
  why_matters TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  problems JSONB DEFAULT '[]'::jsonb,
  approach JSONB DEFAULT '[]'::jsonb,
  tools JSONB DEFAULT '[]'::jsonb,
  outcomes JSONB DEFAULT '[]'::jsonb,
  industries JSONB DEFAULT '[]'::jsonb,
  pricing JSONB DEFAULT '{}'::jsonb,
  faq JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')),
  is_deleted BOOLEAN DEFAULT false,
  sort_order SERIAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create RLS Policies

-- Public Policy: Read published services only
CREATE POLICY "Public read published services"
ON services
FOR SELECT
USING (status = 'Published' AND is_deleted = false);

-- Admin Policy: Full access (Update role check as needed for your auth setup)
-- Assuming you have a way to identify admins, e.g., via a specific email or metadata
-- For now, allowing all authenticated users to read everything (for admin panel)
-- You should strictly lock this down to 'admin' role in production.
CREATE POLICY "Admin full access"
ON services
FOR ALL
USING (auth.role() = 'authenticated'); 

-- 3. Create Update Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
