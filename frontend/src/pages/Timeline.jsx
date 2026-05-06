import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import GradientButton from "../components/GradientButton";
import TimelineCard from "../components/TimelineCard";
import { PageShell } from "../layouts/AppShell";
import { demoStories } from "../data/demoStories";

const categories = [
  "Failure",
  "Achievement",
  "Family",
  "Hobby",
  "Conflict",
  "Turning Point",
  "Small Memory",
];

export default function Timeline() {
  const [events, setEvents] = useState(demoStories);
  const [form, setForm] = useState({
    title: "",
    age: 16,
    year: "2026",
    category: "Small Memory",
    emotion: "",
    lesson: "",
    description: "",
  });

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function addEvent() {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Add a title and description first.");
      return;
    }
    setEvents((current) => [
      ...current,
      {
        ...form,
        id: Date.now(),
        color: ["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#FACC15"][
          current.length % 5
        ],
      },
    ]);
    setForm({
      title: "",
      age: 16,
      year: "2026",
      category: "Small Memory",
      emotion: "",
      lesson: "",
      description: "",
    });
    toast.success("Timeline event added locally.");
  }

  return (
    <PageShell
      eyebrow="Life Timeline Visualizer"
      title="Map moments by emotion, category, and meaning"
      description="Add demo events locally and scan for recurring themes, emotional arcs, and potential Common App material."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <section className="space-y-4">
          {events.map((event) => (
            <TimelineCard key={event.id} event={event} />
          ))}
        </section>

        <aside className="space-y-5">
          <section className="premium-surface rounded-lg p-5">
            <h2 className="text-xl font-black text-slate-950">Add a life event</h2>
            <div className="mt-4 grid gap-3">
              <input
                className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                placeholder="Title"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={(event) => updateField("age", event.target.value)}
                />
                <input
                  className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                  placeholder="Year"
                  value={form.year}
                  onChange={(event) => updateField("year", event.target.value)}
                />
              </div>
              <select
                className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <input
                className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                placeholder="Emotion"
                value={form.emotion}
                onChange={(event) => updateField("emotion", event.target.value)}
              />
              <input
                className="focus-ring rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm"
                placeholder="Lesson learned"
                value={form.lesson}
                onChange={(event) => updateField("lesson", event.target.value)}
              />
              <textarea
                className="focus-ring min-h-32 resize-y rounded-lg border border-slate-200 bg-white/90 p-4 text-sm leading-6"
                placeholder="Description"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
              <GradientButton onClick={addEvent} icon={Plus}>
                Add Event
              </GradientButton>
            </div>
          </section>

          <section className="dark-glass rounded-lg p-5 text-white">
            <h2 className="text-xl font-black">AI timeline insights</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/78">
              <p>
                <span className="font-bold text-white">Recurring themes: </span>
                translation, patient experimentation, quiet leadership, family care.
              </p>
              <p>
                <span className="font-bold text-white">Strongest candidates: </span>
                Grandmother's kitchen, failed science fair, student council silence.
              </p>
              <p>
                <span className="font-bold text-white">Emotional arc: </span>
                From misunderstood helper to intentional bridge-builder.
              </p>
              <p>
                <span className="font-bold text-white">Common App topics: </span>
                identity, challenge, problem solved, intellectual curiosity.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
