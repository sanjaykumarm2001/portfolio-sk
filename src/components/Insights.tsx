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
    <section id="insights" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} flex justify-between items-end mb-stack-md`}>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Engineering Notes</h2>
          <p className="font-body-md text-on-surface-variant">Deep dives into the technologies we use to build the future.</p>
        </div>
        <a className="text-primary font-semibold flex items-center gap-2 group" href="#">
          All Resources <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {INSIGHTS.map((i) => (
          <div key={i.title} className="glass-panel overflow-hidden rounded-[32px] group cursor-pointer">
            <div className="h-64 relative overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={i.img} alt={i.title} loading="lazy" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary rounded-full text-xs font-bold font-mono">{i.tag}</span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-xs text-on-surface-variant font-mono mb-2">{i.date}</div>
              <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{i.title}</h3>
              <p className="text-sm text-on-surface-variant line-clamp-3">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
