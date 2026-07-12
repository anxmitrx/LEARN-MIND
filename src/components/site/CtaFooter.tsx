import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { useReservation } from "./ReservationContext";
import { AdminLoginModal } from "./AdminLoginModal";

export function CtaFooter() {
  const { openModal } = useReservation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <>
      <section className="relative overflow-hidden bg-white/40 backdrop-blur-xl border-y border-white/60 py-24 sm:py-32">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl font-bold leading-[1.15] md:leading-tight tracking-wide text-ink sm:text-7xl">
            Be ready <span className="bg-indigo-600 px-4 py-1 text-white rounded-full">before</span>{" "}
            <br /> the offer drops.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-bold text-slate-700">
            Join 1,000+ students training weekly for the careers they actually want. Limited seats
            per cohort.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton variant="ghost" size="lg" onClick={() => openModal()}>
              Reserve Your Seat
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="bg-white/20 backdrop-blur-xl border-t border-white/40 text-slate-800">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded-xl"
            >
              <img src="/assets/logo.png" alt="Learn & Shine Logo" className="h-8 w-auto md:h-10" />
            </Link>
            <p className="mt-5 max-w-sm text-sm text-slate-600 font-semibold">
              Making college students industry-ready since day one. Stop hoping. Start training.
            </p>
          </div>

          <div>
            <div className="eyebrow text-indigo-600">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/workshops"
                  className="text-slate-700 hover:text-indigo-600 font-semibold focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/mentors"
                  className="text-slate-700 hover:text-indigo-600 font-semibold focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
                >
                  Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-700 hover:text-indigo-600 font-semibold focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-indigo-600">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@learnandshine.in"
                  className="text-slate-700 hover:text-indigo-600 font-semibold focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
                >
                  hello@learnandshine.in
                </a>
              </li>
              <li className="text-slate-500 font-semibold">Bengaluru · Online cohorts</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/40 px-4 py-5 text-center text-xs text-slate-500 sm:px-6 font-bold flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Learn & Shine. All rights reserved.</span>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="text-xs text-slate-400 hover:text-indigo-650 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded px-1"
          >
            Admin Panel
          </button>
        </div>
      </footer>

      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
