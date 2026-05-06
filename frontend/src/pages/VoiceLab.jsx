import { useState } from "react";
import toast from "react-hot-toast";
import { Fingerprint } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import ProgressBar from "../components/ProgressBar";
import { PageShell } from "../layouts/AppShell";

const sampleLabels = [
  "Journal entry",
  "School essay",
  "Casual paragraph",
  "Text-message style sample",
];

export default function VoiceLab() {
  const [samples, setSamples] = useState({
    "Journal entry":
      "I keep thinking about how patient my grandmother gets when dough is involved, but how impatient she becomes with apps.",
    "School essay":
      "The experiment failed because the conditions were not controlled, but the failed trial clarified the real variable.",
    "Casual paragraph":
      "Honestly, I like problems more when they are a little annoying. Then I have an excuse to keep poking at them.",
    "Text-message style sample":
      "wait this is actually kind of funny because the phone was NOT the problem, the tiny arrow button was",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateSample(label, value) {
    setSamples((current) => ({ ...current, [label]: value }));
  }

  async function analyze() {
    setLoading(true);
    try {
      const response = await api.voiceFingerprint({ samples });
      setResult(response);
      toast.success("Voice fingerprint created.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Voice Fingerprint Lab"
      title="Protect the student's natural writing rhythm"
      description="Paste real samples to detect tone, vocabulary, sentence rhythm, formality, and over-polishing risk."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.88fr]">
        <section className="grid gap-4">
          {sampleLabels.map((label) => (
            <label
              key={label}
              className="premium-surface block rounded-lg p-5 text-sm font-semibold text-slate-800"
            >
              {label}
              <textarea
                className="focus-ring mt-3 min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
                value={samples[label]}
                onChange={(event) => updateSample(label, event.target.value)}
              />
            </label>
          ))}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={analyze} icon={Fingerprint} disabled={loading}>
              Analyze Voice Fingerprint
            </GradientButton>
            {loading ? <LoadingState label="Listening for natural rhythm..." /> : null}
          </div>
        </section>

        <aside className="premium-surface rounded-lg p-6">
          <h2 className="text-xl font-black text-slate-950">Voice Fingerprint Card</h2>
          {!result ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Analyze samples to generate voice notes and polishing risks.
            </p>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-500">Natural tone</p>
                <p className="mt-1 text-base font-semibold leading-7 text-slate-900">
                  {result.natural_tone}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
                  <p className="font-bold text-slate-900">Vocabulary level</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {result.vocabulary_level}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
                  <p className="font-bold text-slate-900">Sentence rhythm</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {result.sentence_rhythm}
                  </p>
                </div>
              </div>
              <ProgressBar
                label="Formality score"
                value={result.formality_score}
                color="from-kairos-blue to-kairos-purple"
              />
              <div className="rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
                <span className="font-black">Risk: </span>
                {result.risk}
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
                  Authenticity notes
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {result.authenticity_notes?.map((note) => (
                    <li key={note} className="rounded-lg bg-white/70 p-3">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
