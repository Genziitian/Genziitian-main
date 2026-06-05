import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Seo from '../../components/seo/Seo';
import {
  SITE, getLevel, getCourse, examsForCourse, examSeo, EXAM_META, type ExamSlug,
} from '../../data/iitmBs';
import { Breadcrumbs, Shell, Faq, FinalCta, Disclaimer, Updated, breadcrumbLd, courseLd, faqLd, type Crumb } from './parts';
import PyqPapers from './PyqPapers';

const EXAM_SLUGS: ExamSlug[] = ['pyq', 'quiz-1', 'quiz-2', 'end-term', 'oppe', 'graded-assignment'];

export default function ExamAssetPage() {
  const { level, course, exam } = useParams<{ level: string; course: string; exam: string }>();
  const lvl = getLevel(level);
  const c = getCourse(level, course);
  const validExam = EXAM_SLUGS.includes(exam as ExamSlug) ? (exam as ExamSlug) : undefined;
  const available = c ? examsForCourse(c) : [];

  if (!lvl || !c || !validExam || !available.includes(validExam)) {
    return (
      <Shell>
        <h1 className="text-2xl font-black mb-3">Page not found</h1>
        <Link to="/iitm-bs" className="text-blue-600 font-bold underline">← Back to the IITM BS guide</Link>
      </Shell>
    );
  }

  const seo = examSeo(c, validExam);
  const m = EXAM_META[validExam];
  const siblings = available.filter((e) => e !== validExam);
  const crumbs: Crumb[] = [
    { name: 'IITM BS Degree', path: '/iitm-bs', url: `${SITE}/iitm-bs/` },
    { name: lvl.name, path: `/iitm-bs/${lvl.slug}`, url: `${SITE}/iitm-bs/${lvl.slug}/` },
    { name: c.short, path: `/iitm-bs/${c.level}/${c.slug}`, url: `${SITE}/iitm-bs/${c.level}/${c.slug}/` },
    { name: m.label, path: `/iitm-bs/${c.level}/${c.slug}/${validExam}`, url: `${SITE}/iitm-bs/${c.level}/${c.slug}/${validExam}/` },
  ];

  const faqs = [
    { q: `Is ${c.short} hard in IITM BS?`, a: `${c.short} is very manageable with consistent practice. Use these ${m.label} papers and the weekly graded assignments to build speed and accuracy.` },
    { q: `Are these ${c.short} ${m.label} with solutions?`, a: `Yes — questions come with worked, step-by-step solutions. Verified solutions are checked by our team; community solutions are clearly labelled.` },
    { q: `How should I use these ${c.short} ${m.label} papers?`, a: `Start with the most recent term, attempt under timed conditions, then review solutions and revisit weak topics.` },
    ...(validExam === 'oppe' ? [{ q: `What is the ${c.short} OPPE environment like?`, a: `The OPPE is an online proctored programming exam — you write and run code in a restricted environment within a time limit. Practise in similar conditions.` }] : []),
  ];

  return (
    <Shell>
      <Seo title={seo.title} description={seo.description} canonical={`${SITE}/iitm-bs/${c.level}/${c.slug}/${validExam}/`} jsonLd={[courseLd(c.name), breadcrumbLd(crumbs), faqLd(faqs)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3">{seo.h1}</h1>
      <Updated term={seo.term} />
      <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8 max-w-3xl">{seo.intro}</p>

      {/* Exam pattern */}
      {validExam !== 'graded-assignment' && (
        <div className="border-[3px] border-[#0b1120] rounded-2xl p-5 shadow-[4px_4px_0px_#0b1120] mb-10">
          <h2 className="text-xl font-black mb-3">{c.short} {m.label} — exam pattern</h2>
          <ul className="space-y-1.5 text-gray-600 font-medium">
            <li>• Format: {validExam === 'oppe' ? 'Online proctored programming exam (write & run code)' : 'In-person; MCQ / MSQ / numeric answer types'}</li>
            <li>• Coverage: {validExam === 'quiz-1' ? 'roughly Weeks 1–4' : validExam === 'quiz-2' ? 'roughly up to Week 8' : validExam === 'end-term' ? 'the full syllabus' : 'syllabus per the official handout'}</li>
            <li>• Weightage &amp; duration: verify on the official course page each term.</li>
          </ul>
        </div>
      )}

      {/* PYQ / content area — hydrates from Supabase in the next increment */}
      <h2 className="text-2xl font-black mb-3">
        {validExam === 'graded-assignment' ? `${c.short} graded assignment answers (Week 1–12)` : `${c.short} ${m.label} — term-wise papers`}
      </h2>
      <PyqPapers level={c.level} course={c.slug} exam={validExam} courseShort={c.short} />

      {/* Most-repeated topics */}
      {c.topics && validExam !== 'graded-assignment' && (
        <>
          <h2 className="text-2xl font-black mb-3">Most-repeated topics in {c.short}</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {c.topics.map((t) => <span key={t} className="px-3 py-1.5 bg-gray-50 border-2 border-[#0b1120] rounded-full text-sm font-bold">{t}</span>)}
          </div>
        </>
      )}

      {/* Sibling exams + up link */}
      <h2 className="text-2xl font-black mb-4">More {c.short} resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <Link to={`/iitm-bs/${c.level}/${c.slug}`} className="flex items-center justify-between p-4 bg-blue-600 text-white border-[3px] border-[#0b1120] rounded-xl font-black shadow-[3px_3px_0px_#0b1120] hover:-translate-y-1 transition-all">
          {c.short} course page <ChevronRight className="w-4 h-4" />
        </Link>
        {siblings.map((e) => (
          <Link key={e} to={`/iitm-bs/${c.level}/${c.slug}/${e}`} className="flex items-center justify-between p-4 bg-white border-[3px] border-[#0b1120] rounded-xl font-black shadow-[3px_3px_0px_#0b1120] hover:-translate-y-1 transition-all group">
            <span className="group-hover:text-[#10b981] transition-colors">{c.short} {EXAM_META[e].label}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        ))}
      </div>

      <Faq faqs={faqs} />
      <FinalCta label={`Enrol in the ${c.short} batch`} />
      <Disclaimer />
    </Shell>
  );
}
