import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MentorBenefitsBento } from "@/components/site/MentorBenefitsBento";
import { FloatingSuccessMetrics } from "@/components/site/FloatingSuccessMetrics";
import { motion } from "framer-motion";

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

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
  head: () => ({
    meta: [
      { title: "Mentors — Learn & Shine" },
      {
        name: "description",
        content:
          "Premium mentors from MNCs, IIMs, IITs, and Indian startups — guiding college students through their first career chapter.",
      },
      { property: "og:title", content: "Mentors — Learn & Shine" },
      { property: "og:description", content: "Learn from people who hire people." },
    ],
  }),
});

function MentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "public_mentors"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMentors(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-slate-800">
      <Navbar />
      <section className="bg-transparent pt-28 md:pt-36 pb-12 sm:pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow text-ink">Premium Mentors</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.15] md:leading-tight tracking-wide text-ink sm:text-6xl">
            Learn from people who <span className="text-indigo-600">hire people.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 font-semibold">
            MNC managers, IIM/IIT alumni, startup founders, and senior engineers — mentoring you
            weekly, in cohorts and 1:1.
          </p>
        </div>
      </section>

      <section className="bg-transparent py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto"
          >
            {mentors.map((m) => (
              <Link key={m.name} to="/u/$uid" params={{ uid: m.id }} className="block">
                <motion.div
                  variants={cardVariants}
                  className="bento-card group bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-4 sm:p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] hover:border-white/80 will-change-transform h-full flex flex-col"
                >
                  <div className="flex-grow flex flex-col">
                    {m.photoURL ? (
                      <div className="relative h-52 md:h-64 overflow-hidden rounded-2xl border border-white/40 shrink-0 bg-slate-100 flex items-center justify-center">
                        <img
                          src={m.photoURL}
                          alt={m.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className="relative h-52 md:h-64 overflow-hidden rounded-2xl border border-white/40 shrink-0"
                        style={{
                          background: `linear-gradient(135deg, hsl(${m.hue || 45}, 70%, 88%), hsl(${m.hue || 45}, 60%, 75%))`,
                        }}
                      >
                        <div className="absolute inset-0 grid place-items-center grayscale transition-all duration-500 group-hover:grayscale-0">
                          <span className="font-display text-7xl md:text-8xl font-bold text-indigo-600/40 transition-transform duration-500 group-hover:scale-105">
                            {m.initials}
                          </span>
                        </div>
                      </div>
                    )}
                    <h3 className="mt-6 font-display text-xl md:text-2xl font-bold text-ink">
                      {m.name}
                    </h3>
                    <p className="text-sm md:text-base font-bold text-indigo-600 mt-1">{m.title}</p>
                    <p
                      className="mt-2 text-xs md:text-sm text-slate-700 font-semibold line-clamp-3 leading-relaxed flex-grow"
                      title={m.bio}
                    >
                      {m.bio}
                    </p>
                  </div>
                  <div className="mt-6 mt-auto flex flex-wrap gap-2">
                    {m.topics?.map((t: string) => (
                      <span
                        key={t}
                        className="bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <MentorBenefitsBento />
      <FloatingSuccessMetrics />

      <CtaFooter />
    </main>
  );
}
