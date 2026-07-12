import { motion } from "framer-motion";
import { Mic, Download, Share2, Star } from "lucide-react";

const webinarFeatures = [
  {
    icon: Mic,
    title: "Interactive Live Q&A",
    text: "Don't just watch—participate. Unmute yourself and ask industry leaders your burning career questions directly.",
    colSpan: "md:col-span-2 md:row-span-1",
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: Star,
    title: "Exclusive Insights",
    text: "Get actionable playbooks from hiring managers that you won't find in standard textbooks.",
    colSpan: "md:col-span-1 md:row-span-2",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Download,
    title: "Resource Drops",
    text: "Every webinar ends with a free resource drop—from cold email templates to resume cheat sheets.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Share2,
    title: "Networking Magic",
    text: "Connect with hundreds of ambitious peers in the chat and build your professional network early.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function WebinarFeaturesBento() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Why Join Live?
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            More than just a presentation.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-6 max-w-5xl mx-auto">
          {webinarFeatures.map((item, i) => {
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
