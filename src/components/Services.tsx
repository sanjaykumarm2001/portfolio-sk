import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const SERVICES = [
  {
    title: 'Software Solutions',
    desc: 'Custom, enterprise-grade software architectures engineered for durability, high throughput, and long-term scale.',
  },
  {
    title: 'Digital Experiences',
    desc: 'Captivating web interfaces and client platforms optimized for user engagement, SEO, and lightning-fast speed.',
  },
  {
    title: 'Business Applications',
    desc: 'Tailored SaaS platforms, internal tools, and integrated workflows built to streamline core business operations.',
  },
  {
    title: 'Cloud Platforms',
    desc: 'Multi-region cloud infrastructure on AWS & GCP engineered for 99.99% availability and cost optimization.',
  },
  {
    title: 'Automation & DevOps',
    desc: 'Streamlined CI/CD deployment pipelines, automated quality checks, and zero-touch system workflows.',
  },
  {
    title: 'Infrastructure Operations',
    desc: '24/7 monitoring, automated healing, security governance, and proactive managed infrastructure support.',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic IT solutions and consulting for digital transformation.',
  },
  {
    title: 'New Product Development',
    desc: 'Innovative product design and development from concept to market.',
  },
  {
    title: 'Integrators',
    desc: 'System integration, API development for seamless connectivity.',
  },
  {
    title: 'Strategy Development',
    desc: 'Guiding businesses with actionable digital transformation strategies.',
  },
];

export default function Services() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="apple-liquid-glass p-9 lg:p-10 rounded-[40px] flex flex-col justify-between relative group hover:-translate-y-2.5 transition-all duration-500 overflow-hidden h-full min-h-[240px] w-full"
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

              <div className="pt-6 relative z-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
