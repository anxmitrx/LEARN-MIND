import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Compass,
  MessageSquare,
  Code,
  LineChart,
  Briefcase,
} from "lucide-react";
import { tracks } from "@/lib/tracks";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type QuestionStep = {
  question: string;
  options: {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    value: string;
  }[];
};

export function PathfinderQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const steps: Record<number, QuestionStep> = {
    1: {
      question: "Where are you currently studying?",
      options: [
        {
          label: "Class 12 / High School",
          description: "Navigating your board exams and upcoming college selections",
          icon: GraduationCap,
          value: "school",
        },
        {
          label: "B.Tech / Engineering College",
          description: "Focusing on coding, tech frameworks, and software development",
          icon: Code,
          value: "engineering",
        },
        {
          label: "B.Com / BBA / MBA / Commerce",
          description: "Aiming for business roles, marketing, finance, or consulting",
          icon: LineChart,
          value: "business",
        },
        {
          label: "Other Undergrad Stream",
          description: "Seeking generalized, top-tier professional competencies",
          icon: Briefcase,
          value: "other",
        },
      ],
    },
    2: {
      question: "What is your biggest career roadblock right now?",
      options: [
        {
          label: "No clear roadmap",
          description: "Confused about what job suits me and how to build a network",
          icon: Compass,
          value: "personal-professional",
        },
        {
          label: "Workplace & Communication fear",
          description: "Scared of corporate speak, professional emails, and presentation anxiety",
          icon: MessageSquare,
          value: "soft-skills",
        },
        {
          label: "Exam syllabus vs real-world tech",
          description: "Wanting to learn how to actually build and deploy shippable code",
          icon: Code,
          value: "engineering",
        },
        {
          label: "Theoretical frameworks",
          description: "Want to experience how real business decisions and strategy are executed",
          icon: LineChart,
          value: "management",
        },
        {
          label: "Placement prep & negotiations",
          description: "Struggling to build an ATS resume and negotiate starting salaries",
          icon: Briefcase,
          value: "practical",
        },
      ],
    },
  };

  const handleSelectOption = async (optionValue: string) => {
    const newAnswers = { ...answers, [step]: optionValue };
    setAnswers(newAnswers);
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      setStep(3);
      if (db) {
        try {
          const step1Label = steps[1].options.find(o => o.value === newAnswers[1])?.label || newAnswers[1];
          const step2Label = steps[2].options.find(o => o.value === optionValue)?.label || optionValue;
          const recommendedTrackObj = tracks.find((t) => t.slug === optionValue) || tracks[0];
          
          await addDoc(collection(db, "quiz_results"), {
            educationLevel: step1Label,
            challenge: step2Label,
            recommendedTrack: recommendedTrackObj.title,
            timestamp: serverTimestamp()
          });
        } catch (err) {
          console.error("Error writing quiz result to Firestore:", err);
        }
      } else {
        console.error("Firestore database is not initialized.");
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
  };

  // Logic to determine recommended track
  // If the user is an engineering student and has no clear roadblock, they get recommended engineering or personal-professional
  // We prioritize Step 2 roadblock value to recommend the track
  const recommendedSlug = answers[2] || "personal-professional";
  const recommendedTrack = tracks.find((t) => t.slug === recommendedSlug) || tracks[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="pathfinder" className="relative bg-transparent py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/50 rounded-full px-4 py-1.5 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="text-xs font-bold text-indigo-600 tracking-wide uppercase">
              Interactive Finder
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Find your perfect{" "}
            <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg">
              mentoring track.
            </span>
          </h2>
          <p className="mt-3 text-slate-600 font-semibold">
            Answer 2 quick questions to get a personalized recommendation based on your profile and
            roadblocks.
          </p>
        </div>

        <div className="relative min-h-[460px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_-6px_rgba(31,38,135,0.1)] overflow-hidden flex flex-col justify-between">
          {/* Progress Indicator */}
          {step <= 2 && (
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Question {step} of 2
              </span>
              <div className="flex gap-2">
                <span
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${step >= 1 ? "bg-indigo-600" : "bg-indigo-200"}`}
                ></span>
                <span
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${step >= 2 ? "bg-indigo-600" : "bg-indigo-200"}`}
                ></span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h3 className="font-display text-2xl font-bold text-ink mb-6">
                  {steps[1].question}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {steps[1].options.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="group text-left p-5 bg-white/50 hover:bg-white border border-white hover:border-indigo-400 hover:shadow-lg rounded-2xl transition-all duration-300 flex items-start gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                      >
                        <div className="p-3 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-xl transition-all duration-300 shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-300">
                            {opt.label}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium mt-1">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={2}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    ← Back
                  </button>
                  <h3 className="font-display text-2xl font-bold text-ink">{steps[2].question}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {steps[2].options.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="group text-left p-5 bg-white/50 hover:bg-white border border-white hover:border-indigo-400 hover:shadow-lg rounded-2xl transition-all duration-300 flex items-start gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                      >
                        <div className="p-3 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-xl transition-all duration-300 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-300">
                            {opt.label}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium mt-1">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={3}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide mb-3">
                    Your Profile Match
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3 leading-tight">
                    Track {recommendedTrack.number}: <br className="hidden sm:inline" />
                    <span className="text-indigo-600">{recommendedTrack.short}</span>
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mb-6">
                    {recommendedTrack.oneLinerPromise}
                  </p>

                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Key Outcomes Include:
                    </h4>
                    {recommendedTrack.outcomes.slice(0, 2).map((out, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-600 font-semibold"
                      >
                        <span className="text-indigo-600 mt-0.5 font-bold">✓</span>
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/tracks/$slug"
                      params={{ slug: recommendedTrack.slug }}
                      className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-indigo-600/20 transition-transform duration-300 hover:scale-105 active:scale-95 text-sm cursor-pointer"
                    >
                      Explore Track Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center bg-white/60 hover:bg-white/80 border border-white/80 text-slate-700 font-bold px-5 py-3 rounded-full transition-all duration-300 text-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Finder
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-[280px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/80 rounded-3xl p-6 shadow-inner shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
                  <h4 className="font-mono text-xs font-bold text-indigo-600/70 mb-2 uppercase">
                    // Quick Info
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        Topics Covered
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {recommendedTrack.topics.length} core competencies
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        Weekly Commitment
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {recommendedTrack.timeCommitment.split(" (")[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        Session Structure
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        Live Interactive Workshops + 1:1 follow-ups
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
