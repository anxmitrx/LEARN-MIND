import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export function SuggestedFollowMarquee() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!db) return;

    const fetchSuggestions = async () => {
      try {
        // Fetch Mentors
        const mentorsQuery = query(collection(db, "users"), where("role", "==", "mentor"), limit(10));
        const mentorsSnap = await getDocs(mentorsQuery);
        const mentors = mentorsSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));

        // Fetch Students
        const studentsQuery = query(collection(db, "users"), where("role", "==", "student"), limit(10));
        const studentsSnap = await getDocs(studentsQuery);
        const students = studentsSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));

        const allSuggestions = [...mentors, ...students].filter((u) => u.uid !== user?.uid);

        // Randomize and ensure we have a good amount for the marquee
        const randomized = allSuggestions.sort(() => 0.5 - Math.random());
        // Duplicate array to ensure smooth infinite scroll
        setSuggestions([...randomized, ...randomized, ...randomized]);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user]);

  if (loading || suggestions.length === 0) return null;

  return (
    <div className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 mb-8 text-center">
        <span className="eyebrow text-indigo-600/70">Build Your Network</span>
        <h3 className="mt-2 font-display text-3xl font-bold text-ink">
          Suggested to Follow
        </h3>
      </div>

      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-6 py-4 hover:[animation-play-state:paused]">
          {suggestions.map((s, index) => (
            <div
              key={`${s.uid}-${index}`}
              className="shrink-0 w-[240px] bg-white/60 backdrop-blur-md rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] border border-white/60 p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02] hover:bg-white/80 hover:shadow-lg cursor-pointer group"
            >
              <Link to="/profile/$userId" params={{ userId: s.uid }} className="w-full flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border-4 border-white shadow-sm mb-4 mx-auto group-hover:border-indigo-100 transition-colors">
                  {s.photoURL ? (
                    <img src={s.photoURL} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-indigo-500 text-2xl uppercase">
                      {(s.name || "U")[0]}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-slate-900 truncate w-full group-hover:text-indigo-600 transition-colors">
                  {s.name}
                </h4>
                <p className="text-sm text-slate-500 truncate w-full mt-1 font-medium">
                  {s.profession || s.college || (s.role === "mentor" ? "Premium Mentor" : "Student")}
                </p>
                <div className="mt-4 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold w-full transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  View Profile
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
