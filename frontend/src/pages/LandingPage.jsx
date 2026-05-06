import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Fingerprint,
  GraduationCap,
  Heart,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Telescope,
} from "lucide-react";
import { motion } from "framer-motion";

import FeatureCard from "../components/FeatureCard";
import GradientButton from "../components/GradientButton";

const floatingCards = [
  { title: "Story Discovery Engine", icon: Brain, accent: "#7C3AED" },
  { title: "Hidden Story Detector", icon: Sparkles, accent: "#EC4899" },
  { title: "Voice Fingerprint", icon: Fingerprint, accent: "#3B82F6" },
  { title: "Admissions Review", icon: GraduationCap, accent: "#10B981" },
  { title: "University Alignment", icon: MapPinned, accent: "#FACC15" },
];

const features = [
  {
    title: "Identity mapping",
    description:
      "Connect small memories, values, family patterns, intellectual habits, and moments of growth.",
    icon: Telescope,
    accent: "#7C3AED",
  },
  {
    title: "Voice preservation",
    description:
      "Compare drafts against real writing samples so essays stay polished without sounding synthetic.",
    icon: Fingerprint,
    accent: "#3B82F6",
  },
  {
    title: "Admissions strategy",
    description:
      "Translate authentic stories into school-aware framing without pretending scores predict admission.",
    icon: GraduationCap,
    accent: "#10B981",
  },
  {
    title: "Ethical coaching",
    description:
      "The platform asks sharper questions, flags weak writing, and never fabricates student experiences.",
    icon: ShieldCheck,
    accent: "#EC4899",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-73px)] animated-gradient text-white">
        <div className="floating-shape left-[6%] top-[18%] h-24 w-24 rounded-lg" />
        <div className="floating-shape right-[12%] top-[16%] h-16 w-36 rounded-lg [animation-delay:1.2s]" />
        <div className="floating-shape bottom-[18%] left-[18%] h-14 w-28 rounded-lg [animation-delay:2.1s]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.72))]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/12 px-3 py-2 text-sm font-semibold backdrop-blur-md">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI essay coaching that starts before the draft
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Kairos & Key
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-white">
              Unlock the right story at the right moment.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Kairos & Key helps students discover authentic life stories, preserve
              their voice, and build compelling college essays without losing who
              they are.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GradientButton to="/story-discovery">Start Story Discovery</GradientButton>
              <GradientButton to="/dashboard" variant="secondary">
                View Demo Dashboard
              </GradientButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1300&q=80"
              alt="A notebook and laptop arranged for reflective writing"
              className="h-[360px] w-full rounded-lg object-cover shadow-2xl ring-1 ring-white/20 sm:h-[500px]"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/20 bg-slate-950/70 p-4 backdrop-blur-xl">
              <p className="text-sm font-semibold text-white/70">Live coaching signal</p>
              <p className="mt-1 text-xl font-black">Hidden story found: patient translator</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <span className="rounded-lg bg-white/10 px-2 py-2">Voice 88</span>
                <span className="rounded-lg bg-white/10 px-2 py-2">Depth 76</span>
                <span className="rounded-lg bg-white/10 px-2 py-2">Risk 34</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-5 lg:px-8">
          {floatingCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-white"
                style={{ background: card.accent }}
              >
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-black leading-5 text-slate-950">{card.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mesh-light py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="premium-surface rounded-lg p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-kairos-pink">
              The problem
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Most AI essay tools polish grammar after the important work is already missed.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Students do not only need smoother sentences. They need help locating
              real experiences, understanding why those moments matter, and avoiding
              essays that sound impressive but emotionally interchangeable.
            </p>
          </div>
          <div className="premium-surface rounded-lg p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-kairos-green">
              The solution
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Kairos & Key turns reflection into a structured, student-owned writing process.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The product maps identity, emotional depth, growth, uniqueness, and
              intellectual curiosity before coaching each essay section with a
              strong respect for the student's natural voice.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-kairos-yellow">
              Feature grid
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Built for discovery, revision, and admissions-aware self-knowledge.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-kairos-green/10 text-kairos-green">
            <BadgeCheck className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
            Kairos & Key coaches students. It does not fabricate stories.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Every workflow asks students to tell the truth with more clarity,
            specificity, and courage. The AI can question, organize, critique, and
            suggest revision paths, but the student's lived experience remains the
            source material.
          </p>
          <div className="mt-8 flex justify-center">
            <GradientButton to="/dashboard" icon={ArrowRight}>
              Explore the Demo
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-kairos-purple via-kairos-pink to-kairos-blue px-4 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70">
              <Heart className="h-4 w-4" aria-hidden="true" />
              Ready for the right moment
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Start with a memory, leave with a map.
            </h2>
          </div>
          <GradientButton to="/story-discovery" variant="secondary">
            Begin Story Discovery
          </GradientButton>
        </div>
      </section>
    </div>
  );
}
