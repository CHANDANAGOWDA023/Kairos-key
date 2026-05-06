import { useState } from "react";
import toast from "react-hot-toast";
import { FileText } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import ProgressBar from "../components/ProgressBar";
import { PageShell } from "../layouts/AppShell";
import { demoDraft } from "../data/demoEssays";

export default function FinalReview() {
  const [draft, setDraft] = useState(demoDraft);
  const [analysis, setAnalysis] = useState(null);
  const [reader, setReader] = useState(null);
  const [alignment, setAlignment] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runFinalReview() {
    setLoading(true);
    try {
      const [draftResult, reviewResult, alignResult] = await Promise.all([
        api.analyzeDraft({ draft }),
        api.admissionsReview({ draft }),
        api.universityAlignment({ universities: ["Stanford", "MIT", "Brown", "Yale"] }),
      ]);
      setAnalysis(draftResult);
      setReader(reviewResult);
      setAlignment(alignResult);
      toast.success("Final review complete.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Final Essay Review Page"
      title="Pull strengths, risks, reader reaction, alignment, and next revision steps into one view"
      description="A polished final review dashboard for the demo flow after the student has drafted and run individual checks."
      actions={analysis ? <MockBadge mode={analysis.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="premium-surface rounded-lg p-6">
          <label className="block text-sm font-semibold text-slate-800">
            Full essay draft
            <textarea
              className="focus-ring mt-3 min-h-96 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={runFinalReview} icon={FileText} disabled={loading}>
              Run Final Review
            </GradientButton>
            {loading ? <LoadingState label="Combining final review signals..." /> : null}
          </div>
          <p className="mt-5 rounded-lg border border-kairos-green/15 bg-kairos-green/5 p-4 text-sm leading-6 text-slate-700">
            Kairos & Key is a coaching tool. It helps students express their own
            experiences and ideas. It should not fabricate stories, invent
            achievements, or write dishonest essays.
          </p>
        </section>

        <section className="space-y-5">
          <article className="premium-surface rounded-lg p-6">
            <h2 className="text-xl font-black text-slate-950">Strengths and weaknesses</h2>
            {!analysis ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Run the final review to populate this dashboard.
              </p>
            ) : (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                  <p className="font-black">Strengths</p>
                  <p className="mt-2">{analysis.strengths?.join(", ")}</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  <p className="font-black">Suggested improvements</p>
                  <p className="mt-2">{analysis.improvements?.join(", ")}</p>
                </div>
              </div>
            )}
          </article>

          {analysis ? (
            <article className="premium-surface rounded-lg p-6">
              <h2 className="text-xl font-black text-slate-950">Authenticity score</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {Object.entries(analysis.scores).map(([name, value]) => (
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
            </article>
          ) : null}

          {reader ? (
            <article className="dark-glass rounded-lg p-6 text-white">
              <h2 className="text-xl font-black">Admissions officer reaction</h2>
              <p className="mt-4 text-lg font-semibold leading-8 text-white/86">
                {reader.final_reader_reaction}
              </p>
              <div className="mt-5 rounded-lg bg-white/10 p-4">
                <p className="text-sm font-bold text-white/56">Needs deeper reflection</p>
                <p className="mt-1 text-sm leading-6">{reader.needs_deeper_reflection}</p>
              </div>
            </article>
          ) : null}

          {alignment ? (
            <article className="premium-surface rounded-lg p-6">
              <h2 className="text-xl font-black text-slate-950">University alignment</h2>
              <div className="mt-4 grid gap-3">
                {alignment.results?.map((item) => (
                  <div key={item.university} className="rounded-lg border border-slate-200 bg-white/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-slate-950">{item.university}</p>
                      <span className="rounded-lg bg-kairos-purple/10 px-3 py-1 text-sm font-black text-kairos-purple">
                        {item.alignment_score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.suggested_framing}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-amber-800">
                {alignment.disclaimer}
              </p>
            </article>
          ) : null}

          {analysis ? (
            <article className="premium-surface rounded-lg p-6">
              <h2 className="text-xl font-black text-slate-950">Next revision steps</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                <li>Add one exact sensory detail to the turning point.</li>
                <li>Replace the most abstract reflection sentence with a before-and-after thought.</li>
                <li>Read the ending aloud and remove language that does not sound like Maya.</li>
              </ol>
            </article>
          ) : null}
        </section>
      </div>
    </PageShell>
  );
}
