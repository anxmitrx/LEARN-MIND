import fs from 'fs';

const elegantCode = `import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { ConsultationProcessBento } from "@/components/site/ConsultationProcessBento";
import { FloatingTestimonials } from "@/components/site/FloatingTestimonials";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, HelpCircle, Phone, User, Briefcase, GraduationCap, Plus, Sparkles, Send, Building, Search, TrendingUp, Trophy, ArrowUpRight, Calendar, IndianRupee } from "lucide-react";
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
      { name: "description", content: "Stop guessing. Get expert 1-on-1 guidance on college choice, streams, and entrance exams." },
    ],
  }),
});

const faqs = [
  { q: "Who is this consultation for?", a: "This program is specifically designed for Class 11 & 12 students (and their parents) who are confused about stream selection, college courses, degree matching, or how to align school choices with future high-paying careers." },
  { q: "How much does it cost?", a: "The session is highly subsidized and priced at our lowest bracket ever. Our mission is to prevent expensive mistakes by providing professional clarity early on." },
  { q: "What will we discuss?", a: "We will build a personalized roadmap covering stream optimization, degree-to-career mapping, entrance exam playbooks, and crucial backup options to reduce stress." },
  { q: "Who are the mentors?", a: "Your session will be led by recent graduates of top institutions (like IITs, IIMs, and Tier-1 colleges) and working professionals who have navigated the placement system successfully." },
];

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\\D/g, "").replace(/^91/, "").slice(0, 10);
  if (!digits) return "";
  const a = digits.slice(0, 5);
  const b = digits.slice(5, 10);
  return b ? \`\${a} \${b}\` : a;
};

const phoneIsValid = (raw: string) => raw.replace(/\\D/g, "").length === 10;

function Class12ConsultPage() {
  const [activeTab, setActiveTab] = useState<"counselling" | "rank-vs-college">("counselling");

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-slate-800 dot-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-slate-200/50 pt-28 pb-16 md:pt-36 md:pb-24 min-h-[50vh] flex flex-col items-center justify-center">
        <img
          src="/assets/WhatsApp Image 2026-06-03 at 7.45.22 PM.jpeg"
          alt="Students studying"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-80 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#FDFCFB] via-[#FDFCFB]/80 via-20% to-transparent sm:bg-gradient-to-r sm:from-[#FDFCFB]/95 sm:via-[#FDFCFB]/80 sm:via-45% sm:to-transparent sm:to-80%"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-20">
          <div className="max-w-2xl">
            <span className="eyebrow inline-block bg-white/60 backdrop-blur-md px-4 py-1.5 font-bold text-indigo-600 border border-slate-200 rounded-full shadow-sm">
              ✨ The Ultimate Guide
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-wide text-slate-900 sm:text-6xl drop-shadow-sm">
              Class 12 <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg box-decoration-slice">Roadmap.</span>
            </h1>
            <p className="mt-6 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              Stop guessing your future. Get expert, personalized guidance on choosing the right college courses, entrance exams, and high-growth careers at a price that actually makes sense.
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="mt-12 flex justify-start">
            <div className="inline-flex bg-white/80 backdrop-blur-xl p-1.5 rounded-full border border-slate-200 shadow-sm relative z-30">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("counselling")}
                className={\`relative px-6 py-3 rounded-full font-display text-sm font-bold tracking-wide transition-all duration-300 \${
                  activeTab === "counselling" ? "text-white shadow-md shadow-indigo-500/30" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                }\`}
              >
                {activeTab === "counselling" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-600 rounded-full z-0" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <User className="h-4 w-4" /> Counselling
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("rank-vs-college")}
                className={\`relative px-6 py-3 rounded-full font-display text-sm font-bold tracking-wide transition-all duration-300 \${
                  activeTab === "rank-vs-college" ? "text-white shadow-md shadow-indigo-500/30" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                }\`}
              >
                {activeTab === "rank-vs-college" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-600 rounded-full z-0" />
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
              <motion.div key="counselling" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <CounsellingView />
              </motion.div>
            ) : (
              <motion.div key="rank-vs-college" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
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
    if (!formValid) { setTouched({ name: true, phone: true, stream: true }); return; }
    setIsSubmitting(true);
    if (db) {
      try {
        await addDoc(collection(db, "consultations"), {
          name: form.name.trim(), phone: form.phone, stream: form.stream, career: form.career.trim(), timestamp: serverTimestamp()
        });
      } catch (err) {}
    }
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); fireConfetti(); }, 400);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      <div className="lg:col-span-7 space-y-8">
        <ConsultationProcessBento />
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <HelpCircle className="h-6 w-6 text-indigo-600" strokeWidth={2.5} />
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-wide">Roadmap FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-2xl">
                    <span className="font-display text-sm font-bold text-slate-900 sm:text-base tracking-wide">{f.q}</span>
                    <span className={\`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 \${isOpen ? "rotate-45 bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-slate-50 text-indigo-600 border border-slate-200"}\`}><Plus className="h-4 w-4" strokeWidth={3} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-slate-100">
                        <p className="px-5 py-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">{f.a}</p>
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
            <motion.div key="consultation-form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-5 sm:p-6 md:p-8">
              <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 uppercase tracking-wider">Book Consultation</h2>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Secure your personalized session slot under 60 seconds.</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">Low Price</span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1.5"><span className="text-xs font-display font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-indigo-600" /> Full Name <span className="text-red-500">*</span></span></label>
                  <input type="text" required placeholder="e.g. Priyanshu Mehta" value={form.name} onBlur={() => setTouched(t => ({ ...t, name: true }))} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={\`w-full border bg-white px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 \${touched.name && !nameOk ? "border-red-500" : "border-slate-200"}\`} />
                </div>
                <div>
                  <label className="block mb-1.5"><span className="text-xs font-display font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-indigo-600" /> WhatsApp Number <span className="text-red-500">*</span></span></label>
                  <div className={\`flex border bg-white rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all \${touched.phone && !phoneOk ? "border-red-500" : "border-slate-200"}\`}>
                    <span className="grid place-items-center bg-slate-50 px-4 font-mono text-sm font-extrabold text-indigo-600 border-r border-slate-200">+91</span>
                    <input type="text" inputMode="numeric" required placeholder="98765 43210" value={form.phone} onBlur={() => setTouched(t => ({ ...t, phone: true }))} onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))} className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5"><span className="text-xs font-display font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-indigo-600" /> Current Stream <span className="text-red-500">*</span></span></label>
                  <select required value={form.stream} onBlur={() => setTouched(t => ({ ...t, stream: true }))} onChange={e => setForm(f => ({ ...f, stream: e.target.value }))} className={\`w-full border bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 \${touched.stream && !streamOk ? "border-red-500" : "border-slate-200"}\`}>
                    <option value="">Select your stream...</option>
                    <option value="Science">Science (PCM/PCB)</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts / Humanities</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5"><span className="text-xs font-display font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-indigo-600" /> Target Career <span className="text-slate-400 font-normal text-[10px]">(Optional)</span></span></label>
                  <input type="text" placeholder="e.g. AI Engineer, Investment Banker" value={form.career} onChange={e => setForm(f => ({ ...f, career: e.target.value }))} className="w-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div className="pt-3">
                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-4 font-display text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-all hover:shadow-[0_8px_30px_rgba(79,70,229,0.35)] disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? "Processing..." : <>Book Consultation Now <Send className="h-3.5 w-3.5" /></>}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key="consultation-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-5 sm:p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center bg-emerald-50 text-emerald-600 border border-emerald-100 mb-6 rounded-full shadow-sm">
                <Sparkles className="h-8 w-8 text-emerald-500" strokeWidth={2.5} />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 uppercase tracking-tight">Request Received!</h2>
              <p className="mt-3 text-sm font-medium text-slate-600">Awesome! Your subsidized consult slot is temporarily reserved.</p>
              <button onClick={() => { setForm({ name: "", phone: "", stream: "", career: "" }); setTouched({ name: false, phone: false, stream: false }); setSubmitted(false); }} className="mt-6 inline-flex items-center bg-slate-900 text-white px-5 py-3 font-display text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:bg-slate-800 cursor-pointer">
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
    setTimeout(() => { setIsSearching(false); setHasSearched(true); }, 600);
  };

  const getColleges = () => {
    if (!rank) return [];
    const numRank = parseInt(rank, 10);
    if (isNaN(numRank)) return [];
    const data = mockCollegeData[exam as keyof typeof mockCollegeData] || [];
    if (exam === "CUET") return data.filter(c => numRank >= c.cutoff - 5).sort((a,b) => b.cutoff - a.cutoff);
    return data.filter(c => numRank <= c.cutoff * 1.3).sort((a,b) => a.cutoff - b.cutoff);
  };

  const results = hasSearched ? getColleges() : [];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Rank vs College Predictor</h2>
        <p className="text-slate-600 font-medium text-sm">Based on recent years of cut-off reports. Find out which premium colleges you can target based on your expected or actual exam rank.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-8">
        <form onSubmit={handleSearch} className="grid sm:grid-cols-12 gap-6 items-end">
          <div className="sm:col-span-5">
            <label className="block mb-2 text-xs font-display font-bold uppercase tracking-wider text-slate-700">Select Exam</label>
            <motion.select whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} value={exam} onChange={(e) => { setExam(e.target.value); setHasSearched(false); }} className="w-full border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 outline-none transition-all rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm">
              {Object.keys(mockCollegeData).map((e) => <option key={e} value={e}>{e}</option>)}
            </motion.select>
          </div>
          <div className="sm:col-span-5">
            <label className="block mb-2 text-xs font-display font-bold uppercase tracking-wider text-slate-700">{exam === "CUET" ? "Your Percentile" : "Your Expected Rank"}</label>
            <motion.input whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }} type="number" required min="1" placeholder={exam === "CUET" ? "e.g. 95" : "e.g. 5000"} value={rank} onChange={(e) => { setRank(e.target.value); setHasSearched(false); }} className="w-full border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 outline-none transition-all rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isSearching || !rank} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-4 font-display text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.35)] transition-all disabled:opacity-50 cursor-pointer">
              {isSearching ? <Search className="h-5 w-5 animate-pulse" /> : "Predict"}
            </motion.button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {hasSearched && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-display text-xl font-bold text-slate-900">Suitable Colleges for {exam} {exam === "CUET" ? "Percentile" : "Rank"} <span className="text-indigo-600">{rank}</span></h3>
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">{results.length} Results Found</span>
            </div>
            {results.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {results.map((college, idx) => (
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.05 }} key={college.name} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.1)] hover:border-indigo-100 transition-all group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-indigo-600 mb-1"><Building className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-wider">{college.type}</span></div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{college.location}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{college.name}</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-indigo-50/50 px-3 py-2.5 rounded-xl border border-indigo-100/50">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Avg. Package</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1.5"><Trophy className="h-3 w-3"/> {college.avgPackage}</span>
                      </div>
                      <div className="bg-orange-50/50 px-3 py-2.5 rounded-xl border border-orange-100/50">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Hist. Cutoff</span>
                        <span className="font-bold text-orange-600 flex items-center gap-1.5">~{college.cutoff}</span>
                      </div>
                      {(college as any).estFees && (
                        <div className="bg-blue-50/50 px-3 py-2.5 rounded-xl border border-blue-100/50">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Est. Fees</span>
                          <span className="font-bold text-blue-600 flex items-center gap-1.5"><IndianRupee className="h-3 w-3"/> {(college as any).estFees}</span>
                        </div>
                      )}
                      {(college as any).placementRate && (
                        <div className="bg-emerald-50/50 px-3 py-2.5 rounded-xl border border-emerald-100/50">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Placement</span>
                          <span className="font-bold text-emerald-700 flex items-center gap-1.5"><TrendingUp className="h-3 w-3"/> {(college as any).placementRate}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h4 className="font-display text-lg font-bold text-slate-900">No exact matches found</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 font-medium">This rank might be highly competitive or outside our historical prediction range. Don't worry, a personalized roadmap can help!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <HistoricalTrendsSection />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-10 sm:p-12 text-center relative overflow-hidden group shadow-lg shadow-indigo-100/50">
        <div className="relative z-10">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Want absolute clarity on your options?</h3>
          <p className="text-slate-600 font-medium max-w-xl mx-auto mb-8 text-sm sm:text-base">Data only tells half the story. Speak to an expert who has been there, done that, and can map out your exact roadmap.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onSwitchToCounselling} className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-display font-bold text-sm shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all cursor-pointer hover:bg-slate-800 hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)]">
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
  const filteredColleges = activeData?.colleges.filter(c => c.field === activeField) || [];

  return (
    <div className="mt-20 pt-12 border-t border-slate-200/60">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Year-Wise Opening & Closing Ranks</h3>
        <p className="text-slate-600 font-medium text-sm">Explore historical closing ranks for top colleges across multiple entrance exams over recent years.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap gap-2.5 mb-5">
          {FIELDS.map((f) => (
            <button key={f} onClick={() => setActiveField(f)} className={\`px-4 py-2 rounded-xl font-display text-xs font-bold transition-all duration-300 cursor-pointer \${activeField === f ? "bg-slate-900 text-white shadow-md" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}\`}>{f}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-100 pb-5">
          {historicalData.map((d) => (
            <button key={d.year} onClick={() => setActiveYear(d.year)} className={\`px-5 py-2.5 rounded-xl font-display text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer \${activeYear === d.year ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"}\`}><Calendar className="h-4 w-4" /> {d.year}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={\`\${activeField}-\${activeYear}\`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-3 min-h-[150px]">
            {filteredColleges.length > 0 ? filteredColleges.map((college, i) => (
              <motion.div key={i} whileHover={{ scale: 1.01, x: 6 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(79,70,229,0.08)] hover:border-indigo-100 transition-all cursor-default group">
                <div className="mb-3 sm:mb-0">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md inline-block mb-2">{college.exam}</span>
                  <h5 className="font-display font-bold text-slate-900 sm:text-lg group-hover:text-indigo-600 transition-colors">{college.name}</h5>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Closing Rank</p>
                  <p className="font-display font-extrabold text-indigo-600 text-lg sm:text-xl bg-indigo-50/50 inline-block px-3 py-1 rounded-lg border border-indigo-100/50">{college.rank}</p>
                </div>
              </motion.div>
            )) : <p className="text-slate-500 text-sm font-medium py-6 text-center">No historical data found for this selection.</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync('scripts/buildElegantConsult.mjs', \`import fs from 'fs'; fs.writeFileSync('src/routes/class-12-consult.tsx', \${JSON.stringify(elegantCode)});\`);
