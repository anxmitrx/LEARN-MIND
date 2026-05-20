import { mentors } from "@/lib/mentors";

function MentorCard({ m }: { m: (typeof mentors)[number] }) {
  return (
    <div className="group w-72 shrink-0 rounded-2xl border border-white/10 bg-surface p-5 transition-all hover:-translate-y-2 hover:border-yellow hover:shadow-glow">
      <div
        className="relative h-40 overflow-hidden rounded-xl"
        style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 30%, 25%), hsl(${m.hue}, 10%, 10%))` }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-6xl font-extrabold text-white/20 transition-all duration-500 group-hover:text-yellow group-hover:scale-110">
            {m.initials}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
      <h4 className="mt-4 font-display text-base font-bold text-white">{m.name}</h4>
      <p className="text-xs text-yellow">{m.title}</p>
      <p className="mt-1 text-[11px] text-zinc-500">{m.qualifications}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {m.topics.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MentorsMarquee() {
  const doubled = [...mentors, ...mentors];
  return (
    <section id="mentors" className="relative overflow-hidden border-y border-white/5 bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-yellow">Premium Mentors</span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Learn from people who <span className="text-gradient-yellow">hire people.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </div>

      <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee">
          {doubled.map((m, i) => (
            <MentorCard key={i} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
