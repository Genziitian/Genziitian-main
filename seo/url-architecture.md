# GenZ IITian — URL Architecture Map (Deliverable B)

**Canonical domain:** `https://genziitian.in` (non‑www, HTTPS).
**Scope of this map:** full **Qualifier + Foundation** set (Diploma/Degree follow the same pattern in Phase 3).
**Rule:** one primary keyword per URL; lowercase, hyphenated, stable, no trailing params.

---

## 0. Domain consolidation (do first)

| Current host | Action |
|---|---|
| `genziitian.in` | **Primary / canonical** — the hub lives here |
| `iitpathshala.in` (PYQs) | **301** → matching paths on `genziitian.in/iitm-bs/.../pyq/` |
| `live.iitpathshala.in` (courses) | **301** → `genziitian.in/courses/` (or keep app subdomain, cross‑link heavily) |
| `grade.iitpathshala.in` (CGPA/quiz) | **301** → `genziitian.in/tools/...` |
| `app.genziitian.in` (resources) | Keep only if a true app; otherwise 301 → `/iitm-bs/` resources |

- Pick **one** scheme (`https://genziitian.in`, non‑www) and 301 every variant to it.
- Submit **one XML sitemap index** segmented by section (pillars, courses, pyq, oppe, ga, tools, blog).
- Each retired URL gets a **1:1 redirect** to its closest new equivalent (never blanket‑redirect to home).

---

## 1. Top level

```
/                                  Homepage (brand: "genz iitian", "iit pathshala")
/iitm-bs/                          MASTER PILLAR — whole program (Deliverable C)
/iitm-bs/pyq/                      PYQ HUB (cross-level) — "iitm bs pyq"
/iitm-bs/oppe/                     OPPE explainer pillar — "iitm oppe", "what is oppe"
/iitm-bs/graded-assignment/        GA hub — "iitm bs graded assignment solutions"
/tools/cgpa-calculator/           Tool — "iitm bs cgpa calculator"
/tools/grade-forecast/            Tool — "how much to score for S grade"
/blog/<slug>/                      Supporting spoke content
/about/                            Team + E-E-A-T + affiliation disclaimer
```

Cross-cutting pillar sub-sections (off the master pillar):
```
/iitm-bs/fees/   /iitm-bs/eligibility/   /iitm-bs/syllabus/   /iitm-bs/admission/
```

## 2. Level hubs

```
/iitm-bs/qualifier/                Qualifier pillar — "iitm bs qualifier"
/iitm-bs/foundation/               Foundation level hub
/iitm-bs/diploma/                  Diploma level hub        (Phase 3)
/iitm-bs/degree/                   Degree level hub         (Phase 4)
```

## 3. Qualifier (seasonal, top-of-funnel)

```
/iitm-bs/qualifier/                pillar
/iitm-bs/qualifier/syllabus/       "qualifier exam syllabus"
/iitm-bs/qualifier/cutoff/         "qualifier cutoff" (update per cycle)
/iitm-bs/qualifier/pyq/            "qualifier pyq"
```
Strategy blogs (spokes → link into the qualifier pillar):
```
/blog/how-to-prepare-iitm-qualifier/
/blog/qualifier-4-week-plan/
/blog/iitm-qualifier-strategy/
```

## 4. Foundation — course pages (8)

```
/iitm-bs/foundation/maths-1/       Mathematics for Data Science I
/iitm-bs/foundation/maths-2/       Mathematics for Data Science II
/iitm-bs/foundation/stats-1/       Statistics for Data Science I
/iitm-bs/foundation/stats-2/       Statistics for Data Science II
/iitm-bs/foundation/ct/            Computational Thinking
/iitm-bs/foundation/english-1/     English I
/iitm-bs/foundation/english-2/     English II
/iitm-bs/foundation/python/        Introduction to Python   (has OPPE)
```

## 5. Foundation — exam-asset pages (the volume play)

Per course `<c>` under `/iitm-bs/foundation/<c>/`:

```
/pyq/                              all PYQs for the course        (P1)
/quiz-1/                           Quiz 1 PYQ + important Qs       (P2)
/quiz-2/                           Quiz 2 PYQ + important Qs       (P2)
/end-term/                         End-term PYQ + important topics (P2)
/graded-assignment/                course GA hub                  (P2)
/graded-assignment/week-1/ … week-12/   weekly GA pages          (P1, weekly)
/oppe/                             ONLY python                    (P1)
```

**Example — Python (the only Foundation OPPE course), fully expanded:**
```
/iitm-bs/foundation/python/
/iitm-bs/foundation/python/pyq/
/iitm-bs/foundation/python/quiz-1/
/iitm-bs/foundation/python/quiz-2/
/iitm-bs/foundation/python/end-term/
/iitm-bs/foundation/python/oppe/
/iitm-bs/foundation/python/graded-assignment/
/iitm-bs/foundation/python/graded-assignment/week-1/  …  /week-12/
```

**Page-count math (Foundation + Qualifier):**
8 courses × (1 course + 4 exam pages + 1 GA hub + 12 GA weeks) = 8 × 18 = **144**, +1 Python OPPE = **145**, + Qualifier (pillar + 3) = **149**, + hubs/tools/pillar ≈ **160 indexable URLs** before any blog. Diploma (12 courses, same template, +6 OPPE) adds ~250 in Phase 3.

---

## 6. Canonicalisation & cannibalisation guards

- **PYQ hub vs course PYQ:** `/iitm-bs/pyq/` targets the head term *"iitm bs pyq"* and links **down** to every course PYQ page; course pages target *"<course> pyq"*. Different intent → no cannibalisation.
- **GA hub vs week pages:** hub targets *"graded assignment solutions"*; week pages target *"<course> ga week n answers"*.
- **Filtered/paginated PYQ views** (by year/term) → `rel=canonical` to the clean course PYQ URL.
- **One keyword ↔ one URL.** If two drafts target the same term, merge or differentiate by intent before publishing.

## 7. Breadcrumb / crawl path (every exam page)

```
Home → IITM BS (/iitm-bs/) → Foundation (/iitm-bs/foundation/)
     → Maths 1 (/iitm-bs/foundation/maths-1/) → PYQ (/iitm-bs/foundation/maths-1/pyq/)
```
BreadcrumbList schema mirrors this on every node so Google renders the path in SERPs.
