import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are the eligibility requirements?",
    a: "IndustryReady is open to 2nd to final-year students across Engineering, Commerce, and Management streams. If you're serious about being industry-ready, you're in.",
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
    q: "Is this only for premier college students?",
    a: "No. Most of our students come from Tier 2 and Tier 3 institutions. The whole point of IndustryReady is to give you what your campus placement cell can't.",
  },
  {
    q: "What does the mentorship look like 1:1?",
    a: "After every track, you get scheduled 1:1 follow-ups with your track mentor for resume reviews, mock interviews, and personalised career planning.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative border-t border-white/5 bg-background py-24 sm:py-28">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="eyebrow text-yellow">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Quick answers, <span className="text-gradient-yellow">straight up.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-surface px-5 transition-colors data-[state=open]:border-yellow/50"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-white hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-zinc-400">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
