import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export function EthicalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/85 px-4 py-6 text-center text-sm leading-6 text-slate-600">
      Kairos & Key is a coaching tool. It helps students express their own
      experiences and ideas. It should not fabricate stories, invent achievements,
      or write dishonest essays.
    </footer>
  );
}

export function PageShell({ eyebrow, title, description, children, actions }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-black uppercase tracking-[0.22em] text-kairos-purple">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </motion.div>
  );
}

export default function AppShell({ children, withSidebar = true }) {
  return (
    <div className="min-h-screen mesh-light">
      <Navbar />
      {withSidebar ? (
        <div className="flex min-h-[calc(100vh-73px)]">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
      <EthicalFooter />
    </div>
  );
}
