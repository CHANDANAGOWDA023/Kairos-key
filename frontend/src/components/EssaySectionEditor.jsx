import { AlertTriangle, Lightbulb } from "lucide-react";

export default function EssaySectionEditor({ section, value, onChange }) {
  return (
    <article className="premium-surface rounded-lg p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">{section.id}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{section.explanation}</p>
        </div>
        <span className="rounded-lg bg-kairos-blue/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-kairos-blue">
          Section
        </span>
      </div>
      <label className="mt-5 block text-sm font-semibold text-slate-800">
        {section.prompt}
        <textarea
          className="focus-ring mt-3 min-h-36 w-full resize-y rounded-lg border border-slate-200 bg-white/80 p-4 text-sm leading-6 text-slate-800 shadow-inner"
          value={value}
          onChange={(event) => onChange(section.id, event.target.value)}
          placeholder="Draft in your own words..."
        />
      </label>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800">
          <div className="mb-1 flex items-center gap-2 font-bold">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            Coaching tip
          </div>
          {section.coachingTip}
        </div>
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
          <div className="mb-1 flex items-center gap-2 font-bold">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Watch for
          </div>
          {section.warning}
        </div>
      </div>
    </article>
  );
}
