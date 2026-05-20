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
      <section className="border-b border-white/5 py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow text-yellow">Premium Mentors</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Learn from people who <span className="text-gradient-yellow">hire people.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map((m) => (
              <div
                key={m.name}
                className="group rounded-2xl border border-white/10 bg-surface p-5 transition-all hover:-translate-y-2 hover:border-yellow hover:shadow-glow"
              >
                <div
                  className="relative h-44 overflow-hidden rounded-xl"
                  style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 30%, 25%), hsl(${m.hue}, 10%, 10%))` }}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-7xl font-extrabold text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-yellow">
                      {m.initials}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{m.name}</h3>
                <p className="text-sm text-yellow">{m.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{m.qualifications}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.topics.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
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
