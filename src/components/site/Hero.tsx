import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";

export function Hero() {
  const { openModal } = useReservation();

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 dot-bg opacity-60" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-[36rem] w-[36rem] rounded-full bg-[#8EC5FC]/30 opacity-80 blur-3xl animate-float-slow" />

      <div className="container relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 bg-white/20 border border-white/40 backdrop-blur-md shadow-xl">
            {/* Contextual Background Image */}
            <div className="absolute inset-0 z-[-1] opacity-35 [mask-image:linear-gradient(to_bottom,white,transparent)]">
              <img
                src="/assets/hero-support-bg.png"
                alt="Tech workspace student support background"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glass Overlay Layer */}
            <div className="absolute inset-0 z-[-1] bg-white/25 backdrop-blur-[3px]" />

            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 text-xs font-display font-extrabold uppercase tracking-wider text-indigo-600 rounded-full border border-white/50 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Industry-Ready Since Day One
            </motion.span>

            {/* STUCK? Badge */}
            <motion.div
              variants={item}
              className="block sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/55 backdrop-blur-md border border-white/65 text-indigo-700 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm mb-6 mt-4 w-fit"
            >
              STUCK? WE ARE HERE TO HELP YOU
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-normal text-ink"
            >
              Step into <br />
              your career <br />
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-2 -z-10 h-5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 sm:h-7 rounded-md" />
                with absolute clarity.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-lg text-zinc-700 font-semibold"
            >
              Leave the confusion behind. Get personalized mentorship, live industry workshops, and the exact roadmap you need to transition from campus to the corporate world with confidence.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton size="lg" onClick={() => openModal()}>
                Reserve Your Seat
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" })}
              >
                <PlayCircle className="h-4 w-4" />
                Explore Tracks
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-[#3A3532]/10 pt-8"
            >
              {[
                { k: "5", v: "Mentoring tracks" },
                { k: "50+", v: "Live workshops" },
                { k: "1:1", v: "Mentor access" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-4xl font-bold text-ink">{s.k}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual card */}
          <motion.div
            variants={item}
            className="relative hidden lg:block"
          >
            <div className="animate-float-slow relative bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  Live
                </span>
                <span className="font-mono text-xs text-slate-600 font-semibold">SAT · 7:00 PM IST</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-ink">
                Negotiating Your First Salary — Without Sounding Pushy
              </h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Live workshop with an MNC hiring manager. Real scripts, real numbers, real Indian context.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[40, 50, 60].map((h, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border border-white/40"
                      style={{ background: `hsl(${h}, 90%, 55%)` }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600 font-bold">+412 students registered</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-8 bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-3xl shadow-lg shadow-indigo-500/10">
              <div className="eyebrow text-indigo-600">Outcome</div>
              <div className="mt-1 font-display text-lg font-bold text-ink">Hired at Infosys</div>
              <div className="text-xs font-bold text-slate-600 mt-1">— Arjun, B.Tech · 3 weeks after workshop</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden bg-ink">
        <div className="flex w-max animate-marquee gap-12 py-3 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Gain Clarity <span className="text-indigo-400">★</span> Step Forward with Confidence <span className="text-indigo-400">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
