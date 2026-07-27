import { Brain, Cloud, LayoutGrid, Smartphone, Code2, LucideIcon } from 'lucide-react';

export interface ServiceData {
  slug: string;
  category: 'ai' | 'cloud' | 'erp' | 'apps' | 'software';
  categoryLabel: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  deliverables: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'ai-development',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    icon: Brain,
    title: 'AI & Machine Learning Solutions',
    tagline: 'Practical AI systems and intelligent automation built to fit real business workflows.',
    description:
      'Designing and deploying AI-powered features, machine learning models, and intelligent automation—from predictive analytics and NLP to LLM-driven workflows—integrated directly into your existing software and cloud infrastructure.',
    longDescription:
      'Xublix helps businesses move beyond generic AI experiments into production-grade systems. We design and build AI-powered features, custom machine learning models, and intelligent automation pipelines that plug directly into your existing software, data, and cloud infrastructure. Whether you need predictive analytics, natural language processing, document intelligence, or LLM-driven workflow automation, we focus on solutions that are secure, maintainable, and measurably useful to your business—not just impressive demos.',
    tags: ['Python', 'LLMs', 'Machine Learning', 'AI Automation', 'Data Pipelines', 'APIs'],
    deliverables: [
      'AI feature design & feasibility assessment',
      'Custom machine learning model development',
      'LLM-powered workflow & chatbot integration',
      'Predictive analytics & data pipelines',
      'Secure deployment into existing cloud infrastructure',
    ],
    seoTitle: 'AI Development & Machine Learning Solutions | Xublix',
    seoDescription:
      'Xublix designs and deploys AI-powered software, machine learning models, and intelligent automation that integrate directly into your business systems and cloud infrastructure.',
    seoKeywords:
      'AI development company, AI solutions, machine learning solutions, AI automation, LLM integration, business automation, intelligent workflows',
  },
  {
    slug: 'cloud-migration',
    category: 'cloud',
    categoryLabel: 'Cloud Migration',
    icon: Cloud,
    title: 'Cloud Migration & Infrastructure Modernization',
    tagline: 'Seamless zero-downtime migration of legacy servers & databases to modern cloud platforms.',
    description:
      'Re-architecting legacy on-premise systems into automated, auto-scaling AWS/Azure cloud environments with 100% data integrity, high availability, and reduced operational overhead.',
    longDescription:
      'We help businesses move off fragile, expensive legacy infrastructure and onto modern, auto-scaling cloud platforms—without downtime or data loss. Our migration process re-architects on-premise servers, databases, and applications into cloud-native environments on AWS, Azure, or GCP, with automated scaling, redundant failovers, and infrastructure-as-code so your systems stay reliable and easy to maintain long after the migration is complete.',
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'DevOps'],
    deliverables: [
      'Legacy infrastructure audit & migration plan',
      'Zero-downtime cloud migration execution',
      'Auto-scaling architecture & cost optimization',
      'Infrastructure-as-code setup (Terraform)',
      'Post-migration monitoring & support',
    ],
    seoTitle: 'Cloud Migration & Infrastructure Services | Xublix',
    seoDescription:
      'Xublix provides zero-downtime cloud migration and infrastructure modernization services on AWS, Azure, and GCP—built for reliability, scale, and cost efficiency.',
    seoKeywords:
      'cloud migration services, cloud infrastructure company, AWS migration, Azure migration, cloud engineering, infrastructure modernization, Kubernetes consulting',
  },
  {
    slug: 'custom-erp',
    category: 'erp',
    categoryLabel: 'Custom ERP Systems',
    icon: LayoutGrid,
    title: 'Custom ERP & Business Workflow Automation',
    tagline: 'All-in-one centralized ERP software designed specifically for your company operations.',
    description:
      'Designing and building custom ERP platforms to manage inventory, finance, order tracking, and HR—replacing fragmented spreadsheets with unified real-time analytics and role-based permissions.',
    longDescription:
      'Off-the-shelf ERP software forces your business to adapt to someone else\'s workflow. We build custom ERP platforms designed around how your company actually operates—centralizing inventory, finance, order tracking, and HR into one system with real-time analytics, role-based permissions, and automation that replaces manual spreadsheets and disconnected tools.',
    tags: ['Node.js', 'React / Next.js', 'PostgreSQL', 'Redis', 'REST APIs', 'TailwindCSS'],
    deliverables: [
      'Business process discovery & workflow mapping',
      'Custom ERP architecture & data modeling',
      'Real-time dashboards & reporting',
      'Role-based access & permissions',
      'Integration with existing tools & systems',
    ],
    seoTitle: 'Custom ERP Software Development | Xublix',
    seoDescription:
      'Xublix builds custom ERP systems and business workflow automation tailored to your operations—replacing spreadsheets with unified, real-time software.',
    seoKeywords:
      'custom ERP software development, ERP development company, business process automation, enterprise software development, workflow automation',
  },
  {
    slug: 'app-development',
    category: 'apps',
    categoryLabel: 'Application Development',
    icon: Smartphone,
    title: 'Custom Web & Mobile Application Development',
    tagline: 'High-performance iOS, Android, and web applications built for speed & user engagement.',
    description:
      'End-to-end development of native-feel cross-platform mobile apps and responsive web applications with real-time push updates, offline data synchronization, and sleek UI/UX.',
    longDescription:
      'We design and build web and mobile applications end-to-end—from UI/UX to backend architecture to deployment. Our cross-platform mobile apps feel native, support offline data sync and real-time updates, while our web applications are built responsive, fast, and SEO-friendly from the ground up. Every application is engineered to scale as your user base grows.',
    tags: ['React Native', 'Flutter', 'Next.js', 'TypeScript', 'GraphQL', 'TailwindCSS'],
    deliverables: [
      'UI/UX design & prototyping',
      'Cross-platform mobile app development (iOS & Android)',
      'Responsive web application development',
      'Real-time sync & push notifications',
      'App store deployment & ongoing support',
    ],
    seoTitle: 'Web & Mobile Application Development | Xublix',
    seoDescription:
      'Xublix builds high-performance web applications and cross-platform mobile apps engineered for speed, scale, and user engagement.',
    seoKeywords:
      'web application development, mobile app development company, cross-platform app development, custom app development, enterprise web application development',
  },
  {
    slug: 'software-development',
    category: 'software',
    categoryLabel: 'Software Creation',
    icon: Code2,
    title: 'Bespoke Software Creation & API Integration',
    tagline: 'Bespoke software products engineered to solve complex operational challenges.',
    description:
      'Custom software engineering from initial technical architecture to final cloud deployment. Building secure RESTful APIs, third-party payment/CRM integrations, and specialized internal tools.',
    longDescription:
      'When off-the-shelf software can\'t solve your problem, we build exactly what you need—from initial technical architecture through to final cloud deployment. That includes secure RESTful APIs, third-party payment and CRM integrations, internal tools, and specialized systems engineered to fit your exact operational requirements, not a generic template.',
    tags: ['Python', 'TypeScript', 'Microservices', 'Docker', 'PostgreSQL', 'REST APIs'],
    deliverables: [
      'Technical architecture & system design',
      'Custom software engineering & development',
      'Secure API development & integration',
      'Third-party payment/CRM integrations',
      'Cloud deployment & ongoing maintenance',
    ],
    seoTitle: 'Custom Software Development & API Integration | Xublix',
    seoDescription:
      'Xublix engineers bespoke software products and secure API integrations, from technical architecture through to cloud deployment.',
    seoKeywords:
      'custom software development company, API development services, bespoke software development, software engineering company, system integration',
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
