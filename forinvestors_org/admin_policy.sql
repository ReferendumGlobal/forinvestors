-- SQL to Enable Admin Permissions
-- Run this in your Supabase Dashboard > SQL Editor

-- 1. Enable RLS on profiles if not already enabled (safety)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Allow Admins to View All Profiles
-- Drop existing potential conflicting policies if you want (optional, usually safe to add new ones)
-- DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' 
  OR 
  auth.uid() = id -- User can can see their own
);

-- 3. Allow Admins to Update User Status (Approve/Reject)
CREATE POLICY "Admins can update profiles"
ON profiles FOR UPDATE
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
)
WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- 4. Allow Admins to Insert/Delete (Optional but good for full control)
CREATE POLICY "Admins can delete profiles"
ON profiles FOR DELETE
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
