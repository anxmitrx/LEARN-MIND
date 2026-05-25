import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { mentors } from "@/lib/mentors";

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
  head: () => ({
    meta: [
      { title: "Mentors — Learn & Shine" },
      { name: "description", content: "Premium mentors from MNCs, IIMs, IITs, and Indian startups — guiding college students through their first career chapter." },
      { property: "og:title", content: "Mentors — Learn & Shine" },
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
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[1.15] md:leading-tight tracking-tight text-ink sm:text-6xl">
            Learn from people who <span className="bg-yellow px-2">hire people.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            {mentors.map((m) => (
              <div
                key={m.name}
                className="bento-card group border-2 border-ink bg-background p-8 md:p-10 shadow-brutal transition-transform hover:scale-[1.02]"
              >
                <div
                  className="relative h-52 md:h-64 overflow-hidden border-2 border-ink"
                  style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 70%, 88%), hsl(${m.hue}, 60%, 75%))` }}
                >
                  <div className="absolute inset-0 grid place-items-center grayscale transition-all duration-500 group-hover:grayscale-0">
                    <span className="font-display text-7xl md:text-8xl font-black text-ink/40 transition-transform duration-500 group-hover:scale-110">
                      {m.initials}
                    </span>
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl md:text-2xl font-black text-ink">{m.name}</h3>
                <p className="text-sm md:text-base font-bold text-ink mt-1">{m.title}</p>
                <p className="mt-1.5 text-xs md:text-sm text-zinc-600">{m.qualifications}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.topics.map((t) => (
                    <span key={t} className="border border-ink bg-yellow px-2 py-1 text-xs font-bold text-ink">
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
