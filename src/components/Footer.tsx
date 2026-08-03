import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-[52px] mt-stack-lg apple-liquid-glass-dark py-12 lg:py-16 relative overflow-hidden">
      {/* Specular Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 h-px left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 px-margin-desktop max-w-container-max mx-auto items-start">
        {/* Col 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Logo size={26} color="#60a5fa" />
            </div>
            <span className="font-headline-lg text-[24px] font-extrabold text-white tracking-tight">Xublix</span>
          </Link>
          <p className="font-body-md text-slate-300 text-sm leading-relaxed">
            Build AI-powered software that helps businesses automate, scale, and grow.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/company/www.xublix.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-500/20 hover:border-sky-400/40 hover:scale-105 transition-all shadow-sm group"
            >
              <Linkedin className="w-5 h-5 group-hover:text-sky-400 transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/xublix_official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500/20 hover:border-pink-400/40 hover:scale-105 transition-all shadow-sm group"
            >
              <Instagram className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Col 2: Pages */}
        <div>
          <h4 className="font-headline-lg text-base font-bold text-white uppercase tracking-wider mb-5">Pages</h4>
          <ul className="space-y-3 font-medium text-sm">
            <li><Link to="/" className="text-slate-300 hover:text-white transition-all text-left">Home</Link></li>
            <li><Link to="/services" className="text-slate-300 hover:text-white transition-all text-left">Services</Link></li>
            <li><Link to="/about" className="text-slate-300 hover:text-white transition-all text-left">About</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-white transition-all text-left">Contact &amp; Project Planner</Link></li>
          </ul>
        </div>

        {/* Col 3: Capabilities */}
        <div>
          <h4 className="font-headline-lg text-base font-bold text-white uppercase tracking-wider mb-5">Capabilities</h4>
          <ul className="space-y-3 text-sm text-slate-300 font-medium">
            <li>AI &amp; Machine Learning</li>
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
            <li>
              <a href="mailto:contact@www.xublix.com" className="text-slate-200 font-bold hover:text-white transition-colors font-mono text-sm">
                contact@www.xublix.com
              </a>
            </li>
            <li className="pt-2">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-primary text-on-primary rounded-full font-bold text-xs hover:scale-105 transition-all shadow-md"
              >
                Schedule Meeting
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar / Copyright & Socials */}
      <div className="relative z-10 mt-12 pt-8 border-t border-white/10 px-margin-desktop max-w-container-max mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <p>© {new Date().getFullYear()} Xublix. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/www.xublix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
            <span>LinkedIn</span>
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://www.instagram.com/xublix_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Instagram className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

