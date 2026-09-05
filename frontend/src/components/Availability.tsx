"use client";

import { useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Availability() {
  const { copy } = useSiteContent();
  const items = [
    { label: "Status", value: copy.nowStatus },
    { label: "Start date", value: copy.nowStart },
    { label: "Engagement", value: copy.nowType },
    { label: "Where", value: copy.nowWhere },
  ];

  return (
    <section id="now" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">07 / Now</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{copy.nowHeading}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <article className="rounded-[1.4rem] border border-line bg-surface/60 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-gold">{item.label}</p>
                <p className="mt-3 text-lg leading-7">{item.value}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
