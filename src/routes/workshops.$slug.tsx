import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Track } from "@/lib/tracks";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { SkillRadar } from "@/components/site/SkillRadar";
import { ScrambleText } from "@/components/site/ScrambleText";
import { BentoCard } from "@/components/site/BentoCard";
import { useWorkshops, fetchWorkshopBySlug } from "@/hooks/useWorkshops";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useReservation } from "@/components/site/ReservationContext";
import { ArrowLeft, Check, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";

export const Route = createFileRoute("/workshops/$slug")({
  component: TrackPage,
  loader: async ({ params }): Promise<{ track: Track }> => {
    const track = await fetchWorkshopBySlug(params.slug);
    if (!track) throw notFound();
    return { track };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.track;
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
  const { workshops: tracks } = useWorkshops();
  const isEngineering = track.slug === "engineering";

  return (
    <main className="min-h-screen bg-transparent text-slate-800">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
          >
            <ArrowLeft className="h-4 w-4" /> All tracks
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              {(track as any).bannerUrl && (
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
                  <img src={(track as any).bannerUrl} alt="Workshop Banner" className="w-full h-48 object-cover" />
                </div>
              )}
              <span className="inline-block bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 px-3.5 py-1 text-xs font-display font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                Track {track.number} · {track.short}
              </span>
              <div className="flex items-center gap-6 mt-5">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-5xl font-bold leading-[0.95] tracking-wide text-ink sm:text-6xl lg:text-7xl flex-1"
                >
                  {isEngineering ? <ScrambleText text={track.title} duration={900} /> : track.title}
                </motion.h1>
                {(track as any).hostPhotoURL && (
                  <div className="flex flex-col items-center shrink-0">
                    <img 
                      src={(track as any).hostPhotoURL} 
                      alt={(track as any).hostName} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-[0_8px_16px_rgba(0,0,0,0.1)] object-cover bg-white" 
                    />
                    <span className="mt-2 text-[10px] sm:text-xs font-extrabold text-slate-700 uppercase tracking-wider text-center max-w-[90px] leading-tight">
                      {(track as any).hostName}
                    </span>
                    {(track as any).hostProfession && (
                      <span className="mt-0.5 text-[9px] font-medium text-slate-500 text-center max-w-[90px] leading-tight line-clamp-2">
                        {(track as any).hostProfession}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {(track as any).date && (
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-700 bg-indigo-50 inline-flex px-4 py-2 rounded-xl border border-indigo-100">
                  <Calendar className="w-4 h-4" /> {(track as any).date} at {(track as any).time}
                </div>
              )}

              <p className="mt-6 max-w-xl text-lg text-slate-600 font-semibold">
                {track.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton size="lg" onClick={() => openModal(track.slug)}>
                  Reserve Your Seat
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document.getElementById("bento")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  See Inside
                </MagneticButton>
              </div>
            </div>
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 sm:p-6">
              <div className="eyebrow text-indigo-600 font-bold">Skill Radar</div>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                What you'll be measurably better at by the end.
              </p>
              <div className="mt-4 grid place-items-center">
                <SkillRadar data={track.radar || []} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento grid: Topics + Outcomes + Agenda */}
      <section id="bento" className="bg-transparent py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="eyebrow text-ink">Inside the Track</span>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-wide text-ink sm:text-6xl">
              The <span className="text-indigo-600">bento.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {/* A: Topics — spans 2 cols */}
            <BentoCard className="lg:col-span-2">
              <div className="font-mono text-xs font-bold text-indigo-600/60">
                // A · TOPIC LIST
              </div>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink">Topics covered</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {(track.topics || []).map((topic, i) => {
                  const Icon = getIcon(topic.icon);
                  return (
                    <motion.li
                      key={topic.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/50 shadow-sm"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center bg-indigo-100 text-indigo-700 border border-indigo-200/50 rounded-full shadow-sm">
                        <Icon className="h-4 w-4 text-indigo-700" />
                      </span>
                      <span className="font-display text-sm font-bold text-ink">{topic.title}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </BentoCard>

            {/* B: Outcomes */}
            <BentoCard tone="yellow">
              <div className="font-mono text-xs font-bold text-indigo-600/70">// B · OUTCOMES</div>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink">You'll be able to</h3>
              <ul className="mt-5 space-y-4">
                {(track.outcomes || []).map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 rounded-full shadow-sm">
                      <Check className="h-3.5 w-3.5 text-indigo-600" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* C: Sample agenda — spans 3 */}
            <BentoCard tone="ink" className="lg:col-span-3">
              <div className="font-mono text-xs font-bold text-indigo-300">
                // C · SAMPLE AGENDA
              </div>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">
                A typical workshop
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(track.agenda || []).map((a, i) => (
                  <div
                    key={i}
                    className="relative bg-indigo-950/60 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-sm text-white"
                  >
                    <span className="absolute -top-3 left-3 bg-[#E0C3FC] px-3.5 py-0.5 font-mono text-xs font-extrabold text-indigo-950 rounded-full shadow-sm border border-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 font-mono text-xs text-indigo-300 font-semibold">
                      {a.time}
                    </div>
                    <h4 className="mt-1 font-display text-base font-bold text-white">{a.title}</h4>
                    <p className="mt-2 text-xs text-zinc-300 font-medium">{a.detail}</p>
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
      <section className="bg-transparent py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <h3 className="font-display text-3xl font-bold text-ink">Other tracks</h3>
            <Link
              to="/workshops"
              className="text-sm font-extrabold text-indigo-600 underline underline-offset-4"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tracks
              .filter((t: Track) => t.slug !== track.slug)
              .map((t: Track) => (
                <Link
                  key={t.slug}
                  to="/workshops/$slug"
                  params={{ slug: t.slug }}
                  className="bento-card bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-4 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] hover:border-white/80 will-change-transform focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20"
                >
                  <span className="font-mono text-xs font-bold text-indigo-600/60">
                    // TRACK {t.number}
                  </span>
                  <div className="mt-2 font-display text-lg font-bold text-ink">{t.title}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
