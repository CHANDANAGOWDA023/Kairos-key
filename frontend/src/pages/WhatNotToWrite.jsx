import { BadgeAlert, CheckCircle2 } from "lucide-react";

import { PageShell } from "../layouts/AppShell";
import { notToWriteTopics } from "../data/demoPrompts";

export default function WhatNotToWrite() {
  return (
    <PageShell
      eyebrow="What NOT To Write Advisor"
      title="Avoid risky essay patterns without becoming timid"
      description="The point is not to ban topics. It is to help students handle difficult or familiar material with specificity, humility, and reflection."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {notToWriteTopics.map((topic) => (
          <article key={topic.title} className="premium-surface rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-rose-50 p-2 text-rose-600">
                <BadgeAlert className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-950">{topic.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <span className="font-bold text-slate-900">Why risky: </span>
                  {topic.whyRisky}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                <span className="font-black">How to fix: </span>
                {topic.howToFix}
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                <span className="inline-flex items-center gap-2 font-black">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Better direction:
                </span>{" "}
                {topic.betterDirection}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
