import { motion } from "framer-motion";
import { ClipboardList, Video, Dumbbell, Rocket } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Pick a Track", text: "Choose from 5 mentoring tracks built for engineering & management students." },
  { icon: Video, title: "Learn Live", text: "Join weekend live workshops with mentors from MNCs, IIMs, and IITs." },
  { icon: Dumbbell, title: "Practice Real", text: "Run business simulations, mock interviews, and case studies — not theory." },
  { icon: Rocket, title: "Walk In Ready", text: "Show up to your first job already thinking like a 2-year professional." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-y border-white/5 bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-yellow">How it works</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Four steps from <span className="text-gradient-yellow">classroom</span> to career.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-surface p-7 transition-all hover:-translate-y-2 hover:border-yellow"
            >
              <div className="font-display text-5xl font-extrabold text-white/5 transition-colors group-hover:text-yellow/20">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-yellow/10 text-yellow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
