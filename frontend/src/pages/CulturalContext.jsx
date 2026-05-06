import { useState } from "react";
import toast from "react-hot-toast";
import { HeartHandshake } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";

const questions = [
  "What do you want to say that you feel afraid to say?",
  "Which achievement feels like yours?",
  "Which achievement feels like someone else's expectation?",
  "What part of your story feels most honest?",
];

export default function CulturalContext() {
  const [answers, setAnswers] = useState({
    [questions[0]]:
      "I want to admit that the project I loved most was small, not the competition my parents talk about.",
    [questions[1]]: "",
    [questions[2]]: "",
    [questions[3]]: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateAnswer(question, value) {
    setAnswers((current) => ({ ...current, [question]: value }));
  }

  async function reflect() {
    setLoading(true);
    try {
      const response = await api.culturalContext({ metadata: { answers } });
      setResult(response);
      toast.success("Reflection map created.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Parent Pressure / Cultural Context Mode"
      title="Separate authentic ambition from inherited pressure"
      description="A sensitive coaching space for students whose essays are shaped by family expectations, cultural context, prestige pressure, or fear of disappointing others."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-4">
          {questions.map((question) => (
            <label
              key={question}
              className="premium-surface block rounded-lg p-5 text-sm font-semibold text-slate-800"
            >
              {question}
              <textarea
                className="focus-ring mt-3 min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 shadow-inner"
                value={answers[question]}
                onChange={(event) => updateAnswer(question, event.target.value)}
              />
            </label>
          ))}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={reflect} icon={HeartHandshake} disabled={loading}>
              Reflect Gently
            </GradientButton>
            {loading ? <LoadingState label="Separating values from expectations..." /> : null}
          </div>
        </section>
        <InsightPanel
          title="Authentic context map"
          result={result}
          emptyText="The output will identify student values, external expectations, honest essay topics, and gentle prompts."
        />
      </div>
    </PageShell>
  );
}
