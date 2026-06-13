import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useWorkshops } from "@/hooks/useWorkshops";
import { useState } from "react";

export function TracksGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const { workshops: tracks, loading } = useWorkshops();

  const tabs = [
    { id: "all", label: "All Tracks" },
    { id: "tech", label: "Tech & Build" },
    { id: "business", label: "Business & Strategy" },
    { id: "personal", label: "Personal & Career" },
  ];

  const getFilteredTracks = (tab: string) => {
    if (tab === "all") return tracks;
    if (tab === "tech") return tracks.filter((t) => t.slug === "engineering");
    if (tab === "business") return tracks.filter((t) => t.slug === "management");
    if (tab === "personal") {
      return tracks.filter((t) =>
        ["personal-professional", "soft-skills", "practical"].includes(t.slug),
      );
    }
    return tracks;
  };

  const filteredTracks = getFilteredTracks(activeTab);

  return (
    <section id="tracks" className="relative bg-surface pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-slate-900">5 Mentoring Tracks</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[1.1] md:leading-tight tracking-wide text-slate-900 sm:text-6xl">
            Everything you need <br /> to walk in{" "}
            <span className="text-blue-900 bg-blue-50 px-2 rounded-sm">
              ready.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 font-semibold">
            Structured tracks taught by working professionals — covering the personal, professional,
            technical, and human sides of your first career chapter.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 justify-start items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
                  isActive
                    ? "bg-blue-900 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>



        {loading ? (
          <div className="mt-12 flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
        ) : (
          <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTracks.map((t) => (
              <motion.div
                key={t.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                  <Link
                  to="/workshops/$slug"
                  params={{ slug: t.slug }}
                  className="bento-card group block h-full bg-white border border-slate-200 rounded-md p-5 md:p-7 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md h-full flex flex-col"
                >
                  <div className="flex items-start justify-between">
                    <div className="font-mono text-xs font-bold text-indigo-600/60">
                      // TRACK {t.number}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-indigo-600 transition-transform group-hover:rotate-12" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-slate-900">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-semibold">{t.tagline}</p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {t.topics.slice(0, 3).map((tp) => (
                      <span
                        key={tp.title}
                        className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-[11px] font-bold rounded-full shadow-sm"
                      >
                        {tp.title}
                      </span>
                    ))}
                    {t.topics.length > 3 && (
                      <span className="bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 text-[11px] font-bold rounded-full shadow-sm">
                        +{t.topics.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {t.short}
                    </span>
                    <span className="font-display text-xs font-extrabold uppercase tracking-wider text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>
    </section>
  );
}
