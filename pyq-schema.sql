-- ============================================================
-- PYQ PAPERS — content for the /iitm-bs/* exam-asset pages.
-- Paste into Supabase SQL Editor → Run. (Mirrors the courses/blogs RLS.)
-- "Refresh, don't replace": append a new row per term; never delete URLs.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.pyq_papers (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  level        TEXT NOT NULL,                 -- qualifier | foundation | diploma | degree
  course       TEXT NOT NULL,                 -- slug, e.g. maths-1, python, pdsa
  exam         TEXT NOT NULL,                 -- pyq | quiz-1 | quiz-2 | end-term | oppe | graded-assignment
  term         TEXT NOT NULL,                 -- display term, e.g. "May 2026"
  title        TEXT NOT NULL,                 -- e.g. "Maths 1 End-Term — May 2026"
  paper_url    TEXT,                          -- link to the question paper
  solution_url TEXT,                          -- link to worked solutions
  video_url    TEXT,                          -- YouTube solution (own channel)
  week         INTEGER,                       -- for graded-assignment (1..12), else NULL
  verified     INTEGER NOT NULL DEFAULT 0,    -- 1 = verified by team, 0 = community
  sort         INTEGER NOT NULL DEFAULT 0,    -- manual ordering within a term
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pyq_lookup_idx ON public.pyq_papers (level, course, exam);

ALTER TABLE public.pyq_papers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pyq_select" ON public.pyq_papers;
CREATE POLICY "pyq_select" ON public.pyq_papers FOR SELECT USING (true);

DROP POLICY IF EXISTS "pyq_insert_manager" ON public.pyq_papers;
CREATE POLICY "pyq_insert_manager" ON public.pyq_papers FOR INSERT WITH CHECK (public.is_manager());

DROP POLICY IF EXISTS "pyq_update_manager" ON public.pyq_papers;
CREATE POLICY "pyq_update_manager" ON public.pyq_papers FOR UPDATE USING (public.is_manager());

DROP POLICY IF EXISTS "pyq_delete_manager" ON public.pyq_papers;
CREATE POLICY "pyq_delete_manager" ON public.pyq_papers FOR DELETE USING (public.is_manager());

DROP POLICY IF EXISTS "pyq_all_service" ON public.pyq_papers;
CREATE POLICY "pyq_all_service" ON public.pyq_papers FOR ALL USING (true) WITH CHECK (true);
