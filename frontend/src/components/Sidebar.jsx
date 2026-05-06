import {
  AudioLines,
  BadgeAlert,
  Brain,
  Building2,
  Compass,
  FileCheck2,
  FileText,
  Fingerprint,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  Map,
  MessageSquareText,
  PenLine,
  Puzzle,
  Radar,
  Route,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sections = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Story Discovery", to: "/story-discovery", icon: MessageSquareText },
  { label: "Hidden Story", to: "/hidden-story", icon: Sparkles },
  { label: "Timeline", to: "/timeline", icon: Route },
  { label: "Thread Map", to: "/thematic-threading", icon: Map },
  { label: "Essay Builder", to: "/essay-builder", icon: PenLine },
  { label: "Show, Don't Tell", to: "/show-dont-tell", icon: WandSparkles },
  { label: "Cliche Detection", to: "/cliche-detect", icon: Radar },
  { label: "Voice Lab", to: "/voice-lab", icon: Fingerprint },
  { label: "Authenticity Score", to: "/authenticity-score", icon: FileCheck2 },
  { label: "Review", to: "/review", icon: GraduationCap },
  { label: "University Match", to: "/university-match", icon: Building2 },
  { label: "Essay Consistency", to: "/essay-consistency", icon: Puzzle },
  { label: "Cultural Context", to: "/cultural-context", icon: HeartHandshake },
  { label: "Scholarships", to: "/scholarship", icon: Compass },
  { label: "Artifact & Audio", to: "/artifact-audio", icon: AudioLines },
  { label: "Brainstorming Game", to: "/brainstorming-game", icon: Brain },
  { label: "What Not To Write", to: "/what-not-to-write", icon: BadgeAlert },
  { label: "Final Review", to: "/final-review", icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200/70 bg-white/75 px-4 py-6 backdrop-blur-xl lg:block">
      <div className="sticky top-24">
        <p className="px-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Coaching Studio
        </p>
        <div className="mt-4 grid gap-1">
          {sections.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-soft"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-kairos-purple/15 bg-kairos-purple/5 p-4">
          <p className="text-sm font-black text-slate-900">Ethical AI mode</p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Coaches stories, preserves voice, and keeps student experience truthful.
          </p>
        </div>
      </div>
    </aside>
  );
}
