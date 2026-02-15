-- Add cta_text column to pricing_plans table
ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT 'Get Started';
