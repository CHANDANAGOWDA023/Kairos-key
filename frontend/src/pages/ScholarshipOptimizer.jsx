import { useState } from "react";
import toast from "react-hot-toast";
import { Compass } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";

export default function ScholarshipOptimizer() {
  const [draft, setDraft] = useState(
    "At home, responsibility often looks like translation: forms, bills, school emails, and the quiet work of making systems legible. A scholarship would give me more time to continue tutoring younger students and building tools for families like mine.",
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function review() {
    setLoading(true);
    try {
      const response = await api.scholarshipReview({ draft });
      setResult(response);
      toast.success("Scholarship review ready.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Scholarship Essay Optimizer"
      title="Balance financial context, leadership, impact, goals, responsibility, and resilience"
      description="Scholarship essays should be specific and dignified: honest about context, clear about contribution, and grounded in future purpose."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="premium-surface rounded-lg p-6">
          <label className="block text-sm font-semibold text-slate-800">
            Scholarship draft
            <textarea
              className="focus-ring mt-3 min-h-72 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={review} icon={Compass} disabled={loading}>
              Optimize Scholarship Essay
            </GradientButton>
            {loading ? <LoadingState label="Reviewing scholarship fit..." /> : null}
          </div>
        </section>
        <InsightPanel
          title="Scholarship review"
          result={result}
          emptyText="Review will address financial context, leadership, community impact, future goals, responsibility, resilience, and revision steps."
        />
      </div>
    </PageShell>
  );
}
