import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  schema: Record<string, unknown>;
}

const SITE_URL = 'https://www.xublix.com';
const OG_IMAGE = `${SITE_URL}/logo.svg`;

const STATIC_META: Record<string, Omit<PageMeta, 'canonical'>> = {
  '/': {
    title: 'AI Solutions, Custom Software Development & Cloud Infrastructure | Xublix',
    description:
      'Xublix helps businesses build AI-powered software, custom web applications, cloud infrastructure, and DevOps automation. We deliver secure, intelligent, high-performance technology that accelerates business growth.',
    keywords:
      'Xublix, AI solutions, AI development company, machine learning, business automation, custom software development company, web application development, cloud infrastructure services, DevOps consulting, API development, SaaS development, enterprise software, digital transformation',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Xublix',
          url: SITE_URL,
          logo: OG_IMAGE,
          description:
            'Xublix helps businesses build AI-powered software, cloud infrastructure, and custom digital products that automate, scale, and grow.',
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
          description: 'AI Solutions, Custom Software Development & Cloud Infrastructure',
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
      ],
    },
  },
  '/services': {
    title: 'AI, Engineering & Cloud Services | Xublix',
    description:
      'Explore Xublix capabilities: AI & machine learning solutions, cloud migrations, containerized microservices, DevOps pipelines, cross-platform mobile apps, and bespoke software solutions.',
    keywords:
      'AI solutions, machine learning, cloud migration, microservices architecture, DevOps automation, custom software, ERP systems, cross-platform apps, Xublix services',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Xublix Engineering Services',
      url: `${SITE_URL}/services`,
      description: 'End-to-end engineering services from AI & machine learning to bespoke software creations.',
      provider: {
        '@type': 'Organization',
        name: 'Xublix',
        url: SITE_URL,
      },
    },
  },
  '/about': {
    title: 'About Xublix | Next-Gen Software, AI & Cloud Engineering',
    description:
      'Learn how Xublix bridges complex software engineering with business growth through AI-powered solutions, enterprise cloud architecture, and high-performance digital systems.',
    keywords:
      'about Xublix, software engineering company, AI solutions, cloud architecture team, digital transformation, enterprise software',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Xublix',
      url: `${SITE_URL}/about`,
      description: 'Xublix partners with businesses to design, build, and scale reliable digital products and AI-powered solutions.',
    },
  },
  '/contact': {
    title: 'Contact Xublix | Project Planner & Engineering Consultation',
    description:
      'Get in touch with the Xublix team. Request project estimates, technical consults, and architectural reviews for your next digital initiative.',
    keywords:
      'contact Xublix, hire software engineers, cloud architecture consult, project planner, software estimate',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Xublix',
      url: `${SITE_URL}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Xublix',
        email: 'contact@xublix.com',
      },
    },
  },
};

function getMetaForPath(pathname: string, slug?: string): PageMeta {
  if (pathname.startsWith('/services/') && slug) {
    const service = getServiceBySlug(slug);
    if (service) {
      return {
        title: service.seoTitle,
        description: service.seoDescription,
        keywords: service.seoKeywords,
        canonical: `${SITE_URL}/services/${service.slug}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: service.title,
          name: service.title,
          description: service.longDescription,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: {
            '@type': 'Organization',
            name: 'Xublix',
            url: SITE_URL,
          },
        },
      };
    }
  }

  const meta = STATIC_META[pathname] || STATIC_META['/'];
  return { ...meta, canonical: `${SITE_URL}${pathname === '/' ? '/' : pathname}` };
}

export default function SEO() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const meta = getMetaForPath(location.pathname, slug);

    document.title = meta.title;

    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('name', 'robots', 'index, follow');

    setLinkTag('canonical', meta.canonical);

    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.canonical);
    setMetaTag('property', 'og:site_name', 'Xublix');
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', OG_IMAGE);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', OG_IMAGE);

    const scriptId = 'xublix-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(meta.schema);
  }, [location.pathname, slug]);

  return null;
}
