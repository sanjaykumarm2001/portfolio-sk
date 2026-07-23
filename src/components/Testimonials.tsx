import { Sparkles, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface Testimonial {
  id: string;
  quote: string;
  shortName: string;
  avatarBg: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Neublix migrated our legacy servers to AWS with zero downtime. 100% data integrity and our cloud operating costs dropped by 42%.',
    shortName: 'Marcus V.',
    avatarBg: 'bg-gradient-to-tr from-blue-600 to-sky-400',
    initials: 'MV',
  },
  {
    id: 't2',
    quote:
      'Replacing our spreadsheets with a custom Neublix ERP system transformed our operations. Order processing is 3x faster and reporting is live.',
    shortName: 'Elena R.',
    avatarBg: 'bg-gradient-to-tr from-indigo-600 to-purple-400',
    initials: 'ER',
  },
  {
    id: 't3',
    quote:
      'The cross-platform app Neublix developed is silky smooth at 60 FPS. User engagement jumped by 65% within 60 days of launch.',
    shortName: 'David K.',
    avatarBg: 'bg-gradient-to-tr from-emerald-600 to-teal-400',
    initials: 'DK',
  },
  {
    id: 't4',
    quote:
      'Engineered our bespoke microservices architecture to handle 50,000 requests/sec with zero latency bottlenecks. Truly top-tier software work.',
    shortName: 'Sarah J.',
    avatarBg: 'bg-gradient-to-tr from-sky-600 to-blue-500',
    initials: 'SJ',
  },
  {
    id: 't5',
    quote:
      'Flawless integration of our legacy SQL databases with modern REST and GraphQL APIs. Delivered ahead of schedule with clean documentation.',
    shortName: 'Alex R.',
    avatarBg: 'bg-gradient-to-tr from-violet-600 to-indigo-400',
    initials: 'AR',
  },
  {
    id: 't6',
    quote:
      'Automated our entire CI/CD pipeline and DevOps infrastructure. Deployment release times dropped from 4 hours down to under 5 minutes.',
    shortName: 'Michael C.',
    avatarBg: 'bg-gradient-to-tr from-cyan-600 to-blue-400',
    initials: 'MC',
  },
  {
    id: 't7',
    quote:
      'Outstanding technical partnership. Neublix delivered enterprise-grade security compliance and 99.99% uptime for our core cloud platform.',
    shortName: 'Priya P.',
    avatarBg: 'bg-gradient-to-tr from-blue-700 to-indigo-500',
    initials: 'PP',
  },
];

export default function Testimonials() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const doubleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-2 overflow-hidden relative space-y-6 my-2">
      {/* Header Block */}
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} max-w-container-max mx-auto px-margin-desktop space-y-2 text-center`}>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-[1.15]">
          Voices That Inspire Us. <br />
          <span className="text-primary italic">Proven Engineering Results.</span>
        </h2>
        <p className="font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
          Trusted by technology leaders and enterprise teams for custom software, cloud migrations, and ERP systems.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Carousel Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient Vignette Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#f7f9fb] via-[#f7f9fb]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#f7f9fb] via-[#f7f9fb]/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-5 sm:gap-6">
          {doubleTestimonials.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="apple-liquid-glass w-[340px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-[28px] flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl border border-white/90"
            >
              {/* Specular Ambient Glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/15 transition-all" />

              {/* Quote Body */}
              <div className="relative z-10 space-y-2">
                <Quote size={22} className="text-primary/20 pointer-events-none" />
                <p className="text-on-surface text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer (Minimalist: Avatar + Short Name Only) */}
              <div className="pt-4 mt-4 border-t border-slate-200/50 relative z-10 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0`}>
                  {t.initials}
                </div>

                <div className="font-extrabold text-on-surface text-sm tracking-tight truncate">
                  {t.shortName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
