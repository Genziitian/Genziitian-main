import { Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { DISCLAIMER, WHATSAPP } from '../../data/iitmBs';

export type Crumb = { name: string; path: string; url: string };

/* ---- JSON-LD builders ---- */
export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const courseLd = (name: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  provider: { '@type': 'CollegeOrUniversity', name: 'IIT Madras', sameAs: 'https://study.iitm.ac.in/ds/' },
});

/* ---- UI ---- */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-bold text-gray-500 mb-5">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-[#0b1120]"><HomeIcon className="w-3.5 h-3.5" /></Link>
      {crumbs.map((c, i) => (
        <span key={c.path} className="inline-flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          {i === crumbs.length - 1
            ? <span className="text-[#0b1120]">{c.name}</span>
            : <Link to={c.path} className="hover:text-[#0b1120]">{c.name}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0b1120] font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 md:py-12">{children}</div>
    </div>
  );
}

export function LinkCard({ to, title, sub }: { to: string; title: string; sub?: string }) {
  return (
    <Link to={to} className="block p-4 bg-white border-[3px] border-[#0b1120] rounded-xl shadow-[3px_3px_0px_#0b1120] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#0b1120] transition-all group">
      <div className="font-black text-[#0b1120] group-hover:text-[#10b981] transition-colors">{title}</div>
      {sub && <div className="mt-1 text-xs text-gray-500 font-bold flex items-center gap-1">{sub} <ChevronRight className="w-3 h-3" /></div>}
    </Link>
  );
}

export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-black mb-4">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group border-[2.5px] border-[#0b1120] rounded-xl bg-white overflow-hidden">
            <summary className="cursor-pointer list-none px-4 py-3 font-black flex items-center justify-between gap-3">
              {f.q}
              <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 text-gray-600 font-medium leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function FinalCta({ label = 'Explore the live batches' }: { label?: string }) {
  return (
    <div className="mt-12 bg-[#eef2ff] border-[3px] border-[#0b1120] rounded-2xl p-6 md:p-8 text-center shadow-[6px_6px_0px_#0b1120]">
      <h2 className="text-xl md:text-2xl font-black mb-2">Need help with this?</h2>
      <p className="text-gray-600 font-medium mb-5">Join 14K+ IITM BS students — get doubts solved and stay on track.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#10b981] text-[#0b1120] rounded-xl font-black border-[3px] border-[#0b1120] shadow-[4px_4px_0px_#0b1120] hover:-translate-y-1 transition-all">
          <MessageCircle className="w-5 h-5" /> Join WhatsApp Community
        </a>
        <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0b1120] rounded-xl font-black border-[3px] border-[#0b1120] hover:-translate-y-1 transition-all">
          {label} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function Disclaimer() {
  return <p className="mt-10 text-[11px] leading-relaxed text-gray-400 font-medium border-t border-gray-100 pt-4">{DISCLAIMER}</p>;
}

export function Updated({ term }: { term: string }) {
  return <p className="text-xs font-bold text-gray-400 mb-6">Last updated: {term} · Term tag: {term}</p>;
}
