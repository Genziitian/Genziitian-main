// Generates seo/keyword-master-sheet.csv — the GenZ IITian keyword universe.
// Canonical domain: genziitian.in. URL architecture mirrors the program tree.
// Run: node seo/generate-keyword-sheet.mjs
import { writeFileSync } from 'node:fs';

const BASE = 'https://genziitian.in';
const rows = [];
const add = (keyword, cluster, intent, url, pageType, pri, term, confirm, notes = '') =>
  rows.push({ keyword, cluster, intent, target_url: url, page_type: pageType, priority: pri, target_term: term, volume_to_confirm: confirm, notes });

const EVERGREEN = 'Evergreen — append papers each term';

// Foundation courses (slug, display short, full name, has OPPE)
const FOUNDATION = [
  ['maths-1', 'Maths 1', 'Mathematics for Data Science I', false],
  ['maths-2', 'Maths 2', 'Mathematics for Data Science II', false],
  ['stats-1', 'Statistics 1', 'Statistics for Data Science I', false],
  ['stats-2', 'Statistics 2', 'Statistics for Data Science II', false],
  ['ct', 'CT', 'Computational Thinking', false],
  ['english-1', 'English 1', 'English I', false],
  ['english-2', 'English 2', 'English II', false],
  ['python', 'Python', 'Introduction to Python', true],
];

// Diploma courses (slug, short, full, hasOPPE)
const DIPLOMA = [
  ['dbms', 'DBMS', 'Database Management Systems', false],
  ['pdsa', 'PDSA', 'Programming, Data Structures & Algorithms', true],
  ['java', 'Java', 'Programming Concepts using Java', true],
  ['system-commands', 'System Commands', 'System Commands', true],
  ['mad-1', 'MAD 1', 'Modern Application Development I', false],
  ['mad-2', 'MAD 2', 'Modern Application Development II', false],
  ['mlf', 'MLF', 'Machine Learning Foundations', false],
  ['mlt', 'MLT', 'Machine Learning Techniques', false],
  ['mlp', 'MLP', 'Machine Learning Practice', true],
  ['bdm', 'BDM', 'Business Data Management', false],
  ['tds', 'TDS', 'Tools in Data Science', true],
  ['ba', 'Business Analytics', 'Business Analytics', false],
];

const EXAMS = [
  ['pyq', 'PYQ', 'pyq'],
  ['quiz-1', 'Quiz 1', 'quiz 1'],
  ['quiz-2', 'Quiz 2', 'quiz 2'],
  ['end-term', 'End Term', 'end term'],
];

// ---- Cluster A — Brand & Program ----
add('iit madras bs degree', 'A — Brand & Program', 'Informational/Nav', `${BASE}/iitm-bs/`, 'Master pillar', 'P1', EVERGREEN, 'Yes', 'Head term');
add('iitm bs data science', 'A — Brand & Program', 'Informational/Nav', `${BASE}/iitm-bs/`, 'Master pillar', 'P1', EVERGREEN, 'Yes', '');
add('iit madras online degree', 'A — Brand & Program', 'Informational/Nav', `${BASE}/iitm-bs/`, 'Master pillar', 'P1', EVERGREEN, 'Yes', '');
add('iitm bs degree fees', 'A — Brand & Program', 'Decision', `${BASE}/iitm-bs/fees/`, 'Pillar sub-section + blog', 'P1', EVERGREEN, 'Yes', '');
add('iitm bs degree eligibility', 'A — Brand & Program', 'Decision', `${BASE}/iitm-bs/eligibility/`, 'Pillar sub-section', 'P1', EVERGREEN, 'Yes', '');
add('iitm bs degree syllabus', 'A — Brand & Program', 'Informational', `${BASE}/iitm-bs/syllabus/`, 'Pillar sub-section', 'P1', EVERGREEN, 'Yes', '');
add('iitm bs admission', 'A — Brand & Program', 'Decision', `${BASE}/iitm-bs/admission/`, 'Process page', 'P1', 'Per intake (Jan/May/Sep)', 'Yes', 'Update each cycle');
add('iitm bs vs bsc', 'A — Brand & Program', 'Consideration', `${BASE}/blog/iitm-bs-vs-bsc/`, 'Comparison blog', 'P2', EVERGREEN, 'Maybe', '');
add('is iitm bs degree worth it', 'A — Brand & Program', 'Consideration', `${BASE}/blog/is-iitm-bs-degree-worth-it/`, 'Opinion blog', 'P2', EVERGREEN, 'Yes', '');
add('iitm bs degree placements', 'A — Brand & Program', 'Consideration', `${BASE}/blog/iitm-bs-placements/`, 'Outcomes blog', 'P2', EVERGREEN, 'Yes', '');
add('iit madras bs electronic systems', 'A — Brand & Program', 'Informational', `${BASE}/iitm-bs/electronic-systems/`, 'Program-variant pillar', 'P2', EVERGREEN, 'Maybe', 'Phase 4');
add('bs management and data science iit madras', 'A — Brand & Program', 'Informational', `${BASE}/iitm-bs/management-data-science/`, 'Program-variant pillar', 'P2', EVERGREEN, 'Maybe', 'Phase 4');
add('genz iitian', 'A — Brand & Program', 'Navigational', `${BASE}/`, 'Homepage', 'P1', EVERGREEN, 'No', 'Own brand — own SERP');
add('iit pathshala', 'A — Brand & Program', 'Navigational', `${BASE}/`, 'Homepage', 'P1', EVERGREEN, 'No', '301 from iitpathshala.in');

