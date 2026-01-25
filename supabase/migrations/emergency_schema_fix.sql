-- EMERGENCY FIX: Ensure ALL columns exist
-- It seems your 'services' table existed from before without these columns.
-- This script safely adds them if they are missing.

ALTER TABLE services ADD COLUMN IF NOT EXISTS slug TEXT;
-- Make slug unique if not already
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'services_slug_key') THEN
        ALTER TABLE services ADD CONSTRAINT services_slug_key UNIQUE (slug);
    END IF;
END $$;

ALTER TABLE services ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS meta_desc TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS hero_text TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS why_matters TEXT;

-- JSONB Columns
ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS problems JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS approach JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS tools JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS outcomes JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS industries JSONB DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '{}'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;

-- Status Columns
ALTER TABLE services ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Draft';
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order SERIAL;

-- Re-apply check constraint for status
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_status_check;
ALTER TABLE services ADD CONSTRAINT services_status_check CHECK (status IN ('Draft', 'Published'));
