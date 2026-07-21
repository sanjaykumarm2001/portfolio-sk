import { Network } from 'lucide-react';

const SOCIALS = [
  {
    label: 'LinkedIn',
    path: 'M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46c0 .97.8 1.77 1.77 1.77h20.46c.97 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z',
  },
  {
    label: 'GitHub',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
];

const COLS = [
  { heading: 'Technologies', links: ['Cloud Infrastructure', 'DevOps', 'Web Applications', 'Data Systems'] },
  { heading: 'Resources', links: ['Engineering Notes', 'Case Studies', 'Open Source', 'Tools'] },
  { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Compliance'] },
];

export default function Footer() {
  return (
    <footer className="w-full rounded-t-[40px] mt-stack-lg bg-surface-container-lowest py-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Network className="text-primary" size={32} strokeWidth={2.2} />
            <span className="font-headline-lg text-[24px] font-black text-on-background">SK Engineering</span>
          </div>
          <p className="font-body-md text-on-surface-variant mb-8 pr-8">
            Systems Built for Excellence. We bridge the gap between complex engineering and business growth.
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                href="#"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.heading}>
            <h4 className="font-headline-lg text-lg font-bold text-on-surface mb-6">{c.heading}</h4>
            <ul className="space-y-4">
              {c.links.map((l) => (
                <li key={l}>
                  <a className="text-on-surface-variant hover:text-primary transition-all" href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-20 pt-8 border-t border-outline-variant/30 px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-on-surface-variant font-body-md text-sm">© 2024 SK Engineering. Systems Built for Excellence.</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-on-surface-variant font-mono">Status: All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
