import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { classNames } from "../utils/format";

export default function GradientButton({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  icon: Icon = ArrowRight,
  className = "",
  disabled = false,
}) {
  const classes = classNames(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition duration-300",
    variant === "primary"
      ? "bg-gradient-to-r from-kairos-purple via-kairos-pink to-kairos-blue text-white shadow-glow hover:-translate-y-0.5"
      : "border border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-kairos-purple/30",
    disabled && "cursor-not-allowed opacity-60 hover:translate-y-0",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  );
}