// ---- Cluster B — PYQs ----
add('iitm bs pyq', 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/pyq/`, 'PYQ hub', 'P1', EVERGREEN, 'Yes', 'Flagship head term');
add('iit madras bs degree previous year questions', 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/pyq/`, 'PYQ hub', 'P1', EVERGREEN, 'Yes', '');
add('qualifier pyq', 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/qualifier/pyq/`, 'Qualifier PYQ page', 'P1', EVERGREEN, 'Yes', '');
add('qualifier previous year question paper iitm bs', 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/qualifier/pyq/`, 'Qualifier PYQ page', 'P1', EVERGREEN, 'Yes', '');

const pyqRows = (course, level, basePri) => {
  const [slug, short] = course;
  add(`${short.toLowerCase()} pyq`, 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/pyq/`, 'Course PYQ page', basePri, EVERGREEN, 'Yes', '');
  add(`${short.toLowerCase()} pyq iitm`, 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/pyq/`, 'Course PYQ page', basePri, EVERGREEN, 'Maybe', '');
  add(`${short.toLowerCase()} previous year questions`, 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/pyq/`, 'Course PYQ page', basePri, EVERGREEN, 'Maybe', '');
  EXAMS.slice(1).forEach(([eslug, , ekw]) => {
    add(`${short.toLowerCase()} ${ekw} pyq`, 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/${eslug}/`, 'Exam-type PYQ page', basePri === 'P1' ? 'P2' : 'P2', EVERGREEN, 'Maybe', '');
  });
  add(`${short.toLowerCase()} pyq with solutions`, 'B — PYQs', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/pyq/`, 'Course PYQ page (long-tail)', 'P3', EVERGREEN, 'No', 'Programmatic long-tail');
};
FOUNDATION.forEach(c => pyqRows(c, 'foundation', 'P1'));
DIPLOMA.forEach(c => pyqRows(c, 'diploma', 'P2'));

// ---- Cluster C — OPPE ----
add('iitm oppe', 'C — OPPE', 'Informational', `${BASE}/iitm-bs/oppe/`, 'OPPE explainer pillar', 'P1', EVERGREEN, 'Yes', '');
add('what is oppe', 'C — OPPE', 'Informational', `${BASE}/iitm-bs/oppe/`, 'OPPE explainer pillar', 'P1', EVERGREEN, 'Yes', '');
add('oppe full form iit madras', 'C — OPPE', 'Informational', `${BASE}/iitm-bs/oppe/`, 'OPPE explainer pillar', 'P1', EVERGREEN, 'Yes', '');
add('how to prepare for oppe', 'C — OPPE', 'Informational', `${BASE}/blog/how-to-prepare-for-oppe/`, 'How-to blog', 'P2', EVERGREEN, 'Yes', '');
add('oppe rules', 'C — OPPE', 'Informational', `${BASE}/blog/oppe-rules-environment/`, 'How-to blog', 'P2', EVERGREEN, 'Maybe', '');
const oppeCourses = [...FOUNDATION, ...DIPLOMA].filter(c => c[3]);
oppeCourses.forEach(([slug, short], idx) => {
  const level = FOUNDATION.some(f => f[0] === slug) ? 'foundation' : 'diploma';
  const pri = slug === 'python' ? 'P1' : 'P2';
  add(`${short.toLowerCase()} oppe`, 'C — OPPE', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/oppe/`, 'Course OPPE page', pri, EVERGREEN, 'Yes', idx === 0 ? 'Highest OPPE volume' : '');
  add(`${short.toLowerCase()} oppe pyq`, 'C — OPPE', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/oppe/`, 'Course OPPE page', pri, EVERGREEN, 'Maybe', '');
  add(`${short.toLowerCase()} oppe preparation`, 'C — OPPE', 'Transactional', `${BASE}/iitm-bs/${level}/${slug}/oppe/`, 'Course OPPE page', pri, EVERGREEN, 'Maybe', '');
});

// ---- Cluster D — Graded Assignments & Quizzes ----
add('iitm bs graded assignment solutions', 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/graded-assignment/`, 'GA hub', 'P2', EVERGREEN, 'Yes', '');
add('iitm bs ga answers', 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/graded-assignment/`, 'GA hub', 'P2', EVERGREEN, 'Maybe', '');
FOUNDATION.forEach(([slug, short]) => {
  for (let w = 1; w <= 12; w++) {
    add(`${short.toLowerCase()} graded assignment week ${w} answers`, 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/foundation/${slug}/graded-assignment/week-${w}/`, 'Programmatic GA week page', 'P1', `Week ${w} of term — lead by 1 wk`, 'No', 'Weekly recurring');
  }
  add(`${short.toLowerCase()} quiz 1 important questions`, 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/foundation/${slug}/quiz-1/`, 'Quiz prep page', 'P2', 'Quiz 1 window (~wk4-5)', 'Maybe', '');
  add(`${short.toLowerCase()} quiz 2 important questions`, 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/foundation/${slug}/quiz-2/`, 'Quiz prep page', 'P2', 'Quiz 2 window (~wk8-9)', 'Maybe', '');
});
DIPLOMA.forEach(([slug, short]) => {
  add(`${short.toLowerCase()} graded assignment week {n} answers`, 'D — GA & Quizzes', 'Transactional', `${BASE}/iitm-bs/diploma/${slug}/graded-assignment/week-{n}/`, 'Programmatic GA week page', 'P2', 'Weekly — expand weeks 1-12', 'No', 'Expand {n}=1..12 at build');
});

