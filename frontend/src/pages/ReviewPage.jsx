import { useState } from "react";
import toast from "react-hot-toast";
import { GraduationCap } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import ProgressBar from "../components/ProgressBar";
import { PageShell } from "../layouts/AppShell";
import { demoDraft } from "../data/demoEssays";

export default function ReviewPage() {
  const [draft, setDraft] = useState(demoDraft);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function review() {
    setLoading(true);
    try {
      const response = await api.admissionsReview({ draft });
      setResult(response);
      toast.success("Admissions reader reaction ready.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="AI Mock Admissions Officer"
      title="Admissions Reader Reaction"
      description="A reader-style critique of what the essay reveals, what lingers, and what still needs deeper reflection."
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
            <GradientButton onClick={review} icon={GraduationCap} disabled={loading}>
              Get Admissions Feedback
            </GradientButton>
            {loading ? <LoadingState label="Reading like an admissions officer..." /> : null}
          </div>
          <p className="mt-5 rounded-lg border border-kairos-green/15 bg-kairos-green/5 p-4 text-sm leading-6 text-slate-700">
            Kairos & Key is a coaching tool. It helps students express their own
            experiences and ideas. It should not fabricate stories, invent
            achievements, or write dishonest essays.
          </p>
        </section>

        <section className="premium-surface rounded-lg p-6">
          {!result ? (
            <p className="text-sm leading-6 text-slate-600">
              Run a review to see the mock admissions reader's first impression and
              revision priorities.
            </p>
          ) : (
            <div className="space-y-5">
              <h2 className="text-2xl font-black text-slate-950">
                {result.card_title}
              </h2>
              <div className="rounded-lg bg-slate-950 p-5 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/50">
                  First impression
                </p>
                <p className="mt-2 text-lg font-semibold leading-8">
                  {result.first_impression}
                </p>
              </div>
              <ProgressBar
                label="Admissions-style score"
                value={result.admissions_style_score}
                color="from-kairos-purple to-kairos-green"
              />
              {[
                ["What the essay reveals", result.what_the_essay_reveals?.join(", ")],
                ["What is memorable", result.what_is_memorable],
                ["What feels generic", result.what_feels_generic],
                ["Needs deeper reflection", result.needs_deeper_reflection],
                ["Final reader reaction", result.final_reader_reaction],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white/70 p-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
