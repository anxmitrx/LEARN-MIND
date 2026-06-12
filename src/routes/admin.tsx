import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { 
  Sparkles, 
  Users, 
  Award, 
  Calendar, 
  Search, 
  RefreshCw, 
  ShieldAlert, 
  ArrowLeft,
  GraduationCap,
  Layers,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

const MASTER_ADMIN_EMAIL = "wavelet2026@gmail.com";

export const Route = createFileRoute("/admin")({
  component: AdminComponent,
  head: () => ({
    meta: [
      { title: "Admin Center — Learn & Shine" },
      { name: "robots", content: "noindex, nofollow" }
    ],
  }),
});

function AdminComponent() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [reservations, setReservations] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"waitlist" | "quiz">("waitlist");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!db) {
      console.warn("Firestore db is not initialized.");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Setup real-time listeners
    const resQuery = query(collection(db, "reservations"), orderBy("timestamp", "desc"));
    const unsubscribeRes = onSnapshot(resQuery, (snap) => {
      const resList = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReservations(resList);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching reservations:", err);
      setLoading(false);
    });

    const quizQuery = query(collection(db, "quiz_results"), orderBy("timestamp", "desc"));
    const unsubscribeQuiz = onSnapshot(quizQuery, (snap) => {
      const quizList = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuizResults(quizList);
    }, (err) => {
      console.error("Error fetching quiz results:", err);
    });

    // We store these unsubscribers to clean them up when auth changes
    return () => {
      unsubscribeRes();
      unsubscribeQuiz();
    };
  }, [db]);

  useEffect(() => {
    // FORCE CLEAR OVERRIDE JUST IN CASE
    if (typeof window !== "undefined") {
      localStorage.removeItem("DEV_ADMIN_OVERRIDE");
    }

    if (!auth) {
      navigate({ to: "/" });
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== MASTER_ADMIN_EMAIL) {
        if (currentUser && auth) {
          auth.signOut().catch(err => console.error("Error signing out:", err));
        }
        navigate({ to: "/" });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Loading/Authorization State Guard
  if (authLoading || !user || user.email !== MASTER_ADMIN_EMAIL) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent">
        <div className="h-12 w-12 animate-spin border-4 border-white/20 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  // Format date helper
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString();
    }
    if (typeof timestamp === "string") {
      return new Date(timestamp).toLocaleDateString();
    }
    return "N/A";
  };

  // Stats computation
  const totalSignups = reservations.length;
  const totalQuizzes = quizResults.length;
  
  const getPopularTrack = () => {
    if (quizResults.length === 0) return "N/A";
    const trackCounts: Record<string, number> = {};
    quizResults.forEach((q) => {
      const track = q.recommendedTrack || "Unknown";
      trackCounts[track] = (trackCounts[track] || 0) + 1;
    });
    return Object.entries(trackCounts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  };

  const getTopChallenge = () => {
    if (quizResults.length === 0) return "N/A";
    const challengeCounts: Record<string, number> = {};
    quizResults.forEach((q) => {
      const chal = q.challenge || "Unknown";
      challengeCounts[chal] = (challengeCounts[chal] || 0) + 1;
    });
    const topChal = Object.entries(challengeCounts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    // Truncate if too long
    return topChal.length > 25 ? topChal.substring(0, 25) + "..." : topChal;
  };

  // Filter lists based on search query
  const filteredReservations = reservations.filter(r => 
    r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.track?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.college?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuizResults = quizResults.filter(q => 
    q.educationLevel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.challenge?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.recommendedTrack?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-transparent text-slate-800 relative">
      <Navbar />

      {/* Aurora Ambient Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-indigo-200/20 blur-3xl animate-pulse" style={{ animationDuration: "14s" }} />
        <div className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-purple-200/20 blur-3xl animate-pulse" style={{ animationDuration: "18s" }} />
      </div>

      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header command center info */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-500/10 text-indigo-600 border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-inner">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-600/70 tracking-widest uppercase">// SECURED ACCESS</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Admin Command Center
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("DEV_ADMIN_OVERRIDE");
                }
                navigate({ to: "/" });
              }}
              className="inline-flex items-center gap-2 bg-white/60 hover:bg-white/90 border border-slate-200 text-slate-700 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Home Page
            </button>
            <button
              onClick={() => {
                // The data will auto-update, but we can keep the button for visual feedback
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Total Seats Reserved</span>
              <h3 className="text-3xl font-display font-extrabold text-indigo-600 mt-1">{totalSignups}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Total Quiz Attempts</span>
              <h3 className="text-3xl font-display font-extrabold text-indigo-600 mt-1">{totalQuizzes}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>

          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Popular Track Match</span>
              <h3 className="text-sm font-display font-extrabold text-indigo-650 mt-2 truncate max-w-[170px]">{getPopularTrack()}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl shrink-0">
              <Award className="h-6 w-6" />
            </div>
          </div>

          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Primary Roadblock</span>
              <h3 className="text-xs font-display font-extrabold text-indigo-650 mt-3 truncate max-w-[170px]">{getTopChallenge()}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl shrink-0">
              <Layers className="h-6 w-6" />
            </div>
          </div>
        </section>

        {/* Search and Tab Filters Panel */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/25 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-5 shadow-sm">
          {/* Navigation Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("waitlist")}
              className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all duration-300 cursor-pointer ${
                activeTab === "waitlist"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white/40 hover:bg-white/60 text-slate-600 border border-white/40"
              }`}
            >
              Waitlist Entries ({filteredReservations.length})
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all duration-300 cursor-pointer ${
                activeTab === "quiz"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white/40 hover:bg-white/60 text-slate-600 border border-white/40"
              }`}
            >
              Quiz Diagnostics ({filteredQuizResults.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "waitlist" ? "reservations" : "quiz results"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-white/50 bg-white/20 px-4 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-2xl focus:bg-white/40 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            />
          </div>
        </section>

        {/* Data Tables Container */}
        <section className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl p-2 sm:p-4 overflow-hidden flex flex-col min-h-[400px]">
          {loading ? (
            /* Skeleton Loading State */
            <div className="flex-1 flex flex-col justify-center items-center gap-3 py-16">
              <div className="h-10 w-10 animate-spin border-4 border-white/20 border-t-indigo-600 rounded-full"></div>
              <p className="text-xs font-semibold text-slate-500 animate-pulse">Loading Firestore entries...</p>
            </div>
          ) : activeTab === "waitlist" ? (
            /* Waitlist / Reservation Table */
            <div className="w-full overflow-x-auto rounded-2xl">
              {filteredReservations.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-slate-400 font-bold text-sm">No reservations found.</div>
                  <p className="text-xs text-slate-500 mt-1">Waitlist entries will appear here once users submit reservations.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-indigo-100/50 bg-indigo-50/20">
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Name</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Email</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Phone</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">College</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Track</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Status</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Source</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Date Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((row) => (
                      <tr 
                        key={row.id} 
                        className="border-b border-white/20 hover:bg-white/30 transition-colors duration-150"
                      >
                        <td className="p-4 text-xs font-bold text-slate-900">{row.name || "N/A"}</td>
                        <td className="p-4 text-xs font-semibold text-slate-700">{row.email || "N/A"}</td>
                        <td className="p-4 text-xs font-mono font-bold text-slate-600">{row.phone || "N/A"}</td>
                        <td className="p-4 text-xs font-semibold text-slate-600">{row.college || "N/A"}</td>
                        <td className="p-4 text-xs">
                          <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-bold rounded-lg text-[10px]">
                            {row.track || "N/A"}
                          </span>
                        </td>
                        <td className="p-4 text-xs">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            row.status === "confirmed" 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-250" 
                              : "bg-amber-50 text-amber-700 border border-amber-250"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${row.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                            {row.status || "pending"}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-semibold text-slate-550 capitalize">{row.source || "website"}</td>
                        <td className="p-4 text-xs font-bold text-slate-600">{formatDate(row.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            /* Quiz Diagnostics Table */
            <div className="w-full overflow-x-auto rounded-2xl">
              {filteredQuizResults.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-slate-400 font-bold text-sm">No quiz attempts found.</div>
                  <p className="text-xs text-slate-500 mt-1">Quiz diagnostic responses will appear here as users submit them.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-indigo-100/50 bg-indigo-50/20">
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Education Level</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Roadblock / Challenge</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Recommended Track</th>
                      <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600">Date Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuizResults.map((row) => (
                      <tr 
                        key={row.id} 
                        className="border-b border-white/20 hover:bg-white/30 transition-colors duration-150"
                      >
                        <td className="p-4 text-xs font-bold text-slate-900">{row.educationLevel || "N/A"}</td>
                        <td className="p-4 text-xs font-semibold text-slate-700">{row.challenge || "N/A"}</td>
                        <td className="p-4 text-xs">
                          <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-bold rounded-lg text-[10px]">
                            {row.recommendedTrack || "N/A"}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-bold text-slate-600">{formatDate(row.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
