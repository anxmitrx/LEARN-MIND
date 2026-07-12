import { motion } from "framer-motion";
import { Briefcase, UserCog, Sparkles, Plane, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const pillars = [
  {
    icon: Briefcase,
    title: "Business Simulations",
    text: "Industry-specific real-life case studies. Run a D2C launch, debug a sprint, manage a P&L — before you ever clock in.",
    colSpan: "md:col-span-2",
    gradient: "from-blue-500/10 via-indigo-500/10 to-transparent",
    bgPattern: "bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]",
    slug: "business-simulations",
  },
  {
    icon: UserCog,
    title: "Live AMAs",
    text: "We host top executives and founders for live Ask-Me-Anything sessions.",
    colSpan: "md:col-span-1",
    gradient: "from-purple-500/10 via-fuchsia-500/10 to-transparent",
    bgPattern: "",
    slug: "live-amas",
  },
  {
    icon: Sparkles,
    title: "Inner Engineering",
    text: "Sadhguru-inspired routines to keep you steady through your first storms.",
    colSpan: "md:col-span-1",
    gradient: "from-emerald-500/10 via-teal-500/10 to-transparent",
    bgPattern: "",
    slug: "inner-engineering",
  },
  {
    icon: Plane,
    title: "Internships & Visits",
    text: "We actively help students with internship placements and curated industry visits across India.",
    colSpan: "md:col-span-2",
    gradient: "from-orange-500/10 via-amber-500/10 to-transparent",
    bgPattern: "bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]",
    slug: "internships-and-visits",
  },
];

export function InteractiveBentoGrid() {
  return (
    <section id="beyond" className="relative bg-slate-50 py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
          >
            <Sparkles className="h-4 w-4" />
            Beyond Workshops
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl"
          >
            The full{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              industry stack.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              className={`group relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1 ${p.colSpan}`}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="absolute inset-0 z-20"
                aria-label={`Read more about ${p.title}`}
              />
              {/* Geometric Hover Gradients */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Optional Background Pattern */}
              {p.bgPattern && (
                <div
                  className={`absolute inset-0 ${p.bgPattern} opacity-[0.03] transition-transform duration-700 group-hover:scale-110`}
                />
              )}

              <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 z-10">
                <div className="flex justify-between items-start">
                  <div className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 border border-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white">
                    <p.icon className="h-7 w-7 text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 grid place-items-center opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowUpRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-indigo-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-slate-500 font-medium leading-relaxed max-w-sm">
                    {p.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
