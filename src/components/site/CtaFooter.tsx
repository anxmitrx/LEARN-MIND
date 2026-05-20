import { ArrowRight, Mail } from "lucide-react";

export function CtaFooter() {
  return (
    <section id="cta" className="relative overflow-hidden bg-hero-gradient py-20 text-navy-foreground">
      <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />

      <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Stop hoping you'll figure it out. <br />
          <span className="text-gradient">Start training for the job you want.</span>
        </h2>
        <p className="mt-5 text-lg text-white/70">
          Join the next batch of workshops and step into your career with a real mentor in your corner.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              type="email"
              required
              placeholder="your.email@college.edu"
              className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Reserve my seat
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
        <p className="mt-3 text-xs text-white/50">Free webinar previews. No spam. Unsubscribe anytime.</p>
      </div>

      <footer className="relative mt-20 border-t border-white/10">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-gradient text-xs font-bold text-primary-foreground">IR</span>
            IndustryReady © {new Date().getFullYear()}
          </div>
          <div className="text-xs text-white/50">Your career starts before graduation.</div>
        </div>
      </footer>
    </section>
  );
}
