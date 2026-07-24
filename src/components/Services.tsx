import { useState } from 'react';
import { ArrowRight, Sparkles, Cloud, LayoutGrid, Smartphone, Code2 } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

interface PrimaryService {
  id: string;
  category: 'cloud' | 'erp' | 'apps' | 'software';
  categoryLabel: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

const PRIMARY_SERVICES: PrimaryService[] = [
  {
    id: 'cloud-migration',
    category: 'cloud',
    categoryLabel: 'Cloud Migration',
    icon: Cloud,
    title: 'Cloud Migration & Infrastructure Modernization',
    tagline: 'Seamless zero-downtime migration of legacy servers & databases to modern cloud platforms.',
    description:
      'Re-architecting legacy on-premise systems into automated, auto-scaling AWS/Azure cloud environments with 100% data integrity, high availability, and reduced operational overhead.',
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'DevOps'],
  },
  {
    id: 'custom-erp',
    category: 'erp',
    categoryLabel: 'Custom ERP Systems',
    icon: LayoutGrid,
    title: 'Custom ERP & Business Workflow Automation',
    tagline: 'All-in-one centralized ERP software designed specifically for your company operations.',
    description:
      'Designing and building custom ERP platforms to manage inventory, finance, order tracking, and HR—replacing fragmented spreadsheets with unified real-time analytics and role-based permissions.',
    tags: ['Node.js', 'React / Next.js', 'PostgreSQL', 'Redis', 'REST APIs', 'TailwindCSS'],
  },
  {
    id: 'app-development',
    category: 'apps',
    categoryLabel: 'Application Development',
    icon: Smartphone,
    title: 'Custom Web & Mobile Application Development',
    tagline: 'High-performance iOS, Android, and web applications built for speed & user engagement.',
    description:
      'End-to-end development of native-feel cross-platform mobile apps and responsive web applications with real-time push updates, offline data synchronization, and sleek UI/UX.',
    tags: ['React Native', 'Flutter', 'Next.js', 'TypeScript', 'GraphQL', 'TailwindCSS'],
  },
  {
    id: 'software-creation',
    category: 'software',
    categoryLabel: 'Software Creation',
    icon: Code2,
    title: 'Bespoke Software Creation & API Integration',
    tagline: 'Bespoke software products engineered to solve complex operational challenges.',
    description:
      'Custom software engineering from initial technical architecture to final cloud deployment. Building secure RESTful APIs, third-party payment/CRM integrations, and specialized internal tools.',
    tags: ['Python', 'TypeScript', 'Microservices', 'Docker', 'PostgreSQL', 'REST APIs'],
  },
];

const SPECIALIZED_SERVICES = [
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
    title: 'System Integration',
    desc: 'System integration, API development for seamless connectivity across legacy and modern platforms.',
  },
];

export default function Services({ onNavigate }: ServicesProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<'all' | 'cloud' | 'erp' | 'apps' | 'software'>('all');

  const filteredCapabilities =
    activeFilter === 'all'
      ? PRIMARY_SERVICES
      : PRIMARY_SERVICES.filter((c) => c.category === activeFilter);

  return (
    <section id="services" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-16">
      {/* 1. Header Section */}
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} space-y-4 max-w-3xl`}>
        <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
          Services Built to Scale <br />
          <span className="text-primary italic">Your Business.</span>
        </h1>
        <p className="font-body-md text-on-surface-variant text-lg sm:text-xl leading-relaxed font-medium">
          Xublix provides end-to-end engineering services from cloud migrations and custom ERP systems to high-performance mobile apps and bespoke software creations.
        </p>
      </div>

      {/* 2. Interactive Category Filter Navigation Pills */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'cloud', label: 'Cloud Migration' },
          { id: 'erp', label: 'Custom ERP Systems' },
          { id: 'apps', label: 'Application Development' },
          { id: 'software', label: 'Software Creation' },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'apple-liquid-glass text-on-surface-variant hover:text-on-surface hover:scale-105'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Primary Core Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {filteredCapabilities.map((c) => {
          const IconComponent = c.icon;
          return (
            <div
              key={c.id}
              className="apple-liquid-glass p-9 lg:p-10 rounded-[40px] flex flex-col justify-between relative group hover:-translate-y-2.5 transition-all duration-500 overflow-hidden min-h-[300px] w-full"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all" />

              <div className="space-y-5 relative z-10">
                {/* Top Card Icon & Capability Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <IconComponent size={22} />
                  </div>
                  <span className="text-on-surface-variant/60 text-xs font-mono font-medium">Xublix Capability</span>
                </div>

                <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {c.title}
                </h3>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/60 border border-slate-200 text-on-surface text-xs font-mono font-medium shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 relative z-10 flex items-center justify-between border-t border-slate-200/60 mt-6">
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  Request Proposal <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Specialized Capabilities Catalog */}
      <div className="space-y-8 pt-8 border-t border-slate-200/60">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight">
            Specialized Engineering Capabilities
          </h2>
          <p className="text-on-surface-variant text-base font-medium mt-1">
            Comprehensive technology services to support your digital transformation roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {SPECIALIZED_SERVICES.map((s) => (
            <div
              key={s.title}
              className="apple-liquid-glass p-8 lg:p-9 rounded-[36px] flex flex-col justify-between relative group hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full min-h-[220px] w-full"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all" />

              <div className="space-y-3 relative z-10">
                <h3 className="font-headline-lg text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
