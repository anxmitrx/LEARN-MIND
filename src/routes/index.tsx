import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { TracksGrid } from "@/components/site/TracksGrid";
import { MentorsMarquee } from "@/components/site/MentorsMarquee";
import { Pillars } from "@/components/site/Pillars";
import { FAQ } from "@/components/site/FAQ";
import { CtaFooter } from "@/components/site/CtaFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Learn & Mind — Stop hoping. Start training." },
      {
        name: "description",
        content:
          "Learn & Mind makes Indian college students industry-ready since day one. Live workshops, real mentors from MNCs and IIMs, and 5 mentoring tracks built for engineering and management students.",
      },
      { property: "og:title", content: "Learn & Mind — Stop hoping. Start training." },
      {
        property: "og:description",
        content:
          "5 mentoring tracks, premium mentors from MNCs/IIMs, business simulations, and 1:1 career mentoring for Indian students.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800;900&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TracksGrid />
      <MentorsMarquee />
      <Pillars />
      <FAQ />
      <CtaFooter />
    </main>
  );
}
