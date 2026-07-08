-- ============================================================
-- EMPLOYEE LOGS AUDIT TABLE — track operations in Supabase
-- Paste into Supabase SQL Editor → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS public.employee_logs (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type    TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'VERIFY'
  actor_email    TEXT NOT NULL,
  employee_id    TEXT NOT NULL,
  employee_name  TEXT,
  details        TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS employee_logs_created_at_idx ON public.employee_logs (created_at DESC);

-- Enable RLS
ALTER TABLE public.employee_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view logs (for manager dashboard)
CREATE POLICY "Allow authenticated users to read logs" ON public.employee_logs 
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert logs (verifiers and managers)
CREATE POLICY "Allow authenticated users to insert logs" ON public.employee_logs 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
