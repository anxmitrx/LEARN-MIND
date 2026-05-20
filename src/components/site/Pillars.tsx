import { motion } from "framer-motion";
import { Briefcase, UserCog, Sparkles, Plane } from "lucide-react";

const pillars = [
  {
    icon: Briefcase,
    title: "Business Simulations",
    text: "Industry-specific real-life case studies. Run a D2C launch, debug a sprint, manage a P&L — before you ever clock in.",
  },
  {
    icon: UserCog,
    title: "Industry Leader AMAs",
    text: "Subject to institution permission, we host top executives and founders for live Ask-Me-Anything sessions.",
  },
  {
    icon: Sparkles,
    title: "Professionalism + Spiritualism",
    text: "Inner Engineering. Inner Management. Sadhguru-inspired routines to keep you steady through your first storms.",
  },
  {
    icon: Plane,
    title: "Internships & Industry Visits",
    text: "We actively help students with internship placements and curated industry visits across India.",
  },
];

export function Pillars() {
  return (
    <section id="beyond" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-yellow">Beyond Workshops</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The full <span className="text-gradient-yellow">industry stack.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 transition-all hover:-translate-y-1 hover:border-yellow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/10 text-yellow">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-yellow/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
