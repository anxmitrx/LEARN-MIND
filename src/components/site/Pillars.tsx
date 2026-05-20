import { motion } from "framer-motion";
import { Briefcase, UserCog, Sparkles, Plane } from "lucide-react";

type PillarTone = "white" | "yellow" | "ink";

const pillars = [
  {
    icon: Briefcase,
    title: "Business Simulations",
    text: "Industry-specific real-life case studies. Run a D2C launch, debug a sprint, manage a P&L — before you ever clock in.",
    tone: "white" as PillarTone,
  },
  {
    icon: UserCog,
    title: "Industry Leader AMAs",
    text: "Subject to institution permission, we host top executives and founders for live Ask-Me-Anything sessions.",
    tone: "yellow" as PillarTone,
  },
  {
    icon: Sparkles,
    title: "Professionalism + Spiritualism",
    text: "Inner Engineering. Inner Management. Sadhguru-inspired routines to keep you steady through your first storms.",
    tone: "yellow" as PillarTone,
  },
  {
    icon: Plane,
    title: "Internships & Industry Visits",
    text: "We actively help students with internship placements and curated industry visits across India.",
    tone: "white" as PillarTone,
  },
];

export function Pillars() {
  return (
    <section id="beyond" className="relative border-b-2 border-ink bg-surface py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink">Beyond Workshops</span>
          <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
            The full <span className="bg-yellow px-2">industry stack.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => {
            const isInk = p.tone === "ink";
            const isYellow = p.tone === "yellow";
            const bg = isInk ? "bg-ink text-background" : isYellow ? "bg-yellow text-ink" : "bg-background text-ink";
            const iconBg = isInk ? "bg-yellow text-ink" : isYellow ? "bg-ink text-yellow" : "bg-yellow text-ink";
            const subText = isInk ? "text-zinc-300" : "text-zinc-700";
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className={`bento-card relative overflow-hidden border-2 border-ink p-8 shadow-brutal-sm ${bg}`}
              >
                <div className={`inline-grid h-14 w-14 place-items-center border-2 border-ink ${iconBg}`}>
                  <p.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-black leading-tight">{p.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${subText}`}>{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
