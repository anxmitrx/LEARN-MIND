import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useReservation } from "./ReservationContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/tracks", label: "Tracks" },
  { to: "/class-12-consult", label: "Class 12 Consultation", badge: "NEW" },
  { to: "/mentors", label: "Mentors" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useReservation();

  return (
    <header className="fixed top-[calc(var(--banner-height,0px)+1.5rem)] left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full px-6 py-2 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(31,38,135,0.15)] transition-[top] duration-200">
      <div className="flex w-full min-h-12 items-center justify-between gap-6">
        {/* Zone 1: Left - Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="group flex items-center gap-3 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded-full">
            <img
              src="/assets/logo.png"
              alt="Learn & Shine Logo"
              className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Zone 2: Center - Nav Links */}
        <div className="hidden md:flex justify-center gap-6 items-center">
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold text-ink transition-all hover:bg-white/60 hover:shadow-sm data-[status=active]:bg-indigo-600 data-[status=active]:text-white focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              >
                <span>{l.label}</span>
                {l.badge && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-indigo-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white animate-pulse group-data-[status=active]:bg-white group-data-[status=active]:text-indigo-600">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Zone 3: Right - CTA & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="hidden md:block">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 text-xs font-display font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 border border-white/20 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              Reserve Seat
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center bg-white/20 backdrop-blur-md text-ink md:hidden rounded-full shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-[calc(100%+0.75rem)] left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-3xl shadow-[0_12px_40px_-6px_rgba(31,38,135,0.15)] md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-full px-4 py-3 text-sm font-bold text-ink hover:bg-white/60 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              >
                <span>{l.label}</span>
                {l.badge && (
                  <span className="inline-flex items-center rounded-full bg-indigo-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); openModal(); }}
              className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 text-xs font-display font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 border border-white/20 transition-transform duration-300 hover:scale-105 active:scale-95 text-center flex justify-center items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              Reserve Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
