import { ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const STEPS = [
  { title: 'Discovery', desc: 'Defining technical requirements and system constraints.' },
  { title: 'Architecture', desc: 'Blueprinting scalable distributed systems.' },
  { title: 'Engineering', desc: 'Agile development cycles with continuous integration.' },
  { title: 'Validation', desc: 'Rigorous QA, security audits, and load testing.' },
  { title: 'Optimization', desc: 'Post-launch monitoring and continuous improvement.' },
];

export default function Process() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-10">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} text-center max-w-3xl mx-auto space-y-3`}>
        <h2 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
          The Engineering Process
        </h2>
        <p className="font-body-md text-on-surface-variant text-base lg:text-lg leading-relaxed">
          A rigorous approach to software construction, ensuring every system we build is resilient, scalable, and secure by design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {STEPS.map((s, idx) => (
          <div
            key={s.title}
            className="apple-liquid-glass p-9 lg:p-10 rounded-[40px] flex flex-col justify-between relative group hover:-translate-y-2.5 transition-all duration-500 overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all" />

            <div className="space-y-3 relative z-10">
              <h3 className="font-headline-lg text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                {s.desc}
              </p>
            </div>

            {idx < STEPS.length - 1 && (
              <div className="hidden lg:flex items-center justify-end pt-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1.5 transition-all">
                <ChevronRight size={22} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
