import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, MapPin, Building, GraduationCap, ChevronRight, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { MOCK_EXAM_DATA } from "@/lib/collegeData";

interface RankVsCollegeProps {
  onSwitchTab: () => void;
}

export function RankVsCollege({ onSwitchTab }: RankVsCollegeProps) {
  const [examId, setExamId] = useState<string>("");
  const [rankInput, setRankInput] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const selectedExam = MOCK_EXAM_DATA.find((e) => e.examId === examId);

  const matchedColleges = useMemo(() => {
    if (!selectedExam || !rankInput || isNaN(Number(rankInput))) return [];
    const rank = Number(rankInput);
    // Colleges where the user's rank is better (lower or equal) than the closing rank
    return selectedExam.colleges
      .filter((c) => rank <= c.closingRank)
      .sort((a, b) => a.closingRank - b.closingRank);
  }, [selectedExam, rankInput]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (examId && rankInput) {
      setHasSearched(true);
    }
  };

  // Reset search state if inputs change
  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExamId(e.target.value);
    setHasSearched(false);
  };

  const handleRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRankInput(e.target.value);
    setHasSearched(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="grid h-10 w-10 place-items-center bg-indigo-100 text-indigo-600 rounded-full shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </span>
            <span className="inline-block bg-white/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-indigo-600 border border-white/50 rounded-full uppercase tracking-wider">
              Powered by 5-Year Data Report
            </span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-tight mb-4">
            Find your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dream College</span>
          </h2>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mb-8">
            Enter your competitive exam and expected rank to instantly discover which top colleges and courses you qualify for based on historical admission trends.
          </p>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm">
            <div>
              <label className="block text-xs font-display font-extrabold uppercase tracking-wider text-ink mb-2">
                Select Exam
              </label>
              <select
                required
                value={examId}
                onChange={handleExamChange}
                className="w-full border border-white/60 bg-white/60 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition-all rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Choose an exam...</option>
                {MOCK_EXAM_DATA.map((exam) => (
                  <option key={exam.examId} value={exam.examId}>
                    {exam.examName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-display font-extrabold uppercase tracking-wider text-ink mb-2">
                Your Rank / Expected Rank
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Trophy className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 5000"
                  value={rankInput}
                  onChange={handleRankChange}
                  className="w-full border border-white/60 bg-white/60 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!examId || !rankInput}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 font-display text-sm font-bold tracking-wide rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer h-[50px]"
            >
              <Search className="h-4 w-4" /> Predict
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {hasSearched && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-ink">
                Predicted Options <span className="text-slate-400 text-lg font-medium">({matchedColleges.length})</span>
              </h3>
            </div>

            {matchedColleges.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matchedColleges.map((college, idx) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl p-5 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block bg-indigo-50 text-indigo-700 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-indigo-100">
                        {college.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        <TrendingUp className="w-3 h-3" /> Safe
                      </span>
                    </div>
                    
                    <h4 className="font-display text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {college.name}
                    </h4>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" /> {college.location}
                      </div>
                      {college.branch && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <GraduationCap className="w-4 h-4 text-slate-400" /> {college.branch}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium border-t border-slate-100 pt-2 mt-2">
                        <Trophy className="w-4 h-4 text-slate-400" /> Cutoff Rank: <strong className="text-slate-900">{college.closingRank.toLocaleString()}</strong>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/40 border border-white/60 rounded-2xl p-8 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center bg-orange-100 text-orange-500 rounded-full mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-slate-900 mb-2">No exact matches found</h4>
                <p className="text-slate-600 font-medium max-w-md mx-auto">
                  Based on the 5-year historical data, a rank of {rankInput} in {selectedExam?.examName} might be highly competitive for our listed top-tier colleges. 
                </p>
              </div>
            )}

            {/* Call to action at the bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-32 h-32 text-white" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Want a personalized roadmap?
              </h3>
              <p className="text-indigo-200 font-medium mb-8 max-w-xl mx-auto">
                These are just historical predictions. Talk to an expert counselor to build a foolproof backup strategy, explore alternative exams, and find the perfect college fit for your profile.
              </p>
              <button
                onClick={onSwitchTab}
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 px-8 py-4 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                WANT MORE CLARITY? RESERVE YOUR SEAT FOR COUNSELLING
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
