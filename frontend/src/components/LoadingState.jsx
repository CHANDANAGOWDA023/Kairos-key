export default function LoadingState({ label = "Analyzing with Kairos & Key..." }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-kairos-purple/20 bg-white/80 p-4 text-sm font-semibold text-slate-700 shadow-sm">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kairos-pink opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-kairos-purple" />
      </span>
      {label}
    </div>
  );
}
