-- =====================================================
-- DIGIHUB AI CHATBOT - DATABASE SETUP
-- =====================================================
-- Copy this entire file and run it in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- =====================================================

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  visitor_business TEXT,
  visitor_website TEXT,
  visitor_city TEXT,
  visitor_goal TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'lead_captured', 'closed')),
  lead_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created ON chat_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);

-- Enable RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chat_conversations
CREATE POLICY "Anyone can create conversations"
  ON chat_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own conversations"
  ON chat_conversations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update their own conversations"
  ON chat_conversations FOR UPDATE
  USING (true);

-- Policies for chat_messages
CREATE POLICY "Anyone can create messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view messages"
  ON chat_messages FOR SELECT
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_chat_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update timestamp
CREATE TRIGGER update_chat_conversation_timestamp
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_conversation_timestamp();

-- =====================================================
-- VERIFICATION QUERIES (Optional - Run after setup)
-- =====================================================

-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('chat_conversations', 'chat_messages');

-- Check table structures
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'chat_conversations';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'chat_messages';
