import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useReservation } from "./ReservationContext";

type NavLink = {
  to?: string;
  label: string;
  badge?: string;
  subLinks?: { to: string; label: string }[];
};

const links: NavLink[] = [
  { to: "/", label: "Home" },
  {
    label: "Tracks",
    subLinks: [
      { to: "/workshops", label: "Workshops" },
      { to: "/webinars", label: "Webinars" },
    ],
  },
  { to: "/class-12-consult", label: "Class 12 Consultation", badge: "NEW" },
  { to: "/mentors", label: "Mentors" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useReservation();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-3 bg-white border-b border-slate-200 transition-[top] duration-200">
      <div className="flex w-full min-h-12 items-center justify-between gap-6">
        {/* Zone 1: Left - Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            className="group flex items-center gap-3 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
          >
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
            {links.map((l, i) =>
              l.subLinks ? (
                <div key={i} className="relative group flex items-center">
                  <button className="relative flex items-center gap-1.5 rounded-sm px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none cursor-pointer">
                    <span>{l.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-48 rounded-md bg-white border border-slate-200 p-2 shadow-md opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="flex flex-col gap-1">
                      {l.subLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block rounded-sm px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-900 transition-colors focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                l.to && (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="relative flex items-center gap-1.5 rounded-sm px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:bg-slate-50 data-[status=active]:bg-blue-900 data-[status=active]:text-white focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none group"
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="inline-flex shrink-0 items-center rounded-sm bg-blue-900 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white group-data-[status=active]:bg-white group-data-[status=active]:text-blue-900">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                )
              )
            )}
          </nav>
        </div>

        {/* Zone 3: Right - CTA & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="hidden md:block">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center bg-orange-800 text-white px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-md hover:bg-orange-700 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
            >
              Reserve Seat
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center bg-slate-100 text-ink md:hidden rounded-sm hover:bg-slate-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 p-4 shadow-md md:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((l, i) =>
              l.subLinks ? (
                <div key={i} className="flex flex-col gap-1 w-full mt-2 mb-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <div className="px-3 pb-1 text-xs font-bold text-blue-900 uppercase tracking-wider">
                    {l.label}
                  </div>
                  {l.subLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-sm px-4 py-2.5 text-sm font-bold text-ink hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
                    >
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                l.to && (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-sm px-4 py-3 text-sm font-bold text-ink hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="inline-flex items-center rounded-sm bg-blue-900 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                )
              )
            )}
            <button
              onClick={() => {
                setOpen(false);
                openModal();
              }}
              className="mt-2 w-full bg-orange-800 text-white px-5 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-md hover:bg-orange-700 transition-colors text-center flex justify-center items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none"
            >
              Reserve Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
