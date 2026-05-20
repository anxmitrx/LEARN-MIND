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
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-yellow text-yellow-foreground font-display font-extrabold">
            IR
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white">
            Industry<span className="text-yellow">Ready</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-yellow data-[status=active]:text-yellow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center rounded-full bg-yellow px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-yellow-foreground transition-transform hover:scale-105 glow-yellow"
          >
            Reserve Seat
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-surface md:hidden">
          <nav className="flex flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-yellow"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); openModal(); }}
              className="mt-2 rounded-full bg-yellow px-5 py-3 text-xs font-bold uppercase tracking-wider text-yellow-foreground"
            >
              Reserve Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
