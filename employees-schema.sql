-- ============================================================
-- EMPLOYEES TABLE — connect employee verification to Supabase
-- Paste into Supabase SQL Editor → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS public.employees (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  full_name   TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  department  TEXT NOT NULL,
  role        TEXT NOT NULL,
  tenure      TEXT NOT NULL,
  status      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS employees_employee_id_idx ON public.employees (employee_id);

-- Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON public.employees;
DROP POLICY IF EXISTS "Allow all access to authenticated users" ON public.employees;

-- Allow public read access (for verification portal)
CREATE POLICY "Allow public read access" ON public.employees 
    FOR SELECT USING (true);

-- Allow full access to authenticated managers
CREATE POLICY "Allow all access to authenticated users" ON public.employees 
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- IF THE TABLE ALREADY EXISTS FROM A PREVIOUS VERSION:
-- Run this block instead to add the new email & phone columns:
-- ============================================================
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS phone TEXT;
