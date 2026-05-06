import {
  BadgeCheck,
  BookOpenText,
  Fingerprint,
  Flame,
  GraduationCap,
  Lightbulb,
  Radar,
  Sparkles,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import GradientButton from "../components/GradientButton";
import ProgressBar from "../components/ProgressBar";
import ScoreCard from "../components/ScoreCard";
import { PageShell } from "../layouts/AppShell";
import { alignmentPreview } from "../data/demoUniversities";
import { demoStudent } from "../data/demoStudent";

const pieData = [
  { name: "Completed", value: demoStudent.essayProgress, color: "#7C3AED" },
  { name: "Remaining", value: 100 - demoStudent.essayProgress, color: "#E2E8F0" },
];

export default function Dashboard() {
  return (
    <PageShell
      eyebrow="Demo Student Dashboard"
      title={`Welcome back, ${demoStudent.name}`}
      description="A snapshot of story discovery, draft health, voice preservation, and admissions strategy."
      actions={<GradientButton to="/story-discovery">Continue Discovery</GradientButton>}
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="dark-glass rounded-lg p-6 text-white">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white/60">
                {demoStudent.grade} / {demoStudent.location}
              </p>
              <h2 className="mt-2 text-3xl font-black">{demoStudent.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {demoStudent.targetUniversities.map((school) => (
                  <span
                    key={school}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold"
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-3xl font-black">{demoStudent.essayProgress}%</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                  Essay progress
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-3xl font-black">
                  {demoStudent.storyDiscoveryCompletion}%
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                  Discovery
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4">
              <Fingerprint className="h-5 w-5 text-kairos-blue" aria-hidden="true" />
              <p className="mt-3 text-sm text-white/60">Voice fingerprint</p>
              <p className="text-lg font-black">{demoStudent.voiceFingerprintStatus}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <GraduationCap className="h-5 w-5 text-kairos-yellow" aria-hidden="true" />
              <p className="mt-3 text-sm text-white/60">University preview</p>
              <p className="text-lg font-black">Strong Stanford/Brown fit</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <Lightbulb className="h-5 w-5 text-kairos-green" aria-hidden="true" />
              <p className="mt-3 text-sm text-white/60">Next action</p>
              <p className="text-sm font-semibold leading-6">
                {demoStudent.recommendedNextAction}
              </p>
            </div>
          </div>
        </section>

        <section className="premium-surface rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-950">Essay arc</h2>
            <BadgeCheck className="h-5 w-5 text-kairos-green" aria-hidden="true" />
          </div>
          <div className="mt-5 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={68}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ProgressBar
            label="Story discovery completion"
            value={demoStudent.storyDiscoveryCompletion}
            color="from-kairos-pink to-kairos-yellow"
          />
        </section>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <ScoreCard
          title="Authenticity score"
          value={demoStudent.authenticityScore}
          icon={Sparkles}
          description="Specific, student-owned memories are carrying the draft."
          color="from-kairos-purple to-kairos-pink"
        />
        <ScoreCard
          title="Reflection score"
          value={demoStudent.reflectionScore}
          icon={BookOpenText}
          description="Promising insight; one deeper before-and-after would help."
          color="from-kairos-blue to-kairos-green"
        />
        <ScoreCard
          title="Cliche risk"
          value={demoStudent.clicheRisk}
          icon={Radar}
          inverse
          description="Low risk, but watch the ending for familiar language."
          color="from-kairos-yellow to-kairos-pink"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="premium-surface rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Flame className="h-5 w-5 text-kairos-pink" aria-hidden="true" />
            <h2 className="text-xl font-black text-slate-950">Recent story ideas</h2>
          </div>
          <div className="mt-5 space-y-3">
            {demoStudent.recentStoryIdeas.map((story) => (
              <div
                key={story.title}
                className="rounded-lg border border-slate-200 bg-white/70 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-slate-900">{story.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{story.theme}</p>
                  </div>
                  <span className="rounded-lg bg-kairos-green/10 px-3 py-2 text-sm font-black text-kairos-green">
                    {story.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-surface rounded-lg p-6">
          <h2 className="text-xl font-black text-slate-950">
            University alignment preview
          </h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alignmentPreview} layout="vertical" margin={{ left: 28 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="trait"
                  width={120}
                  tick={{ fill: "#475569", fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                  {alignmentPreview.map((entry, index) => (
                    <Cell
                      key={entry.trait}
                      fill={["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#FACC15"][index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
