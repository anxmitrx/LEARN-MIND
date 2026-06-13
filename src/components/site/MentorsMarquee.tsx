import { motion } from "framer-motion";
import { mentors } from "@/lib/mentors";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function MentorCard({ m }: { m: (typeof mentors)[number] }) {
  return (
    <div className="bento-card group w-full bg-white border border-slate-200 rounded-md p-6 sm:p-8 md:p-10 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md h-full flex flex-col">
      <div className="flex-grow flex flex-col">
        <div
          className="relative h-52 md:h-64 overflow-hidden rounded-2xl border border-slate-200 shrink-0"
          style={{ background: `linear-gradient(135deg, hsl(${m.hue}, 70%, 88%), hsl(${m.hue}, 60%, 78%))` }}
        >
          <div className="absolute inset-0 grid place-items-center transition-all duration-200 group-hover:bg-black/5">
            <span className="font-display text-7xl md:text-8xl font-bold text-white/70 transition-transform duration-200 group-hover:scale-105">
              {m.initials}
            </span>
          </div>
        </div>
        <h4 className="mt-6 font-display text-xl md:text-2xl font-bold text-slate-900">{m.name}</h4>
        <p className="text-sm md:text-base font-bold text-indigo-600 mt-1">{m.title}</p>
        <p className="mt-2 text-xs md:text-sm text-slate-700 font-semibold line-clamp-3 leading-relaxed flex-grow" title={m.bio}>{m.bio}</p>
      </div>
      <div className="mt-6 mt-auto flex flex-wrap gap-2">
        {m.topics.map((t) => (
          <span key={t} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-bold rounded-full shadow-sm">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MentorsMarquee() {
  return (
    <section id="mentors" className="relative bg-slate-50 pt-28 md:pt-36 pb-24 sm:pb-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-4 md:gap-6 border-b border-slate-200 pb-10">
          <div>
            <span className="eyebrow text-slate-600">Premium Mentors</span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-bold leading-[1.15] md:leading-tight tracking-wide text-slate-900 sm:text-6xl">
              Learn from people <br /> who <span className="text-blue-900 bg-blue-50 px-2 py-1 rounded-sm">hire people.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-700 leading-relaxed">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>

        {/* 2-Column Bento Grid Layout with stagger entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {mentors.map((m) => (
            <motion.div key={m.name} variants={cardVariants}>
              <MentorCard m={m} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
