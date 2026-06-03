import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Globe, LayoutDashboard, Smartphone, ClipboardCheck, Share2,
  ArrowRight, ArrowUpRight, Check, Play, Youtube, Instagram, Linkedin, MessageCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';

/* ----------------------------------------------------------------------------
   CSS "snapshot" mockups — stylized device frames so the page reads like a
   real SaaS product showcase without shipping heavy screenshots.
---------------------------------------------------------------------------- */

function BrowserMock({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-xl rounded-2xl border-[3px] border-[#0b1120] bg-white shadow-[10px_10px_0px_#0b1120] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b-[3px] border-[#0b1120] bg-gray-50">
        <span className="w-3 h-3 rounded-full bg-red-400 border border-[#0b1120]" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 border border-[#0b1120]" />
        <span className="w-3 h-3 rounded-full bg-green-400 border border-[#0b1120]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white border-2 border-[#0b1120]/15 px-3 py-1 text-[10px] font-bold text-gray-400">{url}</div>
      </div>
      <div className="aspect-[16/10] bg-white overflow-hidden">{children}</div>
    </div>
  );
}

function PhoneMock({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[220px] rounded-[2.2rem] border-[4px] border-[#0b1120] bg-[#0b1120] p-2 shadow-[10px_10px_0px_#0b1120]">
      <div className="relative rounded-[1.6rem] overflow-hidden bg-[#f1f3f7] aspect-[9/18]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-[#0b1120] rounded-b-xl z-20" />
        {children}
      </div>
    </div>
  );
}

const Bar = ({ w, c = 'bg-gray-200' }: { w: string; c?: string }) => (
  <div className={`h-2 rounded-full ${c}`} style={{ width: w }} />
);

/* ---- Per-product snapshot bodies ---- */

const WebsiteSnap = (
  <div className="h-full w-full flex flex-col">
    <div className="flex items-center justify-between px-3 py-2 border-b-2 border-gray-100">
      <div className="flex items-center gap-1 text-[9px] font-black"><span className="text-[#0b1120]">Gen-Z</span><span className="text-red-500">IITian</span></div>
      <div className="flex gap-2"><Bar w="22px" /><Bar w="22px" /><Bar w="22px" /></div>
    </div>
    <div className="flex-1 bg-[#0b1120] p-3 flex flex-col justify-center gap-1.5">
      <div className="h-2.5 w-1/2 rounded bg-gradient-to-r from-red-500 to-orange-400" />
      <Bar w="70%" c="bg-white/25" />
      <Bar w="40%" c="bg-white/15" />
      <div className="mt-2 flex gap-2">
        <div className="h-7 w-16 rounded-lg bg-blue-500 border border-white/20" />
        <div className="h-7 w-16 rounded-lg bg-white/10 border border-white/20" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 p-3 bg-white">
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-lg border-2 border-[#0b1120]/10 p-2 space-y-1">
          <div className="h-6 rounded bg-gray-100" />
          <Bar w="80%" /><Bar w="55%" />
        </div>
      ))}
    </div>
  </div>
);

const DashboardSnap = (
  <div className="h-full w-full flex">
    <div className="w-1/4 bg-[#0b1120] p-2 flex flex-col gap-2">
      <div className="h-5 w-5 rounded-md bg-blue-500" />
      {[0, 1, 2, 3].map(i => <Bar key={i} w="100%" c={i === 0 ? 'bg-white/40' : 'bg-white/15'} />)}
    </div>
    <div className="flex-1 p-3 space-y-2 bg-white">
      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#11182b] to-[#1e293b] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-3.5 h-3.5 text-[#0b1120] fill-current" /></div>
      </div>
      <Bar w="60%" c="bg-gray-300" />
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-2"><div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden"><div className="h-full w-3/4 bg-[#10b981]" /></div><span className="text-[8px] font-black text-gray-400">75%</span></div>
        <div className="flex items-center gap-2"><div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden"><div className="h-full w-1/2 bg-blue-500" /></div><span className="text-[8px] font-black text-gray-400">50%</span></div>
      </div>
    </div>
  </div>
);

const ExamSnap = (
  <div className="h-full w-full bg-white p-3 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <Bar w="40%" c="bg-gray-300" />
      <div className="px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-[8px] font-black text-red-500">⏱ 14:59</div>
    </div>
    <div className="rounded-lg border-2 border-[#0b1120]/10 p-2 space-y-1">
      <Bar w="90%" /><Bar w="65%" />
    </div>
    <div className="space-y-1.5">
      {[true, false, false, false].map((sel, i) => (
        <div key={i} className={`flex items-center gap-2 rounded-lg border-2 p-1.5 ${sel ? 'border-[#10b981] bg-green-50' : 'border-gray-100'}`}>
          <div className={`w-4 h-4 rounded-full border-2 ${sel ? 'border-[#10b981] bg-[#10b981]' : 'border-gray-300'} flex items-center justify-center`}>{sel && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}</div>
          <Bar w={`${60 - i * 8}%`} />
        </div>
      ))}
    </div>
    <div className="mt-auto h-6 rounded-lg bg-[#0b1120]" />
  </div>
);

const AppSnap = (
  <div className="h-full w-full bg-[#f1f3f7] pt-5 px-2.5 pb-2 flex flex-col gap-2 text-[8px]">
    <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-gray-200">
      <div className="w-6 h-6 rounded-full bg-blue-100 border border-[#0b1120]" />
      <div className="space-y-1"><Bar w="44px" c="bg-gray-300" /><Bar w="30px" /></div>
    </div>
    <div className="rounded-xl bg-gradient-to-br from-[#0b1120] to-[#11331f] p-2.5 text-white">
      <div className="text-[7px] font-black text-[#9bf6c4]">MAY 2026 TERM</div>
      <div className="text-[10px] font-black leading-tight mt-0.5">Ace Your<br />Qualifier Exam</div>
      <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-[#9bf6c4] text-[#0b1120] text-[7px] font-black">Start Smart →</div>
    </div>
    <Bar w="50%" c="bg-gray-300" />
    <div className="rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center text-gray-300 text-[7px] font-bold">No upcoming sessions</div>
  </div>
);

const SocialSnap = (
  <div className="h-full w-full bg-white p-3 grid grid-cols-2 gap-2">
    {[
      { Icon: Youtube, c: 'bg-red-500', n: '14K+', l: 'Subscribers' },
      { Icon: Instagram, c: 'bg-pink-500', n: 'Daily', l: 'Reels & Tips' },
      { Icon: Linkedin, c: 'bg-blue-600', l: 'Community', n: 'Network' },
      { Icon: MessageCircle, c: 'bg-green-500', l: 'WhatsApp', n: 'Live Help' },
    ].map(({ Icon, c, n, l }, i) => (
      <div key={i} className="rounded-xl border-2 border-[#0b1120]/10 p-2 flex flex-col gap-1.5 justify-center">
        <div className={`w-7 h-7 rounded-lg ${c} flex items-center justify-center text-white`}><Icon className="w-4 h-4" /></div>
        <div className="text-[10px] font-black text-[#0b1120] leading-none">{n}</div>
        <div className="text-[8px] font-bold text-gray-400 leading-none">{l}</div>
      </div>
    ))}
  </div>
);

/* ----------------------------------------------------------------------------
   Products
---------------------------------------------------------------------------- */

type Cta = { label: string; to?: string; href?: string; soft?: boolean };
type Product = {
  key: string;
  Icon: typeof Globe;
  tint: string;
  glyph: string;
  tag: string;
  name: string;
  desc: string;
  points: string[];
  cta: Cta;
  mock: ReactNode;
};

const PRODUCTS: Product[] = [
  {
    key: 'website', Icon: Globe, tint: '#E7EEFF', glyph: '#2563EB', tag: 'The Front Door',
    name: 'Gen-Z IITian Website',
    desc: 'Your starting point — discover courses, free PYQs & notes, blogs, and enroll in seconds with a neobrutalist, mobile-first experience.',
    points: ['Curated IIT-level courses', 'Free resources & graded assignments', 'Secure Razorpay checkout'],
    cta: { label: 'Visit Website', href: 'https://genziitian.in' },
    mock: <BrowserMock url="genziitian.in">{WebsiteSnap}</BrowserMock>,
  },
  {
    key: 'dashboard', Icon: LayoutDashboard, tint: '#E4F7EE', glyph: '#0E9E6A', tag: 'Learn',
    name: 'Class Dashboard',
    desc: 'The full learning hub — live & recorded lectures, structured weeks, progress tracking, doubt sessions and downloadable material.',
    points: ['Live + recorded lectures', 'Week-by-week structure', 'Progress & activity tracking'],
    cta: { label: 'Open Dashboard', href: 'https://class.genziitian.in' },
    mock: <BrowserMock url="class.genziitian.in">{DashboardSnap}</BrowserMock>,
  },
  {
    key: 'app', Icon: Smartphone, tint: '#F3E8FF', glyph: '#7C3AED', tag: 'On the go',
    name: 'Mobile App',
    desc: 'Learn anywhere. Daily 15-minute sessions, upcoming live classes, lecture pickup and instant support — right in your pocket.',
    points: ['Daily bite-size sessions', 'Live class reminders', 'Resume where you left off'],
    cta: { label: 'Coming Soon', soft: true },
    mock: <PhoneMock>{AppSnap}</PhoneMock>,
  },
  {
    key: 'exam', Icon: ClipboardCheck, tint: '#FEF1DF', glyph: '#FF7A00', tag: 'Practice',
    name: 'Exam Platform',
    desc: 'Real exam-style practice — timed quizzes, PYQ simulations and instant analysis so you walk into the Qualifier with zero surprises.',
    points: ['Timed, exam-pattern mocks', 'PYQ practice & solutions', 'Included in Live & Champion batches'],
    cta: { label: 'Explore in Courses', to: '/courses' },
    mock: <BrowserMock url="exam.genziitian.in">{ExamSnap}</BrowserMock>,
  },
  {
    key: 'social', Icon: Share2, tint: '#FBE3EE', glyph: '#EC1E79', tag: 'Community',
    name: 'Social Platforms',
    desc: 'A 14K+ strong community across YouTube, Instagram, LinkedIn and WhatsApp — free content, strategy, and a support system that never sleeps.',
    points: ['14K+ YouTube subscribers', 'Daily tips & reels', 'Active WhatsApp community'],
    cta: { label: 'Follow Us', href: 'https://youtube.com/@Gen-ZIITian/' },
    mock: <BrowserMock url="@Gen-ZIITian">{SocialSnap}</BrowserMock>,
  },
];

function CtaButton({ cta }: { cta: Cta }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm border-[3px] border-[#0b1120] transition-all ${
    cta.soft
      ? 'bg-white text-[#0b1120] opacity-70 cursor-default'
      : 'bg-[#10b981] text-[#0b1120] shadow-[4px_4px_0px_#0b1120] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0b1120]'
  }`;
  const inner = <>{cta.label} {!cta.soft && (cta.href ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />)}</>;
  if (cta.soft) return <span className={cls}>{inner}</span>;
  if (cta.href) return <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <Link to={cta.to!} className={cls}>{inner}</Link>;
}

export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-white text-[#0b1120] font-sans selection:bg-blue-100 overflow-hidden">
      {/* Hero */}
      <section className="relative px-5 sm:px-6 pt-14 pb-16 md:pt-20 md:pb-24 max-w-6xl mx-auto text-center">
        <div className="absolute top-10 left-[6%] w-14 h-14 bg-yellow-200 rounded-full border-[3px] border-[#0b1120] shadow-[4px_4px_0px_#0b1120] opacity-50 hidden md:block" />
        <div className="absolute bottom-10 right-[8%] w-16 h-16 bg-blue-200 rounded-2xl border-[3px] border-[#0b1120] shadow-[5px_5px_0px_#0b1120] opacity-50 rotate-12 hidden md:block" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f3e8ff] text-[#7c3aed] border-2 border-[#7c3aed] rounded-full font-black text-xs sm:text-sm mb-5 shadow-[3px_3px_0px_#7c3aed]">
          ✨ The Gen-Z IITian Ecosystem
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5">
          One ecosystem.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Everything</span>{' '}
          you need to crack IITM BS.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Website, class dashboard, mobile app, exam platform and a 14K+ community — every Gen-Z IITian product, built to work together.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {PRODUCTS.map(p => (
            <a key={p.key} href={`#${p.key}`} className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border-2 border-[#0b1120] rounded-full text-xs font-black shadow-[2px_2px_0px_#0b1120] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0b1120] transition-all">
              <span className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: p.tint, color: p.glyph }}>
                <p.Icon className="w-3 h-3" />
              </span>
              {p.name.replace('Gen-Z IITian ', '')}
            </a>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <div className="bg-[#f8fafc] border-y-[3px] border-[#0b1120]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 md:py-20 space-y-16 md:space-y-28">
          {PRODUCTS.map((p, i) => (
            <motion.section
              id={p.key}
              key={p.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col gap-8 md:gap-12 items-center lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} scroll-mt-24`}
            >
              {/* Copy */}
              <div className="flex-1 w-full">
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span className="w-11 h-11 rounded-xl border-[2.5px] border-[#0b1120] flex items-center justify-center shadow-[3px_3px_0px_#0b1120]" style={{ background: p.tint, color: p.glyph }}>
                    <p.Icon className="w-5 h-5" strokeWidth={2.2} />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border-2 border-[#0b1120] text-[10px] font-black uppercase tracking-widest">{p.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-3">{p.name}</h2>
                <p className="text-gray-500 font-medium text-base sm:text-lg leading-relaxed mb-5 max-w-xl">{p.desc}</p>
                <ul className="space-y-2.5 mb-7">
                  {p.points.map(pt => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#10b981] border-2 border-[#0b1120] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </span>
                      <span className="font-bold text-[#0b1120] text-sm sm:text-base">{pt}</span>
                    </li>
                  ))}
                </ul>
                <CtaButton cta={p.cta} />
              </div>

              {/* Snapshot */}
              <div className="flex-1 w-full flex justify-center">{p.mock}</div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="relative bg-[#0b1120] border-[4px] border-[#0b1120] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 text-center shadow-[10px_10px_0px_#10b981] overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">Ready to join the ecosystem?</h2>
            <p className="text-gray-300 font-medium text-base md:text-lg max-w-xl mx-auto mb-8">
              Start with a course and unlock the dashboard, exam platform and community in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-[#10b981] text-[#0b1120] rounded-xl font-black text-base border-[3px] border-[#0b1120] shadow-[5px_5px_0px_#fff] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#fff] transition-all">
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="https://class.genziitian.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0b1120] rounded-xl font-black text-base border-[3px] border-[#0b1120] hover:-translate-y-1 transition-all">
                Open Dashboard <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
