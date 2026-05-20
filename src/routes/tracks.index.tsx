import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { tracks } from "@/lib/tracks";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/tracks/")({
  component: TracksIndex,
  head: () => ({
    meta: [
      { title: "Mentoring Tracks — IndustryReady" },
      { name: "description", content: "5 mentoring tracks for Indian college students: personal & professional, soft skills, engineering, management, and practical situations." },
      { property: "og:title", content: "Mentoring Tracks — IndustryReady" },
      { property: "og:description", content: "Pick your track. Train with mentors. Walk in ready." },
    ],
  }),
});

function TracksIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="border-b-2 border-ink bg-background py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow text-ink">5 Tracks · 40+ Topics</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Pick your <span className="bg-yellow px-2">track.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600">
            Each track is a season of live workshops, mentor 1:1s, simulations, and outcomes
            you can show a recruiter.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-16">
        <div className="container mx-auto max-w-7xl space-y-5 px-4 sm:px-6">
          {tracks.map((t) => (
            <Link
              key={t.slug}
              to="/tracks/$slug"
              params={{ slug: t.slug }}
              className="bento-card group block border-2 border-ink bg-background p-8 shadow-brutal-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="font-mono text-xs font-bold text-ink/60">// TRACK {t.number}</span>
                  <h2 className="mt-2 font-display text-3xl font-black leading-tight text-ink">{t.title}</h2>
                  <p className="mt-3 text-zinc-600">{t.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {t.topics.slice(0, 5).map((tp) => (
                      <span key={tp.title} className="border-2 border-ink bg-background px-2 py-0.5 text-[11px] font-bold text-ink">
                        {tp.title}
                      </span>
                    ))}
                    {t.topics.length > 5 && (
                      <span className="border-2 border-ink bg-yellow px-2 py-0.5 text-[11px] font-extrabold text-ink">
                        +{t.topics.length - 5}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="h-10 w-10 text-ink transition-transform group-hover:rotate-12" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
