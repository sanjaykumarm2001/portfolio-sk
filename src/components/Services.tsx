import { Code2, Cloud, Terminal, Server, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const SERVICES: Service[] = [
  { icon: Code2, title: 'Software Engineering', desc: 'Custom-built enterprise software that scales with your business logic and demands.' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Cloud-native architectures designed for 99.99% availability and global distribution.' },
  { icon: Terminal, title: 'DevOps Automation', desc: 'Streamlined CI/CD pipelines that turn code into customer value in minutes, not days.' },
  { icon: Server, title: 'Managed Infra', desc: '24/7 monitoring and automated healing for mission-critical infrastructure systems.' },
];

export default function Services() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} mb-stack-md`}>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Engineering Platform</h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl">
          A comprehensive suite of engineering services to scale your digital presence from zero to millions of concurrent users.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="glass-panel p-8 rounded-[32px] group hover:bg-white/60 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <s.icon size={28} strokeWidth={2} />
            </div>
            <h3 className="font-headline-lg text-2xl font-bold mb-3 text-on-surface">{s.title}</h3>
            <p className="font-body-md text-on-surface-variant text-sm mb-6">{s.desc}</p>
            <a className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
              Learn more <ArrowRight size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
