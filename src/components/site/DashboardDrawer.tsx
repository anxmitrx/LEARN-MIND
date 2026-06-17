import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { X, LogOut, GraduationCap, Video, Calendar, ChevronLeft } from "lucide-react";
import { ProfileAvatarUpload } from "@/components/site/ProfileAvatarUpload";

export function DashboardDrawer() {
  const { user, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [myWorkshops, setMyWorkshops] = useState<any[]>([]);
  const [myWebinars, setMyWebinars] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !db) return;

    const wq = query(collection(db, "reservations"), where("email", "==", user.email));
    const unsubW = onSnapshot(wq, (snap) => setMyWorkshops(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    const webq = query(collection(db, "webinar_registrations"), where("email", "==", user.email));
    const unsubWeb = onSnapshot(webq, (snap) => setMyWebinars(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    return () => { unsubW(); unsubWeb(); };
  }, [user]);

  if (!user) return null;

  return (
    <>
      {/* Floating Tab */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-1/2 right-0 z-40 bg-indigo-600 text-white rounded-l-2xl shadow-[-4px_0_15px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none group -translate-y-1/2"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <div className="font-display font-extrabold uppercase tracking-widest text-sm flex items-center gap-2 px-3 py-5">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              My Dashboard
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-md bg-white/90 backdrop-blur-2xl border-l border-white/50 shadow-2xl overflow-y-auto flex flex-col"
          >
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/50 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink uppercase tracking-wider">Dashboard</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="flex items-center justify-between bg-white/60 border border-white/50 shadow-sm rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <ProfileAvatarUpload />
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">{user.displayName}</h3>
                    <p className="text-xs font-bold text-slate-500">{userData?.level || "Level 1: Novice"}</p>
                  </div>
                </div>
                <button
                  onClick={() => auth && auth.signOut()}
                  className="grid h-8 w-8 place-items-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 border border-white/50 shadow-sm rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Workshops</div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-indigo-600">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-2xl font-display font-bold">{myWorkshops.length}</span>
                  </div>
                </div>
                <div className="bg-white/60 border border-white/50 shadow-sm rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Webinars</div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-purple-600">
                    <Video className="h-4 w-4" />
                    <span className="text-2xl font-display font-bold">{myWebinars.length}</span>
                  </div>
                </div>
              </div>

              {/* My Schedule */}
              <div className="bg-white/60 border border-white/50 shadow-sm rounded-2xl p-5 flex-1">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-ink flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  My Schedule
                </h3>

                {myWorkshops.length === 0 && myWebinars.length === 0 && (
                  <div className="text-center py-6">
                    <div className="text-slate-400 font-bold text-xs">No events booked yet.</div>
                  </div>
                )}

                <div className="grid gap-3">
                  {myWorkshops.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                      <div className="h-8 w-8 shrink-0 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider mb-0.5">
                          Workshop • {w.status || "Pending"}
                        </div>
                        <div className="font-bold text-sm text-slate-800 leading-tight">{w.track || "Reserved Workshop"}</div>
                      </div>
                    </div>
                  ))}

                  {myWebinars.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                      <div className="h-8 w-8 shrink-0 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                        <Video className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider mb-0.5">
                          Webinar • {w.webinarDate}
                        </div>
                        <div className="font-bold text-sm text-slate-800 leading-tight">{w.webinarTitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
