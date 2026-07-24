import { ArrowRight } from 'lucide-react';
import NetworkScene from './NetworkScene';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] pt-32 pb-stack-lg px-margin-desktop max-w-container-max mx-auto flex flex-col justify-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md items-center relative z-10">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.12] tracking-tight">
            Building Software &amp; Cloud Systems <br />
            <span className="text-primary italic">That Power Modern Business.</span>
          </h1>
          <p className="font-body-md text-on-surface-variant text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium max-w-xl">
            Xublix partners with businesses to design, build, and maintain reliable digital products and infrastructure.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#services"
              className="bg-primary text-on-primary px-9 py-4 rounded-full font-bold text-base flex items-center gap-3 hover:scale-105 transition-transform shadow-lg group inline-flex"
            >
              View Solutions
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="#contact"
              className="apple-liquid-glass px-9 py-4 rounded-full font-bold text-base text-on-surface inline-flex items-center justify-center hover:scale-105 transition-transform"
            >
              Start Project
            </a>
          </div>
        </div>

        <div className="relative h-[550px] w-full hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <NetworkScene />
          </div>
          <div className="absolute top-10 right-0 apple-liquid-glass p-7 rounded-[32px] shadow-xl animate-bounce-slow" style={{ animationDuration: '4s' }}>
            <div className="text-primary font-mono text-xs font-extrabold uppercase tracking-widest mb-1">AVAILABILITY</div>
            <div className="text-4xl font-extrabold text-on-surface">99.99%</div>
          </div>
          <div className="absolute bottom-20 left-0 apple-liquid-glass p-7 rounded-[32px] shadow-xl animate-bounce-slow" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="text-primary font-mono text-xs font-extrabold uppercase tracking-widest mb-1">LATENCY</div>
            <div className="text-4xl font-extrabold text-on-surface">14ms</div>
          </div>
          <div className="absolute bottom-40 right-10 apple-liquid-glass p-7 rounded-[32px] shadow-xl animate-bounce-slow" style={{ animationDuration: '6s', animationDelay: '2s' }}>
            <div className="text-primary font-mono text-xs font-extrabold uppercase tracking-widest mb-1">DEPLOYMENTS</div>
            <div className="text-4xl font-extrabold text-on-surface">128</div>
          </div>
        </div>
      </div>
    </section>
  );
}
