import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
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

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

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
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden bg-slate-100 text-indigo-700 border border-slate-200 rounded-full shadow-sm">
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
          
          <button
            onClick={() => auth && auth.signOut()}
            className="grid h-10 w-10 place-items-center bg-white border border-slate-200 rounded-full hover:scale-105 active:scale-95 text-indigo-600 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20"
            title="Log out"
          >
            <LogOut className="h-5 w-5" strokeWidth={3} />
          </button>
        </header>

        {/* XP Progress Bar */}
        <div className="sticky top-4 z-10 mb-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-indigo-600">Industry XP</span>
            <span className="font-mono text-sm font-bold text-indigo-600">{userData?.xp || 0} / 1000</span>
          </div>
          <div className="h-4 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(((userData?.xp || 0) / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main Column */}
          <div className="flex flex-col gap-6 md:col-span-2">
            
            {/* Next Up Widget */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
              <div className="mb-4 inline-flex items-center gap-2 bg-slate-100 text-indigo-700 border border-slate-200 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-600 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600"></span>
                </span>
                Next Up
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight uppercase text-slate-900">Mastering System Design</h2>
              <p className="mt-2 text-slate-600 font-semibold">Tomorrow • 6:00 PM IST</p>
              
              <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider rounded-3xl shadow-sm border border-transparent transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20">
                Join Zoom Room
              </button>
            </div>

            {/* Resource Vault */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-slate-900">Resource Vault</h2>
              <div className="grid gap-3">
                {[
                  "System Design Cheatsheet.pdf",
                  "Behavioral Interview Framework.pdf",
                  "Resume Templates (ATS-Friendly).zip"
                ].map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex w-full items-center justify-between border border-slate-200 bg-white hover:bg-slate-50 p-4 cursor-pointer rounded-2xl transition-all duration-200 shadow-sm text-left focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white/20"
                  >
                    <span className="font-bold text-sm text-slate-800">{res}</span>
                    <span className="font-mono text-xs font-bold text-indigo-600">Download</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            
            {/* Skill Radar */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col h-full min-h-[300px]">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-slate-900">Skill Radar</h2>
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
