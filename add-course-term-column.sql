-- Add term column to courses table
-- Allows managers to specify the term (Re-attempt, Foundation, DIPLOMA)

ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS "term" TEXT DEFAULT NULL;

-- Create an index for better query performance on the term column
CREATE INDEX IF NOT EXISTS idx_courses_term ON public.courses("term");
