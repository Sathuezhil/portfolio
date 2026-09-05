"use client";

import { services } from "@/data/content";
import { useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Services() {
  const { copy } = useSiteContent();

  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">04 / Services</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl sm:text-5xl">{copy.servicesHeading}</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-mute">{copy.servicesIntro}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <article className="card-lift flex h-full flex-col rounded-[1.5rem] border border-line bg-surface/60 p-6">
                <p className="font-mono text-xs text-gold">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl text-gold-soft">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mute">{service.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
