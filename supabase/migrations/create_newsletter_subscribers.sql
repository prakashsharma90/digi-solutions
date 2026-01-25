-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source VARCHAR(100),
  consent BOOLEAN DEFAULT true,
  double_opt_in BOOLEAN DEFAULT false,
  ip_address VARCHAR(100),
  user_agent TEXT,
  country VARCHAR(100),
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_score INTEGER DEFAULT 0,
  engagement VARCHAR(50) DEFAULT 'warm' CHECK (engagement IN ('hot', 'warm', 'cold')),
  tags TEXT[] DEFAULT '{}',
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  page_visits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- Create index on source
CREATE INDEX IF NOT EXISTS idx_newsletter_source ON newsletter_subscribers(source);

-- Create index on engagement
CREATE INDEX IF NOT EXISTS idx_newsletter_engagement ON newsletter_subscribers(engagement);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscribers(created_at DESC);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (for newsletter signup)
CREATE POLICY "Allow public newsletter signup" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated read (for admin)
CREATE POLICY "Allow authenticated read" ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated update (for admin)
CREATE POLICY "Allow authenticated update" ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy for authenticated delete (for admin)
CREATE POLICY "Allow authenticated delete" ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER newsletter_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();
