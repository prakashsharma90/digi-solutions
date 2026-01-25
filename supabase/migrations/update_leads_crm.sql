-- Add CRM columns to the leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS budget_range TEXT,
ADD COLUMN IF NOT EXISTS business_size TEXT,
ADD COLUMN IF NOT EXISTS timeline TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create an Enum for Lead Status if it doesn't strictly exist, 
-- or we can just use a Text constraints check for simplicity and flexibility.
-- Let's stick to Text with Check for easier modification later.

ALTER TABLE leads 
DROP CONSTRAINT IF EXISTS leads_status_check;

ALTER TABLE leads
ADD CONSTRAINT leads_status_check 
CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'));

-- Default status is already 'New' from previous migration, so we are good.
