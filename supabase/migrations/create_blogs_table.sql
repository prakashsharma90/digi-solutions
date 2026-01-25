-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'blog', -- blog | news | research
  category TEXT,
  image TEXT, -- featured_image
  status TEXT DEFAULT 'draft', -- draft | published | archived
  meta_title TEXT,
  meta_description TEXT,
  author_name TEXT, -- Simplified author handling for now, or link to users if needed
  author_role TEXT,
  author_avatar TEXT,
  tags TEXT[], -- Array of strings
  read_time TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public blogs are viewable by everyone" 
ON blogs FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can do everything" 
ON blogs FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin'); 
-- Note: The above admin policy is a bit loose, usually we check a generic admin role or specific email. 
-- For this project's context, adhering to existing patterns or allowing Authenticated users if simple admin.
-- Better:
CREATE POLICY "Auth users can manage blogs"
ON blogs FOR ALL
USING (auth.role() = 'authenticated');
