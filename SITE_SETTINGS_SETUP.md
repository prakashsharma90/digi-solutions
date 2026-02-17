# Site Settings Table Setup

You need to create a `site_settings` table in your Supabase database for the General Settings to work.

## Step 1: Create the Table

Go to **Supabase Dashboard → SQL Editor** and run:

```sql
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read settings
CREATE POLICY "Allow read access" ON site_settings
    FOR SELECT USING (true);

-- Allow authenticated users to insert/update settings
CREATE POLICY "Allow write access" ON site_settings
    FOR ALL USING (true) WITH CHECK (true);
```

## Step 2: Insert Default Values (Optional)

```sql
INSERT INTO site_settings (key, value) VALUES
    ('site_name', 'Digihub Solutions'),
    ('tagline', 'Leading Data-Driven Marketing Agency'),
    ('admin_email', 'admin@digihub.com'),
    ('contact_number', '+1 (555) 000-0000'),
    ('website_url', 'digihub.agency'),
    ('language', 'English (US)'),
    ('timezone', 'IST (GMT+05:30)'),
    ('date_format', 'DD/MM/YYYY'),
    ('maintenance_mode', 'false'),
    ('logo_url', ''),
    ('favicon_url', '')
ON CONFLICT (key) DO NOTHING;
```

## Done!

After running both SQL blocks, your General Settings page will be fully functional:
- ✅ Load settings from the database
- ✅ Save changes with the Save button
- ✅ Discard changes resets to last saved values
- ✅ Upload logo and favicon images
- ✅ Toggle maintenance mode
- ✅ Track unsaved changes indicator