// ---- Cluster E — Qualifier ----
add('iitm bs qualifier', 'E — Qualifier', 'Informational', `${BASE}/iitm-bs/qualifier/`, 'Qualifier pillar', 'P1', 'Pre-term (lead intake)', 'Yes', '');
add('qualifier exam syllabus', 'E — Qualifier', 'Informational', `${BASE}/iitm-bs/qualifier/syllabus/`, 'Qualifier pillar sub-section', 'P1', EVERGREEN, 'Yes', '');
add('qualifier cutoff', 'E — Qualifier', 'Informational', `${BASE}/iitm-bs/qualifier/cutoff/`, 'Qualifier sub-section', 'P1', 'Per cycle', 'Yes', '');
add('how to prepare for iitm qualifier', 'E — Qualifier', 'Informational', `${BASE}/blog/how-to-prepare-iitm-qualifier/`, 'Strategy blog', 'P1', 'Pre-term', 'Yes', '');
add('qualifier in 4 weeks', 'E — Qualifier', 'Informational', `${BASE}/blog/qualifier-4-week-plan/`, 'Strategy blog', 'P1', 'Pre-term', 'Maybe', '');
add('qualifier strategy iitm bs', 'E — Qualifier', 'Informational', `${BASE}/blog/iitm-qualifier-strategy/`, 'Strategy blog', 'P1', 'Pre-term', 'Maybe', '');
add('iitm bs qualifier exam date', 'E — Qualifier', 'Decision', `${BASE}/iitm-bs/qualifier/`, 'Process page', 'P2', 'Per cycle — update', 'Yes', '');
add('iitm bs qualifier registration', 'E — Qualifier', 'Decision', `${BASE}/iitm-bs/admission/`, 'Process page', 'P2', 'Per cycle', 'Yes', '');

