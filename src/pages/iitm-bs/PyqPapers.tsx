import { useEffect, useState } from 'react';
import { FileText, CheckCircle2, ExternalLink, Play } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export interface PyqPaper {
  id: number;
  level: string; course: string; exam: string;
  term: string; title: string;
  paper_url?: string | null; solution_url?: string | null; video_url?: string | null;
  week?: number | null; verified?: number;
}

/**
 * Client-side content for an exam-asset page. The page's SEO structure is
 * prerendered statically; these papers hydrate in for users (and Google's
 * JS render). Empty/loading state keeps a sensible static fallback.
 */
export default function PyqPapers({ level, course, exam, courseShort }: { level: string; course: string; exam: string; courseShort: string }) {
  const [papers, setPapers] = useState<PyqPaper[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from('pyq_papers')
      .select('*')
      .eq('level', level)
      .eq('course', course)
      .eq('exam', exam)
      .order('sort', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        setPapers(Array.isArray(data) ? (data as PyqPaper[]) : []);
        setLoaded(true);
      });
    return () => { active = false; };
  }, [level, course, exam]);

  if (loaded && papers.length === 0) {
    return (
      <div className="border-[3px] border-dashed border-gray-300 rounded-2xl p-8 text-center text-gray-500 font-bold mb-10">
        {courseShort} papers are being added for this exam — check back soon, newest term first.
        <div className="text-xs font-medium text-gray-400 mt-1">Updated every term, never replaced.</div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="border-[3px] border-dashed border-gray-300 rounded-2xl p-8 text-center text-gray-500 font-bold mb-10">
        Papers &amp; worked solutions for {courseShort} load here, newest term first.
      </div>
    );
  }

  // Group by term, newest groups first (insertion order from the sorted query).
  const terms: string[] = [];
  const byTerm: Record<string, PyqPaper[]> = {};
  papers.forEach((p) => {
    if (!byTerm[p.term]) { byTerm[p.term] = []; terms.push(p.term); }
    byTerm[p.term].push(p);
  });

  return (
    <div className="space-y-6 mb-10">
      {terms.map((term) => (
        <div key={term}>
          <h3 className="text-lg font-black mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-[#10b981]" /> {term}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {byTerm[term].map((p) => (
              <div key={p.id} className="border-[3px] border-[#0b1120] rounded-xl p-4 shadow-[3px_3px_0px_#0b1120]">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-black text-[#0b1120] leading-tight">{p.title}</span>
                  {p.verified ? (
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black text-[#10b981]"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
                  ) : (
                    <span className="shrink-0 text-[10px] font-black text-gray-400">Community</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.paper_url && <a href={p.paper_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:underline"><FileText className="w-3.5 h-3.5" /> Paper</a>}
                  {p.solution_url && <a href={p.solution_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-[#10b981] hover:underline"><ExternalLink className="w-3.5 h-3.5" /> Solution</a>}
                  {p.video_url && <a href={p.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-red-500 hover:underline"><Play className="w-3.5 h-3.5" /> Video</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
