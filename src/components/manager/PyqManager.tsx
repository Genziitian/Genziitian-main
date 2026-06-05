import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Search, CheckCircle2, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { LEVELS, COURSES, EXAM_META, coursesByLevel, getCourse, examsForCourse, CURRENT_TERM, type LevelSlug, type ExamSlug } from '../../data/iitmBs';
import type { PyqPaper } from '../../pages/iitm-bs/PyqPapers';

const blank = {
  level: 'foundation' as LevelSlug,
  course: 'maths-1',
  exam: 'pyq' as ExamSlug,
  term: CURRENT_TERM,
  title: '',
  paper_url: '',
  solution_url: '',
  video_url: '',
  week: '' as number | '',
  verified: 1,
};

const inputCls = 'w-full rounded-xl border-[2px] border-[#0b1120] bg-white px-4 py-2.5 font-bold text-[#0b1120] text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10b981]';

export default function PyqManager() {
  const [papers, setPapers] = useState<PyqPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ ...blank });

  const fetchPapers = async () => {
    setLoading(true);
    const { data } = await supabase.from('pyq_papers').select('*').order('created_at', { ascending: false });
    setPapers((data as PyqPaper[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetchPapers(); }, []);

  const courses = coursesByLevel(form.level);
  const selectedCourse = getCourse(form.level, form.course);
  const exams = selectedCourse ? examsForCourse(selectedCourse) : (['pyq'] as ExamSlug[]);

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const onLevelChange = (level: LevelSlug) => {
    const first = coursesByLevel(level)[0];
    setForm((f) => ({ ...f, level, course: first?.slug || '', exam: 'pyq' }));
  };

  const save = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true); setError(null);
    const payload = {
      level: form.level, course: form.course, exam: form.exam, term: form.term.trim() || CURRENT_TERM,
      title: form.title.trim(),
      paper_url: form.paper_url.trim() || null,
      solution_url: form.solution_url.trim() || null,
      video_url: form.video_url.trim() || null,
      week: form.exam === 'graded-assignment' && form.week ? Number(form.week) : null,
      verified: Number(form.verified) ? 1 : 0,
    };
    const { error: err } = await supabase.from('pyq_papers').insert(payload);
    setSaving(false);
    if (err) { setError(err.message); return; }
    setForm((f) => ({ ...blank, level: f.level, course: f.course, exam: f.exam, term: f.term }));
    fetchPapers();
  };

  const remove = async (p: PyqPaper) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    await supabase.from('pyq_papers').delete().eq('id', p.id);
    fetchPapers();
  };

  const filtered = papers.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return [p.title, p.course, p.exam, p.term].some((v) => (v || '').toLowerCase().includes(q));
  });

  return (
    <div className="space-y-8">
      {/* Add form */}
      <div className="bg-white border-[4px] border-[#0b1120] rounded-[2rem] p-6 shadow-[8px_8px_0px_#0b1120]">
        <h3 className="text-xl font-black mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Add PYQ / paper</h3>
        {error && <div className="bg-red-50 border-2 border-red-300 text-red-700 rounded-xl px-4 py-2 font-bold text-sm mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Level</span>
            <select value={form.level} onChange={(e) => onLevelChange(e.target.value as LevelSlug)} className={inputCls}>
              {LEVELS.filter((l) => coursesByLevel(l.slug).length > 0).map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
            </select>
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Course</span>
            <select value={form.course} onChange={(e) => set('course', e.target.value)} className={inputCls}>
              {courses.map((c) => <option key={c.slug} value={c.slug}>{c.short}</option>)}
            </select>
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Exam</span>
            <select value={form.exam} onChange={(e) => set('exam', e.target.value)} className={inputCls}>
              {exams.map((e) => <option key={e} value={e}>{EXAM_META[e].label}</option>)}
            </select>
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Term</span>
            <input value={form.term} onChange={(e) => set('term', e.target.value)} placeholder="May 2026" className={inputCls} />
          </label>
          {form.exam === 'graded-assignment' && (
            <label className="block"><span className="text-xs font-black uppercase text-gray-500">Week (1–12)</span>
              <input type="number" min={1} max={12} value={form.week} onChange={(e) => set('week', e.target.value)} className={inputCls} />
            </label>
          )}
          <label className="block sm:col-span-2"><span className="text-xs font-black uppercase text-gray-500">Title</span>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Maths 1 End-Term — May 2026" className={inputCls} />
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Paper URL</span>
            <input value={form.paper_url} onChange={(e) => set('paper_url', e.target.value)} placeholder="https://…" className={inputCls} />
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Solution URL</span>
            <input value={form.solution_url} onChange={(e) => set('solution_url', e.target.value)} placeholder="https://…" className={inputCls} />
          </label>
          <label className="block"><span className="text-xs font-black uppercase text-gray-500">Video URL</span>
            <input value={form.video_url} onChange={(e) => set('video_url', e.target.value)} placeholder="YouTube…" className={inputCls} />
          </label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => set('verified', Number(form.verified) ? 0 : 1)} className={`px-4 py-2 rounded-xl border-[2px] border-[#0b1120] font-black text-sm ${Number(form.verified) ? 'bg-[#10b981] text-white' : 'bg-white text-[#0b1120]'}`}>
            {Number(form.verified) ? 'Verified ✓' : 'Community'}
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-[#10b981] text-[#0b1120] rounded-xl font-black border-[3px] border-[#0b1120] shadow-[4px_4px_0px_#0b1120] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-60">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />} Add paper
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-[4px] border-[#0b1120] rounded-[2rem] px-4 py-3 flex gap-3 items-center shadow-[6px_6px_0px_#0b1120]">
        <Search className="w-5 h-5 text-gray-400 ml-1" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search papers by title, course, exam, term..." className="w-full font-black outline-none text-base placeholder:text-gray-300" />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center p-16 text-gray-300 animate-pulse font-black text-xl uppercase tracking-widest">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border-[4px] border-dashed border-gray-200 rounded-[2rem] p-12 text-center">
          <h3 className="text-xl font-black mb-1">No papers yet</h3>
          <p className="text-gray-500 font-bold text-sm">Add a paper above. It appears instantly on the matching /iitm-bs exam page.</p>
        </div>
      ) : (
        <div className="bg-white border-[4px] border-[#0b1120] rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_#0b1120] divide-y-2 divide-gray-100">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-4">
              <div className="flex-1 min-w-0">
                <div className="font-black text-[#0b1120] truncate flex items-center gap-2">
                  {p.title}
                  {p.verified ? <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" /> : null}
                </div>
                <div className="text-xs font-bold text-gray-400 mt-0.5">
                  {p.course} · {EXAM_META[p.exam as ExamSlug]?.label || p.exam} · {p.term}
                  {p.paper_url && <a href={p.paper_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 inline-flex items-center gap-0.5">paper <ExternalLink className="w-3 h-3" /></a>}
                </div>
              </div>
              <button onClick={() => remove(p)} className="shrink-0 w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 rounded-lg border-2 border-red-400 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
