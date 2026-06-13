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
    <section id="beyond" className="relative bg-surface py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-slate-900">Beyond Workshops</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-wide text-slate-900 sm:text-6xl">
            The full <span className="bg-slate-100 text-indigo-900 px-2 rounded-lg">industry stack.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => {
            const isInk = p.tone === "ink";
            const isYellow = p.tone === "yellow";
            
            const bg = i === 0
              ? "bg-indigo-900 border border-indigo-800 text-white shadow-sm hover:bg-indigo-950 hover:border-indigo-700 hover:-translate-y-1 hover:shadow-md" 
              : i === 1
              ? "bg-rose-50 border border-rose-100 text-slate-800 shadow-sm hover:bg-rose-100 hover:border-rose-200 hover:-translate-y-1 hover:shadow-md" 
              : "bg-white border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md";
              
            const iconBg = isInk 
              ? "bg-indigo-100 text-indigo-700 border border-indigo-200/50 shadow-sm" 
              : isYellow 
              ? "bg-purple-100 text-purple-700 border border-purple-200/50 shadow-sm" 
              : "bg-[#E0C3FC]/20 text-[#1E1B4B] border border-[#E0C3FC]/40 shadow-sm";
              
            const subText = isInk ? "text-zinc-300 font-semibold" : "text-slate-600 font-semibold";
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
                className={`bento-card relative overflow-hidden p-4 md:p-8 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] will-change-transform ${bg}`}
              >
                <div className={`inline-grid h-14 w-14 place-items-center rounded-full ${iconBg}`}>
                  <p.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight">{p.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${subText}`}>{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
