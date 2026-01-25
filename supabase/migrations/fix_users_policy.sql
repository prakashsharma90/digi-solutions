-- POLICY FIX: Grant permission to read public.users
-- This is required because your 'blogs' table policy likely checks 'public.users' to verify if you are an admin.
-- Without this policy, even admins cannot validly check their own role, resulting in "permission denied for table users".

-- 1. Enable RLS on users (good practice, if not already on)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Allow users to read their OWN data from public.users
-- This allows: auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin') to work.
CREATE POLICY "Users can read own data" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- 3. (Optional) Allow admins to read ALL users (useful for user management screens)
-- Note: This relies on the previous policy allowing the admin to read their *own* row to verify they are an admin.
CREATE POLICY "Admins can read all users" 
ON public.users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);
