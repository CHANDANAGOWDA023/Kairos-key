import { Building2 } from "lucide-react";

import ProgressBar from "./ProgressBar";

export default function UniversityScoreCard({ university, result }) {
  const score = result?.alignment_score ?? 76;

  return (
    <article className="premium-surface rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">{university.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{university.traits.join(" / ")}</p>
        </div>
        <div
          className="rounded-lg p-3 text-white"
          style={{ background: university.color }}
        >
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5">
        <ProgressBar
          label="Alignment score"
          value={score}
          color="from-kairos-blue to-kairos-green"
        />
      </div>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        <p>
          <span className="font-bold text-slate-800">Missing traits: </span>
          {(result?.missing_traits || ["distinctive reflection"]).join(", ")}
        </p>
        <p>
          <span className="font-bold text-slate-800">Suggested framing: </span>
          {result?.suggested_framing ||
            "Bring the essay closer to the traits this school tends to value in writing."}
        </p>
      </div>
    </article>
  );
}