// ---- Cluster F — Course-level long-tail ----
[...FOUNDATION.map(c => ['foundation', c]), ...DIPLOMA.map(c => ['diploma', c])].forEach(([level, [slug, short]]) => {
  add(`${short.toLowerCase()} syllabus`, 'F — Course long-tail', 'Informational', `${BASE}/iitm-bs/${level}/${slug}/`, 'Course page', 'P2', EVERGREEN, 'Maybe', '');
  add(`is ${short.toLowerCase()} hard`, 'F — Course long-tail', 'Informational', `${BASE}/iitm-bs/${level}/${slug}/`, 'Course page + blog', 'P2', EVERGREEN, 'Maybe', '');
  add(`how to pass ${short.toLowerCase()} iitm`, 'F — Course long-tail', 'Informational', `${BASE}/iitm-bs/${level}/${slug}/`, 'Course page', 'P3', EVERGREEN, 'No', '');
  add(`${short.toLowerCase()} important topics`, 'F — Course long-tail', 'Informational', `${BASE}/iitm-bs/${level}/${slug}/`, 'Course page', 'P2', EVERGREEN, 'Maybe', '');
});
add('bdm project guidance', 'F — Course long-tail', 'Transactional', `${BASE}/iitm-bs/diploma/bdm/project/`, 'Project guide page', 'P3', EVERGREEN, 'Maybe', '');
add('mad project viva questions', 'F — Course long-tail', 'Transactional', `${BASE}/iitm-bs/diploma/mad-1/viva/`, 'Project guide page', 'P3', EVERGREEN, 'No', '');

// ---- Cluster G — Tools ----
add('iitm bs cgpa calculator', 'G — Tools', 'Transactional/Tool', `${BASE}/tools/cgpa-calculator/`, 'Tool page', 'P1', EVERGREEN, 'Yes', 'Linkable asset');
add('iit madras gpa calculator', 'G — Tools', 'Transactional/Tool', `${BASE}/tools/cgpa-calculator/`, 'Tool page', 'P1', EVERGREEN, 'Yes', '');
add('iitm bs grade calculator', 'G — Tools', 'Transactional/Tool', `${BASE}/tools/cgpa-calculator/`, 'Tool page', 'P1', EVERGREEN, 'Maybe', '');
add('iitm bs grade forecast', 'G — Tools', 'Tool', `${BASE}/tools/grade-forecast/`, 'Tool page', 'P1', 'Peaks Quiz 2 + end-term', 'Maybe', '');
add('how much to score for s grade iitm', 'G — Tools', 'Tool', `${BASE}/tools/grade-forecast/`, 'Tool page', 'P1', 'Peaks end-term', 'Maybe', '');
add('iitm bs credit calculator', 'G — Tools', 'Tool', `${BASE}/tools/credit-calculator/`, 'New tool page', 'P3', EVERGREEN, 'No', 'Phase 3');

// ---- Cluster H — Decision & comparison ----
add('is iitm bs degree valid', 'H — Decision', 'Consideration', `${BASE}/blog/is-iitm-bs-degree-valid/`, 'Authority blog', 'P2', EVERGREEN, 'Yes', '');
add('iitm bs degree ugc approved', 'H — Decision', 'Consideration', `${BASE}/blog/iitm-bs-ugc-approval/`, 'Authority blog', 'P2', EVERGREEN, 'Maybe', '');
add('iitm bs degree salary', 'H — Decision', 'Consideration', `${BASE}/blog/iitm-bs-salary-outcomes/`, 'Outcomes blog', 'P2', EVERGREEN, 'Yes', '');
add('jobs after iitm bs degree', 'H — Decision', 'Consideration', `${BASE}/blog/jobs-after-iitm-bs/`, 'Outcomes blog', 'P2', EVERGREEN, 'Maybe', '');
add('iitm bs degree with job', 'H — Decision', 'Consideration', `${BASE}/blog/iitm-bs-with-a-job/`, 'Lifestyle/how-to blog', 'P3', EVERGREEN, 'Maybe', '');
add('iitm bs time management', 'H — Decision', 'Consideration', `${BASE}/blog/iitm-bs-time-management/`, 'How-to blog', 'P3', EVERGREEN, 'No', '');

// ---- write CSV ----
const headers = ['keyword', 'cluster', 'intent', 'target_url', 'page_type', 'priority', 'target_term', 'volume_to_confirm', 'notes'];
const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
writeFileSync(new URL('./keyword-master-sheet.csv', import.meta.url), csv);
console.log(`Wrote ${rows.length} keyword rows to seo/keyword-master-sheet.csv`);
const byCluster = {};
rows.forEach(r => { byCluster[r.cluster] = (byCluster[r.cluster] || 0) + 1; });
Object.entries(byCluster).forEach(([c, n]) => console.log(`  ${c}: ${n}`));
