import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Pillars } from "@/components/site/Pillars";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Learn & Shine" },
      { name: "description", content: "Learn & Shine is a career readiness platform making Indian college students industry-ready since day one." },
      { property: "og:title", content: "About — Learn & Shine" },
      { property: "og:description", content: "The mission, the method, and why we exist." },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="border-b-2 border-ink bg-background py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <span className="eyebrow text-ink">Our Mission</span>
          <h1 className="mt-4 font-display text-5xl font-black leading-[1.2] md:leading-[1.2] tracking-tight text-ink sm:text-6xl">
            We make students <span className="bg-yellow px-2 box-decoration-slice">job-ready</span> — not just qualified.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-zinc-600">
            Indian colleges produce millions of degree-holders every year. The industry hires very few of them
            ready to contribute from day one. Learn & Shine bridges that gap with structured mentoring tracks,
            live workshops from working professionals, and the practical playbook your campus placement cell
            simply can't deliver.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            We're not a course platform. We're a training ground. By the time you graduate, you should already
            be thinking, behaving, and operating like a two-year professional.
          </p>
        </div>
      </section>

      <Pillars />
      <CtaFooter />
    </main>
  );
}
