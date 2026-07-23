import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { useWorkshops } from "@/hooks/useWorkshops";
import { useReservation } from "@/components/site/ReservationContext";
import { EventPostCard } from "@/components/site/EventPostCard";
import { SuggestionsWidget } from "@/components/site/SuggestionsWidget";
import { GlobalAuthModal } from "@/components/site/GlobalAuthModal";
import { useAuth } from "@/lib/AuthContext";

export const Route = createFileRoute("/workshops/")({
  component: TracksIndex,
  head: () => ({
    meta: [
      { title: "Mentoring Tracks — Learn & Shine" },
      {
        name: "description",
        content: "5 structured tracks for Engineering and Management students.",
      },
      { property: "og:title", content: "Mentoring Tracks — Learn & Shine" },
      {
        property: "og:description",
        content: "Pick your track. Train with mentors. Walk in ready.",
      },
    ],
  }),
});

function TracksIndex() {
  const { openModal } = useReservation();
  const { workshops: tracks } = useWorkshops();
  const { user, setShowLoginModal } = useAuth();

  const handleAction = (trackSlug: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    openModal(trackSlug);
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-800 relative">
      <Navbar />

      {/* Aurora Mesh Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <div
          className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-purple-200/20 blur-3xl animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute top-[50%] left-[5%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-indigo-200/20 blur-3xl animate-pulse"
          style={{ animationDuration: "16s", animationDelay: "2s" }}
        />
      </div>

      <section className="bg-transparent py-20 relative lg:pt-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-4 mb-12">
            <span className="eyebrow text-indigo-600 bg-white/40 backdrop-blur-md border border-white/50 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              YOUR CAREER IN FOCUS · 5 Structured Pathways
            </span>
            <h1 className="mt-2 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
              Forge Your Edge. <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Pick Your Track.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              Structured, mentor-led programs designed to bridge the gap between academic theory and
              real-world execution.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            {/* Main Feed Column */}
            <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
              {/* Mobile Suggestions Widget */}
              <div className="lg:hidden">
                <SuggestionsWidget />
              </div>

              <div className="flex flex-col gap-6">
                {tracks.map((t) => (
                  <EventPostCard
                    key={t.slug}
                    host={{
                      uid: t.slug, // Fallback since tracks don't have hosts explicitly defined in the hook by default
                      name: "YO Mentors",
                      photoURL: "", // We can leave it blank for initials
                    }}
                    date="Flexible Start"
                    time={t.timeCommitment}
                    title={t.title}
                    description={t.oneLinerPromise}
                    bannerUrl={t.bannerUrl}
                    tags={t.topics.slice(0, 3).map((tp) => tp.title)}
                    actionText="Reserve Seat"
                    onAction={() => handleAction(t.slug)}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Sticky Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0">
              <SuggestionsWidget />
            </aside>
          </div>
        </div>
      </section>

      <CtaFooter />
      <GlobalAuthModal />
    </main>
  );
}
