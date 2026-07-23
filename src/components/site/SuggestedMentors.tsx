import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { useFollow } from "@/hooks/useFollow";
import { Loader2, Plus, Check } from "lucide-react";

function SuggestedMentorItem({ mentor }: { mentor: any }) {
  const { isFollowing, toggleFollow, loading } = useFollow(mentor.uid);
  const { user } = useAuth();

  if (isFollowing) return null; // Hide if already following (simplistic filtering)

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all">
      <Link
        to="/u/$uid"
        params={{ uid: mentor.uid }}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
          {mentor.photoURL ? (
            <img src={mentor.photoURL} alt={mentor.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-indigo-500 uppercase">{(mentor.name || "U")[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">{mentor.name}</h4>
          <p className="text-xs text-slate-500 truncate">{mentor.profession || "Mentor"}</p>
        </div>
      </Link>

      {user && user.uid !== mentor.uid && (
        <button
          onClick={toggleFollow}
          disabled={loading}
          className="shrink-0 p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
          title="Follow"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isFollowing ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}

export function SuggestedMentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!db) return;

    const fetchMentors = async () => {
      try {
        // Fetch up to 10 mentors to have a pool to choose from
        const q = query(collection(db, "users"), where("role", "==", "mentor"), limit(10));
        const snap = await getDocs(q);
        const fetchedMentors = snap.docs
          .map((d) => ({ uid: d.id, ...d.data() }))
          .filter((m) => m.uid !== user?.uid); // Don't suggest the current user

        // Randomize
        setMentors(fetchedMentors.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (err) {
        console.error("Error fetching suggested mentors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
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

  if (mentors.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Suggested to Follow</h2>
      <div className="flex flex-col gap-3">
        {mentors.map((m) => (
          <SuggestedMentorItem key={m.uid} mentor={m} />
        ))}
      </div>
    </div>
  );
}
