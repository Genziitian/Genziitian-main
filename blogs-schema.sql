-- ============================================================
-- BLOGS TABLE — connect blog posts to Supabase + Manager panel
-- Paste into Supabase SQL Editor → Run
-- (Resources / Notes stay on the server admin; this is blogs only.)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blogs (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category        TEXT DEFAULT 'General',
  content         TEXT DEFAULT '',
  image           TEXT DEFAULT '',
  date            TEXT,                       -- human display date, e.g. "May 15, 2026"
  read_time       TEXT DEFAULT '5 min read',
  published       INTEGER NOT NULL DEFAULT 1, -- 1 = published, 0 = draft
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON public.blogs (published);

-- Keep updated_at fresh on every change
CREATE OR REPLACE FUNCTION public.touch_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blogs_set_updated_at ON public.blogs;
CREATE TRIGGER blogs_set_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.touch_blogs_updated_at();

-- ===== RLS (mirrors the courses table) =====
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public can read every blog (the public site filters to published client-side;
-- managers need to see drafts in the panel).
DROP POLICY IF EXISTS "blogs_select" ON public.blogs;
CREATE POLICY "blogs_select" ON public.blogs FOR SELECT USING (true);

DROP POLICY IF EXISTS "blogs_insert_manager" ON public.blogs;
CREATE POLICY "blogs_insert_manager" ON public.blogs FOR INSERT WITH CHECK (public.is_manager());

DROP POLICY IF EXISTS "blogs_update_manager" ON public.blogs;
CREATE POLICY "blogs_update_manager" ON public.blogs FOR UPDATE USING (public.is_manager());

DROP POLICY IF EXISTS "blogs_delete_manager" ON public.blogs;
CREATE POLICY "blogs_delete_manager" ON public.blogs FOR DELETE USING (public.is_manager());

-- Service role (server / migrations) full access
DROP POLICY IF EXISTS "blogs_all_service" ON public.blogs;
CREATE POLICY "blogs_all_service" ON public.blogs FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Optional: seed the existing static post so the table isn't empty.
-- Safe to run repeatedly (ON CONFLICT keeps the latest content).
-- ============================================================
INSERT INTO public.blogs (title, slug, category, image, date, read_time, published, seo_title, seo_description, seo_keywords, content)
VALUES (
  'IIT Madras BS Degree 2025 Batch Summary Shocked Everyone',
  'iit-madras-bs-degree-2025-batch-summary-shocked-everyone',
  'IIT Madras BS Degree',
  '/Image/iit-madras-bs-degree-2025-batch-summary.png',
  'May 15, 2026',
  '7 min read',
  1,
  'IIT Madras BS Degree 2025 Batch Summary Shocked Everyone | Placement, Salary, PG Report',
  'Detailed Medium-style summary of the IIT Madras BS Degree 2025 batch report: 545 students, career outcomes, salary brackets, PG destinations, CGPA data, and impact stories.',
  'IIT Madras BS Degree 2025 Batch Summary, IITM BS placement report, IIT Madras BS salary, IIT Madras Data Science batch 2025, IITM BS degree outcomes',
  '<p>The IIT Madras BS Degree 2025 Batch Summary is more than a normal placement-style update. Edit this post from the Manager → Blogs panel.</p>'
)
ON CONFLICT (slug) DO NOTHING;
