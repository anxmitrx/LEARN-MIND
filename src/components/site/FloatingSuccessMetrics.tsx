import { motion } from "framer-motion";
import { TrendingUp, Award, Building2, CheckCircle2 } from "lucide-react";

export function FloatingSuccessMetrics() {
  const metrics = [
    {
      title: "Average Salary Hike",
      value: "140%",
      subtitle: "For recent graduates",
      icon: TrendingUp,
      delay: 0.1,
    },
    {
      title: "Placement Rate",
      value: "96%",
      subtitle: "Within 3 months",
      icon: Award,
      delay: 0.2,
    },
    {
      title: "Hiring Partners",
      value: "150+",
      subtitle: "MNCs & Startups",
      icon: Building2,
      delay: 0.3,
    },
    {
      title: "Interviews Cleared",
      value: "3000+",
      subtitle: "Mock & Real",
      icon: CheckCircle2,
      delay: 0.4,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      {/* Massive Glowing Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-indigo-600/5 to-transparent blur-[80px]"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            The outcomes speak for themselves.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: metric.delay, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden cursor-default shadow-2xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:text-indigo-200 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-slate-300 font-bold text-sm uppercase tracking-widest mb-2">{metric.title}</h3>
                  <div className="text-5xl font-display font-extrabold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-fuchsia-300 transition-all duration-300">
                    {metric.value}
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{metric.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
