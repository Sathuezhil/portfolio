"use client";

import { education, skillGroups } from "@/data/content";
import { useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Skills() {
  const { copy } = useSiteContent();
  return (
    <section id="skills" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.28em] text-gold">04 / Skills</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{copy.skillsHeading}</h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 80}>
                <h3 className="font-serif text-2xl text-gold-soft">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink transition hover:-translate-y-0.5 hover:bg-gold/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.28em] text-gold">05 / Education</p>
            <h2 className="mt-4 font-serif text-4xl">{copy.educationHeading}</h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {education.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="card-lift rounded-2xl border border-line bg-bg-soft/80 p-5">
                  <p className="font-mono text-xs text-gold">{item.period}</p>
                  <h3 className="mt-2 text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm text-mute">{item.school}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
