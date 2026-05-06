import { useState } from "react";
import toast from "react-hot-toast";
import { KeyRound, SearchCheck } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";

export default function HiddenStoryDetector() {
  const [memory, setMemory] = useState("I helped my grandmother learn WhatsApp.");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!memory.trim()) {
      toast.error("Enter an ordinary memory first.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.hiddenStory({ memory });
      setResult(response);
      toast.success("Hidden meaning detected.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Hidden Story Detector"
      title="Turn an ordinary memory into a meaningful essay possibility"
      description="The goal is not to inflate a small moment. It is to see what true values are already hiding inside it."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="premium-surface rounded-lg p-6">
          <div className="rounded-lg bg-gradient-to-r from-kairos-pink/12 via-kairos-yellow/20 to-kairos-green/12 p-5">
            <KeyRound className="h-8 w-8 text-kairos-pink" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              What memory still has a pulse?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Try something that seems too small for an essay. Small memories often
              hold the most believable evidence of character.
            </p>
          </div>
          <label className="mt-5 block text-sm font-semibold text-slate-800">
            Ordinary memory
            <textarea
              className="focus-ring mt-3 min-h-44 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 text-slate-800 shadow-inner"
              value={memory}
              onChange={(event) => setMemory(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={analyze} icon={SearchCheck} disabled={loading}>
              Reveal Hidden Meaning
            </GradientButton>
            {loading ? <LoadingState label="Looking for values inside the scene..." /> : null}
          </div>
        </section>

        <InsightPanel
          title="Why this story matters"
          result={result}
          emptyText="Run the detector to see meaning, essay angles, revealed traits, specificity advice, and a hook idea."
        />
      </div>
    </PageShell>
  );
}
