import { useReveal } from '../hooks/useReveal';

const STEPS = [
  { n: '01', title: 'Discovery', desc: 'Defining technical requirements and system constraints.' },
  { n: '02', title: 'Architecture', desc: 'Blueprinting scalable distributed systems.' },
  { n: '03', title: 'Engineering', desc: 'Agile development cycles with continuous integration.' },
  { n: '04', title: 'Validation', desc: 'Rigorous QA, security audits, and load testing.' },
  { n: '05', title: 'Optimization', desc: 'Post-launch monitoring and continuous improvement.' },
];

export default function Process() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} text-center mb-stack-md`}>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">The Engineering Process</h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
          A rigorous approach to software construction, ensuring every system we build is resilient, scalable, and secure by design.
        </p>
      </div>
      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start mt-20">
        {STEPS.map((s) => (
          <div key={s.n} className="timeline-step relative flex flex-col items-center text-center w-full lg:w-1/5 px-4 group">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 z-10 group-hover:scale-125 transition-transform shadow-lg shadow-primary/20">
              <span className="font-bold">{s.n}</span>
            </div>
            <h4 className="font-headline-lg text-xl font-bold mb-2">{s.title}</h4>
            <p className="text-sm text-on-surface-variant">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
