import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";

export function CtaFooter() {
  const { openModal } = useReservation();
  return (
    <>
      <section className="relative overflow-hidden border-t border-white/5 bg-background py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow/10 blur-[120px]" />

        <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Be ready <span className="text-gradient-yellow">before</span> the offer.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Join 1,000+ students training weekly for the careers they actually want.
            Limited seats per cohort.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton onClick={() => openModal()}>Reserve Your Seat</MagneticButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-surface">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-yellow text-yellow-foreground font-display font-extrabold">IR</span>
              <span className="font-display text-base font-bold text-white">
                Industry<span className="text-yellow">Ready</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-zinc-400">
              Making college students industry-ready since day one. Stop hoping. Start training.
            </p>
          </div>

          <div>
            <div className="eyebrow text-zinc-500">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tracks" className="text-zinc-300 hover:text-yellow">Tracks</Link></li>
              <li><Link to="/mentors" className="text-zinc-300 hover:text-yellow">Mentors</Link></li>
              <li><Link to="/about" className="text-zinc-300 hover:text-yellow">About</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-zinc-500">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:hello@industryready.in" className="text-zinc-300 hover:text-yellow">hello@industryready.in</a></li>
              <li className="text-zinc-500">Bengaluru · Online cohorts</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 px-4 py-5 text-center text-xs text-zinc-600 sm:px-6">
          © {new Date().getFullYear()} IndustryReady. All rights reserved.
        </div>
      </footer>
    </>
  );
}
