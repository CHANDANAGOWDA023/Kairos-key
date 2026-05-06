import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import GradientButton from "./GradientButton";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Story Discovery", to: "/story-discovery" },
  { label: "Timeline", to: "/timeline" },
  { label: "Essay Builder", to: "/essay-builder" },
  { label: "Voice Lab", to: "/voice-lab" },
  { label: "Review", to: "/review" },
  { label: "University Match", to: "/university-match" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-soft">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black tracking-tight text-slate-950">
              Kairos & Key
            </span>
            <span className="block text-xs font-semibold text-slate-500">
              Story coaching demo
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <GradientButton to="/story-discovery" className="min-h-10 px-4 py-2">
            Start
          </GradientButton>
        </div>

        <button
          type="button"
          className="focus-ring rounded-lg border border-slate-200 bg-white p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-soft lg:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold ${
                    isActive ? "bg-slate-950 text-white" : "text-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
