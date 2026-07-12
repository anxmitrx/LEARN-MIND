import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, User, LogIn, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useReservation } from "./ReservationContext";
import { useAuth } from "@/lib/AuthContext";

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
  const [isDarkBg, setIsDarkBg] = useState(false);
  const { openModal } = useReservation();
  const { user, setShowLoginModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const darkSections = document.querySelectorAll(
        ".bg-slate-950, .bg-slate-900, .bg-indigo-950, .bg-indigo-900, .bg-ink, .bg-zinc-950, .bg-zinc-900, .bg-black",
      );
      let isDark = false;
      // The navbar is typically centered vertically around 40px-50px from the top
      const navCenterY = 50;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navCenterY && rect.bottom >= navCenterY) {
          isDark = true;
        }
      });

      setIsDarkBg(isDark);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-[calc(var(--banner-height,0px)+1.5rem)] left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full bg-white/20 backdrop-blur-lg border ${isDarkBg ? "border-white/20 shadow-[0_4px_30px_rgba(255,255,255,0.05)]" : "border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"} transition-all duration-300`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 lg:gap-8">
        {/* Left: Logo */}
        <div className="flex justify-start items-center shrink-0">
          <Link
            to="/"
            className="focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-md"
          >
            <img
              src="/assets/logo.png"
              alt="Learn & Shine Logo"
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 ${isDarkBg ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : ""}`}
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden xl:flex flex-1 justify-center">
          <nav className="flex items-center gap-1 lg:gap-6">
            {links.map((l, i) =>
              l.subLinks ? (
                <div key={i} className="relative group flex items-center h-full">
                  <button
                    className={`flex items-center gap-1.5 py-2 text-[15px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none cursor-pointer ${isDarkBg ? "text-white hover:text-indigo-300" : "text-slate-700 hover:text-blue-600"}`}
                  >
                    <span>{l.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white border border-slate-200 p-2 shadow-lg opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 rounded-xl mt-2">
                    <div className="flex flex-col">
                      {l.subLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
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
                    className={`relative flex items-center gap-1.5 py-2 text-[15px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none whitespace-nowrap ${isDarkBg ? "text-white hover:text-indigo-300 data-[status=active]:text-indigo-300" : "text-slate-700 hover:text-blue-600 data-[status=active]:text-blue-600"}`}
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-[#f39c12] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white ml-1">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                )
              ),
            )}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center gap-3 shrink-0">
          {/* Reserve Seat */}
          <button
            onClick={() => openModal()}
            className={`hidden md:flex items-center text-[15px] font-bold transition-colors cursor-pointer mr-2 ${isDarkBg ? "text-indigo-300 hover:text-indigo-100" : "text-blue-600 hover:text-blue-800"}`}
          >
            Reserve Seat
          </button>

          {/* Login / Dashboard */}
          {!user ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 text-sm font-bold rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          ) : (
            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 text-sm font-bold rounded-full transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">My Dashboard</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`grid h-10 w-10 place-items-center xl:hidden rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none transition-colors ${isDarkBg ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700"}`}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {open && (
        <div className="xl:hidden border-t border-slate-200 bg-white absolute top-full left-0 right-0 shadow-lg">
          <nav className="flex flex-col px-4 py-3 max-h-[80vh] overflow-y-auto">
            {links.map((l, i) =>
              l.subLinks ? (
                <div key={i} className="flex flex-col py-2 border-b border-slate-100 last:border-0">
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {l.label}
                  </div>
                  {l.subLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[15px] font-semibold text-slate-800 hover:text-blue-600"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                l.to && (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 text-[15px] font-semibold text-slate-800 hover:text-blue-600"
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="rounded-full bg-[#f39c12] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                )
              ),
            )}
            <button
              onClick={() => {
                setOpen(false);
                openModal();
              }}
              className="mt-4 w-full bg-blue-600 text-white px-5 py-3 text-sm font-bold rounded-full text-center"
            >
              Reserve Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
