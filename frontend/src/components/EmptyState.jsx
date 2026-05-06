import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
