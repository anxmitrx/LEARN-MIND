import { createFileRoute, notFound } from "@tanstack/react-router";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { useFollow } from "@/hooks/useFollow";
import { Loader2, UserPlus, Check, GraduationCap, Briefcase } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { FollowListModal } from "@/components/site/FollowListModal";
import { useState } from "react";
import { EventPostCard } from "@/components/site/EventPostCard";

export const Route = createFileRoute("/profile/$userId")({
  component: ProfilePage,
  loader: async ({ params }) => {
    if (!db) throw notFound();
    try {
      const userRef = doc(db, "users", params.userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw notFound();

      const profileData = userSnap.data();

      // STRICT PRIVACY ENFORCEMENT: Strip phone number before returning
      delete profileData.phoneNumber;
      delete profileData.phone;

      // Fetch recent activity (Hosted workshops/webinars if mentor, Attended if student)
      let activity: any[] = [];
      if (profileData.role === "mentor") {
        const eventsRef = collection(db, "workshops");
        const q = query(eventsRef, where("hostUid", "==", params.userId));
        const eventsSnap = await getDocs(q);

        const webinarsRef = collection(db, "webinars");
        const wq = query(webinarsRef, where("hostUid", "==", params.userId));
        const webinarsSnap = await getDocs(wq);

        const wData = eventsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          activityType: "hosted_workshop",
        }));
        const webData = webinarsSnap.docs.map((d) => ({
          id: d.id,
          title: d.data().title || "Webinar",
          slug: d.id,
          ...d.data(),
          activityType: "hosted_webinar",
        }));
        activity = [...wData, ...webData];
      } else {
        if (profileData.email) {
          const resRef = collection(db, "reservations");
          const rq = query(resRef, where("email", "==", profileData.email));
          const resSnap = await getDocs(rq);

          const webRegRef = collection(db, "webinar_registrations");
          const webq = query(webRegRef, where("email", "==", profileData.email));
          const webSnap = await getDocs(webq);

          const attendedW = resSnap.docs.map((d) => ({
            id: d.id,
            title: d.data().track || "Workshop",
            slug: d.data().track,
            activityType: "attended_workshop",
            timestamp: d.data().timestamp,
          }));
          const attendedWeb = webSnap.docs.map((d) => ({
            id: d.id,
            title: d.data().webinarTitle || "Webinar",
            slug: d.data().webinarId,
            activityType: "attended_webinar",
            timestamp: d.data().timestamp,
          }));

          activity = [...attendedW, ...attendedWeb];
        }
      }

      return {
        userId: params.userId,
        profile: profileData,
        activity,
      };
    } catch (e) {
      throw notFound();
    }
  },
});

function ProfilePage() {
  const { userId, profile, activity } = Route.useLoaderData();
  const { user } = useAuth();
  const {
    isFollowing,
    followersCount,
    followingCount,
    followersList,
    followingList,
    loading,
    toggleFollow,
  } = useFollow(userId);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "followers" | "following";
  }>({
    isOpen: false,
    type: "followers",
  });

  const isMentor = profile.role === "mentor";
  const isOwnProfile = user?.uid === userId;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-2xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        {/* Profile Header (mimics IG profile header) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 mb-10 pt-4">
          <div className="shrink-0">
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border-4 border-white shadow-md">
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-4xl sm:text-6xl font-bold text-indigo-500 uppercase">
                  {(profile.name || "U")[0]}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h1 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                {profile.name}
              </h1>
              <div className="flex justify-center sm:justify-start gap-2">
                {!isOwnProfile && user && (
                  <button
                    onClick={toggleFollow}
                    disabled={loading}
                    className={`flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-lg font-bold text-sm transition-all shadow-sm border ${
                      isFollowing
                        ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                        : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isFollowing ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
                {isOwnProfile && (
                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="px-5 py-1.5 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-6 mb-4 text-sm">
              <span className="font-medium">
                <span className="font-bold text-slate-900">{activity.length}</span> events
              </span>
              <button
                onClick={() => setModalState({ isOpen: true, type: "followers" })}
                className="font-medium hover:opacity-70 transition-opacity"
              >
                <span className="font-bold text-slate-900">{followersCount}</span> followers
              </button>
              <button
                onClick={() => setModalState({ isOpen: true, type: "following" })}
                className="font-medium hover:opacity-70 transition-opacity"
              >
                <span className="font-bold text-slate-900">{followingCount}</span> following
              </button>
            </div>

            <div className="text-sm">
              <p className="font-semibold text-slate-900">
                {isMentor ? profile.profession || "Mentor" : "Student"}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-slate-500 mt-0.5">
                {isMentor
                  ? profile.education?.[0] && (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" /> {profile.education[0].institution}
                      </>
                    )
                  : profile.college && (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" /> {profile.college}
                      </>
                    )}
              </div>

              {profile.bio && (
                <p className="mt-2 text-slate-700 whitespace-pre-wrap max-w-sm mx-auto sm:mx-0">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-6"></div>

        {/* Feed Body */}
        <div className="flex flex-col gap-6 w-full">
          {activity.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4 text-slate-500">
              <div className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-display font-bold text-slate-900">No Events Yet</p>
            </div>
          ) : (
            activity.map((act, idx) => {
              const isHosted = act.activityType?.startsWith("hosted");
              const isWorkshop = act.activityType?.includes("workshop");

              return (
                <EventPostCard
                  key={act.id || idx}
                  host={{
                    uid: userId,
                    name: profile.name,
                    photoURL: profile.photoURL,
                  }}
                  date={act.date || "Past Event"}
                  time={act.time || ""}
                  title={act.title}
                  description={
                    act.description || (isWorkshop ? "Workshop Session" : "Webinar Session")
                  }
                  actionText={isHosted ? "View Details" : "Attended"}
                  onAction={() =>
                    window.open(
                      isWorkshop ? `/workshops/${act.slug || act.id}` : `/webinars`,
                      "_blank",
                    )
                  }
                  tags={[isHosted ? "Hosted" : "Attended", isWorkshop ? "Workshop" : "Webinar"]}
                />
              );
            })
          )}
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
