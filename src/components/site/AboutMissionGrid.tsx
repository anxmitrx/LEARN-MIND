import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Compass, Sparkles } from "lucide-react";

const aboutItems = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To eliminate the gap between academic theory and industry reality, ensuring every graduate is Day-1 ready for the corporate world.",
    colSpan: "md:col-span-2 md:row-span-2",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Lightbulb,
    title: "The Vision",
    text: "A future where a college degree guarantees relevant skills, and students don't need expensive master's degrees just to become employable.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: Users,
    title: "Our Mentors",
    text: "Industry leaders who actively hire for MNCs, guiding you through the exact frameworks they look for in candidates.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Compass,
    title: "The Methodology",
    text: "We replace lectures with sprints. You build projects, simulate workplace scenarios, and face realistic corporate challenges.",
    colSpan: "md:col-span-2 md:row-span-1",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function AboutMissionGrid() {
  return (
    <section className="relative bg-slate-50 py-24 sm:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-100 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-900 tracking-wide uppercase">
              Who We Are
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Driven by purpose.
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">
            Learn & Shine isn't just another ed-tech platform. We are the bridge between your
            college campus and your dream corporate role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-6 max-w-5xl mx-auto">
          {aboutItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${item.colSpan}`}
              >
                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 h-full flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} border border-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                  >
                    <Icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 font-display mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
