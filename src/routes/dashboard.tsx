import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  LogOut,
  Calendar,
  Video,
  GraduationCap,
  Home,
  Mail,
  Phone,
  Building,
  Plus,
  Users,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ProfileAvatarUpload } from "@/components/site/ProfileAvatarUpload";
import { EditProfileModal } from "@/components/site/EditProfileModal";
import { MentorHostEventModal } from "@/components/site/MentorHostEventModal";
import { SuggestedMentors } from "@/components/site/SuggestedMentors";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const dummySkillData = [
  { subject: "System Design", A: 120, fullMark: 150 },
  { subject: "React / Frontend", A: 98, fullMark: 150 },
  { subject: "Backend / Node", A: 86, fullMark: 150 },
  { subject: "Soft Skills", A: 99, fullMark: 150 },
  { subject: "Data Structures", A: 85, fullMark: 150 },
  { subject: "Networking", A: 65, fullMark: 150 },
];

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { user, loading, userData } = useAuth();
  const navigate = useNavigate();
  const [myWorkshops, setMyWorkshops] = useState<any[]>([]);
  const [myWebinars, setMyWebinars] = useState<any[]>([]);
  const [hostedEvents, setHostedEvents] = useState<any[]>([]);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !db) return;

    // Student queries
    const wq = query(collection(db, "reservations"), where("email", "==", user.email));
    const unsubW = onSnapshot(wq, (snap) =>
      setMyWorkshops(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    const webq = query(collection(db, "webinar_registrations"), where("email", "==", user.email));
    const unsubWeb = onSnapshot(webq, (snap) =>
      setMyWebinars(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    // Mentor queries
    const hostq = query(collection(db, "mentor_events"), where("hostUid", "==", user.uid));
    const unsubHost = onSnapshot(hostq, (snap) =>
      setHostedEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    return () => {
      unsubW();
      unsubWeb();
      unsubHost();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent">
        <div className="h-12 w-12 animate-spin border-4 border-white/20 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  const isMentor = userData?.role === "mentor";
  const hasCompletedProfile = isMentor
    ? Boolean(userData?.profession && userData?.specification && userData?.photoURL)
    : true;

  return (
    <div className="min-h-screen bg-transparent text-slate-800 p-4 md:p-8">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
          <div className="flex items-start gap-5">
            <ProfileAvatarUpload size="lg" />
            <div className="flex flex-col justify-center min-h-[80px]">
              <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-ink leading-none flex items-center gap-2">
                {userData?.name || user.displayName || "User"}
                {isMentor && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Mentor
                  </span>
                )}
                {!isMentor && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Student
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5 ml-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {user.email}
                </span>
                {userData?.phone && (
                  <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                    <span className="text-slate-300 mx-1">•</span>
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    {userData.phone}
                  </span>
                )}
                {userData?.college && (
                  <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                    <span className="text-slate-300 mx-1">•</span>
                    <Building className="w-3.5 h-3.5 text-indigo-400" />
                    {userData.college}
                  </span>
                )}
                {userData?.profession && (
                  <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                    <span className="text-slate-300 mx-1">•</span>
                    <Building className="w-3.5 h-3.5 text-indigo-400" />
                    {userData.profession}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto mt-4 md:mt-0">
            <Link
              to="/u/$uid"
              params={{ uid: user.uid }}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full font-display text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-sm"
            >
              <ExternalLink className="h-3 w-3" />
              View Profile
            </Link>
            <EditProfileModal />
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

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Column */}
          <div className="flex flex-col gap-6 md:col-span-2">
            {isMentor ? (
              <>
                {!hasCompletedProfile && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6 flex items-start gap-4 shadow-sm mb-4">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0 mt-1">
                      <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-900 text-base md:text-lg mb-1">
                        Profile Incomplete
                      </h3>
                      <p className="text-sm text-amber-700 font-medium leading-relaxed">
                        As long as you do not complete your profile (Profession, Expertise, and
                        Photo), your event hosting requests will not be seen or granted. Even if
                        granted, they cannot be hosted on the main page.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mentor Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6">
                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Total Hosted Events
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                        <Video className="h-6 w-6" />
                      </div>
                      <div className="text-4xl font-display font-bold text-purple-600">
                        {hostedEvents.length}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 flex flex-col justify-center items-center text-center transition-colors ${
                      hasCompletedProfile
                        ? "hover:bg-purple-50 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (hasCompletedProfile) {
                        setIsHostModalOpen(true);
                      } else {
                        alert("Please complete your profile first.");
                      }
                    }}
                  >
                    <div className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform mb-3">
                      <Plus className="h-8 w-8" />
                    </div>
                    <span className="font-bold text-purple-800 text-sm">Host an Event</span>
                  </div>
                </div>

                {/* Hosted Events List */}
                <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-6 text-ink">
                    My Hosted Events
                  </h2>

                  <div className="grid gap-8">
                    {/* Active Events */}
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-4">
                        Active Events
                      </h3>
                      {hostedEvents.filter((e) => e.approved).length > 0 ? (
                        <div className="grid gap-4">
                          {hostedEvents
                            .filter((e) => e.approved)
                            .map((w, i) => (
                              <div
                                key={`active-${i}`}
                                className="flex items-center justify-between gap-4 bg-white/80 border border-white hover:border-purple-200 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 shrink-0 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                    <Video className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="text-[11px] font-extrabold text-purple-600 uppercase tracking-widest">
                                        {w.type} • {w.date}
                                      </div>
                                    </div>
                                    <div className="font-bold text-slate-800 text-lg">
                                      {w.title}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-slate-50 p-2 rounded-xl min-w-[80px]">
                                  <Users className="w-5 h-5 text-slate-400 mb-1" />
                                  <span className="font-bold text-slate-700 text-sm">
                                    {w.enrollmentCount || 0}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 bg-white/50 border border-slate-100 rounded-2xl">
                          <div className="text-slate-400 font-bold text-sm">
                            No active events yet.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pending Events */}
                    <div>
                      <h3 className="text-sm font-extrabold text-amber-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Pending Requests
                      </h3>
                      {hostedEvents.filter((e) => !e.approved).length > 0 ? (
                        <div className="grid gap-4 opacity-70 grayscale-[30%]">
                          {hostedEvents
                            .filter((e) => !e.approved)
                            .map((w, i) => (
                              <div
                                key={`pending-${i}`}
                                className="flex items-center justify-between gap-4 bg-amber-50/50 border border-amber-100 p-4 rounded-2xl shadow-sm transition-all"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 shrink-0 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                                    <Video className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest">
                                        {w.type} • {w.date}
                                      </div>
                                    </div>
                                    <div className="font-bold text-slate-700 text-lg">
                                      {w.title}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 bg-amber-50/50 border border-amber-100/50 rounded-2xl">
                          <div className="text-slate-400 font-bold text-sm">
                            No pending requests.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Student Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 hover:shadow-[0_15px_40px_rgba(31,38,135,0.15)] transition-all duration-300 group">
                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Registered Workshops
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div className="text-4xl font-display font-bold text-indigo-600">
                        {myWorkshops.length}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 hover:shadow-[0_15px_40px_rgba(31,38,135,0.15)] transition-all duration-300 group">
                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Registered Webinars
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Video className="h-6 w-6" />
                      </div>
                      <div className="text-4xl font-display font-bold text-purple-600">
                        {myWebinars.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registered Events */}
                <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-6 text-ink">
                    My Schedule
                  </h2>

                  {myWorkshops.length === 0 && myWebinars.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-slate-400 font-bold text-sm">No events booked yet.</div>
                      <p className="text-xs text-slate-500 mt-1">
                        Register for a workshop or webinar to see it here.
                      </p>
                    </div>
                  )}

                  <div className="grid gap-4">
                    {myWorkshops.map((w, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-white/80 border border-white hover:border-indigo-200 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="h-12 w-12 shrink-0 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">
                            Workshop • {w.status || "Pending"}
                          </div>
                          <div className="font-bold text-slate-800 text-lg">
                            {w.track || "Reserved Workshop"}
                          </div>
                        </div>
                      </div>
                    ))}

                    {myWebinars.map((w, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-white/80 border border-white hover:border-purple-200 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
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
              </>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            {/* Skill Radar */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-[2rem] p-6 md:p-8 flex flex-col h-full min-h-[350px]">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-ink">
                Skill Radar
              </h2>
              <div className="flex-1 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dummySkillData}>
                    <PolarGrid stroke="#1E1B4B" strokeOpacity={0.15} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#1E1B4B", fontSize: 10, fontWeight: 800 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#6366F1"
                      strokeWidth={2}
                      fill="#818CF8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SuggestedMentors />
          </div>
        </div>
      </div>

      {/* Mentor Modals */}
      <MentorHostEventModal isOpen={isHostModalOpen} onClose={() => setIsHostModalOpen(false)} />
    </div>
  );
}
