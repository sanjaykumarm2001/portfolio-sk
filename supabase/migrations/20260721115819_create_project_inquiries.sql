/*
# Create project_inquiries table

1. New Tables
- `project_inquiries`
  - `id` (uuid, primary key)
  - `company_name` (text, not null) — company submitting the inquiry
  - `project_focus` (text) — selected focus area (Web Application, Infrastructure, Mobile Dev, Legacy Migration)
  - `message` (text) — additional details about their project
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `project_inquiries`.
- Allow anon + authenticated INSERT and SELECT (no sign-in required for contact form).
*/

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  project_focus text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_inquiries" ON project_inquiries;
CREATE POLICY "anon_select_inquiries" ON project_inquiries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_inquiries" ON project_inquiries;
CREATE POLICY "anon_insert_inquiries" ON project_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
