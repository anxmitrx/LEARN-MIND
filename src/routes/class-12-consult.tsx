import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, HelpCircle, Phone, User, Briefcase, GraduationCap, Plus, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/class-12-consult")({
  component: Class12ConsultPage,
  head: () => ({
    meta: [
      { title: "Class 12 Roadmap Consultation — Learn & Shine" },
      {
        name: "description",
        content: "Stop guessing. Get expert 1-on-1 guidance on college choice, streams, and entrance exams. Subsidy pricing for Class 11 & 12 students.",
      },
      { property: "og:title", content: "Class 12 Roadmap Consultation — Learn & Shine" },
      {
        property: "og:description",
        content: "Get expert, subsidized 1-on-1 roadmap guidance. Make the right decisions before investing in expensive college degrees.",
      },
    ],
  }),
});

const faqs = [
  {
    q: "Who is this consultation for?",
    a: "This program is specifically designed for Class 11 & 12 students (and their parents) who are confused about stream selection, college courses, degree matching, or how to align school choices with future high-paying careers.",
  },
  {
    q: "How much does it cost?",
    a: "The session is highly subsidized and priced at our lowest bracket ever. Our mission is to prevent expensive mistakes—spending lakhs on a degree that doesn't fit you or the market—by providing professional clarity early on.",
  },
  {
    q: "What will we discuss?",
    a: "We will build a personalized roadmap covering stream optimization, degree-to-career mapping, entrance exam playbooks (e.g. JEE, NEET, CUET, IPMAT), and crucial backup options to reduce stress.",
  },
  {
    q: "Who are the mentors?",
    a: "Your session will be led by recent graduates of top institutions (like IITs, IIMs, and Tier-1 colleges) and working professionals who have navigated the placement/industry system successfully and know what skills are in demand.",
  },
];

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").replace(/^91/, "").slice(0, 10);
  if (!digits) return "";
  const a = digits.slice(0, 5);
  const b = digits.slice(5, 10);
  return b ? `${a} ${b}` : a;
};

const phoneIsValid = (raw: string) => raw.replace(/\D/g, "").length === 10;

