-- Chatbot Leads Table
-- Run this SQL in your Supabase SQL Editor to create the chatbot_leads table

CREATE TABLE IF NOT EXISTS chatbot_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL DEFAULT '',
    email VARCHAR(255) NOT NULL DEFAULT '',
    phone VARCHAR(50) DEFAULT '',
    service_type VARCHAR(100) DEFAULT '',
    query_message TEXT DEFAULT '',
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for search performance
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created_at ON chatbot_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_session_id ON chatbot_leads(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON chatbot_leads(email);

-- Enable Row Level Security (optional, adjust policies as needed)
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Allow the service role full access (for API routes using createAdminClient)
CREATE POLICY "Service role full access to chatbot_leads"
    ON chatbot_leads
    FOR ALL
    USING (true)
    WITH CHECK (true);
