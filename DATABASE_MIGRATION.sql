-- ============================================================================
-- PRICING PLANS DATABASE MIGRATION
-- ============================================================================
-- Date: 2026-01-24
-- Version: 2.0
-- Purpose: Complete schema update for pricing dashboard improvements
-- Reference: PRICING_IMPROVEMENTS.md
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ADD CORE COLUMNS
-- ----------------------------------------------------------------------------

-- Add is_custom column for custom pricing plans
ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS is_custom BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN pricing_plans.is_custom IS 
'When true, displays "Contact Sales" instead of fixed price. Used for Enterprise/Custom plans.';

-- Add audit trail columns
ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

COMMENT ON COLUMN pricing_plans.created_at IS 'Timestamp when the plan was created';
COMMENT ON COLUMN pricing_plans.updated_at IS 'Timestamp when the plan was last modified';
COMMENT ON COLUMN pricing_plans.created_by IS 'User ID who created this plan';

-- ----------------------------------------------------------------------------
-- 2. CREATE AUTO-UPDATE TRIGGER FOR updated_at
-- ----------------------------------------------------------------------------

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_pricing_plans_updated_at ON pricing_plans;

-- Create the trigger
CREATE TRIGGER update_pricing_plans_updated_at 
    BEFORE UPDATE ON pricing_plans 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TRIGGER update_pricing_plans_updated_at ON pricing_plans IS 
'Automatically updates the updated_at timestamp when a plan is modified';

-- ----------------------------------------------------------------------------
-- 3. DATA MIGRATION - Update Existing Records
-- ----------------------------------------------------------------------------

-- Set is_custom = true for existing Custom/Enterprise plans
UPDATE pricing_plans 
SET is_custom = TRUE 
WHERE LOWER(title) IN ('custom', 'enterprise', 'scale', 'singularity', 'ambassador', 'media co.')
   OR price = 0
   OR price IS NULL;

-- Set created_at for existing records (if NULL)
UPDATE pricing_plans 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- Set updated_at for existing records (if NULL)
UPDATE pricing_plans 
SET updated_at = NOW() 
WHERE updated_at IS NULL;

-- ----------------------------------------------------------------------------
-- 4. ADD INDEXES FOR PERFORMANCE
-- ----------------------------------------------------------------------------

-- Index on service_id for faster filtering
CREATE INDEX IF NOT EXISTS idx_pricing_plans_service_id 
ON pricing_plans(service_id);

-- Index on is_active for filtering published plans
CREATE INDEX IF NOT EXISTS idx_pricing_plans_is_active 
ON pricing_plans(is_active);

-- Index on is_custom for filtering custom plans
CREATE INDEX IF NOT EXISTS idx_pricing_plans_is_custom 
ON pricing_plans(is_custom);

-- Composite index for common queries (service + active status)
CREATE INDEX IF NOT EXISTS idx_pricing_plans_service_active 
ON pricing_plans(service_id, is_active);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_pricing_plans_created_at 
ON pricing_plans(created_at DESC);

-- ----------------------------------------------------------------------------
-- 5. ADD CONSTRAINTS
-- ----------------------------------------------------------------------------

-- Ensure price is non-negative (unless custom)
ALTER TABLE pricing_plans 
ADD CONSTRAINT chk_pricing_plans_price_non_negative 
CHECK (is_custom = TRUE OR price >= 0);

-- Ensure billing_cycle is valid
ALTER TABLE pricing_plans 
ADD CONSTRAINT chk_pricing_plans_billing_cycle 
CHECK (billing_cycle IN ('monthly', 'yearly', 'one-time'));

-- Ensure currency is valid
ALTER TABLE pricing_plans 
ADD CONSTRAINT chk_pricing_plans_currency 
CHECK (currency IN ('INR', 'USD', 'AED', 'EUR', 'GBP'));

-- ----------------------------------------------------------------------------
-- 6. OPTIONAL: ADD FUTURE-READY COLUMNS (Commented out - uncomment if needed)
-- ----------------------------------------------------------------------------

-- Internal notes for admins
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS internal_notes TEXT;

-- SKU/Product code
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS sku VARCHAR(50) UNIQUE;

