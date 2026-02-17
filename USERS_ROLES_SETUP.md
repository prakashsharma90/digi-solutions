# Users & Roles System - Database Setup

Go to **Supabase Dashboard → SQL Editor** and run the following SQL:

```sql
-- ============================================
-- 1. ROLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_name TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PERMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    permission_key TEXT NOT NULL UNIQUE,
    permission_name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT DEFAULT ''
);

-- ============================================
-- 3. ROLE-PERMISSIONS JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_role_permissions (
    role_id UUID REFERENCES admin_roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES admin_permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- ============================================
-- 4. ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role_id UUID REFERENCES admin_roles(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    avatar_url TEXT DEFAULT '',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. ENABLE RLS & POLICIES
-- ============================================
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors on re-run
DROP POLICY IF EXISTS "Allow all" ON admin_roles;
DROP POLICY IF EXISTS "Allow all" ON admin_permissions;
DROP POLICY IF EXISTS "Allow all" ON admin_role_permissions;
DROP POLICY IF EXISTS "Allow all" ON admin_users;
DROP POLICY IF EXISTS "Allow all" ON admin_activity_log;

-- Re-create open policies (admin-only access enforced at app level)
CREATE POLICY "Allow all" ON admin_roles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON admin_permissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON admin_role_permissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON admin_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON admin_activity_log FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 7. INSERT DEFAULT ROLES
-- ============================================
INSERT INTO admin_roles (role_name, description, is_system) VALUES
    ('Super Admin', 'Full unrestricted access to all features', true),
    ('Admin', 'Manage content, users and most settings', false),
    ('Editor', 'Create and edit content, blogs, and pages', false),
    ('SEO Manager', 'Manage SEO settings and analytics', false),
    ('Writer', 'Write and draft blog posts', false),
    ('Viewer', 'Read-only access to analytics and reports', false)
ON CONFLICT (role_name) DO NOTHING;

-- ============================================
-- 8. INSERT DEFAULT PERMISSIONS
-- ============================================
INSERT INTO admin_permissions (permission_key, permission_name, category, description) VALUES
    -- Content
    ('content.create', 'Create Content', 'Content', 'Create new blog posts and pages'),
    ('content.edit', 'Edit Content', 'Content', 'Edit existing blog posts and pages'),
    ('content.delete', 'Delete Content', 'Content', 'Delete blog posts and pages'),
    ('content.publish', 'Publish Content', 'Content', 'Publish or unpublish content'),
    -- Users
    ('users.view', 'View Users', 'Users', 'View user list and profiles'),
    ('users.create', 'Create Users', 'Users', 'Add new admin users'),
    ('users.edit', 'Edit Users', 'Users', 'Modify user details and roles'),
    ('users.delete', 'Delete Users', 'Users', 'Remove admin users'),
    -- Settings
    ('settings.general', 'General Settings', 'Settings', 'Modify general site settings'),
    ('settings.appearance', 'Appearance Settings', 'Settings', 'Change themes and design'),
    ('settings.seo', 'SEO Settings', 'Settings', 'Manage SEO configuration'),
    ('settings.security', 'Security Settings', 'Settings', 'Manage security and privacy'),
    -- Analytics
    ('analytics.view', 'View Analytics', 'Analytics', 'Access analytics dashboard'),
    ('analytics.export', 'Export Analytics', 'Analytics', 'Export analytics data'),
    -- System
    ('system.maintenance', 'Maintenance Mode', 'System', 'Toggle maintenance mode'),
    ('system.backup', 'System Backup', 'System', 'Create and manage backups')
ON CONFLICT (permission_key) DO NOTHING;

-- ============================================
-- 9. ASSIGN ALL PERMISSIONS TO SUPER ADMIN
-- ============================================
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.role_name = 'Super Admin'
ON CONFLICT DO NOTHING;

-- Assign content + users.view to Editor
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.role_name = 'Editor' AND p.permission_key IN ('content.create', 'content.edit', 'content.publish', 'users.view', 'analytics.view')
ON CONFLICT DO NOTHING;

-- Assign content.create + content.edit to Writer
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.role_name = 'Writer' AND p.permission_key IN ('content.create', 'content.edit', 'analytics.view')
ON CONFLICT DO NOTHING;

-- Assign SEO + analytics to SEO Manager
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.role_name = 'SEO Manager' AND p.permission_key IN ('settings.seo', 'analytics.view', 'analytics.export', 'content.edit')
ON CONFLICT DO NOTHING;

-- Assign analytics.view to Viewer
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.role_name = 'Viewer' AND p.permission_key IN ('analytics.view')
ON CONFLICT DO NOTHING;
```

## Done!
After running this SQL, the Users & Roles system is ready to use from the Settings page.
