import { motion } from "framer-motion";
import { Wrench, BookOpen, Rocket, PlayCircle } from "lucide-react";

const processItems = [
  {
    icon: BookOpen,
    title: "1. Learn",
    text: "Understand the core concepts directly from an industry veteran. No fluff, just the mental models that matter in production.",
    colSpan: "md:col-span-1",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Wrench,
    title: "2. Build",
    text: "Open your editor and start coding, designing, or strategizing alongside your mentor. Real-time feedback, real projects.",
    colSpan: "md:col-span-1",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: Rocket,
    title: "3. Ship",
    text: "Deploy your project or present your strategy. Add it straight to your portfolio with the 'Mentor Approved' stamp.",
    colSpan: "md:col-span-2",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function WorkshopProcessBento() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-100 shadow-sm mb-6">
            <PlayCircle className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-900 tracking-wide uppercase">
              Methodology
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Learn. Build. Ship.
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">
            Our workshops aren't lectures. They are intensive, hands-on sprints designed to give you
            a portfolio piece in a single weekend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {processItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                className={`group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${item.colSpan}`}
              >
                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} border border-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shrink-0`}
                  >
                    <Icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
