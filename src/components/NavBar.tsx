import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function NavBar({ currentPage, onNavigate }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max z-50">
      <div className="apple-liquid-nav-container rounded-full px-5 sm:px-7 py-3 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-white/50 border border-white/90 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,1),0_4px_12px_rgba(37,99,235,0.12)] flex items-center justify-center text-sky-500 group-hover:scale-105 transition-all duration-300">
            <Logo size={24} color="#3b82f6" className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-[22px] font-black tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-slate-800 bg-clip-text text-transparent">
              Xublix
            </span>
          </div>
        </div>

        {/* Desktop Liquid Glass Nav Tabs */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="apple-liquid-nav-track p-1.5 rounded-full flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-300 relative ${
                    isActive ? 'apple-liquid-tab-active' : 'apple-liquid-tab-inactive'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary/80 rounded-full blur-[1px]" />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => handleNavClick('contact')}
            className="apple-liquid-cta-btn px-6 py-2.5 rounded-full font-bold text-sm text-white flex items-center gap-2"
          >
            <span>Start Project</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-10 h-10 rounded-full bg-white/40 border border-white/80 flex items-center justify-center text-slate-800 shadow-sm active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Liquid Glass Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 apple-liquid-nav-container rounded-3xl p-5 shadow-2xl space-y-3 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-5 py-3 rounded-2xl text-base transition-all ${
                    isActive ? 'apple-liquid-tab-active' : 'apple-liquid-tab-inactive'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-white/40">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full apple-liquid-cta-btn py-3.5 rounded-2xl font-bold text-center text-white flex items-center justify-center gap-2"
            >
              <span>Start Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

