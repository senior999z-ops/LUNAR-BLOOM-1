/*
# Create newsletter_subscribers table

1. New Tables
- `newsletter_subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `newsletter_subscribers`.
- Allow anon + authenticated to INSERT (newsletter signup form is public).
- Allow authenticated to SELECT their own subscription by email.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_subscriber" ON newsletter_subscribers;
CREATE POLICY "anon_insert_subscriber" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_own_subscription" ON newsletter_subscribers;
CREATE POLICY "auth_select_own_subscription" ON newsletter_subscribers FOR SELECT
  TO authenticated USING (email = (auth.jwt() ->> 'email'));
