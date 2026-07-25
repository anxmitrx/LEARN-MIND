import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWebinars } from "@/hooks/useWebinars";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { LazyEventPostCard } from "@/components/site/LazyEventPostCard";
import { SuggestionsWidget } from "@/components/site/SuggestionsWidget";
import { useNavigate } from "@tanstack/react-router";

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
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-12">
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
              recordings.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            {/* Main Feed Column */}
            <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
              {/* Mobile Suggestions Widget */}
              <div className="lg:hidden">
                <SuggestionsWidget />
              </div>

              <Tabs defaultValue="upcoming" className="w-full">
                <div className="flex justify-start mb-6">
                  <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-1 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-auto">
                    <TabsTrigger
                      value="upcoming"
                      className="rounded-full px-6 py-2.5 text-sm font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all cursor-pointer"
                    >
                      Upcoming
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
                  <div className="flex flex-col gap-6">
                    {upcomingWebinars.map((webinar, idx) => (
                      <WebinarFeedCard key={webinar.id || idx} webinar={webinar} type="upcoming" />
                    ))}
                    {upcomingWebinars.length === 0 && (
                      <div className="py-12 text-center text-slate-500 font-medium bg-white/30 rounded-3xl border border-white/50">
                        No upcoming webinars at the moment. Check back soon!
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past" className="mt-0 outline-none">
                  <div className="flex flex-col gap-6">
                    {pastWebinars.map((webinar, idx) => (
                      <WebinarFeedCard key={webinar.id || idx} webinar={webinar} type="past" />
                    ))}
                    {pastWebinars.length === 0 && (
                      <div className="py-12 text-center text-slate-500 font-medium bg-white/30 rounded-3xl border border-white/50">
                        No past recordings available yet.
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Sticky Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0">
              <SuggestionsWidget />
            </aside>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

function WebinarFeedCard({ webinar, type }: { webinar: any; type: "upcoming" | "past" }) {
  const navigate = useNavigate();

  const handleActionClick = async () => {
    navigate({ to: "/webinars/$slug", params: { slug: webinar.id || webinar.title } });
  };

  return (
    <LazyEventPostCard
      host={{
        uid: webinar.hostUid || webinar.presenter.toLowerCase().replace(/\s+/g, "-"),
        name: webinar.presenter,
      }}
      date={webinar.date}
      time={webinar.time}
      title={webinar.title}
      description={
        webinar.description ||
        `Join ${webinar.presenter} for an exclusive session on ${webinar.title}.`
      }
      bannerUrl={webinar.bannerUrl}
      actionText="View Details"
      onAction={handleActionClick}
      tags={type === "upcoming" ? ["Live"] : ["Recorded"]}
    />
  );
}
