-- ============================================
-- MIGRATE EXISTING ANALYTICS IDs
-- Run this in Supabase SQL Editor to restore tracking
-- ============================================

-- 1. Insert existing GA4 ID found in code (G-VNWPSJKLW5)
-- We wrap the value in double quotes because the column is JSON/JSONB type
INSERT INTO public.site_settings (key, value, updated_at)
VALUES ('ga4_id', '"G-VNWPSJKLW5"', NOW())
ON CONFLICT (key) DO UPDATE 
SET value = '"G-VNWPSJKLW5"' 
WHERE site_settings.value::text = '""' OR site_settings.value IS NULL;

-- 2. Verify
SELECT * FROM public.site_settings WHERE key = 'ga4_id';
