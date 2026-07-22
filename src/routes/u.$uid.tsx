import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { useFollow } from "@/hooks/useFollow";
import { Loader2, Briefcase, GraduationCap, Building, UserPlus, Check, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { SuggestedMentors } from "@/components/site/SuggestedMentors";
import { FollowListModal } from "@/components/site/FollowListModal";
import { useState } from "react";

export const Route = createFileRoute("/u/$uid")({
  component: ProfilePage,
  loader: async ({ params }) => {
    if (!db) throw notFound();
    try {
      const userRef = doc(db, "users", params.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw notFound();

      const profileData = userSnap.data();

      // Fetch recent activity (Hosted workshops/webinars if mentor, Attended if student)
      let activity: any[] = [];
      if (profileData.role === "mentor") {
        const eventsRef = collection(db, "workshops");
        const q = query(eventsRef, where("hostUid", "==", params.uid));
        const eventsSnap = await getDocs(q);
        
        const webinarsRef = collection(db, "webinars");
        const wq = query(webinarsRef, where("hostUid", "==", params.uid));
        const webinarsSnap = await getDocs(wq);
        
        const wData = eventsSnap.docs.map(d => ({ id: d.id, ...d.data(), activityType: 'hosted_workshop' }));
        const webData = webinarsSnap.docs.map(d => ({ id: d.id, title: d.data().title || "Webinar", slug: d.id, ...d.data(), activityType: 'hosted_webinar' }));
        activity = [...wData, ...webData];
      } else {
        if (profileData.email) {
          const resRef = collection(db, "reservations");
          const rq = query(resRef, where("email", "==", profileData.email));
          const resSnap = await getDocs(rq);
          
          const webRegRef = collection(db, "webinar_registrations");
          const webq = query(webRegRef, where("email", "==", profileData.email));
          const webSnap = await getDocs(webq);

          const attendedW = resSnap.docs.map(d => ({ id: d.id, title: d.data().track || "Workshop", slug: d.data().track, activityType: 'attended_workshop' }));
          const attendedWeb = webSnap.docs.map(d => ({ id: d.id, title: d.data().webinarTitle || "Webinar", slug: d.data().webinarId, activityType: 'attended_webinar' }));
          
          activity = [...attendedW, ...attendedWeb];
        }
      }

      return {
        uid: params.uid,
        profile: profileData,
        activity,
      };
    } catch (e) {
      throw notFound();
    }
  },
});

function ProfilePage() {
  const { uid, profile, activity } = Route.useLoaderData();
  const { user } = useAuth();
  const { isFollowing, followersCount, followingCount, followersList, followingList, loading, toggleFollow } = useFollow(uid);
  
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: "followers" | "following" }>({
    isOpen: false,
    type: "followers"
  });

  const isMentor = profile.role === "mentor";
  const isOwnProfile = user?.uid === uid;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        
        {/* Profile Card (Hero) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6 relative">
          {/* Banner */}
          <div className="h-48 sm:h-64 bg-slate-200 w-full relative">
            {profile.profileBannerUrl ? (
              <img src={profile.profileBannerUrl} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200" />
            )}
          </div>

          {/* Profile Details Container */}
          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="absolute -top-16 sm:-top-20 border-4 border-white rounded-full bg-white shadow-md">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt={profile.name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-indigo-100 flex items-center justify-center text-5xl font-display text-indigo-500 uppercase">
                  {(profile.name || "U")[0]}
                </div>
              )}
            </div>

            {/* Edit / Follow Action */}
            <div className="flex justify-end pt-4 h-16 sm:h-20">
              {!isOwnProfile && user && (
                <button
                  onClick={toggleFollow}
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm border ${
                    isFollowing 
                      ? "bg-white text-slate-600 border-slate-300 hover:bg-slate-50" 
                      : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isFollowing ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
              {isOwnProfile && (
                <Link to="/dashboard" className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200">
                  Edit Profile
                </Link>
              )}
            </div>

            {/* Personal Info */}
            <div className="mt-2">
              <h1 className="text-3xl font-display font-bold text-slate-900">{profile.name}</h1>
              {isMentor ? (
                <p className="text-lg font-medium text-slate-700 mt-1">{profile.profession || "Mentor"}</p>
              ) : (
                <p className="text-lg font-medium text-slate-700 mt-1">Student</p>
              )}

              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 font-medium">
                {isMentor ? (
                  profile.education?.[0] && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> {profile.education[0].institution}
                    </span>
                  )
                ) : (
                  profile.college && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> {profile.college}
                    </span>
                  )
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm font-semibold">
                <button 
                  onClick={() => setModalState({ isOpen: true, type: "followers" })}
                  className="text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
                >
                  <span className="text-slate-900">{followersCount}</span> followers
                </button>
                <button 
                  onClick={() => setModalState({ isOpen: true, type: "following" })}
                  className="text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
                >
                  <span className="text-slate-900">{followingCount}</span> following
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* About */}
            {profile.bio && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">About</h2>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            {/* Experience (Mentors only) */}
            {isMentor && profile.experience && profile.experience.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Experience</h2>
                <div className="flex flex-col gap-6">
                  {profile.experience.map((exp: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-400">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.role}</h3>
                        <div className="text-sm font-medium text-slate-700">{exp.company}</div>
                        <div className="text-xs text-slate-500 mt-1">{exp.duration}</div>
                        {exp.description && (
                          <p className="text-sm text-slate-600 mt-3 whitespace-pre-wrap">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {(isMentor ? profile.education && profile.education.length > 0 : (profile.college || profile.school)) && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Education</h2>
                <div className="flex flex-col gap-6">
                  {isMentor ? (
                    profile.education.map((edu: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-400">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                          <div className="text-sm text-slate-600 mt-0.5">{edu.degree}</div>
                          {edu.year && <div className="text-xs text-slate-500 mt-1">{edu.year}</div>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {profile.college && (
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-400">
                            <Building className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-slate-900">{profile.college}</h3>
                            <div className="text-sm text-slate-500 mt-0.5">College / University</div>
                          </div>
                        </div>
                      )}
                      {profile.school && (
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-400">
                            <Building className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-slate-900">{profile.school}</h3>
                            <div className="text-sm text-slate-500 mt-0.5">School</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* Activity */}
            {activity.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Recent Activity</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activity.map((act, idx) => {
                    const isHosted = act.activityType?.startsWith("hosted");
                    const isWorkshop = act.activityType?.includes("workshop");
                    const label = isHosted ? (isWorkshop ? "Hosted Workshop" : "Hosted Webinar") : (isWorkshop ? "Attended Workshop" : "Attended Webinar");
                    
                    if (isWorkshop) {
                      return (
                        <Link key={act.id || idx} to="/workshops/$slug" params={{ slug: act.slug || act.id }} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all group">
                          <div className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">{label}</div>
                          <h3 className="font-bold text-slate-900 line-clamp-2">{act.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-3 font-semibold group-hover:text-indigo-600 transition-colors">
                            View Details <ChevronRight className="w-3 h-3" />
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <div key={act.id || idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                          <div className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-wider">{label}</div>
                          <h3 className="font-bold text-slate-900 line-clamp-2">{act.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-3 font-semibold">
                            Webinar Event
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            
            {/* Expertise */}
            {isMentor && profile.expertise && profile.expertise.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Expertise & Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill: string, i: number) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <SuggestedMentors />
          </div>
        </div>

      </div>
      
      <FollowListModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.type === "followers" ? "Followers" : "Following"}
        uidList={modalState.type === "followers" ? followersList : followingList}
      />

      <CtaFooter />
    </main>
  );
}
