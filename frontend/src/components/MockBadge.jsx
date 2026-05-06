export default function MockBadge({ mode = "mock" }) {
  const label = mode === "openai" ? "OpenAI live" : "Mock AI demo";
  return (
    <span className="inline-flex items-center rounded-lg border border-white/50 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600 shadow-sm">
      {label}
    </span>
  );
}
