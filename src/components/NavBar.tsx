import { Network } from 'lucide-react';

interface NavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function NavBar({ currentPage, onNavigate }: NavBarProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max z-50 bg-surface/80 backdrop-blur-xl rounded-full border border-white/30 shadow-[0_8px_32px_0_rgba(15,23,42,0.08)] flex justify-between items-center px-margin-desktop py-3.5">
      <div
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <Network className="text-primary group-hover:scale-110 transition-transform" size={30} strokeWidth={2.2} />
        <span className="font-headline-lg text-[22px] font-bold tracking-tighter text-on-surface">SK Engineering</span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden md:flex items-center gap-2 bg-surface-container-low/80 p-1.5 rounded-full border border-surface-container-highest/60">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Start Project
        </button>
      </div>
    </header>
  );
}
