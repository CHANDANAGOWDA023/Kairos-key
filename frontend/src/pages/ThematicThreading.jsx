import { useState } from "react";
import toast from "react-hot-toast";
import { GitBranchPlus } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import InsightPanel from "../components/InsightPanel";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import { PageShell } from "../layouts/AppShell";
import { storyConnections, storyNodes } from "../data/demoStories";

const nodeById = Object.fromEntries(storyNodes.map((node) => [node.id, node]));

export default function ThematicThreading() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateThread() {
    setLoading(true);
    try {
      const response = await api.thematicThreading({ timeline: storyNodes });
      setResult(response);
      toast.success("Essay thread generated.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Thematic Threading Map"
      title="Connect micro-stories into one authentic narrative thread"
      description="A visual map helps students discover patterns instead of forcing a prewritten theme onto their life."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="premium-surface rounded-lg p-5">
          <div className="relative h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
            <svg className="absolute inset-0 h-full w-full" role="img" aria-label="Story connection map">
              {storyConnections.map(([from, to]) => {
                const a = nodeById[from];
                const b = nodeById[to];
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={`${a.x}%`}
                    y1={`${a.y}%`}
                    x2={`${b.x}%`}
                    y2={`${b.y}%`}
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
            {storyNodes.map((node, index) => (
              <div
                key={node.id}
                className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-white/12 p-3 text-white shadow-soft backdrop-blur-xl"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <p className="text-sm font-black leading-5">{node.title}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/56">
                  {node.tone}
                </p>
                <span
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-lg"
                  style={{
                    background: ["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#FACC15", "#EC4899"][index],
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-kairos-purple/10 p-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kairos-purple">
              AI-generated thesis
            </p>
            <p className="mt-2 text-lg font-black leading-7 text-slate-950">
              Your strongest narrative thread connects patience, experimentation,
              family memory, and scientific curiosity.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton
              onClick={generateThread}
              icon={GitBranchPlus}
              disabled={loading}
            >
              Generate Essay Thread
            </GradientButton>
            {loading ? <LoadingState label="Connecting story nodes..." /> : null}
          </div>
        </section>

        <InsightPanel
          title="Thread coaching"
          result={result}
          emptyText="Generate a thread to see thesis, node sequence, risks, and a section-level essay path."
        />
      </div>
    </PageShell>
  );
}
