import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "@tanstack/react-router";
import { useFollow } from "@/hooks/useFollow";
import { useAuth } from "@/lib/AuthContext";
import { Plus, Check } from "lucide-react";

function FollowListItem({ uid, onClose }: { uid: string; onClose: () => void }) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isFollowing, toggleFollow, loading: followLoading } = useFollow(uid);

  useEffect(() => {
    async function fetchUser() {
      if (!db) return;
      try {
        const d = await getDoc(doc(db, "users", uid));
        if (d.exists()) {
          setUserProfile({ uid: d.id, ...d.data() });
        }
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-3 animate-pulse">
        <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          <div className="h-2 bg-slate-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all">
      <Link to="/u/$uid" params={{ uid }} onClick={onClose} className="flex items-center gap-3 flex-1 min-w-0">
        <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
          {userProfile.photoURL ? (
            <img src={userProfile.photoURL} alt={userProfile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-indigo-500 uppercase">{(userProfile.name || "U")[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">{userProfile.name}</h4>
          <p className="text-xs text-slate-500 truncate">{userProfile.profession || (userProfile.role === "mentor" ? "Mentor" : "Student")}</p>
        </div>
      </Link>
      
      {user && user.uid !== uid && (
        <button
          onClick={toggleFollow}
          disabled={followLoading}
          className="shrink-0 p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
          title="Follow"
        >
          {followLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isFollowing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function FollowListModal({ 
  isOpen, 
  onClose, 
  title, 
  uidList 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  uidList: string[];
}) {
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
            <h2 className="text-xl font-display font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-2 sm:p-4 flex-1">
            {uidList.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-8 font-medium">
                No users found.
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {uidList.map((uid) => (
                  <FollowListItem key={uid} uid={uid} onClose={onClose} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
