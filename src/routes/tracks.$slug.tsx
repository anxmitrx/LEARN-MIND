import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Track } from "@/lib/tracks";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { SkillRadar } from "@/components/site/SkillRadar";
import { getTrack, tracks } from "@/lib/tracks";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useReservation } from "@/components/site/ReservationContext";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/tracks/$slug")({
  component: TrackPage,
  loader: ({ params }): { track: Track } => {
    const track = getTrack(params.slug);
    if (!track) throw notFound();
    return { track };
  },
  head: ({ params }) => {
    const t = getTrack(params.slug);
    const title = t ? `${t.title} — IndustryReady` : "Track — IndustryReady";
    const desc = t?.description ?? "IndustryReady mentoring track.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
});

function TrackPage() {
  const { track } = Route.useLoaderData();
  const { openModal } = useReservation();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 bg-hero-gradient">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <Link to="/tracks" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-yellow">
            <ArrowLeft className="h-4 w-4" /> All tracks
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="eyebrow text-yellow">Track {track.number} · {track.short}</span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-4 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
              >
                {track.title}
              </motion.h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-400">{track.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton onClick={() => openModal(track.slug)}>Reserve Your Seat</MagneticButton>
                <MagneticButton
                  variant="outline"
                  onClick={() => document.getElementById("topics")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See Topics
                </MagneticButton>
              </div>
            </div>
            <div className="rounded-2xl border border-yellow/20 bg-surface/60 p-6 backdrop-blur">
              <div className="eyebrow text-yellow">Skill Radar</div>
              <p className="mt-1 text-sm text-zinc-400">What you'll be measurably better at by the end.</p>
              <div className="mt-4 grid place-items-center">
                <SkillRadar data={track.radar} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="eyebrow text-yellow">Topics Covered</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Inside the <span className="text-gradient-yellow">track.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {track.topics.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-yellow hover:shadow-glow"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-yellow/10 text-yellow">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display font-bold text-white">{t.title}</div>
                <div className="mt-2 text-xs text-zinc-500">Live workshop · 1:1 mentor follow-up</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-y border-white/5 bg-surface/40 py-24">
        <div className="container mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow text-yellow">Outcomes</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
              What you'll be <span className="text-gradient-yellow">able to do.</span>
            </h2>
            <p className="mt-4 text-zinc-400">Tangible, recruiter-visible skills — not "exposure".</p>
          </div>
          <ul className="space-y-4">
            {track.outcomes.map((o, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-background p-5"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow text-yellow-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <p className="text-base text-white">{o}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="eyebrow text-yellow">Sample Agenda</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
              A typical <span className="text-gradient-yellow">workshop.</span>
            </h2>
          </div>
          <ol className="relative mt-14 space-y-8 border-l-2 border-yellow/30 pl-8">
            {track.agenda.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[42px] grid h-7 w-7 place-items-center rounded-full bg-yellow text-xs font-extrabold text-yellow-foreground glow-yellow">
                  {i + 1}
                </span>
                <div className="font-mono text-xs text-yellow">{a.time}</div>
                <h3 className="mt-1 font-display text-xl font-bold text-white">{a.title}</h3>
                <p className="mt-1 text-zinc-400">{a.detail}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <MagneticButton onClick={() => openModal(track.slug)}>Reserve a Seat in this Track</MagneticButton>
          </div>
        </div>
      </section>

      {/* Other tracks */}
      <section className="border-t border-white/5 py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <h3 className="font-display text-2xl font-bold text-white">Other tracks</h3>
            <Link to="/tracks" className="text-sm font-semibold text-yellow hover:underline">View all →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tracks.filter((t) => t.slug !== track.slug).map((t) => (
              <Link
                key={t.slug}
                to="/tracks/$slug"
                params={{ slug: t.slug }}
                className="rounded-xl border border-white/10 bg-surface p-5 transition-all hover:-translate-y-1 hover:border-yellow"
              >
                <span className="eyebrow text-yellow">Track {t.number}</span>
                <div className="mt-2 font-display font-bold text-white">{t.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
