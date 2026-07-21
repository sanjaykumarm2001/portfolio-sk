import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type Insight = {
  img: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
};

const INSIGHTS: Insight[] = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAgH4jzo2EjH5ZD5Ra18LhUIJ1XO2Eb9DK3VsDUhByWaiqq1ZbyvW74PEtAEQJrUE85uQJByeQ8FJfZNDp5kQV7NgaRwn1MMFj7ClOODrJc5n9tR9eWKpkxIixUNoVgAr7gxHI3ffJ21LiDO2Y87okzUv1nsw6mzdsKc2qgYbizqKksvXWdWbXEKt2abj2MMWdZ_yF8rD-wPuGVXn9Yz24qBBJd2IBN66q0gIdH4Lk26z-aH4xl4vAxg',
    tag: 'INFRASTRUCTURE',
    date: 'MAY 12, 2024 • 8 MIN READ',
    title: 'Architecting for Global Scale with Edge Functions',
    desc: 'Explore how moving logic to the edge can reduce latency by up to 80% for distributed users globally.',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9kflstHHySq2uQAEuAgSBTX6tk3L89zZVoDVTdFWzXU_9hznz-LFA5q50CvNNJQ_r3t5C7EKc8etSaLk60MpjihGbQtKEOOcdU_q1Mq4gEzkS9ozAy8ukgRy3f86RKQEz4JFAZw_MowC70GO9qCYM36yBwBX1WAFKbuVm4MFqq0pXZsTzdT0XLbbTe8YIBJSm3qCH_aRWRWENh3phqmRTO8wK9kpcQ0Ep4gCqy3zKvebT8dsP0XvXEQ',
    tag: 'DEVELOPMENT',
    date: 'APR 28, 2024 • 12 MIN READ',
    title: 'Microservices vs. Serverless: A Comparative Study',
    desc: 'Which architecture is right for your next project? We analyze costs, maintenance, and developer velocity.',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIvyomiM9H_4S021i0MvmJEfxieiFb7HoBoPhiMm0YLzpR-q5HUxaDV-xjkEjO94OqXyu_pyw6B9PFjhC4bYplzQ2CutNHPHEMqm57rZivWYbbR_0BZYJ-eMJ1-lrRrlJkwQeK2HVyiPeIPz0xoyLnpP-AnmZuvc3KdiFgm03WGVuJzFmf3Gg8E7ZGvZvkb0LGU9ckUjSmoszzWvA0FfhOopYDEFm4HFSovugt93ow8Ho3Fz0M_QqNZw',
    tag: 'SECURITY',
    date: 'APR 15, 2024 • 6 MIN READ',
    title: 'Zero-Trust Security Models in Modern Apps',
    desc: 'Why traditional perimeter security is no longer enough and how to implement zero-trust at every layer.',
  },
];

export default function Insights() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="insights" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-10">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2`}>
        <div className="space-y-2">
          <h2 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">Engineering Notes</h2>
          <p className="font-body-md text-on-surface-variant text-base lg:text-lg">Deep dives into the technologies we use to build the future.</p>
        </div>
        <a className="text-primary font-bold inline-flex items-center gap-2 group text-sm shrink-0" href="#">
          All Resources <ArrowRight className="group-hover:translate-x-1.5 transition-transform" size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INSIGHTS.map((i) => (
          <div
            key={i.title}
            className="apple-liquid-glass overflow-hidden rounded-[40px] group cursor-pointer hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="h-60 relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={i.img} alt={i.title} loading="lazy" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 bg-white/85 backdrop-blur-xl text-primary rounded-full text-xs font-mono font-extrabold border border-white shadow-sm">
                    {i.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-3">
                <div className="text-xs text-on-surface-variant font-mono font-semibold">{i.date}</div>
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {i.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium line-clamp-3">
                  {i.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
