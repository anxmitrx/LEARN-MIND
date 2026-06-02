import { mentors } from "@/lib/mentors";

function MentorCard({ m }: { m: (typeof mentors)[number] }) {
  return (
    <div className="bento-card group w-full bg-background p-8 md:p-10 rounded-3xl shadow-md shadow-[#3A3532]/5 transition-transform duration-300 hover:scale-[1.01]">
      <div
        className="relative h-52 md:h-64 overflow-hidden rounded-2xl border border-[#3A3532]/10"
        style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 70%, 88%), hsl(${m.hue}, 60%, 78%))` }}
      >
        <div className="absolute inset-0 grid place-items-center grayscale transition-all duration-500 group-hover:grayscale-0">
          <span className="font-display text-7xl md:text-8xl font-bold text-ink/40 transition-transform duration-500 group-hover:scale-105">
            {m.initials}
          </span>
        </div>
      </div>
      <h4 className="mt-6 font-display text-xl md:text-2xl font-bold text-ink">{m.name}</h4>
      <p className="text-sm md:text-base font-bold text-ink mt-1">{m.title}</p>
      <p className="mt-1.5 text-xs md:text-sm text-zinc-600">{m.qualifications}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {m.topics.map((t) => (
          <span key={t} className="bg-yellow px-3 py-1 text-xs font-bold text-ink rounded-full">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MentorsMarquee() {
  return (
    <section id="mentors" className="relative bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#3A3532]/10 pb-10">
          <div>
            <span className="eyebrow text-ink">Premium Mentors</span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-bold leading-[1.15] md:leading-tight tracking-wide text-ink sm:text-6xl">
              Learn from people <br /> who <span className="bg-yellow px-2 rounded-lg">hire people.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-medium text-zinc-600">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>

        {/* 2-Column Bento Grid Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentors.map((m) => (
            <MentorCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
