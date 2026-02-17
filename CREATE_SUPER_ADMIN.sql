-- ============================================
-- CREATE INITIAL SUPER ADMIN USER
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the user in Supabase Auth (if not exists)
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admindigihub@admin.com',
    crypt('admindigihub@admin.com', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Prakash","role":"Super Admin"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (email) DO NOTHING;

-- 2. Link to admin_users table with Super Admin role
INSERT INTO public.admin_users (id, name, email, role_id, status)
SELECT 
    id, 
    'Prakash', 
    'admindigihub@admin.com', 
    (SELECT id FROM public.admin_roles WHERE role_name = 'Super Admin'),
    'active'
FROM auth.users 
WHERE email = 'admindigihub@admin.com'
ON CONFLICT (email) DO UPDATE SET 
    role_id = (SELECT id FROM public.admin_roles WHERE role_name = 'Super Admin'),
    status = 'active';

-- 3. Verify
SELECT * FROM public.admin_users WHERE email = 'admindigihub@admin.com';
