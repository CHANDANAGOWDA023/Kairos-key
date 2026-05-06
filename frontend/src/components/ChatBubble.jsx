import { classNames } from "../utils/format";

export default function ChatBubble({ role = "ai", children }) {
  const isStudent = role === "student";

  return (
    <div className={classNames("flex", isStudent ? "justify-end" : "justify-start")}>
      <div
        className={classNames(
          "max-w-[86%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm",
          isStudent
            ? "bg-kairos-purple text-white"
            : "border border-white/60 bg-white/80 text-slate-700",
        )}
      >
        {children}
      </div>
    </div>
  );
}
