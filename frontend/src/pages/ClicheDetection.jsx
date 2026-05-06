import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, Radar } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import ProgressBar from "../components/ProgressBar";
import { PageShell } from "../layouts/AppShell";

export default function ClicheDetection() {
  const [text, setText] = useState(
    "Ever since I was young, I have always wanted to help people. Through hard work and determination, I learned to never give up.",
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function detect() {
    setLoading(true);
    try {
      const response = await api.clicheDetect({ text });
      setResult(response);
      toast.success("Cliche scan complete.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Cliche Detection System"
      title="Catch generic writing before it hardens into the draft"
      description="The scan looks for overused openings, resume-like tone, false inspiration, and AI-sounding language."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="premium-surface rounded-lg p-6">
          <label className="block text-sm font-semibold text-slate-800">
            Essay idea or paragraph
            <textarea
              className="focus-ring mt-3 min-h-56 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={detect} icon={Radar} disabled={loading}>
              Scan for Cliches
            </GradientButton>
            {loading ? <LoadingState label="Scanning for generic patterns..." /> : null}
          </div>
          {result ? (
            <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                <p className="font-black">Cliche risk score</p>
              </div>
              <ProgressBar
                value={result.cliche_risk_score}
                color="from-kairos-yellow to-kairos-pink"
              />
            </div>
          ) : null}
        </section>
        <InsightPanel
          title="Personalization plan"
          result={result}
          emptyText="The scan will highlight issues, explain why they weaken the draft, and suggest pivots."
        />
      </div>
    </PageShell>
  );
}
