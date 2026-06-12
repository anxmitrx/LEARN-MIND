import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";
import { Link } from "@tanstack/react-router";

const MotionLink = motion.create(Link as any) as any;

type FloatingWorkshopCardProps = {
  title: string;
  description: string;
  time: string;
  positionClasses: string;
  registeredCount: string;
  to: string;
  params?: Record<string, string>;
};

function FloatingWorkshopCard({
  title,
  description,
  time,
  positionClasses,
  registeredCount,
  to,
  params,
}: FloatingWorkshopCardProps) {
  return (
    <MotionLink
      to={to}
      params={params}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`absolute z-30 block bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(31,38,135,0.15)] hover:border-indigo-400/50 group cursor-pointer animate-float-slow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${positionClasses}`}
    >
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-bold text-indigo-900 tracking-wide uppercase">Live</span>
        </div>
        <span className="text-xs font-semibold text-slate-600 tracking-wider">{time}</span>
      </div>
      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors duration-300 font-display">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-700 mb-3 sm:mb-4 line-clamp-2 font-medium">
        {description}
      </p>
      <div className="text-xs font-bold text-slate-600">{registeredCount}</div>
    </MotionLink>
  );
}

const WORDS = ["career", "first job", "dream role", "future"];

export function Hero() {
  const { openModal } = useReservation();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

            {/* Top Badges Parent Wrapper */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-8 px-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
                <Sparkles className="w-4 h-4 mr-2 text-indigo-700 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-indigo-700 tracking-wide uppercase leading-none">
                  Industry-Ready Since Day One
                </span>
              </div>

              <div className="flex items-center justify-center h-8 px-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
                <span className="text-xs sm:text-sm font-bold text-indigo-700 tracking-wide uppercase leading-none">
                  STUCK? WE ARE HERE TO HELP YOU
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-normal text-ink"
            >
              Step into <br />
              your{" "}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="inline-block text-indigo-600 font-extrabold"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              <br />
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-2 -z-10 h-5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 sm:h-7 rounded-md" />
                with absolute clarity.
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-lg text-zinc-700 font-semibold">
              Leave the confusion behind. Get personalized mentorship, live industry workshops, and
              the exact roadmap you need to transition from campus to the corporate world with
              confidence.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton size="lg" onClick={() => openModal()}>
                Reserve Your Seat
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" })
                }
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
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual card/image column */}
          <motion.div
            variants={item}
            className="relative w-full h-full flex items-center justify-center py-12 lg:py-0"
          >
            {/* Base image layer */}
            <img
              src="/assets/WhatsApp Image 2026-06-03 at 7.48.00 PM.jpeg"
              alt="Hiring Outcomes & Prep"
              className="w-full max-w-md sm:max-w-lg aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] object-cover rounded-[2rem] shadow-2xl z-0"
            />

            {/* Top/Right Floating Card: Salary Negotiation Workshop */}
            <FloatingWorkshopCard
              title="Negotiating Your First Salary"
              description="Live workshop with an MNC hiring manager. Real scripts & context."
              time="SAT • 7:00 PM"
              positionClasses="-right-4 -top-8 sm:-right-12 sm:-top-6 w-[90%] max-w-[340px]"
              registeredCount="+412 registered"
              to="/tracks/$slug"
              params={{ slug: "practical" }}
            />

            {/* Mid-Left Floating Card: Python & AI Basics */}
            <FloatingWorkshopCard
              title="Mastering Python & AI Basics"
              description="Live session on bridging the gap between C/Python syntax and real-world AI applications."
              time="SUN • 5:00 PM"
              positionClasses="-left-16 top-12 sm:-left-24 sm:top-8 md:-left-32 md:top-16 z-30 max-w-[260px] scale-90 origin-top-right sm:scale-95"
              registeredCount="+215 registered"
              to="/tracks/$slug"
              params={{ slug: "engineering" }}
            />

            {/* Bottom-Right Floating Card: Core Engineering */}
            <FloatingWorkshopCard
              title="Cracking Core Engineering"
              description="Deep dive into circuit analysis, Op-amps, and thermodynamics for tech roles."
              time="TUE • 6:30 PM"
              positionClasses="-right-2 -bottom-6 sm:-right-12 sm:bottom-4 max-w-[280px] scale-90 sm:scale-95 hidden sm:block"
              registeredCount="+189 registered"
              to="/tracks/$slug"
              params={{ slug: "engineering" }}
            />

            {/* Bottom/Left Floating Card: Arjun Outcome */}
            <MotionLink
              to="/tracks/$slug"
              params={{ slug: "personal-professional" }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute -left-4 -bottom-6 sm:-left-10 sm:bottom-10 z-20 max-w-[260px] block bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(31,38,135,0.15)] hover:border-indigo-400/50 group cursor-pointer animate-float-slow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">
                  Outcome
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-700 transition-colors duration-300 font-display">
                Hired at Infosys
              </h3>
              <p className="text-xs font-semibold text-slate-600">— Arjun, B.Tech</p>
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden bg-ink">
        <div className="flex w-max animate-marquee gap-12 py-3 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Gain Clarity <span className="text-indigo-400">★</span> Step Forward with Confidence{" "}
              <span className="text-indigo-400">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
