-- Enable RLS on contracts table
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own contracts
CREATE POLICY "Users can create their own contracts"
ON contracts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own contracts
CREATE POLICY "Users can view their own contracts"
ON contracts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow admins to view all contracts
CREATE POLICY "Admins can view all contracts"
ON contracts FOR SELECT
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
