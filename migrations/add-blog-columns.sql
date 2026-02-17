-- Migration: Add missing columns to blogs table
-- Run this in your Supabase SQL Editor

-- Add meta_desc column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_desc TEXT;

-- Add meta_title column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;

-- Add image column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS image TEXT;

-- Add status column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';

-- Add type column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'blog';

-- Add author_name column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_name TEXT;

-- Add author_role column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_role TEXT;

-- Add updated_at column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Update existing records to have default values
UPDATE blogs 
SET 
    status = COALESCE(status, 'published'),
    type = COALESCE(type, 'blog'),
    author_name = COALESCE(author_name, 'Digihub Team'),
    author_role = COALESCE(author_role, 'Editor'),
    updated_at = COALESCE(updated_at, published_at, CURRENT_TIMESTAMP)
WHERE status IS NULL OR type IS NULL OR author_name IS NULL;

-- Verify the migration
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'blogs'
ORDER BY ordinal_position;
