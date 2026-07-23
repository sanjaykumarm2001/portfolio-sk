import { useState } from 'react';
import {
  Sparkles,
  Cloud,
  LayoutGrid,
  Smartphone,
  Code2,
  ArrowUpRight,
  ArrowRight,
  Award,
} from 'lucide-react';

interface ShowcaseProps {
  onNavigate?: (page: string) => void;
}

interface Capability {
  id: string;
  category: 'cloud' | 'erp' | 'apps' | 'software';
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

const CAPABILITIES: Capability[] = [
  {
    id: 'cloud-migration',
    category: 'cloud',
    categoryLabel: 'Cloud Migration',
    title: 'Cloud Migration & Infrastructure Modernization',
    tagline: 'Seamless zero-downtime migration of legacy servers & databases to modern cloud platforms.',
    description:
      'Re-architecting legacy on-premise systems into automated, auto-scaling AWS/Azure cloud environments with 100% data integrity, high availability, and reduced operational overhead.',
    metrics: [
      { label: 'Migration Downtime', value: 'Zero' },
      { label: 'Cost Reduction', value: 'Up to 45%' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'DevOps'],
  },
  {
    id: 'custom-erp',
    category: 'erp',
    categoryLabel: 'Custom ERP Systems',
    title: 'Custom ERP & Business Workflow Automation',
    tagline: 'All-in-one centralized ERP software designed specifically for your company operations.',
    description:
      'Designing and building custom ERP platforms to manage inventory, finance, order tracking, and HR—replacing fragmented spreadsheets with unified real-time analytics and role-based permissions.',
    metrics: [
      { label: 'Workflow Match', value: '100% Custom' },
      { label: 'Ops Efficiency', value: '3x Faster' },
      { label: 'Reporting', value: 'Real-time' },
    ],
    tags: ['Node.js', 'React / Next.js', 'PostgreSQL', 'Redis', 'REST APIs', 'TailwindCSS'],
  },
  {
    id: 'app-development',
    category: 'apps',
    categoryLabel: 'Application Development',
    title: 'Custom Web & Mobile Application Development',
    tagline: 'High-performance iOS, Android, and web applications built for speed & user engagement.',
    description:
      'End-to-end development of native-feel cross-platform mobile apps and responsive web applications with real-time push updates, offline data synchronization, and sleek UI/UX.',
    metrics: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'API Response', value: '< 80ms' },
      { label: 'UI Speed', value: '60 FPS' },
    ],
    tags: ['React Native', 'Flutter', 'Next.js', 'TypeScript', 'GraphQL', 'TailwindCSS'],
  },
  {
    id: 'software-creation',
    category: 'software',
    categoryLabel: 'Software Creation',
    title: 'Bespoke Software Creation & API Integration',
    tagline: 'Bespoke software products engineered to solve complex operational challenges.',
    description:
      'Custom software engineering from initial technical architecture to final cloud deployment. Building secure RESTful APIs, third-party payment/CRM integrations, and specialized internal tools.',
    metrics: [
      { label: 'Code Base', value: '100% Custom' },
      { label: 'Security', value: 'Enterprise Grade' },
      { label: 'Support SLA', value: 'Dedicated' },
    ],
    tags: ['Python', 'TypeScript', 'Microservices', 'Docker', 'PostgreSQL', 'REST APIs'],
  },
];

const STATS = [
  { icon: Cloud, label: 'Successful Cloud Migrations', value: '100%' },
  { icon: LayoutGrid, label: 'ERP & Custom Systems', value: 'Custom' },
  { icon: Smartphone, label: 'Cross-Platform Apps Developed', value: 'Web & Mobile' },
  { icon: Award, label: 'Dedicated Engineering Support', value: '24/7 SLA' },
];

export default function Showcase({ onNavigate }: ShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cloud' | 'erp' | 'apps' | 'software'>('all');

  const filteredCapabilities =
    activeFilter === 'all'
      ? CAPABILITIES
      : CAPABILITIES.filter((c) => c.category === activeFilter);

  return (
    <section id="showcase" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-10">
      {/* 1. Header Block */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-2">
        <div className="space-y-3 max-w-2xl">
          <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-[1.15]">
            Engineering Solutions <br />
            <span className="text-primary italic">Built For Your Business.</span>
          </h2>
          <p className="font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed font-medium">
            High-performance cloud migration, custom ERP systems, web &amp; mobile applications, and bespoke software creation.
          </p>
        </div>

        <button
          onClick={() => onNavigate?.('contact')}
          className="apple-liquid-cta-btn px-7 py-3.5 rounded-full font-bold text-sm text-white flex items-center gap-2 group whitespace-nowrap shadow-md"
        >
          <span>Start Your Project</span>
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Stat Overview Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => {
          const IconComponent = s.icon;
          return (
            <div
              key={s.label}
              className="apple-liquid-glass p-7 rounded-[32px] flex flex-col justify-between relative group hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/15 transition-all" />

              <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform relative z-10">
                <IconComponent size={22} />
              </div>
              <div className="relative z-10">
                <div className="text-3xl font-extrabold text-on-surface tracking-tight">{s.value}</div>
                <div className="text-on-surface-variant text-sm font-medium mt-1 leading-snug">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Category Filter Navigation Pills */}
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

      {/* 4. Capability Cards Grid (Matches Services.tsx & About.tsx Apple Liquid Glass styling) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {filteredCapabilities.map((c) => (
          <div
            key={c.id}
            className="apple-liquid-glass p-9 lg:p-10 rounded-[40px] flex flex-col justify-between relative group hover:-translate-y-2.5 transition-all duration-500 overflow-hidden min-h-[300px] w-full"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                  {c.categoryLabel}
                </span>
                <span className="text-on-surface-variant/60 text-xs font-mono">Neublix Capability</span>
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
        ))}
      </div>
    </section>
  );
}
