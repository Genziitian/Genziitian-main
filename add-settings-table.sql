-- ========================================================================
-- GENZ IITIAN DATABASE SCHEMA - ADD SETTINGS TABLE
-- Paste this block into the Supabase SQL Editor and click Run.
-- ========================================================================

-- Create settings table if not exists
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for settings table
-- 1. Anyone (public and authenticated) can select settings (required for home page popup video link check)
DROP POLICY IF EXISTS "settings_select" ON public.settings;
CREATE POLICY "settings_select" ON public.settings FOR SELECT USING (true);

-- 2. Only managers can insert, update, or delete settings
DROP POLICY IF EXISTS "settings_write_manager" ON public.settings;
CREATE POLICY "settings_write_manager" ON public.settings FOR ALL USING (public.is_manager()) WITH CHECK (public.is_manager());
