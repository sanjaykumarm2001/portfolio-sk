import { useEffect } from 'react';

interface SEOProps {
  currentPage: string;
}

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  schema: Record<string, unknown>;
}

const SITE_URL = 'https://xublix.com';
const OG_IMAGE = `${SITE_URL}/logo.svg`;

const META_MAP: Record<string, PageMeta> = {
  home: {
    title: 'Xublix | Systems Built for Excellence - Software & Cloud Systems',
    description:
      'Xublix partners with modern businesses to design, build, and scale reliable digital products, cloud infrastructure, microservices, and custom ERP systems.',
    canonical: `${SITE_URL}/`,
    keywords:
      'Xublix, cloud infrastructure, custom ERP systems, microservices, web development, DevOps, software engineering, digital products',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Xublix',
          url: SITE_URL,
          logo: OG_IMAGE,
          description: 'Systems Built for Excellence. Engineering reliable digital products and cloud infrastructure.',
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@xublix.com',
            contactType: 'customer support',
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Xublix',
          description: 'Systems Built for Excellence',
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
      ],
    },
  },
  services: {
    title: 'Engineering Services & Cloud Solutions | Xublix',
    description:
      'Explore Xublix engineering capabilities: cloud migrations, containerized microservices, DevOps pipelines, cross-platform mobile apps, and bespoke software solutions.',
    canonical: `${SITE_URL}/#services`,
    keywords:
      'cloud migration, microservices architecture, DevOps automation, custom software, ERP systems, cross-platform apps, Xublix services',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Xublix Engineering Services',
      url: `${SITE_URL}/#services`,
      description: 'End-to-end engineering services from cloud migrations to bespoke software creations.',
      provider: {
        '@type': 'Organization',
        name: 'Xublix',
        url: SITE_URL,
      },
    },
  },
  about: {
    title: 'About Xublix | Next-Gen Software & Cloud Engineering',
    description:
      'Learn how Xublix bridges complex software engineering with business growth through enterprise cloud architecture and high-performance digital systems.',
    canonical: `${SITE_URL}/#about`,
    keywords:
      'about Xublix, software engineering company, cloud architecture team, digital transformation, enterprise software',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Xublix',
      url: `${SITE_URL}/#about`,
      description: 'Xublix partners with businesses to design, build, and maintain reliable digital products.',
    },
  },
  contact: {
    title: 'Contact Xublix | Project Planner & Engineering Consultation',
    description:
      'Get in touch with Xublix senior engineering team. Request project estimates, technical consults, and architectural reviews for your next digital initiative.',
    canonical: `${SITE_URL}/#contact`,
    keywords:
      'contact Xublix, hire software engineers, cloud architecture consult, project planner, software estimate',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Xublix',
      url: `${SITE_URL}/#contact`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Xublix',
        email: 'contact@xublix.com',
      },
    },
  },
};

export default function SEO({ currentPage }: SEOProps) {
  useEffect(() => {
    const meta = META_MAP[currentPage] || META_MAP.home;

    // 1. Update Document Title
    document.title = meta.title;

    // Helper function to set/update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to set/update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Canonical Link
    setLinkTag('canonical', meta.canonical);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.canonical);
    setMetaTag('property', 'og:site_name', 'Xublix');
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', OG_IMAGE);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', OG_IMAGE);

    // 6. Dynamic JSON-LD Structured Data
    const scriptId = 'xublix-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(meta.schema);
  }, [currentPage]);

  return null;
}
