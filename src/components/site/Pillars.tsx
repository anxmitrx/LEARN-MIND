import { Briefcase, Users, Sparkles, Plane } from "lucide-react";

const pillars = [
  {
    icon: Briefcase,
    title: "Business Simulations & Real Case Studies",
    desc: "Practice with industry-specific simulations — make decisions like a working professional, fail safely, learn fast.",
    tone: "bg-primary-gradient text-primary-foreground",
  },
  {
    icon: Users,
    title: "Industry Leaders, In-Person",
    desc: "With your institution's permission, we bring senior leaders into live sessions so you hear it from the source.",
    tone: "bg-navy text-navy-foreground",
  },
  {
    icon: Sparkles,
    title: "Professionalism Meets Spiritualism",
    desc: "Inner Engineering & Inner Management principles woven into career growth — calm, grounded, focused work.",
    tone: "bg-amber-gradient text-amber-foreground",
  },
  {
    icon: Plane,
    title: "Internships & Industry Visits",
    desc: "We help students secure internships and arrange industry visits so theory meets the shop floor early.",
    tone: "bg-card text-card-foreground border border-border",
  },
];

export function Pillars() {
  return (
    <section id="programs" className="relative bg-secondary/60 py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-foreground">
            Beyond Workshops
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Four pillars that make us <span className="text-gradient">different.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className={`relative overflow-hidden rounded-2xl p-8 shadow-card transition-transform hover:-translate-y-1 ${p.tone}`}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
