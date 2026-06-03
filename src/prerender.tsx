// SSR entry used only at build time by seo/run-prerender.mjs.
// Renders the /iitm-bs/* pages to static HTML (no headless browser needed).
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import IitmBsPillar from './pages/iitm-bs/Pillar';
import LevelHub from './pages/iitm-bs/LevelHub';
import CoursePage from './pages/iitm-bs/CoursePage';
import ExamAssetPage from './pages/iitm-bs/ExamAssetPage';
import { LEVELS, COURSES, examsForCourse } from './data/iitmBs';
import { __ssrHead, type HeadData } from './components/seo/ssrHead';

export function getRoutes(): string[] {
  const routes = ['/iitm-bs'];
  LEVELS.forEach((l) => routes.push(`/iitm-bs/${l.slug}`));
  COURSES.forEach((c) => {
    routes.push(`/iitm-bs/${c.level}/${c.slug}`);
    examsForCourse(c).forEach((e) => routes.push(`/iitm-bs/${c.level}/${c.slug}/${e}`));
  });
  return routes;
}

export function renderPage(path: string): { body: string; head: HeadData | null } {
  __ssrHead.current = null;
  const body = renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/iitm-bs" element={<IitmBsPillar />} />
        <Route path="/iitm-bs/:level" element={<LevelHub />} />
        <Route path="/iitm-bs/:level/:course" element={<CoursePage />} />
        <Route path="/iitm-bs/:level/:course/:exam" element={<ExamAssetPage />} />
      </Routes>
    </MemoryRouter>,
  );
  return { body, head: __ssrHead.current };
}
