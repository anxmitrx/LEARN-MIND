import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { tracks } from "@/lib/tracks";

export function TracksGrid() {
  return (
    <section id="tracks" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-yellow">5 Mentoring Tracks</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Everything you need to walk in <span className="text-gradient-yellow">ready.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
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
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <Link
                to="/tracks/$slug"
                params={{ slug: t.slug }}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:border-yellow hover:shadow-glow"
              >
                <div className="absolute right-6 top-6 text-zinc-700 transition-colors group-hover:text-yellow">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-12" />
                </div>
                <span className="eyebrow text-yellow">Track {t.number}</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">{t.title}</h3>
                <p className="mt-3 text-sm text-zinc-400">{t.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {t.topics.slice(0, 3).map((tp) => (
                    <span
                      key={tp.title}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                    >
                      {tp.title}
                    </span>
                  ))}
                  {t.topics.length > 3 && (
                    <span className="rounded-full bg-yellow/10 px-2.5 py-1 text-[11px] font-bold text-yellow">
                      +{t.topics.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="text-xs font-medium text-zinc-500">{t.short}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow opacity-0 transition-opacity group-hover:opacity-100">
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
