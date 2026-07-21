import {
  ShieldCheck,
  Sparkles,
  Compass,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Search,
  Layout,
  Code2,
  Rocket,
  Activity,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const BELIEFS = [
  {
    icon: ShieldCheck,
    title: 'Reliability',
    desc: 'We build systems that are dependable.',
  },
  {
    icon: Compass,
    title: 'Simplicity',
    desc: 'Simple solutions are easier to maintain and scale.',
  },
  {
    icon: Sparkles,
    title: 'Quality',
    desc: 'Every detail matters, from code to deployment.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership',
    desc: 'We work alongside our clients, not just for them.',
  },
];

const WORK_STEPS = [
  { step: '01', title: 'Understand', icon: Search, desc: 'Analyzing business goals & technical context.' },
  { step: '02', title: 'Plan', icon: Layout, desc: 'Blueprinting clean, scalable system architecture.' },
  { step: '03', title: 'Build', icon: Code2, desc: 'Crafting robust code & automated infrastructure.' },
  { step: '04', title: 'Deploy', icon: Rocket, desc: 'Zero-downtime releases & health monitoring.' },
  { step: '05', title: 'Support', icon: Activity, desc: 'Ongoing proactive maintenance & SLA support.' },
];

export default function About() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-24 lg:space-y-32">
      {/* 1. HERO INTRO STATEMENT */}
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} text-center max-w-4xl mx-auto space-y-6 pt-4`}>
        <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.15] tracking-tight">
          Building Software &amp; Cloud Systems <br />
          <span className="text-primary italic">That Power Modern Business.</span>
        </h1>
        <p className="font-body-md text-on-surface-variant text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
          SK Engineering partners with businesses to design, build, and maintain reliable digital products and cloud infrastructure.
        </p>
      </div>

      {/* 2. WHAT MATTERS MOST */}
      <div className="apple-liquid-glass p-10 lg:p-16 rounded-[52px] max-w-container-max mx-auto space-y-5 relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/20 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-500/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

        <div className="relative z-10 space-y-4">
          <h2 className="font-headline-lg text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            What Matters Most
          </h2>
          <p className="font-headline-lg text-xl lg:text-3xl text-on-surface/90 leading-relaxed tracking-tight font-medium pt-2 max-w-5xl">
            <span className="text-primary font-bold">Reliable software.</span>{' '}
            <span className="text-on-surface font-bold">Scalable infrastructure.</span>{' '}
            <span className="text-primary font-bold">Clean architecture.</span>{' '}
            <span className="text-on-surface font-bold">Thoughtful automation.</span>{' '}
            Every project is built to perform today while remaining maintainable for years to come.
          </p>
        </div>
      </div>

      {/* 3. WHAT WE BELIEVE */}
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
            What We Believe
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BELIEFS.map((b) => (
            <div
              key={b.title}
              className="apple-liquid-glass p-9 lg:p-10 rounded-[40px] flex flex-col justify-between relative group hover:-translate-y-2.5 transition-all duration-500 overflow-hidden min-h-[220px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all" />

              <div className="space-y-3 relative z-10">
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HOW WE WORK */}
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {WORK_STEPS.map((s, idx) => (
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

              {idx < WORK_STEPS.length - 1 && (
                <div className="hidden lg:flex items-center justify-end pt-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1.5 transition-all">
                  <ChevronRight size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. OUR COMMITMENT */}
      <div className="apple-liquid-glass p-10 lg:p-16 rounded-[52px] max-w-container-max mx-auto text-center relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-label-sm border border-primary/20">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>OUR COMMITMENT</span>
          </div>
          <h2 className="font-headline-lg text-3xl lg:text-5xl font-extrabold text-on-surface max-w-4xl mx-auto leading-snug tracking-tight">
            "Reliable software starts with thoughtful engineering."
          </h2>
          <p className="text-on-surface-variant text-base max-w-xl mx-auto pt-2">
            We don't just deliver projects. We build long-term solutions that support your growth at every stage.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-9 py-4 rounded-full font-bold text-base hover:scale-105 transition-all shadow-lg"
            >
              Start Your Project <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
