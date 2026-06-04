import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { tracks } from "@/lib/tracks";
import { useReservation } from "@/components/site/ReservationContext";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  X,
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  Cpu,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const Route = createFileRoute("/tracks/")({
  component: TracksIndex,
  head: () => ({
    meta: [
      { title: "Mentoring Tracks — Learn & Shine" },
      { name: "description", content: "5 structured tracks for Engineering and Management students." },
      { property: "og:title", content: "Mentoring Tracks — Learn & Shine" },
      { property: "og:description", content: "Pick your track. Train with mentors. Walk in ready." },
    ],
  }),
});

const filters = [
  "All Tracks",
  "Personal Brand",
  "Business & Mgmt",
  "Tech & Engineering",
  "Career Transition",
];

const getTrackCategory = (slug: string) => {
  if (slug === "personal-professional") return ["Personal Brand", "Career Transition"];
  if (slug === "soft-skills") return ["Personal Brand"];
  if (slug === "engineering") return ["Tech & Engineering"];
  if (slug === "management") return ["Business & Mgmt"];
  if (slug === "practical") return ["Career Transition"];
  return [];
};

function TracksIndex() {
  const { openModal } = useReservation();
  const shouldReduceMotion = useReducedMotion();

  // State
  const [selectedFilter, setSelectedFilter] = useState("All Tracks");
  const [expandedTrackSlug, setExpandedTrackSlug] = useState<string | null>(null);
  const [selectedTrackSlug, setSelectedTrackSlug] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ focus: "", gap: "" });
  const [recommendedTrack, setRecommendedTrack] = useState<string | null>(null);

  // Refs for scrolling to selected card
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredTracks = tracks.filter((t) => {
    if (selectedFilter === "All Tracks") return true;
    return getTrackCategory(t.slug).includes(selectedFilter);
  });

  const durationTransition = shouldReduceMotion ? 0 : 0.45;

  // Easing specification: ease: [0.22, 1, 0.36, 1]
  const globalEase = [0.22, 1, 0.36, 1];

  // Motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durationTransition,
        ease: globalEase,
      },
    },
  };

  const handleSelectTrack = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTrackSlug(selectedTrackSlug === slug ? null : slug);
  };

  const toggleExpandTrack = (slug: string) => {
    setExpandedTrackSlug(expandedTrackSlug === slug ? null : slug);
  };

  // Quiz Matchmaker calculations
  const runQuizEvaluation = (focus: string, gap: string) => {
    let match = "practical"; // fallback

    if (gap === "technical") {
      match = "engineering";
    } else if (gap === "business") {
      match = "management";
    } else if (gap === "brand") {
      match = "personal-professional";
    } else if (gap === "communication") {
      match = "soft-skills";
    } else if (gap === "placement") {
      match = "practical";
    } else {
      // route based on background
      if (focus === "tech") {
        match = "engineering";
      } else if (focus === "mgmt") {
        match = "management";
      } else {
        match = "soft-skills";
      }
    }

    setRecommendedTrack(match);
  };

  const applyQuizRecommendation = () => {
    if (recommendedTrack) {
      setQuizOpen(false);
      setSelectedTrackSlug(recommendedTrack);
      setExpandedTrackSlug(recommendedTrack);
      setSelectedFilter("All Tracks");

      // Scroll to recommended card
      setTimeout(() => {
        cardRefs.current[recommendedTrack]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ focus: "", gap: "" });
    setRecommendedTrack(null);
  };

  const handleKeyboardSelect = (slug: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpandTrack(slug);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-800 relative">
      <Navbar />

      {/* Aurora Mesh Blobs Local Overlay for Extra Visual Pop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-purple-200/20 blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute top-[50%] left-[5%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-indigo-200/20 blur-3xl animate-pulse" style={{ animationDuration: "16s", animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="bg-transparent py-20 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-4">
            <span className="eyebrow text-indigo-600 bg-white/40 backdrop-blur-md border border-white/50 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              YOUR CAREER IN FOCUS · 5 Structured Pathways
            </span>
            <h1 className="mt-2 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-7xl">
              Forge Your Edge. <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Pick Your Track.
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-slate-600">
              Five structured, mentor-led programs designed to bridge the gap between academic theory and real-world execution. Select a track to explore curriculum modules, time commitments, and career outcomes.
            </p>

            {/* Platform Metrics Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6 border-t border-slate-200/30">
              <div className="p-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl">
                <div className="text-3xl font-display font-extrabold text-indigo-600">5</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Core Tracks</div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl">
                <div className="text-3xl font-display font-extrabold text-indigo-600">40+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Industry Topics</div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl">
                <div className="text-3xl font-display font-extrabold text-indigo-600">1:1</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Mentor Access</div>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl">
                <div className="text-3xl font-display font-extrabold text-indigo-600">100%</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Practical Labs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filters & Quiz Section */}
      <section className="bg-transparent py-2">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 bg-white/25 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-6 shadow-sm">
            
            {/* Tag Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 bg-white/40 hover:bg-white/60 border border-white/40"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterBg"
                        transition={{ duration: 0.3, ease: globalEase }}
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full -z-10"
                      />
                    )}
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Quiz Trigger Box */}
            <div
              onClick={() => {
                resetQuiz();
                setQuizOpen(true);
              }}
              className="flex items-center gap-4 bg-white/40 hover:bg-white/60 border border-white/60 hover:border-white/90 p-3 sm:py-3 sm:px-4 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-pulse-slow select-none border-dashed border-2"
            >
              <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-full group-hover:bg-indigo-500/20 transition-all duration-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-800">Not sure which track fits your goals?</div>
                <div className="text-[11px] font-bold text-indigo-600 mt-0.5 flex items-center gap-1 group-hover:underline">
                  Take the Matchmaker Quiz (30s) <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid of Track Cards */}
      <section className="bg-transparent py-12 pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-6"
          >
            {filteredTracks.map((t) => {
              const isExpanded = expandedTrackSlug === t.slug;
              const isSelected = selectedTrackSlug === t.slug;
              return (
                <motion.div
                  key={t.slug}
                  ref={(el) => (cardRefs.current[t.slug] = el)}
                  variants={cardReveal}
                  layout="position"
                  onClick={() => toggleExpandTrack(t.slug)}
                  onKeyDown={(e) => handleKeyboardSelect(t.slug, e)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  className={`group relative overflow-hidden bg-white/30 backdrop-blur-xl border rounded-3xl p-6 sm:p-8 cursor-pointer shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] will-change-transform focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${
                    isSelected
                      ? "border-indigo-400/80 ring-1 ring-indigo-500/10 shadow-[0_15px_40px_-5px_rgba(99,102,241,0.15)] bg-white/50"
                      : "border-white/60 hover:border-white/95"
                  }`}
                >
                  {/* Select State Glow Edge Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-3xl" />
                  )}

                  {/* Header / Compact Layout */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-indigo-600/70">
                          // TRACK {t.number}
                        </span>
                        {isSelected && (
                          <span className="bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <Check className="h-3 w-3 stroke-[3]" /> SELECTED
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-snug text-slate-900 group-hover:text-indigo-950 transition-colors">
                        {t.title}
                      </h2>
                      <p className="mt-2 text-slate-600 font-semibold text-sm leading-relaxed max-w-3xl">
                        {t.oneLinerPromise}
                      </p>
                      
                      {/* Topic Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {t.topics.slice(0, 4).map((tp) => (
                          <span
                            key={tp.title}
                            className="bg-white/60 backdrop-blur-md text-indigo-600 border border-white/50 px-3 py-1 text-[11px] font-bold rounded-full shadow-sm"
                          >
                            {tp.title}
                          </span>
                        ))}
                        {t.topics.length > 4 && (
                          <span className="bg-indigo-500/20 backdrop-blur-md text-indigo-700 border border-indigo-500/30 px-3 py-1 text-[11px] font-extrabold rounded-full shadow-sm">
                            +{t.topics.length - 4} Topics
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions and Chevron */}
                    <div className="flex items-center gap-4 self-end md:self-start">
                      <button
                        onClick={(e) => handleSelectTrack(t.slug, e)}
                        className={`px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white border-transparent shadow-sm"
                            : "bg-white/60 hover:bg-white/80 border-slate-200 text-indigo-600 hover:border-indigo-300"
                        }`}
                      >
                        {isSelected ? "Deselect" : "Select Track"}
                      </button>

                      <div className="p-2 bg-white/40 border border-white/50 text-indigo-600 rounded-full shadow-sm group-hover:bg-white/70 transition-all duration-300 shrink-0">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.35, ease: globalEase }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: durationTransition, ease: globalEase },
                          opacity: { duration: durationTransition * 0.8, delay: durationTransition * 0.1 },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        {/* Divider */}
                        <div className="my-6 border-t border-slate-200/50" />

                        {/* Detailed Grid */}
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                          
                          {/* Left Column: Who it is for & You'll learn */}
                          <div className="space-y-6">
                            
                            {/* Who it's for */}
                            <div>
                              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                                <Users className="h-4 w-4 text-indigo-600" /> Who it's for
                              </h3>
                              <ul className="mt-3 space-y-2">
                                {t.whoItsFor.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                    <span className="text-xs font-semibold text-slate-600 leading-relaxed">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* You'll learn */}
                            <div>
                              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                                <Compass className="h-4 w-4 text-indigo-600" /> Core Syllabus Modules
                              </h3>
                              <ul className="mt-3 space-y-2">
                                {t.youWillLearn.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold">
                                      ✓
                                    </span>
                                    <span className="text-xs font-semibold text-slate-600 leading-relaxed">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Right Column: Outcomes, Sessions & Workload */}
                          <div className="space-y-6">
                            
                            {/* Example Sessions */}
                            <div>
                              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-indigo-600" /> Highlight Sessions
                              </h3>
                              <div className="mt-3 grid gap-2">
                                {t.exampleSessions.map((session, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-white/40 border border-white/50 rounded-2xl shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between gap-3"
                                  >
                                    <span>{session}</span>
                                    <span className="shrink-0 px-2 py-0.5 bg-indigo-100/60 text-indigo-700 text-[10px] font-extrabold rounded-full">
                                      Interactive
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Outcomes */}
                            <div>
                              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-indigo-600" /> Concrete Recruiter Deliverables
                              </h3>
                              <ul className="mt-3 space-y-2">
                                {t.outcomes.map((o, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center bg-indigo-100 text-indigo-700 rounded-full">
                                      <Check className="h-2.5 w-2.5 text-indigo-700" strokeWidth={3} />
                                    </span>
                                    <span className="text-xs font-bold text-indigo-950 leading-relaxed">
                                      {o}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Time Commitment */}
                            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl shadow-sm">
                                  <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-800">Time commitment</div>
                                  <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Flexible schedule</div>
                                </div>
                              </div>
                              <span className="bg-indigo-600 text-white font-display text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-sm">
                                {t.timeCommitment}
                              </span>
                            </div>

                          </div>
                        </div>

                        {/* Direct Detailed Page Link */}
                        <div className="mt-8 flex items-center justify-end">
                          <Link
                            to="/tracks/$slug"
                            params={{ slug: t.slug }}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            Explore Syllabus In-Depth & Radar Stats <ArrowUpRight className="h-4. w-4" />
                          </Link>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Sticky Selection Bar / Bottom Dock */}
      <AnimatePresence>
        {selectedTrackSlug && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            transition={{ duration: 0.45, ease: globalEase }}
            className="fixed bottom-8 sm:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_15px_40px_-5px_rgba(99,102,241,0.18)] rounded-full px-6 py-4 flex flex-row items-center justify-between gap-4 z-40 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4"
          >
            {/* Dock Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-left">
              <div>
                <span className="font-mono text-[10px] font-extrabold text-indigo-600/70">
                  SELECTED TRACK
                </span>
                <h4 className="font-display text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                  {tracks.find((t) => t.slug === selectedTrackSlug)?.title}
                </h4>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-200/50" />
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-600">
                  {tracks.find((t) => t.slug === selectedTrackSlug)?.timeCommitment.split(" ")[0]} hrs/wk
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal(selectedTrackSlug)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-display text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-full shadow-lg shadow-indigo-500/20 border border-white/20 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              >
                Reserve Seat
              </button>
              <button
                onClick={() => setSelectedTrackSlug(null)}
                aria-label="Deselect track"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 30-Second Matchmaker Quiz Overlay / Modal */}
      <AnimatePresence>
        {quizOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative w-full max-w-lg overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-3xl z-[70] text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuizOpen(false)}
                aria-label="Close matchmaker quiz"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center bg-white/30 backdrop-blur-md text-indigo-600 border border-white/40 transition-all hover:scale-105 active:scale-95 hover:bg-white/50 hover:border-white rounded-full shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              >
                <X className="h-4 w-4" strokeWidth={3} />
              </button>

              <div className="eyebrow text-indigo-600 flex items-center gap-1.5">
                <Sparkles className="h-4. w-4 animate-spin-slow" /> Matchmaker Diagnostic
              </div>

              {quizStep < 2 ? (
                <>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 leading-tight">
                    {quizStep === 0 && "What is your primary academic focus?"}
                    {quizStep === 1 && "What challenge do you want to conquer first?"}
                  </h3>

                  {/* Options */}
                  <div className="mt-6 space-y-3">
                    {quizStep === 0 && (
                      <>
                        <button
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, focus: "tech" });
                            setQuizStep(1);
                          }}
                          className="w-full text-left p-4 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-sm text-slate-900">Tech & Engineering</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Software Development, CS, IT, Data, Core Fields</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, focus: "mgmt" });
                            setQuizStep(1);
                          }}
                          className="w-full text-left p-4 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-sm text-slate-900">Management & Consulting</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">MBA, Business Development, PM, Corporate Functions</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, focus: "general" });
                            setQuizStep(1);
                          }}
                          className="w-full text-left p-4 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-sm text-slate-900">Open-Ended Professional prep</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Still testing parameters / flexible goal pathways</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </>
                    )}

                    {quizStep === 1 && (
                      <>
                        <button
                          onClick={() => {
                            const newAnswers = { ...quizAnswers, gap: "brand" };
                            setQuizAnswers(newAnswers);
                            runQuizEvaluation(newAnswers.focus, "brand");
                            setQuizStep(2);
                          }}
                          className="w-full text-left p-3.5 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="text-xs text-slate-900">Building networking skills & high-converting LinkedIn profiles</span>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => {
                            const newAnswers = { ...quizAnswers, gap: "communication" };
                            setQuizAnswers(newAnswers);
                            runQuizEvaluation(newAnswers.focus, "communication");
                            setQuizStep(2);
                          }}
                          className="w-full text-left p-3.5 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="text-xs text-slate-900">Perfecting verbal pitching, workplace reports, and email loops</span>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        {quizAnswers.focus === "tech" && (
                          <button
                            onClick={() => {
                              const newAnswers = { ...quizAnswers, gap: "technical" };
                              setQuizAnswers(newAnswers);
                              runQuizEvaluation(newAnswers.focus, "technical");
                              setQuizStep(2);
                            }}
                            className="w-full text-left p-3.5 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                          >
                            <span className="text-xs text-slate-900">Bridging academic coding gaps to ship clean enterprise software</span>
                            <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        )}
                        {quizAnswers.focus === "mgmt" && (
                          <button
                            onClick={() => {
                              const newAnswers = { ...quizAnswers, gap: "business" };
                              setQuizAnswers(newAnswers);
                              runQuizEvaluation(newAnswers.focus, "business");
                              setQuizStep(2);
                            }}
                            className="w-full text-left p-3.5 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                          >
                            <span className="text-xs text-slate-900">Mastering roadmap cycles, product specs, and spreadsheet math</span>
                            <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const newAnswers = { ...quizAnswers, gap: "placement" };
                            setQuizAnswers(newAnswers);
                            runQuizEvaluation(newAnswers.focus, "placement");
                            setQuizStep(2);
                          }}
                          className="w-full text-left p-3.5 bg-white/40 hover:bg-white/70 border border-white/60 hover:border-indigo-300 rounded-2xl shadow-sm transition-all duration-300 font-semibold text-slate-700 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="text-xs text-slate-900">Acing recruiters AMAs, ATS resumes, and salary negotiations</span>
                          <ArrowRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Foot Navigation */}
                  <div className="mt-6 flex justify-between items-center text-xs">
                    {quizStep > 0 && (
                      <button
                        onClick={() => setQuizStep(0)}
                        className="text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        ← Back
                      </button>
                    )}
                    <span className="text-slate-400 font-medium ml-auto">
                      Step {quizStep + 1} of 2
                    </span>
                  </div>
                </>
              ) : (
                /* Recommendation screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-indigo-100 border border-indigo-200/50 text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  
                  <h3 className="mt-4 font-display text-2xl font-extrabold text-slate-900 leading-tight">
                    Your Curated Pathway
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Based on your focus and immediate challenges, our curriculum engines recommend:
                  </p>

                  <div className="mt-6 p-5 bg-white/50 border border-indigo-100 rounded-2xl shadow-sm text-left max-w-md mx-auto">
                    <span className="font-mono text-[9px] font-bold text-indigo-600/70">
                      RECOMMENDED
                    </span>
                    <h4 className="font-display text-lg font-bold text-indigo-950 mt-1">
                      {tracks.find((t) => t.slug === recommendedTrack)?.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-semibold">
                      {tracks.find((t) => t.slug === recommendedTrack)?.oneLinerPromise}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <button
                      onClick={applyQuizRecommendation}
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-display text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-indigo-500/25 border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Apply Match & Open Details
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="w-full sm:w-auto text-xs font-extrabold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Restart Diagnostic
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CtaFooter />
    </main>
  );
}
