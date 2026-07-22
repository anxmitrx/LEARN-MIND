import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { WebinarFeaturesBento } from "@/components/site/WebinarFeaturesBento";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, Video, ExternalLink } from "lucide-react";
import { useWebinars } from "@/hooks/useWebinars";
import { Webinar } from "@/lib/webinars";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export const Route = createFileRoute("/webinars")({
  component: WebinarsPage,
});

function WebinarsPage() {
  const { webinars, loading } = useWebinars();

  const upcomingWebinars = webinars.filter((w) => w.status === "upcoming");
  const pastWebinars = webinars.filter((w) => w.status === "past");

  if (loading) {
    return (
      <main className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-800 relative">
      <Navbar />

      <section className="bg-transparent py-24 relative pt-32 lg:pt-40">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow text-indigo-600 bg-white/40 backdrop-blur-md border border-white/50 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              Live & Recorded Sessions
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
              Exclusive{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Webinars
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 font-medium">
              Join industry experts for deep-dive sessions. Watch live or catch up on past
              recordings through our portal.
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-1 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-auto">
                <TabsTrigger
                  value="upcoming"
                  className="rounded-full px-6 py-2.5 text-sm font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all cursor-pointer"
                >
                  Upcoming Sessions
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="rounded-full px-6 py-2.5 text-sm font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all cursor-pointer"
                >
                  Past Recordings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-0 outline-none">
              <div className="grid gap-6 md:grid-cols-2">
                {upcomingWebinars.map((webinar, idx) => (
                  <WebinarCard key={webinar.id || idx} webinar={webinar} type="upcoming" />
                ))}
                {upcomingWebinars.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-white/30 rounded-3xl border border-white/50">
                    No upcoming webinars at the moment. Check back soon!
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-0 outline-none">
              <div className="grid gap-6 md:grid-cols-2">
                {pastWebinars.map((webinar, idx) => (
                  <WebinarCard key={webinar.id || idx} webinar={webinar} type="past" />
                ))}
                {pastWebinars.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-white/30 rounded-3xl border border-white/50">
                    No past recordings available yet.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <WebinarFeaturesBento />

      <CtaFooter />
    </main>
  );
}

function WebinarCard({ webinar, type }: { webinar: Webinar; type: "upcoming" | "past" }) {
  const { user, userData, setShowLoginModal, requestPhoneVerification } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleActionClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (type === "upcoming") {
      const isMentor = userData?.role === "mentor";
      const hasCompletedProfile = isMentor
        ? Boolean(userData?.profession && userData?.specification && userData?.photoURL)
        : Boolean(userData?.college || userData?.institution);

      if (!hasCompletedProfile) {
        alert(
          "Please complete your profile details (via Dashboard -> Edit Profile) before registering for an event.",
        );
        return;
      }

      requestPhoneVerification(async () => {
        setIsRegistering(true);
        try {
          await addDoc(collection(db, "webinar_registrations"), {
            email: user.email,
            name: userData?.name || user.displayName || "User",
            webinarTitle: webinar.title,
            webinarId: webinar.id || webinar.title,
            webinarDate: webinar.date,
            webinarTime: webinar.time,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          console.error("Error registering for webinar:", err);
        }
        setIsRegistering(false);
        window.open(webinar.link, "_blank");
      });
      return;
    }

    window.open(webinar.link, "_blank");
  };

  return (
    <div className="group relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:border-white/95 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 mb-4">
          <span className="flex items-center gap-1.5 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100/50">
            <Calendar className="h-3.5 w-3.5" />
            {webinar.date}
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100/50">
            <Clock className="h-3.5 w-3.5" />
            {webinar.time}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-slate-900 group-hover:text-indigo-950 transition-colors">
          {webinar.title}
        </h3>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center border border-white/60 shadow-sm">
            <span className="text-xs font-bold text-indigo-700">{webinar.presenter.charAt(0)}</span>
          </div>
          <span className="text-sm font-semibold text-slate-600">by {webinar.presenter}</span>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleActionClick}
          disabled={isRegistering}
          className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-display text-sm font-extrabold uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/20 border border-white/20 transition-transform duration-300 group-hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none disabled:opacity-70 disabled:scale-100 cursor-pointer"
        >
          {isRegistering ? (
            <div className="h-4 w-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
          ) : type === "upcoming" ? (
            <>
              Register & Join <ExternalLink className="h-4 w-4" />
            </>
          ) : (
            <>
              Watch Recording <Video className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
