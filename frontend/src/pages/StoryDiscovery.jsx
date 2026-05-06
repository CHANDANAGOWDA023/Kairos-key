import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SendHorizontal, Sparkles } from "lucide-react";

import { api } from "../api/client";
import ChatBubble from "../components/ChatBubble";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";
import { reflectiveQuestions } from "../data/demoPrompts";

export default function StoryDiscovery() {
  const [answer, setAnswer] = useState(
    "I helped my grandmother learn WhatsApp, and I remember realizing that I was not just teaching a phone. I was translating something that made her feel embarrassed into something she could control.",
  );
  const [messages, setMessages] = useState([
    { role: "ai", text: reflectiveQuestions[0] },
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const nextQuestion = useMemo(
    () => reflectiveQuestions[messages.length % reflectiveQuestions.length],
    [messages.length],
  );

  async function analyze() {
    if (!answer.trim()) {
      toast.error("Write a memory or reflection first.");
      return;
    }
    setLoading(true);
    setMessages((current) => [
      ...current,
      { role: "student", text: answer },
      { role: "ai", text: nextQuestion },
    ]);
    try {
      const response = await api.storyDiscovery({ text: answer });
      setResult(response);
      toast.success("Story insights extracted.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Story Discovery Engine"
      title="Find the story under the memory"
      description="A reflective interviewer helps students surface values, emotional patterns, and possible essay angles without inventing experiences."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="premium-surface rounded-lg p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-kairos-purple/10 p-2 text-kairos-purple">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-black text-slate-950">AI interviewer</h2>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
              Reflective mode
            </span>
          </div>

          <div className="mt-5 flex max-h-[430px] min-h-[320px] flex-col gap-3 overflow-y-auto rounded-lg bg-slate-50 p-4">
            {messages.map((message, index) => (
              <ChatBubble key={`${message.role}-${index}`} role={message.role}>
                {message.text}
              </ChatBubble>
            ))}
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-800">
            Student response
            <textarea
              className="focus-ring mt-3 min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6 text-slate-800 shadow-inner"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Tell the truth in your own words..."
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={analyze} icon={SendHorizontal} disabled={loading}>
              Analyze My Story
            </GradientButton>
            {loading ? <LoadingState label="Mapping values and essay angles..." /> : null}
          </div>
        </section>

        <InsightPanel
          title="Extracted insights"
          result={result}
          emptyText="Your values, themes, traits, essay angles, and follow-up questions will appear here."
        />
      </div>
    </PageShell>
  );
}