function Class12ConsultPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    stream: "",
    career: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    stream: false,
  });

  const nameOk = form.name.trim().length >= 2;
  const phoneOk = phoneIsValid(form.phone);
  const streamOk = form.stream !== "";
  const formValid = nameOk && phoneOk && streamOk;

  const fireConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ["#FFCC00", "#050505", "#FFFFFF"];
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 75, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 75, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) {
      setTouched({ name: true, phone: true, stream: true });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      fireConfetti();
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background text-foreground dot-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative border-b-2 border-ink bg-yellow py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block border-2 border-ink bg-background px-3 py-1 font-bold text-ink shadow-brutal-sm">
              ✨ Limited Subsidy Slots Available
            </span>
            <h1 className="mt-6 font-display text-4xl font-black leading-[1.1] tracking-tight text-ink sm:text-6xl md:text-7xl">
              The Ultimate <br className="hidden sm:inline" />
              Class 12 <span className="bg-background px-2 box-decoration-slice">Roadmap.</span>
            </h1>
            <p className="mt-6 text-base font-bold leading-relaxed text-ink/80 sm:text-lg max-w-2xl">
              Stop guessing your future. Get expert, personalized guidance on choosing the right college courses, entrance exams, and high-growth careers at a price that actually makes sense.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Content Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Value Prop & FAQ */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Value Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-2 border-ink bg-background p-6 shadow-brutal-sm">
                  <div className="grid h-12 w-12 place-items-center border-2 border-ink bg-yellow text-ink mb-4 shadow-brutal-sm">
                    <GraduationCap className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-lg font-black text-ink">Right Choice Guarantee</h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    Make data-backed stream & course choices based on modern high-growth careers, not outdated peer pressure.
                  </p>
                </div>

                <div className="border-2 border-ink bg-background p-6 shadow-brutal-sm">
                  <div className="grid h-12 w-12 place-items-center border-2 border-ink bg-yellow text-ink mb-4 shadow-brutal-sm">
                    <Sparkles className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-lg font-black text-ink">Premium 1:1 Focus</h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    No crowded zoom rooms. One dedicated student, one industry veteran mentor, and custom tailored advice.
                  </p>
                </div>
              </div>

              {/* FAQ Bento Box Accordion */}
              <div className="border-2 border-ink bg-background p-6 md:p-8 shadow-brutal">
                <div className="flex items-center gap-2.5 mb-6">
                  <HelpCircle className="h-6 w-6 text-ink" strokeWidth={2.5} />
                  <h2 className="font-display text-2xl font-black text-ink">Roadmap FAQs</h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="border-2 border-ink bg-background shadow-brutal-sm transition-colors duration-200"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="font-display text-sm font-black text-ink sm:text-base">
                            {f.q}
                          </span>
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center border-2 border-ink transition-all duration-300 ${
                              isOpen ? "rotate-45 bg-ink text-yellow" : "bg-yellow text-ink"
                            }`}
                          >
                            <Plus className="h-4 w-4" strokeWidth={3} />
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
                              <p className="px-5 py-4 text-xs sm:text-sm leading-relaxed text-zinc-700">
                                {f.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Lead Capture Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--banner-height,0px)+80px)] self-start">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="consultation-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="border-2 border-ink bg-background p-6 md:p-8 shadow-[8px_8px_0px_#FFCC00]"
                  >
                    <div className="border-b-2 border-ink pb-4 mb-6">
                      <h2 className="font-display text-2xl font-black text-ink uppercase tracking-tight">
                        Book Consultation
                      </h2>
                      <p className="text-xs font-semibold text-zinc-500 mt-1">
                        Secure your personalized session slot under 60 seconds.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Full Name field */}
                      <div>
                        <label className="block mb-1.5">
                          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" /> Full Name <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priyanshu Mehta"
                            value={form.name}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            className={`w-full border-2 border-ink bg-background px-4 py-3 text-sm font-medium text-ink placeholder:text-zinc-400 outline-none transition-shadow rounded-none focus:shadow-brutal-sm ${
                              touched.name && !nameOk ? "border-red-500 focus:shadow-none" : "border-ink"
                            }`}
                          />
                          {touched.name && !nameOk && (
                            <span className="text-[10px] font-bold text-red-500 mt-1 block">
                              Name must be at least 2 characters long
                            </span>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp field */}
                      <div>
                        <label className="block mb-1.5">
                          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" /> WhatsApp Number <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <div className="flex">
                          <span className="grid place-items-center border-2 border-r-0 border-ink bg-yellow px-3 font-mono text-sm font-extrabold text-ink">
                            +91
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            required
                            placeholder="98765 43210"
                            value={form.phone}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            onChange={(e) => setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
                            className={`w-full border-2 border-ink bg-background px-4 py-3 text-sm font-medium text-ink placeholder:text-zinc-400 outline-none transition-shadow rounded-none focus:shadow-brutal-sm ${
                              touched.phone && !phoneOk ? "border-red-500 focus:shadow-none" : "border-ink"
                            }`}
                          />
                        </div>
                        {touched.phone && !phoneOk && (
                          <span className="text-[10px] font-bold text-red-500 mt-1 block">
                            Please enter a valid 10-digit number
                          </span>
                        )}
                        {phoneOk && (
                          <span className="text-[10px] font-bold text-green-600 mt-1 flex items-center gap-1">
                            <Check className="h-3 w-3" /> Real-time check: Number matches format
                          </span>
                        )}
                      </div>

                      {/* Current Stream field */}
                      <div>
                        <label className="block mb-1.5">
                          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5" /> Current Stream <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <select
                          required
                          value={form.stream}
                          onBlur={() => setTouched((t) => ({ ...t, stream: true }))}
                          onChange={(e) => setForm((f) => ({ ...f, stream: e.target.value }))}
                          className={`w-full border-2 border-ink bg-background px-4 py-3 text-sm font-medium text-ink placeholder:text-zinc-400 outline-none transition-shadow rounded-none focus:shadow-brutal-sm ${
                            touched.stream && !streamOk ? "border-red-500 focus:shadow-none" : "border-ink"
                          }`}
                        >
                          <option value="">Select your stream...</option>
                          <option value="Science">Science (PCM/PCB)</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Arts">Arts / Humanities</option>
                        </select>
                        {touched.stream && !streamOk && (
                          <span className="text-[10px] font-bold text-red-500 mt-1 block">
                            Stream selection is required
                          </span>
                        )}
                      </div>

                      {/* Optional Target Career field */}
                      <div>
                        <label className="block mb-1.5">
                          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" /> Target Career / Dream Job <span className="text-zinc-500 font-normal text-[10px]">(Optional)</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. AI Engineer, Investment Banker"
                          value={form.career}
                          onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))}
                          className="w-full border-2 border-ink bg-background px-4 py-3 text-sm font-medium text-ink placeholder:text-zinc-400 outline-none transition-shadow rounded-none focus:shadow-brutal-sm"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-3">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-yellow px-6 py-4 font-display text-xs font-black uppercase tracking-wider text-ink shadow-brutal transition-[box-shadow,transform] hover:shadow-brutal-lg hover:-translate-y-[2px] disabled:opacity-40 disabled:shadow-none disabled:-translate-y-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>Processing Request...</>
                          ) : (
                            <>
                              Book Consultation Now <Send className="h-3.5 w-3.5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="consultation-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="border-2 border-ink bg-background p-8 shadow-[8px_8px_0px_#050505] text-center"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center border-2 border-ink bg-yellow shadow-brutal-sm mb-6">
                      <Sparkles className="h-8 w-8 text-ink" strokeWidth={2.5} />
                    </div>

                    <h2 className="font-display text-2xl font-black text-ink uppercase tracking-tight">
                      Request Received!
                    </h2>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      Awesome, {form.name.split(" ")[0]}! Your subsidized consult slot is temporarily reserved.
                    </p>

                    <div className="mt-6 border-2 border-ink bg-surface p-4 text-left text-xs space-y-2 font-medium">
                      <div className="flex justify-between border-b border-ink/10 pb-1.5">
                        <span className="text-zinc-500">Student Name:</span>
                        <span className="font-bold text-ink">{form.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-1.5">
                        <span className="text-zinc-500">WhatsApp:</span>
                        <span className="font-bold text-ink">+91 {form.phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-1.5">
                        <span className="text-zinc-500">Selected Stream:</span>
                        <span className="font-bold text-ink">{form.stream}</span>
                      </div>
                      {form.career.trim() && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Target Career:</span>
                          <span className="font-bold text-ink">{form.career}</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-6 text-xs text-zinc-600 leading-relaxed">
                      An educational counselor will reach out to you via WhatsApp in the next 15–30 minutes to schedule your exact 1-on-1 timeline.
                    </p>

                    <button
                      onClick={() => {
                        setForm({ name: "", phone: "", stream: "", career: "" });
                        setTouched({ name: false, phone: false, stream: false });
                        setSubmitted(false);
                      }}
                      className="mt-6 inline-flex items-center border-2 border-ink bg-ink px-5 py-3 font-display text-2xs font-extrabold uppercase tracking-wider text-background shadow-brutal-sm hover:shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
