/*
# Create online appointment requests

1. New table
- `appointment_requests` stores appointment inquiries submitted through the public booking page.
- `service` stores the selected service.
- `door_type` stores the selected door type.
- `reason` stores the selected reason for the visit.
- `appointment_date` stores the requested calendar date.
- `time_slot` stores the requested two-hour time window.
- `first_name` and `last_name` store the customer's name.
- `phone` and `email` store contact details.
- `address` stores the service address.
- `consent` stores acceptance of the privacy policy.
- `status` stores the internal processing state.
- `created_at` stores the submission timestamp.

2. Security
- Row level security is enabled.
- Anonymous and authenticated visitors may submit appointment requests.
- Direct reads, updates, and deletes are denied from the public booking client to protect customer data.

3. Important notes
- This is a single-tenant public booking flow without sign-in.
- Appointment availability is presented as the business's configured availability and is not yet synchronized with an external calendar.
*/

CREATE TABLE IF NOT EXISTS appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  door_type text NOT NULL,
  reason text NOT NULL,
  appointment_date date NOT NULL,
  time_slot text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_appointment_requests" ON appointment_requests;
CREATE POLICY "public_insert_appointment_requests"
  ON appointment_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_appointment_requests" ON appointment_requests;
CREATE POLICY "public_select_appointment_requests"
  ON appointment_requests FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "public_update_appointment_requests" ON appointment_requests;
CREATE POLICY "public_update_appointment_requests"
  ON appointment_requests FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "public_delete_appointment_requests" ON appointment_requests;
CREATE POLICY "public_delete_appointment_requests"
  ON appointment_requests FOR DELETE
  TO anon, authenticated
  USING (false);

CREATE INDEX IF NOT EXISTS idx_appointment_requests_date
  ON appointment_requests (appointment_date, time_slot);
