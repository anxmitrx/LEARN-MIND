import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { tracks } from "@/lib/tracks";

export function TracksGrid() {
  return (
    <section id="tracks" className="relative bg-surface pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink">5 Mentoring Tracks</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[1.1] md:leading-tight tracking-wide text-ink sm:text-6xl">
            Everything you need <br /> to walk in <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg">ready.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 font-semibold">
            Structured tracks taught by working professionals — covering the personal, professional,
            technical, and human sides of your first career chapter.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
            >
              <Link
                to="/tracks/$slug"
                params={{ slug: t.slug }}
                className="bento-card group block h-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 md:p-7 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] hover:border-white/80 will-change-transform"
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-xs font-bold text-indigo-600/60">// TRACK {t.number}</div>
                  <ArrowUpRight className="h-5 w-5 text-indigo-600 transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">{t.title}</h3>
                <p className="mt-3 text-sm text-slate-600 font-semibold">{t.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {t.topics.slice(0, 3).map((tp) => (
                    <span
                      key={tp.title}
                      className="bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 px-3 py-1 text-[11px] font-bold rounded-full shadow-sm"
                    >
                      {tp.title}
                    </span>
                  ))}
                  {t.topics.length > 3 && (
                    <span className="bg-indigo-500/20 backdrop-blur-md text-indigo-700 border border-indigo-500/30 px-3 py-1 text-[11px] font-extrabold rounded-full shadow-sm">
                      +{t.topics.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/40 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{t.short}</span>
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
