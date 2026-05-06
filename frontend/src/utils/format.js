export function clampScore(value) {
  if (Number.isNaN(Number(value))) return 0;
  return Math.max(0, Math.min(100, Number(value)));
}

export function scoreTone(score, inverse = false) {
  const normalized = clampScore(score);
  const good = inverse ? normalized <= 40 : normalized >= 75;
  const medium = inverse
    ? normalized > 40 && normalized <= 65
    : normalized >= 55 && normalized < 75;
  if (good) return "text-emerald-700 bg-emerald-50 border-emerald-100";
  if (medium) return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-rose-700 bg-rose-50 border-rose-100";
}

export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
