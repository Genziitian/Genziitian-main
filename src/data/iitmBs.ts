// IITM BS program tree — the static skeleton that drives the /iitm-bs/* SEO pages.
// Content (PYQ/GA papers) loads from Supabase at runtime; this defines the
// structure, routes and on-page SEO copy. Canonical domain: genziitian.in.

export const SITE = 'https://genziitian.in';
export const CURRENT_TERM = 'May 2026';
export const WHATSAPP = 'https://chat.whatsapp.com/Gi4D9yAd99p7q1XeVh0J1e';
export const DISCLAIMER =
  'GenZ IITian is a student initiative and is not officially affiliated with IIT Madras. Always cross-check dates and rules on the official IITM BS site.';

export type LevelSlug = 'qualifier' | 'foundation' | 'diploma' | 'degree';
export type ExamSlug = 'pyq' | 'quiz-1' | 'quiz-2' | 'end-term' | 'oppe' | 'graded-assignment';

export interface Level { slug: LevelSlug; name: string; tagline: string; }
export interface Course {
  slug: string; short: string; name: string; level: LevelSlug;
  hasOppe?: boolean; blurb: string; topics?: string[];
}

export const LEVELS: Level[] = [
  { slug: 'qualifier', name: 'Qualifier', tagline: 'The 4-week gateway into the IIT Madras BS degree.' },
  { slug: 'foundation', name: 'Foundation', tagline: 'Eight core courses — the base of the BS in Data Science.' },
  { slug: 'diploma', name: 'Diploma', tagline: 'Programming and Data Science specialisations.' },
  { slug: 'degree', name: 'BSc / BS Degree', tagline: 'Electives, AI, large-scale apps and the capstone.' },
];

export const COURSES: Course[] = [
  // Foundation (8)
  { slug: 'maths-1', short: 'Maths 1', name: 'Mathematics for Data Science I', level: 'foundation',
    blurb: 'Sets, functions, limits, derivatives, matrices and linear equations — the mathematical base of the program.',
    topics: ['Set theory & relations', 'Functions (injective/surjective)', 'Limits & continuity', 'Derivatives', 'Matrices & determinants', 'Systems of linear equations', 'Basic combinatorics'] },
  { slug: 'maths-2', short: 'Maths 2', name: 'Mathematics for Data Science II', level: 'foundation',
    blurb: 'Multivariable calculus, optimisation and the maths that powers machine learning.',
    topics: ['Vectors & matrices', 'Eigenvalues & eigenvectors', 'Multivariable functions', 'Gradients & optimisation', 'Integration'] },
  { slug: 'stats-1', short: 'Statistics 1', name: 'Statistics for Data Science I', level: 'foundation',
    blurb: 'Descriptive statistics, probability and distributions.',
    topics: ['Descriptive statistics', 'Probability', 'Random variables', 'Distributions', 'Expectation & variance'] },
  { slug: 'stats-2', short: 'Statistics 2', name: 'Statistics for Data Science II', level: 'foundation',
    blurb: 'Inferential statistics — estimation, hypothesis testing and regression.',
    topics: ['Sampling', 'Estimation', 'Hypothesis testing', 'Confidence intervals', 'Regression'] },
  { slug: 'ct', short: 'CT', name: 'Computational Thinking', level: 'foundation',
    blurb: 'Algorithmic thinking, pseudocode and problem decomposition.',
    topics: ['Pseudocode', 'Iteration & recursion', 'Searching & sorting', 'Algorithmic thinking', 'Flowcharts'] },
  { slug: 'english-1', short: 'English 1', name: 'English I', level: 'foundation',
    blurb: 'Grammar, vocabulary and reading comprehension fundamentals.',
    topics: ['Grammar', 'Vocabulary', 'Reading comprehension', 'Sentence structure'] },
  { slug: 'english-2', short: 'English 2', name: 'English II', level: 'foundation',
    blurb: 'Advanced comprehension, writing and communication.',
    topics: ['Advanced comprehension', 'Writing', 'Note-making', 'Communication'] },
  { slug: 'python', short: 'Python', name: 'Introduction to Python', level: 'foundation', hasOppe: true,
    blurb: 'Programming fundamentals in Python — the course with the all-important OPPE.',
    topics: ['Variables & types', 'Control flow', 'Functions', 'Lists & dictionaries', 'File handling', 'OOP basics'] },

  // Diploma (12)
  { slug: 'dbms', short: 'DBMS', name: 'Database Management Systems', level: 'diploma', blurb: 'Relational models, SQL, normalisation and transactions.' },
  { slug: 'pdsa', short: 'PDSA', name: 'Programming, Data Structures & Algorithms', level: 'diploma', hasOppe: true, blurb: 'Core data structures and algorithms in Python.' },
  { slug: 'java', short: 'Java', name: 'Programming Concepts using Java', level: 'diploma', hasOppe: true, blurb: 'Object-oriented programming with Java.' },
  { slug: 'system-commands', short: 'System Commands', name: 'System Commands', level: 'diploma', hasOppe: true, blurb: 'Shell, scripting and the command line.' },
  { slug: 'mad-1', short: 'MAD 1', name: 'Modern Application Development I', level: 'diploma', blurb: 'Web application development fundamentals.' },
  { slug: 'mad-2', short: 'MAD 2', name: 'Modern Application Development II', level: 'diploma', blurb: 'Advanced web app development and APIs.' },
  { slug: 'mlf', short: 'MLF', name: 'Machine Learning Foundations', level: 'diploma', blurb: 'The mathematical foundations of machine learning.' },
  { slug: 'mlt', short: 'MLT', name: 'Machine Learning Techniques', level: 'diploma', blurb: 'Supervised and unsupervised learning techniques.' },
  { slug: 'mlp', short: 'MLP', name: 'Machine Learning Practice', level: 'diploma', hasOppe: true, blurb: 'Applied ML with real datasets and pipelines.' },
  { slug: 'bdm', short: 'BDM', name: 'Business Data Management', level: 'diploma', blurb: 'Managing and analysing business data (with project).' },
  { slug: 'tds', short: 'TDS', name: 'Tools in Data Science', level: 'diploma', hasOppe: true, blurb: 'The practical toolkit of a data scientist.' },
  { slug: 'ba', short: 'Business Analytics', name: 'Business Analytics', level: 'diploma', blurb: 'Analytics for business decision-making.' },
];

