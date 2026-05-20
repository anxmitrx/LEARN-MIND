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
      <section className="border-b border-white/5 py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow text-yellow">5 Tracks · 40+ Topics</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Pick your <span className="text-gradient-yellow">track.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            Each track is a season of live workshops, mentor 1:1s, simulations, and outcomes
            you can show a recruiter.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-5">
          {tracks.map((t) => (
            <Link
              key={t.slug}
              to="/tracks/$slug"
              params={{ slug: t.slug }}
              className="group block rounded-2xl border border-white/10 bg-surface p-8 transition-all hover:-translate-y-1 hover:border-yellow hover:shadow-glow"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="eyebrow text-yellow">Track {t.number}</span>
                  <h2 className="mt-2 font-display text-3xl font-bold text-white">{t.title}</h2>
                  <p className="mt-3 text-zinc-400">{t.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {t.topics.slice(0, 5).map((tp) => (
                      <span key={tp.title} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
                        {tp.title}
                      </span>
                    ))}
                    {t.topics.length > 5 && (
                      <span className="rounded-full bg-yellow/10 px-2.5 py-1 text-[11px] font-bold text-yellow">+{t.topics.length - 5}</span>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="h-8 w-8 text-zinc-600 transition-all group-hover:rotate-12 group-hover:text-yellow" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
