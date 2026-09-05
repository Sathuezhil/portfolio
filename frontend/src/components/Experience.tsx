"use client";

import { experience, independentWork } from "@/data/content";
import { useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Experience() {
  const { copy } = useSiteContent();
  return (
    <section id="experience" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">02 / Experience</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
            {copy.experienceHeading}
          </h2>
        </Reveal>
        <div className="mt-14 space-y-6">
          {[...experience, independentWork].map((job, index) => (
            <Reveal key={job.company} delay={index * 90}>
              <article className="card-lift rounded-[1.6rem] border border-line bg-bg-soft/70 p-6 sm:p-8">
              <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-serif text-3xl text-gold-soft">{job.company}</h3>
                  <p className="mt-1 text-sm text-ink">{job.role}</p>
                  {job.company === "Independent" ? (
                    <p className="mt-2 font-mono text-xs tracking-wide text-gold">
                      Personal project · not through a company
                    </p>
                  ) : null}
                </div>
                <p className="font-mono text-xs tracking-wide text-mute">
                  {job.period} · {job.location}
                </p>
              </div>
              <p className="mt-6 max-w-3xl leading-7 text-mute">{job.summary}</p>
              <ul className="mt-6 grid gap-3 lg:grid-cols-2">
                {job.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-ink/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
