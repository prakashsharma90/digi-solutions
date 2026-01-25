-- Add display_tags column to services table
-- This will allow tagging services to appear in specific locations

ALTER TABLE services 
ADD COLUMN IF NOT EXISTS display_tags TEXT[] DEFAULT '{}';

-- Add a comment to describe the column
COMMENT ON COLUMN services.display_tags IS 'Array of display locations: home, services, navbar';

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_services_display_tags ON services USING GIN(display_tags);
