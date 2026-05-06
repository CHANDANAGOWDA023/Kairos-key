import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { MessageCircleMore } from "lucide-react";

import { api } from "../api/client";
import EssaySectionEditor from "../components/EssaySectionEditor";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";
import { essaySections } from "../data/demoEssays";

export default function EssayBuilder() {
  const [sections, setSections] = useState({
    Hook: "The first time my grandmother tried to send a voice note, she whispered into the phone as if the message might spill into the room.",
    Context: "",
    Conflict: "",
    "Turning Point": "",
    Reflection: "",
    "Future Connection": "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const completed = useMemo(
    () => Object.values(sections).filter((value) => value.trim().length > 0).length,
    [sections],
  );

  function updateSection(id, value) {
    setSections((current) => ({ ...current, [id]: value }));
  }

  async function getFeedback() {
    setLoading(true);
    try {
      const response = await api.essayCoach({ sections });
      setResult(response);
      toast.success("Coaching feedback ready.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Essay Builder"
      title="Build the essay section by section"
      description="This tool does not auto-write the full essay first. It coaches structure, specificity, reflection, and voice as the student drafts."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="mb-5 rounded-lg border border-kairos-blue/15 bg-kairos-blue/5 p-4">
        <p className="text-sm font-black text-slate-950">
          {completed} of {essaySections.length} sections have student writing.
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Save is local for demo purposes. Draft text stays in browser state only.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.82fr]">
        <section className="space-y-5">
          {essaySections.map((section) => (
            <EssaySectionEditor
              key={section.id}
              section={section}
              value={sections[section.id] || ""}
              onChange={updateSection}
            />
          ))}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton
              onClick={getFeedback}
              icon={MessageCircleMore}
              disabled={loading}
            >
              Get Coaching Feedback
            </GradientButton>
            {loading ? <LoadingState label="Reviewing structure and reflection..." /> : null}
          </div>
        </section>
        <InsightPanel
          title="Writing mentor feedback"
          result={result}
          emptyText="Feedback will appear after you ask for coaching. The AI will critique sections without replacing the student's work."
        />
      </div>
    </PageShell>
  );
}
