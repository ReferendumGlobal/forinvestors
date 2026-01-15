
-- SQL to update the schema for the new features

-- 1. Add new columns to contracts table if they don't exist
ALTER TABLE contracts 
ADD COLUMN IF NOT EXISTS criteria JSONB,
ADD COLUMN IF NOT EXISTS id_url TEXT,
ADD COLUMN IF NOT EXISTS contract_text TEXT;

-- 2. Create the storage bucket if it doesn't exist
-- Note: Creating buckets via SQL is tricky in Supabase, usually done via API or Dashboard.
-- But we can insert into storage.buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-documents', 'user-documents', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up RLS for storage (Allow users to upload their own files)
-- This assumes you have RLS enabled on storage.objects

-- Allow upload
CREATE POLICY "Users can upload their own ID documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Allow read (own files only)
CREATE POLICY "Users can view their own ID documents"
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text );

-- 4. Ensure sellers/agencies matching
-- If needed, we can create a trigger to auto-create a Property record from the seller data
-- But for now we just store it in the contract criteria.
