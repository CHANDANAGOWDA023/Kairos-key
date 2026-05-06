import { clampScore, classNames } from "../utils/format";

export default function ProgressBar({
  value,
  label,
  color = "from-kairos-purple to-kairos-pink",
  compact = false,
}) {
  const safeValue = clampScore(value);

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-slate-700">{label}</span>
          <span className="font-semibold text-slate-900">{safeValue}%</span>
        </div>
      ) : null}
      <div
        className={classNames(
          "w-full overflow-hidden rounded-full bg-slate-100",
          compact ? "h-2" : "h-3",
        )}
      >
        <div
          className={classNames("h-full rounded-full bg-gradient-to-r", color)}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
