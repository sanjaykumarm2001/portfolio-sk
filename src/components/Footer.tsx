import { Network } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full rounded-t-[52px] mt-stack-lg apple-liquid-glass-dark py-12 lg:py-16 relative overflow-hidden">
      {/* Specular Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 h-px left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 px-margin-desktop max-w-container-max mx-auto items-start">
        {/* Col 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Network size={26} strokeWidth={2.2} />
            </div>
            <span className="font-headline-lg text-[24px] font-extrabold text-white tracking-tight">SK Engineering</span>
          </div>
          <p className="font-body-md text-slate-300 text-sm leading-relaxed">
            Systems Built for Excellence. We bridge the gap between complex engineering and business growth.
          </p>
        </div>

        {/* Col 2: Pages */}
        <div>
          <h4 className="font-headline-lg text-base font-bold text-white uppercase tracking-wider mb-5">Pages</h4>
          <ul className="space-y-3 font-medium text-sm">
            <li><button onClick={() => onNavigate?.('home')} className="text-slate-300 hover:text-white transition-all text-left">Home</button></li>
            <li><button onClick={() => onNavigate?.('services')} className="text-slate-300 hover:text-white transition-all text-left">Services</button></li>
            <li><button onClick={() => onNavigate?.('about')} className="text-slate-300 hover:text-white transition-all text-left">About</button></li>
            <li><button onClick={() => onNavigate?.('contact')} className="text-slate-300 hover:text-white transition-all text-left">Contact &amp; Project Planner</button></li>
          </ul>
        </div>

        {/* Col 3: Capabilities */}
        <div>
          <h4 className="font-headline-lg text-base font-bold text-white uppercase tracking-wider mb-5">Capabilities</h4>
          <ul className="space-y-3 text-sm text-slate-300 font-medium">
            <li>Software Solutions</li>
            <li>Digital Experiences</li>
            <li>Cloud Platforms</li>
            <li>Automation &amp; DevOps</li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="font-headline-lg text-base font-bold text-white uppercase tracking-wider mb-5">Contact</h4>
          <ul className="space-y-3.5 text-sm text-slate-300">
            <li className="font-mono text-sm text-slate-200">sanjai202001@gmail.com</li>
            <li className="font-mono text-sm text-slate-200">+91 9080484248</li>
            <li className="pt-2">
              <button
                onClick={() => onNavigate?.('contact')}
                className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold text-xs hover:scale-105 transition-all shadow-md"
              >
                Schedule Meeting
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
