import { useState } from "react";
import toast from "react-hot-toast";
import { WandSparkles } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";

export default function ShowDontTell() {
  const [sentence, setSentence] = useState("I am hardworking.");
  const [rewrite, setRewrite] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function transform() {
    setLoading(true);
    try {
      const response = await api.showDontTell({ text: sentence });
      setResult(response);
      setRewrite(response.stronger_example || "");
      toast.success("Scene-based rewrite coaching ready.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Show, Don't Tell Transformer"
      title="Replace claims with scenes the reader can believe"
      description="Students learn how to prove qualities through truthful details rather than self-labeling."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="premium-surface rounded-lg p-6">
          <label className="block text-sm font-semibold text-slate-800">
            Weak sentence
            <textarea
              className="focus-ring mt-3 min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={sentence}
              onChange={(event) => setSentence(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={transform} icon={WandSparkles} disabled={loading}>
              Transform
            </GradientButton>
            {loading ? <LoadingState label="Finding scene evidence..." /> : null}
          </div>

          <label className="mt-6 block text-sm font-semibold text-slate-800">
            Student rewrite box
            <textarea
              className="focus-ring mt-3 min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={rewrite}
              onChange={(event) => setRewrite(event.target.value)}
              placeholder="Rewrite in the student's own voice..."
            />
          </label>
        </section>

        <InsightPanel
          title="Transformer coaching"
          result={result}
          emptyText="The analysis will explain why the claim is weak, ask sensory questions, and offer a stronger example."
        />
      </div>
    </PageShell>
  );
}
