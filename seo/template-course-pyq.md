# Template A — Course PYQ / Exam-Asset Page (Deliverable D · reusable)

Fill the `<placeholders>`. One primary keyword per URL. This template powers every
`<course> × <exam-type>` page in Cluster B (and OPPE/Quiz/End-term variants).

| Element | Formula |
|---|---|
| **Title tag** (≤60) | `<Course> <Exam> PYQ with Solutions \| IITM BS \| GenZ IITian` |
| **H1** | `<Course> <Exam> Previous Year Questions (PYQ)` |
| **URL** | `https://genziitian.in/iitm-bs/<level>/<course-slug>/<exam-slug>/` |
| **Meta description** (≤155) | `Practice <Course> <Exam> PYQs with step-by-step solutions, exam pattern and most-repeated questions. Updated for <term>. — GenZ IITian` |
| **Intro** (50–80 w) | Answer the query immediately: what's on the page, which terms it covers, how to use it. Primary keyword + 1–2 synonyms naturally. |
| **Body order** | (1) Year/term-wise PYQs → (2) worked solutions → (3) exam pattern & marks → (4) most-repeated topics → (5) interactive quiz/practice CTA → (6) FAQ |
| **Schema** | `FAQPage` + `Course` (or `EducationalOccupationalProgram`) + `BreadcrumbList`; add `QAPage` where Q&A format dominates; `VideoObject` for the embedded solution video |
| **Internal links** | **Up** to course page; **sideways** to sibling exams (Quiz 1↔Quiz 2↔End-term↔OPPE) of same course; **down-from** level hub + PYQ hub; **out** to 1–2 relevant blogs; community CTA **last** |
| **Media** | Embed own-channel YouTube solution video + downloadable/printable practice asset |
| **E-E-A-T** | Student-author byline + credential; "Last updated <date>"; term tag; affiliation disclaimer in footer; mark *verified* vs *community-contributed* solutions |

### Body skeleton (paste & fill)
```
H1: <Course> <Exam> Previous Year Questions (PYQ)
[intro 50–80 words]
[Updated: <date> · Covers: <terms> · Verified by <author>]

H2: <Course> <Exam> exam pattern (marks, duration, type)
H2: Previous year questions — term-wise
   H3: <Term> — Q1…Qn  ([worked solution] toggle each)
H2: Most-repeated topics in <Course> <Exam>
H2: Practice it live  → CTA to /tools/quiz-practice or embedded quiz
H2: FAQ  (FAQPage schema)
[Author box] [Disclaimer] [Final CTA: WhatsApp community]
```
