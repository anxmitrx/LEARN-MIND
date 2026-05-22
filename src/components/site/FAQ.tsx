import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Who is Learn & Shine for?",
    a: "Learn & Shine is open to 2nd to final-year students across Engineering, Commerce, and Management streams. If you're serious about being industry-ready, you're in.",
  },
  {
    q: "How does the workshop schedule work?",
    a: "Sessions are held on weekends via live interactive video. Each workshop runs 90–120 minutes with live Q&A, breakout exercises, and a 1:1 mentor follow-up window.",
  },
  {
    q: "How are Industry Leaders introduced?",
    a: "Subject to your institution's permission, we bring in top executives, founders, and senior managers from MNCs for guest AMAs and live mentoring drop-ins.",
  },
  {
    q: "Do you help with internships?",
    a: "Yes. We actively help students with internship placements and industry visit arrangements through our partner network of startups, MNCs, and growth-stage companies.",
  },
  {
    q: "Is this only for Tier 1 colleges?",
    a: "No. Most of our students come from Tier 2 and Tier 3 institutions. The whole point of Learn & Shine is to give you what your campus placement cell can't.",
  },
  {
    q: "What does the 1:1 mentorship look like?",
    a: "After every track, you get scheduled 1:1 follow-ups with your track mentor for resume reviews, mock interviews, and personalised career planning.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-b-2 border-ink bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div>
          <span className="eyebrow text-ink">FAQ</span>
          <h2 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl">
            Quick answers, <span className="bg-yellow px-2">straight up.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-2 border-ink bg-background shadow-brutal-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                >
                  <span className="font-display text-base font-black text-ink sm:text-lg">{f.q}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center border-2 border-ink transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-ink text-yellow" : "bg-yellow text-ink"
                    }`}
                  >
                    <Plus className="h-5 w-5" strokeWidth={3} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden border-t-2 border-ink"
                    >
                      <p className="px-5 py-5 text-sm leading-relaxed text-zinc-700">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
