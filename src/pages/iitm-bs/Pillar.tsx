import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Seo from '../../components/seo/Seo';
import { SITE, CURRENT_TERM, LEVELS, coursesByLevel } from '../../data/iitmBs';
import { Breadcrumbs, Shell, Faq, FinalCta, Disclaimer, Updated, breadcrumbLd, faqLd, type Crumb } from './parts';

const FAQS = [
  { q: 'Is the IIT Madras BS degree valid and recognised?', a: 'Yes — it is a UGC-recognised online Bachelor’s degree in Data Science and Applications awarded by IIT Madras.' },
  { q: 'Is there an entrance exam?', a: 'No JEE-style entrance. You join through a 4-week Qualifier; clear it and you are in.' },
  { q: 'How long does the BS degree take?', a: 'It is credit-based and self-paced across Qualifier → Foundation → Diploma → Degree, typically 3–6 years depending on your pace.' },
  { q: 'Can I do it with a job or another degree?', a: 'Yes. The program is designed for working professionals and students pursuing another degree in parallel.' },
  { q: 'What is OPPE?', a: 'OPPE is the Online Proctored Programming Exam used in programming courses like Python, where you write and run code in a proctored environment.' },
];

export default function IitmBsPillar() {
  const crumbs: Crumb[] = [{ name: 'IITM BS Degree', path: '/iitm-bs', url: `${SITE}/iitm-bs/` }];
  const programLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'IIT Madras BS Degree in Data Science and Applications',
    provider: { '@type': 'CollegeOrUniversity', name: 'IIT Madras', sameAs: 'https://study.iitm.ac.in/ds/' },
    description: 'Online UGC-recognised BS degree in Data Science and Applications with Qualifier, Foundation, Diploma and Degree levels.',
    educationalProgramMode: 'online',
  };

  return (
    <Shell>
      <Seo
        title="IIT Madras BS Degree: Complete Guide (2026) | GenZ IITian"
        description={`Everything on the IIT Madras BS Degree in Data Science — eligibility, fees, syllabus, Qualifier, levels and exams (PYQs, OPPE, GA). Updated for ${CURRENT_TERM}.`}
        canonical={`${SITE}/iitm-bs/`}
        jsonLd={[programLd, breadcrumbLd(crumbs), faqLd(FAQS)]}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4">
        IIT Madras BS Degree — The Complete Guide for Data Science Students
      </h1>
      <Updated term={CURRENT_TERM} />
      <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8 max-w-3xl">
        The <strong>IIT Madras BS Degree</strong> is a UGC-recognised, fully online Bachelor’s in <strong>Data Science and Applications</strong>.
        Anyone who has passed Class 12 can join — there’s no entrance exam, only a 4-week <Link to="/iitm-bs/qualifier" className="text-blue-600 underline">Qualifier</Link>.
        You progress through four levels — Qualifier → Foundation → Diploma → BSc/BS Degree — earning credits at your own pace.
      </p>

      {/* Levels */}
      <h2 className="text-2xl font-black mb-4">The four levels</h2>
      <div className="space-y-4 mb-10">
        {LEVELS.map((lvl) => {
          const courses = coursesByLevel(lvl.slug);
          return (
            <div key={lvl.slug} className="border-[3px] border-[#0b1120] rounded-2xl p-5 shadow-[4px_4px_0px_#0b1120]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="text-xl font-black">{lvl.name}</h3>
                <Link to={`/iitm-bs/${lvl.slug}`} className="text-sm font-black text-blue-600 inline-flex items-center gap-1">Explore {lvl.name} <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <p className="text-gray-500 font-medium mt-1">{lvl.tagline}</p>
              {courses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {courses.slice(0, 8).map((c) => (
                    <Link key={c.slug} to={`/iitm-bs/${c.level}/${c.slug}`} className="px-3 py-1 bg-gray-50 border-2 border-[#0b1120] rounded-full text-xs font-black hover:bg-blue-50">{c.short}</Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exam machinery + tools */}
      <h2 className="text-2xl font-black mb-3">How exams work</h2>
      <p className="text-gray-600 font-medium leading-relaxed mb-4 max-w-3xl">
        Every course runs on the same rhythm: weekly <Link to="/iitm-bs/graded-assignment" className="text-blue-600 underline">Graded Assignments</Link>,
        two in-person <strong>Quizzes</strong>, an <strong>End-Term</strong>, and an <Link to="/iitm-bs/oppe" className="text-blue-600 underline">OPPE</Link> for programming courses.
        The fastest way to prepare is with <Link to="/iitm-bs/pyq" className="text-blue-600 underline">previous year questions (PYQs)</Link>.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <Link to="/iitm-bs/pyq" className="p-4 bg-blue-600 text-white border-[3px] border-[#0b1120] rounded-xl font-black text-center shadow-[4px_4px_0px_#0b1120] hover:-translate-y-1 transition-all">PYQ Hub</Link>
        <Link to="/iitm-bs/oppe" className="p-4 bg-white border-[3px] border-[#0b1120] rounded-xl font-black text-center shadow-[4px_4px_0px_#0b1120] hover:-translate-y-1 transition-all">OPPE Guide</Link>
        <Link to="/tools/cgpa-calculator" className="p-4 bg-white border-[3px] border-[#0b1120] rounded-xl font-black text-center shadow-[4px_4px_0px_#0b1120] hover:-translate-y-1 transition-all">CGPA Calculator</Link>
        <Link to="/iitm-bs/qualifier" className="p-4 bg-white border-[3px] border-[#0b1120] rounded-xl font-black text-center shadow-[4px_4px_0px_#0b1120] hover:-translate-y-1 transition-all">Qualifier Guide</Link>
      </div>

      <Faq faqs={FAQS} />
      <FinalCta />
      <Disclaimer />
    </Shell>
  );
}
