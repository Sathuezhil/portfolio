import { profile, techMarquee } from "@/data/content";
import { ArrowUpRight } from "./Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="rise font-mono text-xs tracking-[0.28em] text-gold">
            {profile.availability}
          </p>
          <h1 className="rise mt-5 font-serif text-[clamp(2.7rem,8vw,6.2rem)] leading-[0.95] text-ink">
            <span className="block">{profile.firstName}</span>
            <span className="italic text-gold-soft">{profile.lastName}</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-8 text-mute" style={{ animationDelay: "120ms" }}>
            {profile.headline} in Dubai. I design and ship production interfaces for
            ERP, POS, and customer-facing products — with React, Next.js, and a
            careful eye for detail.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "200ms" }}>
            <a
              href="#work"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-gold-soft"
            >
              View selected work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:-translate-y-0.5 hover:border-gold/50"
            >
              Start a conversation
            </a>
            <a
              href="/sathuryan-ezhilarasi.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-mute transition hover:text-ink"
            >
              Download CV
            </a>
          </div>
          <p className="rise mt-8 font-mono text-xs tracking-wide text-mute" style={{ animationDelay: "280ms" }}>
            {profile.location} · {profile.email}
          </p>
        </div>

        <div className="rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "160ms" }}>
          <div className="absolute -inset-6 rounded-full bg-gold/10 blur-3xl" />
          <div className="photo-float relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_24px_60px_rgba(114,47,55,0.14)]">
            <img
              src="/avatar.jpg?v=2"
              alt={profile.fullName}
              className="aspect-[4/5] w-full object-cover object-[center_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-5 pb-5 pt-16">
              <p className="font-serif text-2xl text-white">{profile.role}</p>
              <p className="mt-1 text-sm text-white/85">React · Next.js · Laravel</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-line bg-bg-soft/60">
        <div className="overflow-hidden py-4">
          <div className="marquee-track flex w-max gap-10 pr-10">
            {[...techMarquee, ...techMarquee].map((item, index) => (
              <span key={`${item}-${index}`} className="font-mono text-xs tracking-[0.24em] text-mute">
                {item}
                <span className="ml-10 text-gold/70">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
