import { ArrowRight } from 'lucide-react';
import NetworkScene from './NetworkScene';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-40 pb-stack-lg px-margin-desktop max-w-container-max mx-auto flex flex-col justify-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md items-center relative z-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            SYSTEMS ARCHITECTS
          </span>
          <h1 className="font-display-xl text-display-xl text-on-background mb-stack-sm leading-[1.05] tracking-tighter">
            Building software that businesses <br />
            <span className="text-primary italic">can rely on.</span>
          </h1>
          <p className="font-body-md text-on-surface-variant text-xl max-w-lg mb-stack-md">
            We architect resilient digital foundations that power global enterprises. From cloud infrastructure to automated pipelines, we build systems designed for the future.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-lg group">
              View Solutions
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="liquid-glass-btn px-10 py-4 rounded-full font-semibold text-lg text-on-surface">
              Technical Specs
            </button>
          </div>
        </div>

        <div className="relative h-[600px] w-full hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <NetworkScene />
          </div>
          <div className="absolute top-10 right-0 glass-panel p-6 rounded-[24px] animate-bounce-slow" style={{ animationDuration: '4s' }}>
            <div className="text-on-surface-variant font-label-sm uppercase mb-1">Availability</div>
            <div className="text-headline-lg font-bold text-on-surface">99.99%</div>
          </div>
          <div className="absolute bottom-20 left-0 glass-panel p-6 rounded-[24px] animate-bounce-slow" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="text-on-surface-variant font-label-sm uppercase mb-1">Latency</div>
            <div className="text-headline-lg font-bold text-on-surface">14ms</div>
          </div>
          <div className="absolute bottom-40 right-10 glass-panel p-6 rounded-[24px] animate-bounce-slow" style={{ animationDuration: '6s', animationDelay: '2s' }}>
            <div className="text-on-surface-variant font-label-sm uppercase mb-1">Deployments</div>
            <div className="text-headline-lg font-bold text-on-surface">128</div>
          </div>
        </div>
      </div>
    </section>
  );
}
