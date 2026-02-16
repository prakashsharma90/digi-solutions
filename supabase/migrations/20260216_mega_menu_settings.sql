-- Create a table for storing site-wide settings/configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Admin Access (Full)
-- Adjust the role check based on your project's auth setup (e.g., app_metadata or public.users table)
CREATE POLICY "Admins full access" ON public.site_settings
    FOR ALL
    USING (
        (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin') OR
        (auth.jwt() ->> 'role' = 'service_role')
    )
    WITH CHECK (
        (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin') OR
        (auth.jwt() ->> 'role' = 'service_role')
    );

-- Policy: Public Read Access for specific keys
-- allowing public to read the mega menu configuration
CREATE POLICY "Public read mega_menu" ON public.site_settings
    FOR SELECT
    USING (key = 'mega_menu_categories');

-- Insert default value if not exists (Optional, but good for init)
-- You might want to run this manually or let the app handle the first save.
