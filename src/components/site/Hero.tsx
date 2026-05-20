import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-navy-foreground">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber/20 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber" />
              Making college students industry-ready since day one
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Your career starts <br />
              <span className="text-gradient">before graduation.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              Real-world mentors, live workshops, and the playbook your college never taught you —
              built for Indian students who want to walk into their first job already thinking like a professional.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#mentoring"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary-gradient px-6 py-3 text-base font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                Explore Mentoring Topics
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                <PlayCircle className="h-4 w-4" />
                See how it works
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { k: "30+", v: "Mentoring topics" },
                { k: "1:1", v: "Mentor access" },
                { k: "100%", v: "India-context" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-bold text-white">{s.k}</div>
                  <div className="text-xs text-white/60">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative hidden lg:block">
            <div className="animate-float-slow rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-elegant">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber px-2.5 py-1 text-xs font-semibold text-amber-foreground">LIVE</span>
                <span className="text-xs text-white/60">Mon · 7:00 PM IST</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                Negotiating Your First Salary — Without Sounding Pushy
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Live workshop with an MNC hiring manager. Real scripts, real numbers, real Indian context.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-primary", "bg-amber", "bg-emerald"].map((c, i) => (
                    <div key={i} className={`h-8 w-8 rounded-full border-2 border-navy ${c}`} />
                  ))}
                </div>
                <span className="text-xs text-white/60">+412 students registered</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/10 bg-navy/80 p-4 backdrop-blur-xl shadow-elegant lg:block">
              <div className="text-xs uppercase tracking-wider text-amber">Outcome</div>
              <div className="mt-1 font-display text-lg font-semibold text-white">Hired at Infosys</div>
              <div className="text-xs text-white/60">— Arjun, B.Tech, 3 weeks after workshop</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
