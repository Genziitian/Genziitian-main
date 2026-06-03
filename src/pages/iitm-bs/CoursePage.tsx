import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Seo from '../../components/seo/Seo';
import { SITE, CURRENT_TERM, getLevel, getCourse, examsForCourse, EXAM_META } from '../../data/iitmBs';
import { Breadcrumbs, Shell, FinalCta, Disclaimer, breadcrumbLd, courseLd, type Crumb } from './parts';

export default function CoursePage() {
  const { level, course } = useParams<{ level: string; course: string }>();
  const lvl = getLevel(level);
  const c = getCourse(level, course);

  if (!lvl || !c) {
    return (
      <Shell>
        <h1 className="text-2xl font-black mb-3">Page not found</h1>
        <Link to="/iitm-bs" className="text-blue-600 font-bold underline">← Back to the IITM BS guide</Link>
      </Shell>
    );
  }

  const exams = examsForCourse(c);
  const crumbs: Crumb[] = [
    { name: 'IITM BS Degree', path: '/iitm-bs', url: `${SITE}/iitm-bs/` },
    { name: lvl.name, path: `/iitm-bs/${lvl.slug}`, url: `${SITE}/iitm-bs/${lvl.slug}/` },
    { name: c.short, path: `/iitm-bs/${c.level}/${c.slug}`, url: `${SITE}/iitm-bs/${c.level}/${c.slug}/` },
  ];

  return (
    <Shell>
      <Seo
        title={`${c.short} (${c.name}) — PYQs, OPPE & Notes | IITM BS`}
        description={`IITM BS ${c.name} (${c.short}) — syllabus, important topics, PYQs, ${c.hasOppe ? 'OPPE, ' : ''}quiz and graded assignment help. Updated for ${CURRENT_TERM}.`}
        canonical={`${SITE}/iitm-bs/${c.level}/${c.slug}/`}
        jsonLd={[courseLd(c.name), breadcrumbLd(crumbs)]}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{c.short} — {c.name}</h1>
      <p className="text-lg text-gray-600 font-medium mb-8 max-w-2xl">{c.blurb}</p>

      <h2 className="text-2xl font-black mb-4">Exam resources for {c.short}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {exams.map((e) => (
          <Link key={e} to={`/iitm-bs/${c.level}/${c.slug}/${e}`} className="flex items-center justify-between p-4 bg-white border-[3px] border-[#0b1120] rounded-xl shadow-[3px_3px_0px_#0b1120] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#0b1120] transition-all group">
            <span className="font-black group-hover:text-[#10b981] transition-colors">{c.short} {EXAM_META[e].label}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        ))}
      </div>

      {c.topics && c.topics.length > 0 && (
        <>
          <h2 className="text-2xl font-black mb-4">Important topics in {c.short}</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {c.topics.map((t) => (
              <span key={t} className="px-3 py-1.5 bg-gray-50 border-2 border-[#0b1120] rounded-full text-sm font-bold">{t}</span>
            ))}
          </div>
        </>
      )}

      <FinalCta label={`Enrol in the ${c.short} batch`} />
      <Disclaimer />
    </Shell>
  );
}
