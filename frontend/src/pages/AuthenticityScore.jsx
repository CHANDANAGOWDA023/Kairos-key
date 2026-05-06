import { useState } from "react";
import toast from "react-hot-toast";
import { FileCheck2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import ProgressBar from "../components/ProgressBar";
import { PageShell } from "../layouts/AppShell";
import { demoDraft } from "../data/demoEssays";

export default function AuthenticityScore() {
  const [draft, setDraft] = useState(demoDraft);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const response = await api.analyzeDraft({ draft });
      setResult(response);
      toast.success("Draft scores updated.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const chartData = result?.scores
    ? Object.entries(result.scores).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <PageShell
      eyebrow="Essay Authenticity Score"
      title="Score the draft without reducing the student to a number"
      description="Use the scores as revision signals: authenticity, depth, specificity, reflection, memorability, cliche risk, and AI-sounding risk."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="premium-surface rounded-lg p-6">
          <label className="block text-sm font-semibold text-slate-800">
            Essay draft
            <textarea
              className="focus-ring mt-3 min-h-72 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={analyze} icon={FileCheck2} disabled={loading}>
              Analyze Draft
            </GradientButton>
            {loading ? <LoadingState label="Scoring draft qualities..." /> : null}
          </div>
        </section>

        <section className="premium-surface rounded-lg p-6">
          <h2 className="text-xl font-black text-slate-950">Scoring dashboard</h2>
          {!result ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Scores and revision notes will appear here.
            </p>
          ) : (
            <>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={70} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#FACC15", "#7C3AED", "#EC4899"][index]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {Object.entries(result.scores).map(([name, value]) => (
                  <ProgressBar
                    key={name}
                    label={name}
                    value={value}
                    color={
                      name.includes("risk") || name.includes("Risk")
                        ? "from-kairos-yellow to-kairos-pink"
                        : "from-kairos-purple to-kairos-blue"
                    }
                  />
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                  <p className="font-black">Strengths</p>
                  <p className="mt-2">{result.strengths?.join(", ")}</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  <p className="font-black">Improvements</p>
                  <p className="mt-2">{result.improvements?.join(", ")}</p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </PageShell>
  );
}
