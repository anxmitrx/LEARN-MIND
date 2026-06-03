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
    <main className="min-h-screen bg-transparent text-slate-800">
      <Navbar />
      <section className="bg-transparent py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <span className="eyebrow text-ink">Our Mission</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.2] md:leading-[1.2] tracking-wide text-ink sm:text-6xl">
            A guided journey <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg box-decoration-slice">from campus</span> to corporate.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-slate-700 font-semibold">
            At Learn & Shine, we believe the transition from campus to corporate shouldn't be a leap of faith. It should be a guided journey. We built this platform because millions of students graduate with degrees, but very few are taught how to navigate the realities of the modern workplace. We provide the mentorship, the tools, and the calming reassurance you need to walk into your first job not just qualified, but truly ready.
          </p>
        </div>
      </section>

      <Pillars />
      <CtaFooter />
    </main>
  );
}