export const EXAM_META: Record<ExamSlug, { label: string; title: string }> = {
  'pyq': { label: 'PYQ', title: 'Previous Year Questions (PYQ)' },
  'quiz-1': { label: 'Quiz 1', title: 'Quiz 1 PYQ & Important Questions' },
  'quiz-2': { label: 'Quiz 2', title: 'Quiz 2 PYQ & Important Questions' },
  'end-term': { label: 'End-Term', title: 'End-Term PYQ & Important Topics' },
  'oppe': { label: 'OPPE', title: 'OPPE PYQ & Preparation' },
  'graded-assignment': { label: 'Graded Assignments', title: 'Graded Assignment Answers (Week 1–12)' },
};

export const getLevel = (slug?: string) => LEVELS.find((l) => l.slug === slug);
export const getCourse = (level?: string, slug?: string) =>
  COURSES.find((c) => c.level === level && c.slug === slug);
export const coursesByLevel = (level: LevelSlug) => COURSES.filter((c) => c.level === level);

/** Exam-asset pages available for a course, in sibling order. */
export function examsForCourse(course: Course): ExamSlug[] {
  const base: ExamSlug[] = ['pyq', 'quiz-1', 'quiz-2', 'end-term'];
  if (course.hasOppe) base.push('oppe');
  base.push('graded-assignment');
  return base;
}

export const courseUrl = (c: Course) => `${SITE}/iitm-bs/${c.level}/${c.slug}/`;
export const examUrl = (c: Course, e: ExamSlug) => `${SITE}/iitm-bs/${c.level}/${c.slug}/${e}/`;

/** On-page SEO copy for an exam-asset page — mirrors Template A. */
export function examSeo(course: Course, exam: ExamSlug, term = CURRENT_TERM) {
  const m = EXAM_META[exam];
  const titleMap: Record<ExamSlug, string> = {
    'pyq': `${course.short} PYQ with Solutions | IITM BS | GenZ IITian`,
    'quiz-1': `${course.short} Quiz 1 PYQ & Important Questions | IITM BS`,
    'quiz-2': `${course.short} Quiz 2 PYQ & Important Questions | IITM BS`,
    'end-term': `${course.short} End-Term PYQ & Important Topics | IITM BS`,
    'oppe': `${course.short} OPPE PYQ & Preparation | IITM BS | GenZ IITian`,
    'graded-assignment': `${course.short} Graded Assignment Answers | IITM BS`,
  };
  const h1 = `${course.short} (${course.name}) — ${m.title}`;
  const description =
    exam === 'oppe'
      ? `Prepare for the ${course.short} OPPE — previous questions, environment, rules and step-by-step approach. Updated for ${term}. — GenZ IITian`
      : exam === 'graded-assignment'
      ? `${course.short} graded assignment answers for Week 1–12 with worked solutions. Updated for ${term}. — GenZ IITian`
      : `Practice ${course.short} ${m.label} PYQs with step-by-step solutions, exam pattern and most-repeated questions. Updated for ${term}. — GenZ IITian`;
  const intro =
    exam === 'oppe'
      ? `This is the IIT Madras BS ${course.name} (${course.short}) OPPE preparation hub — previous questions, the exam environment and rules, and a clear approach to crack it. Content is organised by term and refreshed every cycle (latest: ${term}).`
      : exam === 'graded-assignment'
      ? `Find ${course.short} (${course.name}) graded assignment answers for Week 1 to Week 12, with worked solutions and explanations. Pages are updated every term (latest: ${term}).`
      : `These are the IIT Madras BS ${course.name} (${course.short}) ${m.label} previous year questions, with worked solutions, the exam pattern and the topics that repeat most often. Papers are organised term-wise and updated every cycle (latest: ${term}).`;
  return { title: titleMap[exam], h1, description, intro, label: m.label, term };
}
