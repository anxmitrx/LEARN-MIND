import { motion } from "framer-motion";
import { GraduationCap, Map, Target, Briefcase } from "lucide-react";

const processItems = [
  {
    icon: GraduationCap,
    title: "1. Skill Discovery",
    text: "We analyze your academic strengths, natural interests, and aptitude to find fields you will actually enjoy studying.",
    colSpan: "md:col-span-1",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Map,
    title: "2. Stream & College Mapping",
    text: "We map your profile to the best possible streams, entrance exams, and colleges—and build backup options to reduce stress.",
    colSpan: "md:col-span-1",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: Target,
    title: "3. Future-Proof Career Plan",
    text: "We reverse-engineer from the high-paying jobs of tomorrow (AI, Data, Product) back to the college degree you need today.",
    colSpan: "md:col-span-2",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function ConsultationProcessBento() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 mb-8">
      {processItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
            className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 ${item.colSpan}`}
          >
            {/* Hover Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full ${item.bg} border border-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
