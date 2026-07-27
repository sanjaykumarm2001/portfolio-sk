import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type InsightContent = {
  heading: string;
  body: string;
};

type Insight = {
  id: string;
  img: string;
  title: string;
  desc: string;
  content: InsightContent[];
};

const INSIGHTS: Insight[] = [
  {
    id: 'edge-functions',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAgH4jzo2EjH5ZD5Ra18LhUIJ1XO2Eb9DK3VsDUhByWaiqq1ZbyvW74PEtAEQJrUE85uQJByeQ8FJfZNDp5kQV7NgaRwn1MMFj7ClOODrJc5n9tR9eWKpkxIixUNoVgAr7gxHI3ffJ21LiDO2Y87okzUv1nsw6mzdsKc2qgYbizqKksvXWdWbXEKt2abj2MMWdZ_yF8rD-wPuGVXn9Yz24qBBJd2IBN66q0gIdH4Lk26z-aH4xl4vAxg',
    title: 'Architecting for Global Scale with Edge Functions',
    desc: 'Explore how moving logic to the edge can reduce latency by up to 80% for distributed users globally.',
    content: [
      {
        heading: '1. The Problem with Centralized Cloud Regions',
        body: 'Traditional web applications route every request back to a single primary database or server region (e.g. us-east-1). For international users in Europe or Asia, roundtrip network latency alone adds 200ms to 500ms to every API request before execution even begins.',
      },
      {
        heading: '2. Moving Compute & Caching to the Edge',
        body: 'By deploying lightweight V8 serverless edge functions across over 300+ global edge locations (using AWS CloudFront Functions or Cloudflare Workers), static assets and dynamic security rules execute within 15ms of the user.',
      },
      {
        heading: '3. Real-world Latency & Load Reduction',
        body: 'At Xublix, we re-architected a high-traffic client portal using Edge Middleware. Page render times dropped from 1.4s to 240ms, and primary database server workloads were cut by 65% through intelligent edge caching.',
      },
    ],
  },
  {
    id: 'microservices-vs-serverless',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9kflstHHySq2uQAEuAgSBTX6tk3L89zZVoDVTdFWzXU_9hznz-LFA5q50CvNNJQ_r3t5C7EKc8etSaLk60MpjihGbQtKEOOcdU_q1Mq4gEzkS9ozAy8ukgRy3f86RKQEz4JFAZw_MowC70GO9qCYM36yBwBX1WAFKbuVm4MFqq0pXZsTzdT0XLbbTe8YIBJSm3qCH_aRWRWENh3phqmRTO8wK9kpcQ0Ep4gCqy3zKvebT8dsP0XvXEQ',
    title: 'Microservices vs. Serverless: A Comparative Study',
    desc: 'Which architecture is right for your next project? We analyze costs, maintenance, and developer velocity.',
    content: [
      {
        heading: '1. Containerized Microservices (Kubernetes/Docker)',
        body: 'Microservices deployed on Docker/Kubernetes excel at high-throughput, persistent workloads with complex state requirements. They provide predictable, linear cloud infrastructure pricing for steady, heavy traffic.',
      },
      {
        heading: '2. Event-Driven Serverless Architectures (AWS Lambda/Fargate)',
        body: 'Serverless functions shine for event-triggered workflows, REST APIs with variable traffic, and rapid MVP prototyping. By auto-scaling to zero when idle, serverless eliminates idle server hosting costs completely.',
      },
      {
        heading: '3. Xublix Hybrid Architectural Blueprint',
        body: 'Rather than forcing an all-or-nothing choice, Xublix advocates a hybrid approach: long-running core business engines run in containerized microservices, while async webhooks, background jobs, and API gateways utilize serverless functions.',
      },
    ],
  },
  {
    id: 'zero-trust-security',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIvyomiM9H_4S021i0MvmJEfxieiFb7HoBoPhiMm0YLzpR-q5HUxaDV-xjkEjO94OqXyu_pyw6B9PFjhC4bYplzQ2CutNHPHEMqm57rZivWYbbR_0BZYJ-eMJ1-lrRrlJkwQeK2HVyiPeIPz0xoyLnpP-AnmZuvc3KdiFgm03WGVuJzFmf3Gg8E7ZGvZvkb0LGU9ckUjSmoszzWvA0FfhOopYDEFm4HFSovugt93ow8Ho3Fz0M_QqNZw',
    title: 'Zero-Trust Security Models in Modern Apps',
    desc: 'Why traditional perimeter security is no longer enough and how to implement zero-trust at every layer.',
    content: [
      {
        heading: '1. The Vulnerability of Traditional Network Perimeters',
        body: 'Legacy corporate security relied on perimeter firewalls and internal VPNs. Once an attacker bypassed the outer wall, all internal microservices and databases were completely exposed to lateral movement attacks.',
      },
      {
        heading: '2. Core Pillars of Zero-Trust Architecture',
        body: 'Zero-Trust enforces "Never Trust, Always Verify" through: (1) Mutual TLS (mTLS) microservice authentication, (2) Role-Based Access Control (RBAC) with short-lived JWT tokens, and (3) Hardware Security Module (HSM) key rotations for data at rest.',
      },
      {
        heading: '3. Continuous Monitoring & Automated Intrusion Protection',
        body: 'Xublix security architectures embed real-time threat telemetry, runtime vulnerability scanning, and immutable audit logs directly into CI/CD deployment pipelines.',
      },
    ],
  },
];

export default function Insights() {
  const navigate = useNavigate();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  // Close modal on Escape key press and manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedInsight(null);
    };
    if (selectedInsight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedInsight]);

  return (
    <section id="insights" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-10">
      {/* Header Block */}
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} space-y-2 mb-2`}>
        <h2 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">Engineering Notes</h2>
        <p className="font-body-md text-on-surface-variant text-base lg:text-lg">Deep dives into the technologies we use to build the future.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INSIGHTS.map((i) => (
          <div
            key={i.id}
            onClick={() => setSelectedInsight(i)}
            className="apple-liquid-glass overflow-hidden rounded-[36px] group cursor-pointer hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between border border-slate-200/90 shadow-md hover:shadow-xl bg-white/90"
          >
            <div>
              <div className="h-56 relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={i.img} alt={i.title} loading="lazy" decoding="async" />
              </div>
              <div className="p-7 space-y-3">
                <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {i.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium line-clamp-3">
                  {i.desc}
                </p>
                <div className="pt-2 text-primary font-bold text-xs flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>Read Technical Breakdown</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Article Reader Modal */}
      {selectedInsight && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          style={{ marginTop: '0' }}
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="apple-liquid-glass w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 border border-white/90 shadow-2xl relative bg-white/95 text-on-surface animate-in fade-in zoom-in-95 duration-200 space-y-6 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-all z-10 shadow-xs"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Header Title */}
            <div className="pr-10 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedInsight.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                {selectedInsight.desc}
              </p>
            </div>

            {/* Cover Image */}
            <div className="rounded-3xl overflow-hidden h-56 sm:h-72 border border-slate-200 shadow-sm relative">
              <img src={selectedInsight.img} alt={selectedInsight.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>

            {/* Technical Breakdown Sections */}
            <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {selectedInsight.content.map((section, idx) => (
                <div key={idx} className="space-y-2 bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {section.heading}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500 font-medium">
                Published by Xublix Engineering Architecture Team
              </div>

              <button
                onClick={() => {
                  setSelectedInsight(null);
                  navigate('/contact');
                }}
                className="apple-liquid-cta-btn px-6 py-3 rounded-full text-xs font-bold text-white shrink-0 shadow-md flex items-center gap-2"
              >
                <span>Consult Our Engineers</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
