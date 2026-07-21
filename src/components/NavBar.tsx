import { Network } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max z-50 bg-surface/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_0_rgba(15,23,42,0.04)] flex justify-between items-center px-margin-desktop py-4">
      <div className="flex items-center gap-3">
        <Network className="text-primary" size={32} strokeWidth={2.2} />
        <span className="font-headline-lg text-[24px] font-bold tracking-tighter text-on-surface">SK Engineering</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a className="text-primary font-semibold font-body-md transition-colors" href="#">Home</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#services">Technologies</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#process">Resources</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#insights">Engineering Notes</a>
      </nav>
      <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-md">
        Start Project
      </button>
    </header>
  );
}
