import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";

export function CtaFooter() {
  const { openModal } = useReservation();
  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-yellow py-24 sm:py-32">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Be ready <span className="bg-ink px-2 text-yellow">before</span> <br /> the offer drops.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-ink/80">
            Join 1,000+ students training weekly for the careers they actually want.
            Limited seats per cohort.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton variant="ghost" size="lg" onClick={() => openModal()}>
              Reserve Your Seat
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-background">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center border-2 border-background bg-yellow font-display text-sm font-black text-ink">IR</span>
              <span className="font-display text-lg font-black text-background">
                Industry<span className="bg-yellow px-1 text-ink">Ready</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-zinc-400">
              Making college students industry-ready since day one. Stop hoping. Start training.
            </p>
          </div>

          <div>
            <div className="eyebrow text-yellow">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tracks" className="text-zinc-300 hover:text-yellow">Tracks</Link></li>
              <li><Link to="/mentors" className="text-zinc-300 hover:text-yellow">Mentors</Link></li>
              <li><Link to="/about" className="text-zinc-300 hover:text-yellow">About</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-yellow">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:hello@industryready.in" className="text-zinc-300 hover:text-yellow">hello@industryready.in</a></li>
              <li className="text-zinc-500">Bengaluru · Online cohorts</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 px-4 py-5 text-center text-xs text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} IndustryReady. All rights reserved.
        </div>
      </footer>
    </>
  );
}
