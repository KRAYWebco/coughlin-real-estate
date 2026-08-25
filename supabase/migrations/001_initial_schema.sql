-- ============================================
-- Christine Coughlin Realty — Database Schema
-- ============================================

-- 1. LISTINGS TABLE
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial')),
  price NUMERIC NOT NULL,
  address TEXT NOT NULL,
  specs JSONB DEFAULT '{}'::jsonb,
  image_url TEXT NOT NULL,
  is_past_listing BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Featured', 'Sold')),
  description TEXT DEFAULT ''
);

-- 2. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'contacted'))
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings (property_type);
CREATE INDEX IF NOT EXISTS idx_listings_past ON listings (is_past_listing);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON contact_submissions (created_at DESC);

-- 4. ROW LEVEL SECURITY

-- Enable RLS on both tables
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- LISTINGS: Public read, authenticated write
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
DROP POLICY IF EXISTS "Listings can be inserted by authenticated users" ON listings;
DROP POLICY IF EXISTS "Listings can be updated by authenticated users" ON listings;
DROP POLICY IF EXISTS "Listings can be deleted by authenticated users" ON listings;

CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT
  USING (true);

CREATE POLICY "Listings can be inserted by authenticated users"
  ON listings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Listings can be updated by authenticated users"
  ON listings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Listings can be deleted by authenticated users"
  ON listings FOR DELETE
  USING (auth.role() = 'authenticated');

-- CONTACT SUBMISSIONS: Public insert (for form), authenticated read/write (admin)
DROP POLICY IF EXISTS "Anyone can submit a contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON contact_submissions;

CREATE POLICY "Anyone can submit a contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 5. REALTIME — Enable for contact_submissions (for live admin updates)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- WEBHOOK SETUP (run in Supabase Dashboard):
-- 1. Go to Database → Webhooks
-- 2. Create a new webhook:
--    - Name: send-lead-notification
--    - Table: contact_submissions
--    - Events: INSERT
--    - Type: HTTP Request
--    - Method: POST
--    - URL: https://<your-project-ref>.supabase.co/functions/v1/send-lead-notification
--    - Headers: Authorization: Bearer <your-anon-key>
-- 3. Set RESEND_API_KEY in Edge Function secrets:
--    supabase secrets set RESEND_API_KEY=re_your_key_here
-- ============================================
