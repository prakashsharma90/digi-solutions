-- FIX: Drop the policy that causes "permission denied" by trying to access auth.users directly.
-- Accessing auth.users from an RLS policy is restricted and causes errors.
-- We will switch to a simpler policy that allows any authenticated user to manage blogs.

-- 1. Drop the problematic policy
DROP POLICY IF EXISTS "Admins can do everything" ON blogs;

-- 2. Ensure the simpler policy exists (if it wasn't already created)
-- We use DO block to avoid error if it already exists, or just try creating it.
-- Simpler: Drop it if exists and recreate to be sure.
DROP POLICY IF EXISTS "Auth users can manage blogs" ON blogs;

CREATE POLICY "Auth users can manage blogs"
ON blogs
FOR ALL
USING (auth.role() = 'authenticated');
