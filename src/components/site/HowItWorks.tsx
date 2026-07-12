import { motion } from "framer-motion";
import { ClipboardList, Video, Dumbbell, Rocket } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Pick a Track",
    text: "Choose from 5 mentoring tracks built for engineering & management students.",
  },
  {
    icon: Video,
    title: "Learn Live",
    text: "Join weekend live workshops with mentors from MNCs, IIMs, and IITs.",
  },
  {
    icon: Dumbbell,
    title: "Practice Real",
    text: "Run business simulations, mock interviews, and case studies — not theory.",
  },
  {
    icon: Rocket,
    title: "Walk In Ready",
    text: "Show up to your first job already thinking like a 2-year professional.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-background pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink">How it works · 04 Steps</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-wide text-ink sm:text-6xl">
            Four steps from <br /> classroom to{" "}
            <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg">
              career.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bento-card relative bg-white/30 backdrop-blur-xl border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 md:p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/40 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] hover:border-indigo-400/70 will-change-transform"
            >
              <div className="font-display text-6xl font-bold text-ink/10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 inline-grid h-12 w-12 place-items-center bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200/50 shadow-sm">
                <s.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 font-semibold">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
