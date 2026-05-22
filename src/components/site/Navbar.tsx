import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useReservation } from "./ReservationContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/tracks", label: "Tracks" },
  { to: "/mentors", label: "Mentors" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useReservation();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        {/* Zone 1: Left - Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="group flex items-center gap-3 whitespace-nowrap">
            <img
              src="/assets/logo.png"
              alt="Learn & Shine Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Zone 2: Center - Nav Links */}
        <div className="hidden md:flex justify-center gap-8 items-center">
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-yellow data-[status=active]:bg-ink data-[status=active]:text-background"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Zone 3: Right - CTA & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:block">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center border-2 border-ink bg-yellow px-5 py-2.5 text-xs font-display font-extrabold uppercase tracking-wider text-ink shadow-brutal-sm transition-[box-shadow,transform] hover:shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Reserve Seat
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center border-2 border-ink bg-background text-ink md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-bold text-ink hover:bg-yellow"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); openModal(); }}
              className="mt-2 border-2 border-ink bg-yellow px-5 py-3 text-xs font-display font-extrabold uppercase tracking-wider text-ink shadow-brutal-sm"
            >
              Reserve Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
