ALTER TABLE services ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Draft';

ALTER TABLE services DROP CONSTRAINT IF EXISTS services_status_check;
ALTER TABLE services ADD CONSTRAINT services_status_check CHECK (status IN ('Draft', 'Published'));

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published services" ON services;
DROP POLICY IF EXISTS "Admin full access" ON services;

CREATE POLICY "Public read published services" ON services FOR SELECT USING (status = 'Published' AND is_deleted = false);
CREATE POLICY "Admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
