import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { LogOut, Calendar, Video, GraduationCap, Home } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const dummySkillData = [
  { subject: 'System Design', A: 120, fullMark: 150 },
  { subject: 'React / Frontend', A: 98, fullMark: 150 },
  { subject: 'Backend / Node', A: 86, fullMark: 150 },
  { subject: 'Soft Skills', A: 99, fullMark: 150 },
  { subject: 'Data Structures', A: 85, fullMark: 150 },
  { subject: 'Networking', A: 65, fullMark: 150 },
];

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { user, loading, userData } = useAuth();
  const navigate = useNavigate();
  const [myWorkshops, setMyWorkshops] = useState<any[]>([]);
  const [myWebinars, setMyWebinars] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !db) return;

    const wq = query(collection(db, "reservations"), where("email", "==", user.email));
    const unsubW = onSnapshot(wq, (snap) => setMyWorkshops(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    const webq = query(collection(db, "webinar_registrations"), where("email", "==", user.email));
    const unsubWeb = onSnapshot(webq, (snap) => setMyWebinars(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    return () => { unsubW(); unsubWeb(); };
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent">
        <div className="h-12 w-12 animate-spin border-4 border-white/20 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-transparent text-slate-800 p-4 md:p-8">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 rounded-full shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center font-display text-xl font-bold">
                  {user.displayName?.[0] || "U"}
                </div>
              )}
            </div>
            <div>
              <h1 className="font-display text-xl font-bold uppercase tracking-wide">
                {user.displayName}
              </h1>
              <p className="text-sm font-bold text-slate-600">
                {userData?.level || "Level 1: Novice"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 px-5 py-2.5 rounded-full font-display text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm border border-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              <Home className="h-4 w-4" />
              Go to Home Page
            </Link>
            <button
              onClick={() => auth && auth.signOut()}
              className="grid h-10 w-10 place-items-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 text-slate-600 transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              title="Log out"
            >
              <LogOut className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* XP Progress Bar */}
        <div className="sticky top-4 z-10 mb-8 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-indigo-600">Industry XP</span>
            <span className="font-mono text-sm font-bold text-indigo-600">{userData?.xp || 0} / 1000</span>
          </div>
          <div className="h-4 w-full bg-white/20 border border-white/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(((userData?.xp || 0) / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main Column */}
          <div className="flex flex-col gap-6 md:col-span-2">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 hover:shadow-[0_15px_40px_rgba(31,38,135,0.15)] transition-all duration-300 group">
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Registered Workshops</div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-display font-bold text-indigo-600">{myWorkshops.length}</div>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 hover:shadow-[0_15px_40px_rgba(31,38,135,0.15)] transition-all duration-300 group">
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Registered Webinars</div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-display font-bold text-purple-600">{myWebinars.length}</div>
                </div>
              </div>
            </div>

            {/* Registered Events */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 md:p-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-6 text-ink">My Schedule</h2>
              
              {myWorkshops.length === 0 && myWebinars.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-slate-400 font-bold text-sm">No events booked yet.</div>
                  <p className="text-xs text-slate-500 mt-1">Register for a workshop or webinar to see it here.</p>
                </div>
              )}

              <div className="grid gap-4">
                {myWorkshops.map((w, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/80 border border-white hover:border-indigo-200 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="h-12 w-12 shrink-0 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">Workshop • {w.status || "Pending"}</div>
                      <div className="font-bold text-slate-800 text-lg">{w.track || "Reserved Workshop"}</div>
                    </div>
                  </div>
                ))}

                {myWebinars.map((w, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/80 border border-white hover:border-purple-200 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="h-12 w-12 shrink-0 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Video className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-purple-600 uppercase tracking-widest mb-1">
                        Webinar • {w.webinarDate} {w.webinarTime}
                      </div>
                      <div className="font-bold text-slate-800 text-lg">{w.webinarTitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            
            {/* Skill Radar */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 md:p-8 flex flex-col h-full min-h-[350px]">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-ink">Skill Radar</h2>
              <div className="flex-1 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dummySkillData}>
                    <PolarGrid stroke="#1E1B4B" strokeOpacity={0.15} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#1E1B4B', fontSize: 10, fontWeight: 800 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="Student" dataKey="A" stroke="#6366F1" strokeWidth={2} fill="#818CF8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
