import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { mentors } from "@/lib/mentors";

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
  head: () => ({
    meta: [
      { title: "Mentors — IndustryReady" },
      { name: "description", content: "Premium mentors from MNCs, IIMs, IITs, and Indian startups — guiding college students through their first career chapter." },
      { property: "og:title", content: "Mentors — IndustryReady" },
      { property: "og:description", content: "Learn from people who hire people." },
    ],
  }),
});

function MentorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="border-b-2 border-ink bg-background py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow text-ink">Premium Mentors</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
            Learn from people who <span className="bg-yellow px-2">hire people.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map((m) => (
              <div
                key={m.name}
                className="bento-card group border-2 border-ink bg-background p-5 shadow-brutal-sm"
              >
                <div
                  className="relative h-44 overflow-hidden border-2 border-ink"
                  style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 70%, 88%), hsl(${m.hue}, 60%, 75%))` }}
                >
                  <div className="absolute inset-0 grid place-items-center grayscale transition-all duration-500 group-hover:grayscale-0">
                    <span className="font-display text-7xl font-black text-ink/40 transition-transform duration-500 group-hover:scale-110">
                      {m.initials}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-black text-ink">{m.name}</h3>
                <p className="text-sm font-bold text-ink">{m.title}</p>
                <p className="mt-1 text-xs text-zinc-600">{m.qualifications}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.topics.map((t) => (
                    <span key={t} className="border border-ink bg-yellow px-1.5 py-0.5 text-[10px] font-bold text-ink">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
