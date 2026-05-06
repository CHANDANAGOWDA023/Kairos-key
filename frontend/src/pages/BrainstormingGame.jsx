import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Award, CheckCircle2, Dice5, LockKeyholeOpen, Sparkles } from "lucide-react";

import GradientButton from "../components/GradientButton";
import { PageShell } from "../layouts/AppShell";
import { deepPrompts } from "../data/demoPrompts";
import { classNames } from "../utils/format";

const memoryCards = [
  {
    title: "A family ritual",
    angle: "belonging, inheritance, and the values you learned by repetition",
    move: "Start with the repeated gesture, then reveal what it trained you to notice.",
  },
  {
    title: "A failed plan",
    angle: "adaptability, humility, and changed method",
    move: "Name the original plan, the exact moment it broke, and the new habit it created.",
  },
  {
    title: "A room you remember",
    angle: "sensory detail, memory, and inner conflict",
    move: "Anchor the scene in three concrete objects before explaining why it still matters.",
  },
  {
    title: "A quiet responsibility",
    angle: "leadership before recognition",
    move: "Show the task you kept doing when nobody was keeping score.",
  },
  {
    title: "A strange hobby",
    angle: "curiosity, pattern recognition, and self-directed learning",
    move: "Let the odd detail stay odd, then connect it to how your mind works.",
  },
  {
    title: "A question that stuck",
    angle: "intellectual restlessness and long-term inquiry",
    move: "Trace how one question changed what you read, built, asked, or challenged.",
  },
  {
    title: "A tiny act of courage",
    angle: "agency in a small, believable moment",
    move: "Keep the stakes honest and focus on the choice you made anyway.",
  },
  {
    title: "A moment of being misunderstood",
    angle: "identity, voice, and self-definition",
    move: "Contrast what others assumed with what was actually happening inside you.",
  },
];

const badges = [
  { label: "First Memory Chosen", condition: "first-card" },
  { label: "Hidden Story Unlocked", condition: "hidden-story" },
  { label: "Strong Essay Signal", condition: "strong-signal" },
  { label: "Range Explorer", condition: "range-explorer" },
];

