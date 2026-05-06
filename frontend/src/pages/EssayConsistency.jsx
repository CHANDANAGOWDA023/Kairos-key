import { useState } from "react";
import toast from "react-hot-toast";
import { Puzzle } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";
import { consistencyEssays } from "../data/demoEssays";

export default function EssayConsistency() {
  const [essays, setEssays] = useState(consistencyEssays);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateEssay(label, value) {
    setEssays((current) => ({ ...current, [label]: value }));
  }

  async function check() {
    setLoading(true);
    try {
      const response = await api.essayConsistency({ essays });
      setResult(response);
      toast.success("Essay portfolio checked.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Multi-Essay Consistency Checker"
      title="Make every essay reveal a different facet of the same person"
      description="Check repeated stories, inconsistent personality signals, missing values, achievement overload, and emotional variety."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_0.82fr]">
        <section className="grid gap-4">
          {Object.entries(essays).map(([label, value]) => (
            <label
              key={label}
              className="premium-surface block rounded-lg p-5 text-sm font-semibold text-slate-800"
            >
              {label}
              <textarea
                className="focus-ring mt-3 min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
                value={value}
                onChange={(event) => updateEssay(label, event.target.value)}
              />
            </label>
          ))}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={check} icon={Puzzle} disabled={loading}>
              Check Consistency
            </GradientButton>
            {loading ? <LoadingState label="Comparing essay portfolio..." /> : null}
          </div>
        </section>
        <InsightPanel
          title="Portfolio strategy"
          result={result}
          emptyText="Run the check to get role assignments across essays and warnings about repetition or missing values."
        />
      </div>
    </PageShell>
  );
}
