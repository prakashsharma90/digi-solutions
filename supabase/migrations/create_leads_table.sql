-- Create leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    service TEXT,
    message TEXT,
    source TEXT DEFAULT 'Website',
    status TEXT DEFAULT 'New', -- New, Contacted, Converted, Lost
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Insert: Public can insert (for forms)
-- Note: 'anon' role is used for unauthenticated users
CREATE POLICY "Public can insert leads" 
ON leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 2. View/Update/Delete: Only Admins
CREATE POLICY "Admins can do everything on leads" 
ON leads 
FOR ALL 
USING (auth.role() = 'authenticated'); -- Simplified for now, similar to blogs
