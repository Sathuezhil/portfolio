"use client";

import { languages } from "@/data/content";
import { mergeProfile, useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function About() {
  const content = useSiteContent();
  const profile = mergeProfile(content);

  return (
    <section id="about" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">01 / About</p>
          <h2 className="mt-4 font-serif text-4xl italic text-gold-soft sm:text-5xl">
            {content.copy.aboutHeading}
          </h2>
          <div className="accent-line mt-6 h-px w-20 bg-gold" />
        </Reveal>
        <div>
          <Reveal delay={80}>
            <p className="max-w-2xl text-lg leading-8 text-mute">{content.copy.aboutSummary}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={120 + index * 80}>
                <div className="card-lift rounded-2xl border border-line bg-surface/70 p-4">
                  <p className="font-serif text-3xl text-gold-soft">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-mute">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {languages.map((language) => (
              <span
                key={language.name}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-mute"
              >
                {language.name} · {language.level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
