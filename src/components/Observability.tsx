import { Cpu, HardDrive, Globe, ArrowUp, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const BARS = [40, 45, 38, 60, 55, 42, 30, 70, 65, 48, 52, 35];

type Stat = { icon: LucideIcon; label: string; value: string; bg: string; fg: string };

const STATS: Stat[] = [
  { icon: Cpu, label: 'CPU Usage', value: '14.2%', bg: 'bg-blue-500/20', fg: 'text-blue-400' },
  { icon: HardDrive, label: 'Disk I/O', value: '1.2 GB/s', bg: 'bg-purple-500/20', fg: 'text-purple-400' },
  { icon: Globe, label: 'Global Edges', value: '42 Nodes', bg: 'bg-orange-500/20', fg: 'text-orange-400' },
];

export default function Observability() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className="py-stack-lg px-margin-desktop bg-on-background rounded-[60px] mx-4 my-stack-lg overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} max-w-container-max mx-auto relative z-10`}>
        <div className="flex flex-col lg:flex-row justify-between items-end mb-stack-md gap-8">
          <div>
            <span className="text-primary font-label-sm tracking-widest uppercase mb-4 block">Engineered for Performance</span>
            <h2 className="text-white font-headline-lg text-headline-lg max-w-xl">Real-time Observability &amp; System Health</h2>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div className="text-white font-label-sm">Primary Cluster: Operational</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          <div className="md:col-span-2 lg:col-span-3 bg-white/5 border border-white/10 p-8 rounded-[40px] h-[400px] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-white/60 font-body-md">Request Latency (P99)</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white/80 font-mono">1H</span>
                <span className="px-2 py-1 bg-primary rounded text-[10px] text-white font-mono">24H</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-48 w-full mt-4">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/40 hover:bg-primary transition-all w-full rounded-t-sm"
                  style={{ height: `${h}%` }}
                  title={`${Math.round(h / 4 + 5)}ms`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-white/40 text-xs font-mono mt-4">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-center items-center text-center">
            <span className="text-white/60 font-body-md mb-2">Build Success Rate</span>
            <span className="text-white text-6xl font-bold tracking-tighter">98.4%</span>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
              <ArrowUp size={14} />
              +2.1% from last month
            </div>
          </div>

          {STATS.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center ${s.fg}`}>
                <s.icon size={18} />
              </div>
              <div>
                <div className="text-white/60 text-xs">{s.label}</div>
                <div className="text-white font-bold">{s.value}</div>
              </div>
            </div>
          ))}

          <div className="bg-primary p-6 rounded-[32px] flex items-center justify-center text-on-primary cursor-pointer hover:bg-primary-container transition-colors">
            <span className="font-semibold">View Live Dash</span>
            <ExternalLink className="ml-2" size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
