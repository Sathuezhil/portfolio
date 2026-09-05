"use client";

import { academicProjects, projects, type Project } from "@/data/content";
import { useSiteContent } from "@/lib/site-content";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

function ProjectGrid({ items, prefix }: { items: Project[]; prefix: string }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {items.map((project, index) => (
        <Reveal key={project.slug} delay={index * 70}>
        <article
          className={`card-lift group rounded-[1.5rem] border border-line bg-surface/60 p-6 ${
            project.featured ? "md:min-h-[280px]" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs text-gold">
              {prefix}
              {String(index + 1).padStart(2, "0")} / {project.client}
            </p>
            <span className="text-xs text-mute">{project.year}</span>
          </div>
          <h3 className="mt-5 font-serif text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-mute">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-gold-soft hover:text-gold"
              >
                Live site <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-mute hover:text-ink"
              >
                GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Projects() {
  const { copy } = useSiteContent();
  const independent = projects.filter((project) => project.independent);
  const clientWork = projects.filter((project) => !project.independent);

  return (
    <section id="work" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">03 / Selected work</p>
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-serif text-4xl sm:text-5xl">
              {copy.workHeading}
            </h2>
            <p className="max-w-sm text-sm leading-6 text-mute">
              {copy.workIntro}
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <h3 className="font-serif text-2xl italic text-gold-soft">Independent</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-mute">
            Built on my own, outside company work.
          </p>
          <ProjectGrid items={independent} prefix="IND " />
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-2xl italic text-gold-soft">Client & company work</h3>
          <ProjectGrid items={clientWork} prefix="" />
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-2xl italic text-gold-soft">Academic studio</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {academicProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 80}>
              <div className="card-lift rounded-2xl border border-line p-5">
                <p className="font-mono text-xs text-gold">{project.stack}</p>
                <p className="mt-2 text-lg">{project.title}</p>
                <p className="mt-2 text-sm leading-6 text-mute">{project.description}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
