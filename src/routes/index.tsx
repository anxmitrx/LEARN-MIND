import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { MentoringTopics } from "@/components/site/MentoringTopics";
import { Pillars } from "@/components/site/Pillars";
import { CtaFooter } from "@/components/site/CtaFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IndustryReady — Your Career Starts Before Graduation" },
      {
        name: "description",
        content:
          "IndustryReady is a career readiness platform for Indian college students. Live workshops, real mentors, and the playbook your college never taught you.",
      },
      { property: "og:title", content: "IndustryReady — Your Career Starts Before Graduation" },
      {
        property: "og:description",
        content:
          "Live workshops, real mentors, and a step-by-step playbook to make you industry-ready before graduation.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap",
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
      <MentoringTopics />
      <Pillars />
      <CtaFooter />
    </main>
  );
}
