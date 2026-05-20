import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";

export function Hero() {
  const { openModal } = useReservation();
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[40rem] w-[40rem] rounded-full bg-yellow/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-yellow/30 bg-yellow/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Industry-Ready Since Day One
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-extrabold leading-[1] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Stop hoping <br />
              you'll figure <br />
              <span className="text-gradient-yellow">it out.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-zinc-400"
            >
              Start training for the job you actually want. Live workshops, real mentors from MNCs &
              IIMs, and the playbook your college never taught you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton onClick={() => openModal()}>
                Reserve Your Seat
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="outline" onClick={() => document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" })}>
                <PlayCircle className="h-4 w-4" />
                Explore Tracks
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { k: "5", v: "Mentoring tracks" },
                { k: "50+", v: "Live workshops" },
                { k: "1:1", v: "Mentor access" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl font-extrabold text-yellow">{s.k}</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="animate-float-slow relative rounded-2xl border border-yellow/20 bg-surface p-6 shadow-card">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-yellow/20 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    Live
                  </span>
                  <span className="text-xs text-zinc-500">Sat · 7:00 PM IST</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  Negotiating Your First Salary — Without Sounding Pushy
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Live workshop with an MNC hiring manager. Real scripts, real numbers, real Indian context.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[40, 50, 60].map((h, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-surface"
                        style={{ background: `hsl(${h}, 90%, 55%)` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">+412 students registered</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-xl border border-white/10 bg-background/90 p-4 backdrop-blur shadow-card">
              <div className="eyebrow text-yellow">Outcome</div>
              <div className="mt-1 font-display text-lg font-bold text-white">Hired at Infosys</div>
              <div className="text-xs text-zinc-500">— Arjun, B.Tech, 3 weeks after workshop</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
