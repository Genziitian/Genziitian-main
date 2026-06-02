import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, FolderOpen, Menu as MenuIcon } from 'lucide-react';

type Tab = {
  id: string;
  label: string;
  to: string;
  Icon: typeof HomeIcon;
  /** extra path prefixes that should keep this tab highlighted */
  match?: string[];
};

const TABS: Tab[] = [
  { id: 'home', label: 'Home', to: '/', Icon: HomeIcon },
  { id: 'courses', label: 'Courses', to: '/courses', Icon: BookOpen },
  { id: 'resources', label: 'Resources', to: '/resources', Icon: FolderOpen, match: ['/resources', '/syllabus', '/graded-assignment', '/blog', '/docs'] },
  { id: 'menu', label: 'Menu', to: '/menu', Icon: MenuIcon, match: ['/menu', '/about', '/contact', '/newsletter', '/profile', '/privacy', '/terms', '/refund', '/refer'] },
];

function isActive(tab: Tab, pathname: string): boolean {
  if (tab.to === '/') return pathname === '/';
  const prefixes = tab.match ?? [tab.to];
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p));
}

/**
 * Fixed bottom tab bar shown on mobile only (md:hidden). Mirrors the
 * Gen-Z IITian mobile design: Home · Courses · Resources · Menu.
 */
export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-[90] bg-white border-t-[2.5px] border-[#0b1120]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 14px)' }}
    >
      <div className="grid grid-cols-4 px-1.5 pt-2 pb-1.5 max-w-md mx-auto">
        {TABS.map((tab) => {
          const on = isActive(tab, pathname);
          const { Icon } = tab;
          return (
            <Link
              key={tab.id}
              to={tab.to}
              aria-current={on ? 'page' : undefined}
              className="flex flex-col items-center gap-1 px-1 py-1.5 min-h-[48px]"
            >
              <span
                className={`flex items-center justify-center w-[46px] h-[30px] rounded-[9px] border-2 transition-colors ${
                  on
                    ? 'bg-blue-600 text-white border-[#0b1120] shadow-[2px_2px_0px_#0b1120]'
                    : 'bg-transparent text-gray-400 border-transparent'
                }`}
              >
                <Icon className="w-[19px] h-[19px]" strokeWidth={on ? 2.4 : 2} />
              </span>
              <span className={`text-[10px] tracking-tight ${on ? 'font-black text-[#0b1120]' : 'font-bold text-gray-400'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
