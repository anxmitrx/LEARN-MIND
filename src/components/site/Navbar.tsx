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
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-yellow font-display text-sm font-black text-ink shadow-brutal-sm">
            IR
          </span>
          <span className="font-display text-base font-black tracking-tight text-ink">
            Industry<span className="bg-yellow px-1">Ready</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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
