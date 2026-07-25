import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Loader2, ArrowRight } from "lucide-react";

export function SuggestionsWidget() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!db) return;

    const fetchSuggestions = async () => {
      try {
        // Fetch Mentors
        const mentorsQuery = query(
          collection(db, "users"),
          where("role", "==", "mentor"),
          limit(10),
        );
        const mentorsSnap = await getDocs(mentorsQuery);
        const mentors = mentorsSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));

        // Fetch Students (who might be active)
        const studentsQuery = query(
          collection(db, "users"),
          where("role", "==", "student"),
          limit(10),
        );
        const studentsSnap = await getDocs(studentsQuery);
        const students = studentsSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));

        const allSuggestions = [...mentors, ...students].filter((u) => u.uid !== user?.uid); // Don't suggest current user

        // Randomize and pick 5
        setSuggestions(allSuggestions.sort(() => 0.5 - Math.random()).slice(0, 5));
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-xl transform-gpu will-change-transform border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.07)] rounded-[2rem] p-6 lg:p-8 animate-pulse hidden lg:block sticky top-24 h-fit">
        <div className="h-5 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <>
      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden mb-6">
        <h2 className="text-sm font-bold text-slate-800 mb-3 px-1">Suggestions for You</h2>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar">
          {suggestions.map((s) => (
            <div
              key={s.uid}
              className="snap-start shrink-0 w-[200px] bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center"
            >
              <Link to="/profile/$userId" params={{ userId: s.uid }}>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm mb-3 mx-auto">
                  {s.photoURL ? (
                    <img src={s.photoURL} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-indigo-500 text-xl uppercase">
                      {(s.name || "U")[0]}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate w-full">{s.name}</h4>
                <p className="text-xs text-slate-500 truncate w-full mt-0.5">
                  {s.profession || s.college || (s.role === "mentor" ? "Mentor" : "Student")}
                </p>
              </Link>
              <Link
                to="/profile/$userId"
                params={{ userId: s.uid }}
                className="mt-3 w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg transition-colors inline-block"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="bg-white/60 backdrop-blur-md transform-gpu will-change-transform rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.07)] border border-white/80 p-6 hidden lg:block sticky top-24 h-fit">
        <h2 className="text-base font-bold text-slate-900 mb-4">Suggestions for You</h2>
        <div className="flex flex-col gap-4">
          {suggestions.map((s) => (
            <div key={s.uid} className="flex items-center justify-between gap-3 group">
              <Link
                to="/profile/$userId"
                params={{ userId: s.uid }}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border border-slate-200">
                  {s.photoURL ? (
                    <img src={s.photoURL} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-indigo-500 uppercase">
                      {(s.name || "U")[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:underline">
                    {s.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {s.profession || s.college || (s.role === "mentor" ? "Mentor" : "Student")}
                  </p>
                </div>
              </Link>
              <Link
                to="/profile/$userId"
                params={{ userId: s.uid }}
                className="shrink-0 p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
                title="View Profile"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