export default function BrainstormingGame() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [emotion, setEmotion] = useState(62);
  const [specificity, setSpecificity] = useState(74);
  const [selectedCard, setSelectedCard] = useState("");
  const [exploredCards, setExploredCards] = useState(() => new Set());
  const [hiddenStory, setHiddenStory] = useState(null);
  const [round, setRound] = useState(1);

  const prompt = useMemo(() => deepPrompts[promptIndex], [promptIndex]);
  const selectedMemory = useMemo(
    () => memoryCards.find((card) => card.title === selectedCard),
    [selectedCard],
  );
  const storySignal = useMemo(
    () => Math.round(Number(emotion) * 0.52 + Number(specificity) * 0.48),
    [emotion, specificity],
  );
  const activeBadges = useMemo(
    () =>
      badges.map((badge) => {
        const isActive =
          (badge.condition === "first-card" && exploredCards.size > 0) ||
          (badge.condition === "hidden-story" && Boolean(hiddenStory)) ||
          (badge.condition === "strong-signal" && storySignal >= 72) ||
          (badge.condition === "range-explorer" && exploredCards.size >= 3);

        return { ...badge, isActive };
      }),
    [exploredCards, hiddenStory, storySignal],
  );

  function chooseCard(card) {
    setSelectedCard(card.title);
    setExploredCards((current) => {
      const next = new Set(current);
      next.add(card.title);
      return next;
    });
    setHiddenStory(null);
    toast.success(`${card.title} selected.`);
  }

  function randomPrompt() {
    setPromptIndex((currentIndex) => {
      if (deepPrompts.length <= 1) return currentIndex;

      let nextIndex = currentIndex;
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * deepPrompts.length);
      }
      return nextIndex;
    });
    setRound((currentRound) => currentRound + 1);
    setHiddenStory(null);
    toast.success("New deep prompt drawn.");
  }

  function unlock() {
    if (!selectedMemory) {
      toast.error("Choose a memory card first.");
      return;
    }

    const emotionalRead =
      Number(emotion) >= 75 ? "high-emotion" : Number(emotion) >= 45 ? "warm" : "quiet";
    const detailRead =
      Number(specificity) >= 75
        ? "detail-rich"
        : Number(specificity) >= 45
          ? "developing"
          : "too broad";

    setHiddenStory({
      hook: `${selectedMemory.title}: ${prompt.toLowerCase()}`,
      angle: selectedMemory.angle,
      nextMove: selectedMemory.move,
      signal: storySignal,
      read: `${emotionalRead}, ${detailRead}`,
    });
    toast.success("Hidden story unlocked.");
  }

  return (
    <PageShell
      eyebrow="Brainstorming Game"
      title="Make reflection feel playful without making the essay fake"
      description="Draw prompts, rate emotional energy, unlock hidden story possibilities, and collect badges for authentic detail."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <section className="premium-surface rounded-lg p-6">
          <h2 className="text-xl font-black text-slate-950">Memory cards</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {memoryCards.map((card, index) => (
              <button
                type="button"
                key={card.title}
                aria-pressed={selectedCard === card.title}
                className={classNames(
                  "focus-ring min-h-24 rounded-lg border p-4 text-left text-sm font-black shadow-sm transition hover:-translate-y-1",
                  selectedCard === card.title
                    ? "border-kairos-purple/40 bg-kairos-purple/10 text-slate-950 shadow-glow"
                    : "border-slate-200 bg-white/80 text-slate-800 hover:border-kairos-purple/30",
                )}
                onClick={() => chooseCard(card)}
              >
                <span className="mb-3 flex items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Card {index + 1}
                  {selectedCard === card.title ? (
                    <CheckCircle2 className="h-4 w-4 text-kairos-purple" aria-hidden="true" />
                  ) : null}
                </span>
                {card.title}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white/75 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Selected
              </p>
              <p className="mt-2 text-sm font-black text-slate-900">
                {selectedMemory?.title || "Pick a memory card"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/75 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Explored
              </p>
              <p className="mt-2 text-sm font-black text-slate-900">
                {exploredCards.size} / {memoryCards.length} cards
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/75 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Essay Signal
              </p>
              <p className="mt-2 text-sm font-black text-slate-900">{storySignal} / 100</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/50">
              Round {round} prompt
            </p>
            <p className="mt-3 text-2xl font-black leading-tight">{prompt}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <GradientButton onClick={randomPrompt} icon={Dice5} variant="secondary">
                New Prompt
              </GradientButton>
              <GradientButton onClick={unlock} icon={LockKeyholeOpen}>
                Unlock Hidden Story
              </GradientButton>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="premium-surface rounded-lg p-6">
            <h2 className="text-xl font-black text-slate-950">Emotion sliders</h2>
            <label className="mt-5 block text-sm font-semibold text-slate-800">
              Emotional charge: {emotion}
              <input
                type="range"
                min="0"
                max="100"
                value={emotion}
                onChange={(event) => setEmotion(Number(event.target.value))}
                className="mt-3 w-full accent-kairos-pink"
              />
            </label>
            <label className="mt-5 block text-sm font-semibold text-slate-800">
              Specificity potential: {specificity}
              <input
                type="range"
                min="0"
                max="100"
                value={specificity}
                onChange={(event) => setSpecificity(Number(event.target.value))}
                className="mt-3 w-full accent-kairos-green"
              />
            </label>
            <div className="mt-5 h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-kairos-green via-kairos-yellow to-kairos-pink transition-all"
                style={{ width: `${storySignal}%` }}
              />
            </div>
          </section>

          <section className="dark-glass rounded-lg p-6 text-white">
            <h2 className="text-xl font-black">Badges</h2>
            <div className="mt-5 grid gap-3">
              {activeBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-3 rounded-lg p-3 ${
                    badge.isActive ? "bg-white/10 ring-1 ring-white/15" : "bg-white/5 opacity-55"
                  }`}
                >
                  <Award
                    className={classNames(
                      "h-5 w-5",
                      badge.isActive ? "text-kairos-yellow" : "text-white/35",
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold">{badge.label}</span>
                </div>
              ))}
            </div>
            {hiddenStory ? (
              <div className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/80">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="h-4 w-4 text-kairos-yellow" aria-hidden="true" />
                  <p className="font-black">Hidden story candidate</p>
                </div>
                <p className="mt-3 font-bold text-white">{hiddenStory.hook}</p>
                <p className="mt-3">Angle: {hiddenStory.angle}.</p>
                <p className="mt-2">Next move: {hiddenStory.nextMove}</p>
                <p className="mt-2 text-white/60">
                  Read: {hiddenStory.read}. Signal: {hiddenStory.signal}/100.
                </p>
              </div>
            ) : null}
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
