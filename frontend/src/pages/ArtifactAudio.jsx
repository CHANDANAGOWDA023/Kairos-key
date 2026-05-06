import { AudioLines, ImagePlus, UploadCloud } from "lucide-react";

import EmptyState from "../components/EmptyState";
import { PageShell } from "../layouts/AppShell";

const mockAnalyses = [
  {
    title: "Meaningful object",
    detected: "A worn recipe card beside a laptop",
    theme: "family memory meets technical curiosity",
    hook: "The oil stain on the corner of the recipe card outlasted every version of my app prototype.",
    symbol: "A bridge between inherited rituals and invented systems.",
  },
  {
    title: "Desk/project image",
    detected: "Circuit wires, sticky notes, and a half-labeled bread starter jar",
    theme: "experimentation, mess, patience",
    hook: "My desk looked like two different students had given up at the same time.",
    symbol: "Learning as a process of controlled disorder.",
  },
  {
    title: "Audio ramble",
    detected: "Student talks faster when describing failed prototypes than awards",
    theme: "curiosity under pressure",
    hook: "The part of the project I remember most is not the version that worked.",
    symbol: "Voice energy reveals authentic interest.",
  },
];

export default function ArtifactAudio() {
  return (
    <PageShell
      eyebrow="Artifact & Audio Extraction Demo"
      title="Use objects, images, and rambling voice notes as story doors"
      description="Demo mode: image/audio analysis is simulated. The UI shows where multimodal story extraction would live."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { label: "Upload meaningful object", icon: ImagePlus },
          { label: "Upload desk/project image", icon: UploadCloud },
          { label: "Upload or record audio ramble", icon: AudioLines },
        ].map((item) => (
          <section key={item.label} className="premium-surface rounded-lg p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-950 text-white">
              <item.icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-950">{item.label}</h2>
            <div className="mt-5">
              <EmptyState
                title="Demo upload zone"
                description="No real file processing is implemented for this prototype."
              />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-5 premium-surface rounded-lg p-6">
        <h2 className="text-xl font-black text-slate-950">Mock analysis results</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {mockAnalyses.map((analysis) => (
            <article key={analysis.title} className="rounded-lg border border-slate-200 bg-white/70 p-4">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-kairos-purple">
                {analysis.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                <span className="font-bold text-slate-900">Detected memory: </span>
                {analysis.detected}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-bold text-slate-900">Emotional theme: </span>
                {analysis.theme}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-bold text-slate-900">Possible essay hook: </span>
                {analysis.hook}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-bold text-slate-900">Symbolic meaning: </span>
                {analysis.symbol}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          Demo mode: image/audio analysis is simulated.
        </p>
      </section>
    </PageShell>
  );
}
