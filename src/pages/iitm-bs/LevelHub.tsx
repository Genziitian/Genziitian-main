import { useParams, Link } from 'react-router-dom';
import Seo from '../../components/seo/Seo';
import { SITE, CURRENT_TERM, getLevel, coursesByLevel, type LevelSlug } from '../../data/iitmBs';
import { Breadcrumbs, Shell, LinkCard, FinalCta, Disclaimer, breadcrumbLd, type Crumb } from './parts';

export default function LevelHub() {
  const { level } = useParams<{ level: string }>();
  const lvl = getLevel(level);

  if (!lvl) {
    return (
      <Shell>
        <h1 className="text-2xl font-black mb-3">Page not found</h1>
        <Link to="/iitm-bs" className="text-blue-600 font-bold underline">← Back to the IITM BS guide</Link>
      </Shell>
    );
  }

  const courses = coursesByLevel(lvl.slug as LevelSlug);
  const crumbs: Crumb[] = [
    { name: 'IITM BS Degree', path: '/iitm-bs', url: `${SITE}/iitm-bs/` },
    { name: lvl.name, path: `/iitm-bs/${lvl.slug}`, url: `${SITE}/iitm-bs/${lvl.slug}/` },
  ];

  return (
    <Shell>
      <Seo
        title={`IITM BS ${lvl.name} — Courses, PYQs & Notes | GenZ IITian`}
        description={`${lvl.name} level of the IIT Madras BS degree — all courses with PYQs, OPPE, quizzes and graded assignment answers. Updated for ${CURRENT_TERM}.`}
        canonical={`${SITE}/iitm-bs/${lvl.slug}/`}
        jsonLd={breadcrumbLd(crumbs)}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">IITM BS {lvl.name}</h1>
      <p className="text-lg text-gray-600 font-medium mb-8 max-w-2xl">{lvl.tagline}</p>

      {courses.length > 0 ? (
        <>
          <h2 className="text-2xl font-black mb-4">{lvl.name} courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((c) => (
              <LinkCard key={c.slug} to={`/iitm-bs/${c.level}/${c.slug}`} title={`${c.short} — ${c.name}`} sub="PYQs · OPPE · GA · notes" />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 font-medium">Course pages for this level are coming soon.</p>
      )}

      <FinalCta />
      <Disclaimer />
    </Shell>
  );
}
