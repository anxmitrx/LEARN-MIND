import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { ConsultationProcessBento } from "@/components/site/ConsultationProcessBento";
import { FloatingTestimonials } from "@/components/site/FloatingTestimonials";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  HelpCircle,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  Plus,
  Sparkles,
  Send,
  Building,
  Search,
  TrendingUp,
  Trophy,
  ArrowUpRight,
  Calendar,
  IndianRupee,
} from "lucide-react";
import confetti from "canvas-confetti";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { historicalData } from "@/data/historicalCollegeData";
import { mockCollegeData } from "@/data/mockCollegeData";

export const Route = createFileRoute("/class-12-consult")({
  component: Class12ConsultPage,
  head: () => ({
    meta: [
      { title: "Class 12 Roadmap Consultation — Learn & Shine" },
      {
        name: "description",
        content:
          "Stop guessing. Get expert 1-on-1 guidance on college choice, streams, and entrance exams. Subsidy pricing for Class 11 & 12 students.",
      },
      { property: "og:title", content: "Class 12 Roadmap Consultation — Learn & Shine" },
      {
        property: "og:description",
        content:
          "Get expert, subsidized 1-on-1 roadmap guidance. Make the right decisions before investing in expensive college degrees.",
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
  const [activeTab, setActiveTab] = useState<"counselling" | "rank-vs-college">("counselling");

  return (
    <main className="min-h-screen bg-transparent text-slate-800 dot-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 min-h-[50vh] flex flex-col items-center justify-center">
        {/* Background Image with Masks for smooth blending */}
        <div className="absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
          <img
            src="/assets/images/backpack.png"
            alt="Student looking at roadmap signs"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)]"
          />
        </div>

        {/* Very subtle gradient overlay just behind the text to enhance readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/60 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-20">
          <div className="max-w-2xl">
            <span className="eyebrow inline-block bg-white/60 backdrop-blur-md px-4 py-1.5 font-bold text-indigo-600 border border-white/50 rounded-full shadow-sm">
              ✨ The Ultimate Guide
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-wide text-ink sm:text-6xl drop-shadow-sm">
              Class 12 <span className="text-indigo-600 box-decoration-slice">Roadmap.</span>
            </h1>
            <p className="mt-6 text-base font-bold leading-relaxed text-slate-700 sm:text-lg">
              Stop guessing your future. Get expert, personalized guidance on choosing the right
              college courses, entrance exams, and high-growth careers at a price that actually
              makes sense.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mt-12 flex justify-start">
            <div className="inline-flex bg-white/40 backdrop-blur-xl p-1.5 rounded-full border border-white/50 shadow-sm relative z-30">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("counselling")}
                className={`relative px-6 py-3 rounded-full font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === "counselling"
                    ? "text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-600 hover:text-ink hover:bg-white/50"
                }`}
              >
                {activeTab === "counselling" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-full z-0"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <User className="h-4 w-4" /> Counselling
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("rank-vs-college")}
                className={`relative px-6 py-3 rounded-full font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === "rank-vs-college"
                    ? "text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-600 hover:text-ink hover:bg-white/50"
                }`}
              >
                {activeTab === "rank-vs-college" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-full z-0"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Rank vs College Tool
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {activeTab === "counselling" ? (
              <motion.div
                key="counselling"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CounsellingView />
              </motion.div>
            ) : (
              <motion.div
                key="rank-vs-college"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RankVsCollegeView onSwitchToCounselling={() => setActiveTab("counselling")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FloatingTestimonials />
      <CtaFooter />
    </main>
  );
}

function CounsellingView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", stream: "", career: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, stream: false });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) {
      setTouched({ name: true, phone: true, stream: true });
      return;
    }
    setIsSubmitting(true);
    if (db) {
      try {
        await addDoc(collection(db, "consultations"), {
          name: form.name.trim(),
          phone: form.phone,
          stream: form.stream,
          career: form.career.trim(),
          timestamp: serverTimestamp(),
        });
      } catch (err) {}
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      fireConfetti();
    }, 400);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      <div className="lg:col-span-7 space-y-8">
        <ConsultationProcessBento />
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <HelpCircle className="h-6 w-6 text-indigo-600" strokeWidth={2.5} />
            <h2 className="font-display text-2xl font-bold text-ink tracking-wide">Roadmap FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm transition-all duration-300 hover:bg-white/40 overflow-hidden will-change-transform"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-t-2xl"
                  >
                    <span className="font-display text-sm font-bold text-ink sm:text-base tracking-wide">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50"}`}
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
                        className="overflow-hidden border-t border-white/40"
                      >
                        <p className="px-5 py-4 text-xs sm:text-sm leading-relaxed text-slate-700 font-semibold">
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

      <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--banner-height,0px)+80px)] self-start">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="consultation-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 sm:p-6 md:p-8"
            >
              <div className="border-b border-white/40 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink uppercase tracking-wider">
                    Book Consultation
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Secure your personalized session slot under 60 seconds.
                  </p>
                </div>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                  Low Price
                </span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1.5">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-indigo-600" /> Full Name{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Mehta"
                    value={form.name}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={`w-full border bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${touched.name && !nameOk ? "border-red-500 focus:ring-0" : "border-white/50"}`}
                  />
                </div>
                <div>
                  <label className="block mb-1.5">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-indigo-600" /> WhatsApp Number{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div
                    className={`flex border bg-white/25 rounded-full overflow-hidden focus-within:bg-white/45 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:outline-none transition-all ${touched.phone && !phoneOk ? "border-red-500" : "border-white/50"}`}
                  >
                    <span className="grid place-items-center bg-white/60 px-4 font-mono text-sm font-extrabold text-indigo-600 border-r border-white/40">
                      +91
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="98765 43210"
                      value={form.phone}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
                      }
                      className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-indigo-600" /> Current Stream{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    required
                    value={form.stream}
                    onBlur={() => setTouched((t) => ({ ...t, stream: true }))}
                    onChange={(e) => setForm((f) => ({ ...f, stream: e.target.value }))}
                    className={`w-full border bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${touched.stream && !streamOk ? "border-red-500 focus:ring-0" : "border-white/50"}`}
                  >
                    <option value="">Select your stream...</option>
                    <option value="Science">Science (PCM/PCB)</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts / Humanities</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-indigo-600" /> Target Career{" "}
                      <span className="text-zinc-500 font-normal text-[10px]">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI Engineer, Investment Banker"
                    value={form.career}
                    onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))}
                    className="w-full border border-white/50 bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                  />
                </div>
                <div className="pt-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 font-display text-xs font-extrabold uppercase tracking-wider rounded-3xl shadow-lg shadow-indigo-500/30 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 will-change-transform disabled:opacity-40 disabled:scale-100 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Processing Request..."
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
              className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 sm:p-8 text-center"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 mb-6 rounded-full shadow-md">
                <Sparkles className="h-8 w-8 text-indigo-600" strokeWidth={2.5} />
              </div>
              <h2 className="font-display text-2xl font-bold text-ink uppercase tracking-tight">
                Request Received!
              </h2>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Awesome, {form.name.split(" ")[0]}! Your subsidized consult slot is temporarily
                reserved.
              </p>
              <button
                onClick={() => {
                  setForm({ name: "", phone: "", stream: "", career: "" });
                  setTouched({ name: false, phone: false, stream: false });
                  setSubmitted(false);
                }}
                className="mt-6 inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 font-display text-xs font-extrabold uppercase tracking-wider rounded-3xl shadow-lg shadow-indigo-500/30 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 will-change-transform cursor-pointer"
              >
                Book Another Slot
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RankVsCollegeView({ onSwitchToCounselling }: { onSwitchToCounselling: () => void }) {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 600);
  };

  const getColleges = () => {
    if (!rank) return [];
    const numRank = parseInt(rank, 10);
    if (isNaN(numRank)) return [];
    const data = mockCollegeData[exam as keyof typeof mockCollegeData] || [];
    if (exam === "CUET")
      return data.filter((c) => numRank >= c.cutoff - 5).sort((a, b) => b.cutoff - a.cutoff);
    return data.filter((c) => numRank <= c.cutoff * 1.3).sort((a, b) => a.cutoff - b.cutoff);
  };

  const results = hasSearched ? getColleges() : [];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-3xl font-bold text-ink mb-4">Rank vs College Predictor</h2>
        <p className="text-slate-600 font-semibold text-sm">
          Based on recent years of cut-off reports. Find out which premium colleges you can target
          based on your expected or actual exam rank.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-6 sm:p-8">
        <form onSubmit={handleSearch} className="grid sm:grid-cols-12 gap-6 items-end">
          <div className="sm:col-span-5">
            <label className="block mb-2 text-xs font-display font-extrabold uppercase tracking-wider text-ink">
              Select Exam
            </label>
            <motion.select
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              value={exam}
              onChange={(e) => {
                setExam(e.target.value);
                setHasSearched(false);
              }}
              className="w-full border border-white/50 bg-white/40 px-5 py-4 text-sm font-semibold text-slate-800 outline-none transition-all rounded-2xl hover:bg-white/50 hover:shadow-sm focus:bg-white/60 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer"
            >
              {Object.keys(mockCollegeData).map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </motion.select>
          </div>
          <div className="sm:col-span-5">
            <label className="block mb-2 text-xs font-display font-extrabold uppercase tracking-wider text-ink">
              {exam === "CUET" ? "Your Percentile" : "Your Expected Rank"}
            </label>
            <motion.input
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.01 }}
              type="number"
              required
              min="1"
              placeholder={exam === "CUET" ? "e.g. 95" : "e.g. 5000"}
              value={rank}
              onChange={(e) => {
                setRank(e.target.value);
                setHasSearched(false);
              }}
              className="w-full border border-white/50 bg-white/40 px-5 py-4 text-sm font-semibold text-slate-800 outline-none transition-all rounded-2xl hover:bg-white/50 hover:shadow-sm focus:bg-white/60 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600"
            />
          </div>
          <div className="sm:col-span-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSearching || !rank}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 font-display text-sm font-bold rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              {isSearching ? <Search className="h-5 w-5 animate-pulse" /> : "Predict"}
            </motion.button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-display text-xl font-bold text-ink">
                Suitable Colleges for {exam} {exam === "CUET" ? "Percentile" : "Rank"}{" "}
                <span className="text-indigo-600">{rank}</span>
              </h3>
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {results.length} Results Found
              </span>
            </div>
            {results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((college, idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.05 }}
                    key={college.name}
                    className="bg-white/60 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] hover:border-indigo-300 transition-colors group cursor-default"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-indigo-600 mb-1">
                        <Building className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {college.type}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-white/60 px-2 py-0.5 rounded-md">
                        {college.location}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-ink mb-3 group-hover:text-indigo-600 transition-colors">
                      {college.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-indigo-50/50 px-3 py-2 rounded-lg border border-indigo-100/50">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase">
                          Avg. Package
                        </span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <Trophy className="h-3 w-3" /> {college.avgPackage}
                        </span>
                      </div>
                      <div className="bg-orange-50/50 px-3 py-2 rounded-lg border border-orange-100/50">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase">
                          Hist. Cutoff
                        </span>
                        <span className="font-bold text-orange-600">~{college.cutoff}</span>
                      </div>
                      {(college as any).estFees && (
                        <div className="bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100/50">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase">
                            Est. Fees
                          </span>
                          <span className="font-bold text-blue-600 flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" /> {(college as any).estFees}
                          </span>
                        </div>
                      )}
                      {(college as any).placementRate && (
                        <div className="bg-emerald-50/50 px-3 py-2 rounded-lg border border-emerald-100/50">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase">
                            Placement
                          </span>
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> {(college as any).placementRate}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/40 backdrop-blur-sm border border-white/50 rounded-3xl">
                <Search className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-display text-lg font-bold text-ink">No exact matches found</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2 font-semibold">
                  This rank might be highly competitive or outside our historical prediction range.
                  Don't worry, a personalized roadmap can help!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <HistoricalTrendsSection />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        viewport={{ once: true }}
        className="mt-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden group shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.4)] transition-all"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            Want absolute clarity on your options?
          </h3>
          <p className="text-indigo-100 font-medium max-w-xl mx-auto mb-8">
            Data only tells half the story. Speak to an expert who has been there, done that, and
            can map out your exact roadmap.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSwitchToCounselling}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-full font-display font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            Reserve Your Seat For Counselling <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const FIELDS = ["Engineering", "Medical", "Pharma", "Architecture"];

function HistoricalTrendsSection() {
  const [activeField, setActiveField] = useState(FIELDS[0]);
  const [activeYear, setActiveYear] = useState(historicalData[0].year);
  const activeData = historicalData.find((d) => d.year === activeYear);
  const filteredColleges = activeData?.colleges.filter((c) => c.field === activeField) || [];

  return (
    <div className="mt-16 pt-10 border-t border-indigo-500/10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="font-display text-2xl font-bold text-ink mb-2">
          Year-Wise Opening & Closing Ranks
        </h3>
        <p className="text-slate-600 font-semibold text-sm">
          Explore historical closing ranks for top colleges across multiple entrance exams over
          recent years.
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {FIELDS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveField(f)}
              className={`px-4 py-2 rounded-full font-display text-xs font-bold transition-all duration-300 cursor-pointer ${activeField === f ? "bg-slate-800 text-white shadow-md" : "bg-white/50 text-slate-600 hover:bg-white/80 hover:text-ink"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/50 pb-4">
          {historicalData.map((d) => (
            <button
              key={d.year}
              onClick={() => setActiveYear(d.year)}
              className={`px-5 py-2.5 rounded-xl font-display text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeYear === d.year ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-white/50 text-slate-600 hover:bg-white/80 hover:text-ink"}`}
            >
              <Calendar className="h-4 w-4" /> {d.year}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeField}-${activeYear}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 min-h-[150px]"
          >
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/60 border border-white/50 rounded-2xl hover:bg-white/90 hover:shadow-md hover:border-indigo-200 transition-colors cursor-default group"
                >
                  <div className="mb-2 sm:mb-0">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-1 group-hover:bg-indigo-100 transition-colors">
                      {college.exam}
                    </span>
                    <h5 className="font-display font-bold text-ink sm:text-lg group-hover:text-indigo-600 transition-colors">
                      {college.name}
                    </h5>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Closing Rank
                    </p>
                    <p className="font-display font-bold text-indigo-600 text-lg sm:text-xl bg-indigo-50/50 inline-block px-2 py-0.5 rounded-md border border-indigo-100/50">
                      {college.rank}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-500 text-sm font-semibold py-4 text-center">
                No historical data found for this selection.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