-- Sort order for manual reordering
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Scheduled publishing
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS publish_at TIMESTAMP WITH TIME ZONE;

-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS unpublish_at TIMESTAMP WITH TIME ZONE;

-- Version tracking
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;

-- A/B testing
-- ALTER TABLE pricing_plans 
-- ADD COLUMN IF NOT EXISTS ab_test_variant VARCHAR(50);

-- ----------------------------------------------------------------------------
-- 7. UPDATE ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS if not already enabled
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active pricing plans" ON pricing_plans;
DROP POLICY IF EXISTS "Admins can manage all pricing plans" ON pricing_plans;

-- Policy: Public users can only view active plans
CREATE POLICY "Public can view active pricing plans" 
ON pricing_plans 
FOR SELECT 
USING (is_active = TRUE);

-- Policy: Authenticated admins can manage all plans
CREATE POLICY "Admins can manage all pricing plans" 
ON pricing_plans 
FOR ALL 
USING (
    auth.jwt() ->> 'role' = 'admin' 
    OR 
    auth.jwt() ->> 'email' IN (
        SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
    )
);

-- ----------------------------------------------------------------------------
-- 8. CREATE HELPER VIEWS
-- ----------------------------------------------------------------------------

-- View: Active pricing plans with service details
CREATE OR REPLACE VIEW v_active_pricing_plans AS
SELECT 
    pp.*,
    s.name as service_name,
    s.slug as service_slug
FROM pricing_plans pp
INNER JOIN services s ON pp.service_id = s.id
WHERE pp.is_active = TRUE
ORDER BY s.name, pp.price;

COMMENT ON VIEW v_active_pricing_plans IS 
'Shows all active pricing plans with their associated service information';

-- View: Pricing plan summary for admin dashboard
CREATE OR REPLACE VIEW v_pricing_plan_summary AS
SELECT 
    s.id as service_id,
    s.name as service_name,
    COUNT(pp.id) as total_plans,
    COUNT(CASE WHEN pp.is_active THEN 1 END) as active_plans,
    COUNT(CASE WHEN pp.is_custom THEN 1 END) as custom_plans,
    MIN(CASE WHEN NOT pp.is_custom THEN pp.price END) as min_price,
    MAX(CASE WHEN NOT pp.is_custom THEN pp.price END) as max_price
FROM services s
LEFT JOIN pricing_plans pp ON s.id = pp.service_id
GROUP BY s.id, s.name
ORDER BY s.name;

COMMENT ON VIEW v_pricing_plan_summary IS 
'Provides a summary of pricing plans per service for admin dashboard';

-- ----------------------------------------------------------------------------
-- 9. VERIFICATION QUERIES
-- ----------------------------------------------------------------------------

-- Verify all columns exist
SELECT 
    column_name, 
    data_type, 
    column_default, 
    is_nullable,
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'pricing_plans'
ORDER BY ordinal_position;

-- Verify indexes
SELECT 
    indexname, 
    indexdef
FROM pg_indexes
WHERE tablename = 'pricing_plans'
ORDER BY indexname;

-- Verify constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'pricing_plans'::regclass
ORDER BY conname;

-- Verify RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'pricing_plans';

-- ----------------------------------------------------------------------------
-- 10. SAMPLE DATA CHECK
-- ----------------------------------------------------------------------------

-- Show updated plans with new columns
SELECT 
    id,
    title,
    price,
    currency,
    is_custom,
    is_active,
    is_popular,
    created_at,
    updated_at
FROM pricing_plans
ORDER BY service_id, price;

-- Count plans by status
SELECT 
    is_active,
    is_custom,
    COUNT(*) as count
FROM pricing_plans
GROUP BY is_active, is_custom
ORDER BY is_active DESC, is_custom DESC;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- 
-- Next Steps:
-- 1. Review the output of verification queries
-- 2. Test the admin panel at /admin/pricing
-- 3. Test public pricing display on service pages
-- 4. Verify RLS policies are working correctly
-- 5. Monitor performance with new indexes
--
-- Rollback (if needed):
-- - DROP COLUMN statements for new columns
-- - DROP INDEX statements for new indexes
-- - DROP CONSTRAINT statements for new constraints
-- - Restore from backup if major issues
-- ============================================================================
