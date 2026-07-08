import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2, RefreshCcw, BookOpen, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CourseCard, { CourseCardData } from '../components/CourseCard';
import MobileCourses from '../components/mobile/MobileCourses';

export default function Courses() {
  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(() => {
    return localStorage.getItem('selected_term');
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('isPinned', { ascending: false })
      .order('created_at', { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  const handleSelectTerm = (term: string) => {
    setSelectedTerm(term);
    localStorage.setItem('selected_term', term);
  };

  const handleClearTerm = () => {
    setSelectedTerm(null);
    localStorage.removeItem('selected_term');
  };

  // Filter courses by term:
  // Show course if course has no term OR course matches selected term.
  const filteredCourses = courses.filter(course => {
    const matchesTerm = !selectedTerm || !course.term || course.term === selectedTerm;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTerm && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white flex flex-col justify-center items-center py-20 px-6">
        <Loader2 className="w-12 h-12 animate-spin text-white mb-4" />
        <span className="font-black text-gray-400">Loading courses...</span>
      </div>
    );
  }

  // Define our term configurations
  const termOptions = [
    {
      id: 'Qualifier',
      name: 'Qualifier',
      icon: BookOpen,
      color: 'border-[#1f2937] hover:border-yellow-500 shadow-[8px_8px_0px_#1f2937] hover:shadow-[8px_8px_0px_#eab308]',
      textColor: 'text-yellow-400 group-hover:text-yellow-400',
      bgColor: 'bg-yellow-950/20 border-yellow-500/50',
      iconColor: 'text-yellow-400',
      desc: 'Crack the qualifier exam. Get comprehensive study plans, live tutorials, and mock papers to guarantee your admission.'
    },
    {
      id: 'Re-attempt',
      name: 'Re-attempt',
      icon: RefreshCcw,
      color: 'border-[#1f2937] hover:border-red-500 shadow-[8px_8px_0px_#1f2937] hover:shadow-[8px_8px_0px_#ef4444]',
      textColor: 'text-red-400 group-hover:text-red-400',
      bgColor: 'bg-red-950/20 border-red-500/50',
      iconColor: 'text-red-400',
      desc: 'Ready to try again? Get targeted preparation strategies, intensive practice, and guidance to ace your next attempt.'
    },
    {
      id: 'Foundation',
      name: 'Foundation',
      icon: BookOpen,
      color: 'border-[#1f2937] hover:border-blue-500 shadow-[8px_8px_0px_#1f2937] hover:shadow-[8px_8px_0px_#3b82f6]',
      textColor: 'text-blue-400 group-hover:text-blue-400',
      bgColor: 'bg-blue-950/20 border-blue-500/50',
      iconColor: 'text-blue-400',
      desc: 'Build a rock-solid academic base. Master core fundamentals with senior IITM BS students and conceptual live sessions.'
    },
    {
      id: 'DIPLOMA',
      name: 'DIPLOMA',
      icon: GraduationCap,
      color: 'border-[#1f2937] hover:border-emerald-500 shadow-[8px_8px_0px_#1f2937] hover:shadow-[8px_8px_0px_#10b981]',
      textColor: 'text-emerald-400 group-hover:text-emerald-400',
      bgColor: 'bg-emerald-950/20 border-emerald-500/50',
      iconColor: 'text-emerald-400',
      desc: 'Deep-dive into advanced coursework. Excel in project labs, coding assignments, and specialized diploma curriculum.'
    }
  ];

  // Dynamic filter: only show a term if there is at least one course configured for it
  const hasAnyTermAssigned = courses.some(c => c.term && ['Re-attempt', 'Foundation', 'DIPLOMA', 'Qualifier'].includes(c.term));
  const activeTerms = termOptions.filter(option => {
    if (!hasAnyTermAssigned) return true; // Fallback: show all if no terms are assigned yet
    return courses.some(course => course.term === option.id);
  });

  if (!selectedTerm) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white flex flex-col justify-center items-center py-20 px-6 relative overflow-hidden">
        {/* Abstract blur circles for premium background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
              Please Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Term</span>
            </h1>
            <p className="text-gray-400 font-bold max-w-xl mx-auto text-sm md:text-base">
              Choose your academic tier to explore the courses, schedules, and guidance curated specifically for you.
            </p>
          </motion.div>

          <div className={`grid grid-cols-1 ${activeTerms.length === 4 ? 'md:grid-cols-4' : activeTerms.length === 3 ? 'md:grid-cols-3' : activeTerms.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 text-left max-w-5xl mx-auto`}>
            {activeTerms.map((term, index) => {
              const IconComponent = term.icon;
              return (
                <motion.div
                  key={term.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => handleSelectTerm(term.id)}
                  className={`group bg-[#111827] border-[4px] rounded-[32px] p-8 cursor-pointer transition-all flex flex-col justify-between ${term.color}`}
                >
                  <div>
                    <div className={`w-14 h-14 border-[3px] rounded-2xl flex items-center justify-center mb-6 ${term.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${term.iconColor}`} />
                    </div>
                    <h3 className={`text-2xl font-black mb-3 text-white tracking-tight transition-colors ${term.textColor}`}>
                      {term.name}
                    </h3>
                    <p className="text-gray-400 font-bold text-sm leading-relaxed mb-6">
                      {term.desc}
                    </p>
                  </div>
                  <div className={`mt-auto pt-4 flex items-center justify-between text-xs font-black uppercase transition-transform group-hover:translate-x-1 ${term.textColor}`}>
                    <span>Select {term.name} ›</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* Mobile cohorts screen (md:hidden) — matches the Gen-Z IITian mobile design */}
    <MobileCourses selectedTerm={selectedTerm} onClearTerm={handleClearTerm} />

    <div className="hidden md:block min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0b1120] py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Start Early, Stay Strong</span>
          </motion.h1>
          
          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg md:text-xl text-gray-300 font-bold mb-3 leading-relaxed">
              Learn from <span className="text-white">IITM BS seniors</span> with a practical-first approach, clear concepts, real strategies, and zero unnecessary theory.
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-[0.2em] opacity-80 italic">
              Note: Access is granted immediately after successful payment verification
            </p>
          </div>
        </div>
      </section>

      {/* Active Term Selector and Change Button */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-2 border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Active Term:</span>
          <span className="px-4 py-1.5 bg-[#0b1120] text-white border-2 border-[#0b1120] shadow-[3px_3px_0px_#2563eb] rounded-xl text-xs font-black uppercase tracking-wider">
            {selectedTerm}
          </span>
        </div>
        <button 
          onClick={handleClearTerm}
          className="sm:self-center px-4 py-2 border-[2.5px] border-[#0b1120] rounded-xl font-black text-xs bg-white hover:bg-gray-50 text-[#0b1120] shadow-[3px_3px_0px_#0b1120] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 justify-center cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Change Term
        </button>
      </div>

      {/* Courses Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-[#0b1120]" />
            <span className="font-black text-gray-400">Loading courses...</span>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-black text-gray-400">No courses found for the selected term.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <CourseCard course={course} className="w-full" />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
    </>
  );
}
