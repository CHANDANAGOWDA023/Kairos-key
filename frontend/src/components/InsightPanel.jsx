import { Sparkles } from "lucide-react";

export default function InsightPanel({ title = "Extracted insights", result, emptyText }) {
  return (
    <aside className="premium-surface rounded-lg p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-kairos-purple/10 p-2 text-kairos-purple">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
      </div>

      {!result ? (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {emptyText || "Run an analysis to reveal coaching insights."}
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {Object.entries(result)
            .filter(([key]) => !["mode", "input_echo", "model"].includes(key))
            .map(([key, value]) => (
              <section key={key}>
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  {key.replaceAll("_", " ")}
                </h3>
                {Array.isArray(value) ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {value.map((item, index) => (
                      <span
                        key={`${key}-${index}`}
                        className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700"
                      >
                        {typeof item === "object" ? JSON.stringify(item) : item}
                      </span>
                    ))}
                  </div>
                ) : typeof value === "object" && value !== null ? (
                  <div className="mt-3 space-y-2">
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <div
                        key={nestedKey}
                        className="rounded-lg border border-slate-200 bg-white/70 p-3 text-sm"
                      >
                        <p className="font-semibold text-slate-800">
                          {nestedKey.replaceAll("_", " ")}
                        </p>
                        <p className="mt-1 leading-6 text-slate-600">
                          {Array.isArray(nestedValue)
                            ? nestedValue.join(", ")
                            : String(nestedValue)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-700">{String(value)}</p>
                )}
              </section>
            ))}
        </div>
      )}
    </aside>
  );
}
