import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCcw, GraduationCap, Star, Loader2, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CourseCardData } from '../CourseCard';

const BADGE_COLORS: Record<string, string> = {
  SALE: '#FF2424', NEW: '#15B981', BESTSELLER: '#F6A623', TRENDING: '#2563EB',
  HOT: '#FF7A00', LIMITED: '#EC1E79',
};

function badgeColor(tag: string) {
  return BADGE_COLORS[tag.toUpperCase()] ?? '#7C3AED';
}

function CohortCard({ course, accent }: { course: CourseCardData; accent?: boolean }) {
  const navigate = useNavigate();
  const displayPrice = course.discountPrice || course.price;
  const tags = course.isBundle
    ? (course.bundleCourses?.map((b) => b.courseName) ?? [])
    : (course.subject ? [course.subject] : []);

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className={`bg-white border-[2.5px] border-[#0b1120] rounded-[20px] p-[18px] mb-[22px] cursor-pointer ${accent ? 'shadow-[5px_5px_0px_#FF2424]' : 'shadow-[4px_4px_0px_#0b1120]'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-11 h-11 rounded-xl bg-[#FBE3EE] border-2 border-[#0b1120] flex items-center justify-center text-[#0b1120]">
          {course.isBundle ? <RefreshCcw className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
        </div>
        {course.tags && course.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap justify-end">
            {course.tags.slice(0, 2).map((b, i) => (
              <span
                key={b}
                className={`text-white font-black text-[11px] tracking-wide px-2.5 py-1 rounded-[9px] border-2 border-[#0b1120] shadow-[2px_2px_0px_#0b1120] whitespace-nowrap ${i % 2 ? 'rotate-[4deg]' : '-rotate-[4deg]'}`}
                style={{ background: badgeColor(b) }}
              >
                {b.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-black text-[21px] leading-snug text-[#0b1120]">{course.name}</h3>
      {course.description && <p className="mt-2.5 text-[13px] leading-relaxed text-gray-500 font-semibold">{course.description}</p>}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-3.5">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center border-[1.5px] border-gray-200 rounded-full px-2.5 py-1 text-[11px] font-black text-[#0b1120] bg-white">{t}</span>
          ))}
        </div>
      )}

      <div className="border-t-[1.5px] border-gray-100 pt-3.5 flex items-end justify-between">
        <div>
          {course.startDate && (
            <div className="text-[9.5px] font-black tracking-wide text-gray-500">
              CLASS STARTS: {new Date(course.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
            </div>
          )}
          <div className="text-[11px] font-black text-blue-600 my-1.5">LANGUAGE: HINGLISH</div>
          <div className="flex items-center gap-1 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            <span className="text-[11px] font-bold text-gray-500 ml-0.5">(4.9)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-black tracking-wide text-gray-500">STARTS FROM</div>
          <div className="text-[26px] font-black text-[#0b1120] leading-none">₹{displayPrice}</div>
          {course.discountPrice && <div className="text-xs font-bold text-gray-400 line-through">₹{course.price}</div>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <Link
          to={`/courses/${course.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-center py-[13px] rounded-xl border-[2.5px] border-[#0b1120] bg-white text-[#0b1120] font-black text-[13px]"
        >
          View Details ›
        </Link>
        <Link
          to={`/checkout/${course.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-center py-[13px] rounded-xl border-[2.5px] border-[#0b1120] bg-[#0b1120] text-white font-black text-[13px]"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}

interface MobileCoursesProps {
  selectedTerm: string | null;
  onClearTerm: () => void;
}

/** Mobile-only Courses screen — featured cohort cards on a navy background. */
export default function MobileCourses({ selectedTerm, onClearTerm }: MobileCoursesProps) {
  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .order('isPinned', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCourses(data || []);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(
    (course) => !selectedTerm || !course.term || course.term === selectedTerm
  );

  return (
    <div className="md:hidden bg-[#0b1120] min-h-screen">
      <div className="px-4 py-5">
        {selectedTerm && (
          <div className="flex items-center justify-between bg-[#111827] border-[2px] border-white/10 rounded-xl px-4 py-3 mb-6 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Active Term:</span>
              <span className="text-xs font-black text-white uppercase tracking-wide bg-blue-600/50 px-2.5 py-0.5 rounded-md border border-blue-500/70 shadow-[2px_2px_0px_rgba(37,99,235,0.4)]">
                {selectedTerm}
              </span>
            </div>
            <button 
              onClick={onClearTerm}
              className="flex items-center gap-1.5 text-[11px] font-black text-gray-400 hover:text-white uppercase transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Change
            </button>
          </div>
        )}

        <div className="flex items-end justify-between gap-3 mb-4">
          <h2 className="font-black text-[25px] leading-tight text-white">Featured Cohorts</h2>
          <Link to="/courses" className="shrink-0 inline-flex items-center gap-1 bg-white text-[#0b1120] border-[2.5px] border-[#0b1120] rounded-[10px] px-3 py-2 text-xs font-black shadow-[2px_2px_0px_#0b1120]">
            See All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-9 h-9 animate-spin text-white" />
            <span className="font-black text-white/60 text-sm">Loading courses...</span>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white border-[2.5px] border-[#0b1120] rounded-2xl p-6 text-center shadow-[4px_4px_0px_#FF2424]">
            <h3 className="text-lg font-black text-[#0b1120] mb-1">No courses found</h3>
            <p className="text-xs font-bold text-gray-500">No cohorts found matching your selected term.</p>
          </div>
        ) : (
          filteredCourses.map((course, i) => <CohortCard key={course.id} course={course} accent={i === 0} />)
        )}
      </div>
    </div>
  );
}
