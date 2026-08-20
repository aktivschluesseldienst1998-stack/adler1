/*
# Create security_check_requests table

1. New Tables
- `security_check_requests`
  - `id` (uuid, primary key)
  - `door_type` (text – "Wohnungstür" oder "Haustür")
  - `photos` (jsonb – Array von {label, data_url} für die 4 hochgeladenen Fotos als Base64)
  - `first_name` (text – Name des Antragstellers)
  - `phone` (text – Telefonnummer)
  - `zip` (text – Postleitzahl)
  - `message` (text – optionale Nachricht, nullable)
  - `consent` (boolean – Einwilligung, default false)
  - `status` (text – Bearbeitungsstatus, default 'neu')
  - `created_at` (timestamptz – Einreichungszeit)
2. Security
- RLS aktiviert.
- INSERT für anon + authenticated erlaubt (Besucher können Anfragen absenden).
- SELECT / UPDATE / DELETE nur für authenticated (nur der eingeloggte Inhaber sieht Anfragen).
- Kein anon SELECT – Besucher können keine anderen Anfragen einsehen.
*/

CREATE TABLE IF NOT EXISTS security_check_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  door_type text NOT NULL,
  photos jsonb NOT NULL DEFAULT '[]'::jsonb,
  first_name text NOT NULL,
  phone text NOT NULL,
  zip text NOT NULL,
  message text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE security_check_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to INSERT new requests
DROP POLICY IF EXISTS "anon_insert_security_check" ON security_check_requests;
CREATE POLICY "anon_insert_security_check"
  ON security_check_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (business owner) can view requests
DROP POLICY IF EXISTS "auth_select_security_check" ON security_check_requests;
CREATE POLICY "auth_select_security_check"
  ON security_check_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update status
DROP POLICY IF EXISTS "auth_update_security_check" ON security_check_requests;
CREATE POLICY "auth_update_security_check"
  ON security_check_requests FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated users can delete requests
DROP POLICY IF EXISTS "auth_delete_security_check" ON security_check_requests;
CREATE POLICY "auth_delete_security_check"
  ON security_check_requests FOR DELETE
  TO authenticated
  USING (true);

-- Index for sorting by newest first
CREATE INDEX IF NOT EXISTS idx_security_check_created_at
  ON security_check_requests (created_at DESC);
