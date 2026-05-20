import { mentors } from "@/lib/mentors";

function MentorCard({ m }: { m: (typeof mentors)[number] }) {
  return (
    <div className="bento-card group w-72 shrink-0 border-2 border-ink bg-background p-5 shadow-brutal-sm transition-transform hover:scale-[1.05]">
      <div
        className="relative h-40 overflow-hidden border-2 border-ink"
        style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 70%, 88%), hsl(${m.hue}, 60%, 78%))` }}
      >
        <div className="absolute inset-0 grid place-items-center grayscale transition-all duration-500 group-hover:grayscale-0">
          <span className="font-display text-6xl font-black text-ink/40 transition-transform duration-500 group-hover:scale-110">
            {m.initials}
          </span>
        </div>
      </div>
      <h4 className="mt-4 font-display text-base font-black text-ink">{m.name}</h4>
      <p className="text-xs font-bold text-ink">{m.title}</p>
      <p className="mt-1 text-[11px] text-zinc-600">{m.qualifications}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {m.topics.map((t) => (
          <span key={t} className="border border-ink bg-yellow px-1.5 py-0.5 text-[10px] font-bold text-ink">
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
    <section id="mentors" className="relative overflow-hidden border-b-2 border-ink bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-ink">Premium Mentors</span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Learn from people <br /> who <span className="bg-yellow px-2">hire people.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-600">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </div>

      <div className="marquee-pause relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee">
          {doubled.map((m, i) => (
            <MentorCard key={i} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
