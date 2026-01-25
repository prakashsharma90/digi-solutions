ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS related_resources JSONB DEFAULT '[]'::jsonb;
