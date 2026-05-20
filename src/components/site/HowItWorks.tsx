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
    <section id="how" className="relative border-b-2 border-ink bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink">How it works · 04 Steps</span>
          <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
            Four steps from <br /> classroom to <span className="bg-yellow px-2">career.</span>
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
              className="bento-card relative border-2 border-ink bg-background p-7 shadow-brutal-sm"
            >
              <div className="font-display text-6xl font-black text-ink/10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 inline-grid h-12 w-12 place-items-center border-2 border-ink bg-yellow text-ink">
                <s.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
