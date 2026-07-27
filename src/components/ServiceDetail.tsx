import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../data/services';
import { useReveal } from '../hooks/useReveal';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const { ref, shown } = useReveal<HTMLDivElement>();

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = service.icon;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-16">
      <Link
        to="/services"
        className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> All Services
      </Link>

      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} space-y-6 max-w-3xl`}>
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <IconComponent size={28} />
        </div>
        <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
          {service.title}
        </h1>
        <p className="font-body-md text-on-surface-variant text-lg sm:text-xl leading-relaxed font-medium">
          {service.longDescription}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {service.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-white/60 border border-slate-200 text-on-surface text-xs font-mono font-medium shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-lg mt-4"
        >
          Request a Proposal <ArrowRight size={18} />
        </Link>
      </div>

      <div className="apple-liquid-glass p-8 sm:p-10 rounded-[36px] max-w-3xl space-y-5">
        <h2 className="font-headline-lg text-2xl font-bold text-on-surface">What's Included</h2>
        <ul className="space-y-3">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-on-surface-variant font-medium">
              <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 pt-8 border-t border-slate-200/60">
        <h2 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight">
          Explore Other Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="apple-liquid-glass p-8 rounded-[32px] flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="font-headline-lg text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
