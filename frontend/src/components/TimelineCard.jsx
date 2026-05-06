import { CalendarDays } from "lucide-react";

export default function TimelineCard({ event }) {
  return (
    <article className="relative premium-surface rounded-lg p-5">
      <div
        className="absolute left-0 top-6 h-12 w-1 rounded-r-full"
        style={{ background: event.color || "#7C3AED" }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Age {event.age} / {event.year}
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">{event.title}</h3>
        </div>
        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
          {event.category}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{event.description}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-white/70 p-3 text-sm">
          <p className="font-bold text-slate-800">Emotion</p>
          <p className="mt-1 text-slate-600">{event.emotion}</p>
        </div>
        <div className="rounded-lg bg-white/70 p-3 text-sm">
          <p className="font-bold text-slate-800">Lesson learned</p>
          <p className="mt-1 text-slate-600">{event.lesson}</p>
        </div>
      </div>
    </article>
  );
}
