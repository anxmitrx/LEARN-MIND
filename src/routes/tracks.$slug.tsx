import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Track } from "@/lib/tracks";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { SkillRadar } from "@/components/site/SkillRadar";
import { ScrambleText } from "@/components/site/ScrambleText";
import { BentoCard } from "@/components/site/BentoCard";
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
    const title = t ? `${t.title} — Learn & Shine` : "Track — Learn & Shine";
    const desc = t?.description ?? "Learn & Shine mentoring track.";
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
  const { track } = Route.useLoaderData() as { track: Track };
  const { openModal } = useReservation();
  const isEngineering = track.slug === "engineering";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-background">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Link to="/tracks" className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:underline">
            <ArrowLeft className="h-4 w-4" /> All tracks
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="inline-block border-2 border-ink bg-yellow px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-ink">
                Track {track.number} · {track.short}
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl"
              >
                {isEngineering ? (
                  <ScrambleText text={track.title} duration={900} />
                ) : (
                  track.title
                )}
              </motion.h1>
              <p className="mt-6 max-w-xl text-lg text-zinc-600">{track.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton size="lg" onClick={() => openModal(track.slug)}>
                  Reserve Your Seat
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById("bento")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See Inside
                </MagneticButton>
              </div>
            </div>
            <div className="border-2 border-ink bg-background p-6 shadow-brutal">
              <div className="eyebrow text-ink">Skill Radar</div>
              <p className="mt-1 text-sm text-zinc-600">What you'll be measurably better at by the end.</p>
              <div className="mt-4 grid place-items-center">
                <SkillRadar data={track.radar} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento grid: Topics + Outcomes + Agenda */}
      <section id="bento" className="border-b-2 border-ink bg-surface py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="eyebrow text-ink">Inside the Track</span>
            <h2 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
              The <span className="bg-yellow px-2">bento.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {/* A: Topics — spans 2 cols */}
            <BentoCard className="lg:col-span-2">
              <div className="font-mono text-xs font-bold text-ink/60">// A · TOPIC LIST</div>
              <h3 className="mt-2 font-display text-3xl font-black text-ink">Topics covered</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {track.topics.map((tp, i) => (
                  <motion.li
                    key={tp.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 border-2 border-ink bg-surface px-3 py-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-yellow">
                      <tp.icon className="h-4 w-4 text-ink" />
                    </span>
                    <span className="font-display text-sm font-extrabold text-ink">{tp.title}</span>
                  </motion.li>
                ))}
              </ul>
            </BentoCard>

            {/* B: Outcomes */}
            <BentoCard tone="yellow">
              <div className="font-mono text-xs font-bold text-ink/70">// B · OUTCOMES</div>
              <h3 className="mt-2 font-display text-3xl font-black text-ink">You'll be able to</h3>
              <ul className="mt-5 space-y-4">
                {track.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-2 border-ink bg-background">
                      <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-ink">{o}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* C: Sample agenda — spans 3 */}
            <BentoCard tone="ink" className="lg:col-span-3">
              <div className="font-mono text-xs font-bold text-yellow">// C · SAMPLE AGENDA</div>
              <h3 className="mt-2 font-display text-3xl font-black text-background">A typical workshop</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {track.agenda.map((a, i) => (
                  <div key={i} className="relative border-2 border-yellow bg-ink p-4">
                    <span className="absolute -top-3 left-3 border-2 border-yellow bg-yellow px-2 font-mono text-xs font-extrabold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 font-mono text-xs text-yellow">{a.time}</div>
                    <h4 className="mt-1 font-display text-base font-black text-background">{a.title}</h4>
                    <p className="mt-2 text-xs text-zinc-400">{a.detail}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          <div className="mt-14 text-center">
            <MagneticButton size="lg" onClick={() => openModal(track.slug)}>
              Reserve a Seat in this Track
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Other tracks */}
      <section className="border-b-2 border-ink bg-background py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <h3 className="font-display text-3xl font-black text-ink">Other tracks</h3>
            <Link to="/tracks" className="text-sm font-extrabold text-ink underline underline-offset-4">View all →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tracks.filter((t) => t.slug !== track.slug).map((t) => (
              <Link
                key={t.slug}
                to="/tracks/$slug"
                params={{ slug: t.slug }}
                className="bento-card border-2 border-ink bg-background p-5 shadow-brutal-sm"
              >
                <span className="font-mono text-xs font-bold text-ink/60">// TRACK {t.number}</span>
                <div className="mt-2 font-display text-lg font-black text-ink">{t.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
