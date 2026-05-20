const steps = [
  { n: "01", t: "Pick your track", d: "Choose from 5 mentoring tracks aligned to your stream and career stage." },
  { n: "02", t: "Learn live, with mentors", d: "Attend workshops & webinars led by working professionals — not theorists." },
  { n: "03", t: "Practice, then ship", d: "Resume reviews, mock interviews, simulations and 1:1 mentor follow-ups." },
  { n: "04", t: "Walk in ready", d: "Internships, industry visits and offers — you arrive thinking like a professional." },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              How it Works
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              From confused to <span className="text-gradient">career-ready</span> — in four steps.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            We don't drop content on you. We walk with you — through every workshop,
            every doubt and every interview prep call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="font-display text-5xl font-bold text-gradient">{s.n}</div>
              <div className="mt-4 font-display text-lg font-semibold text-card-foreground">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
