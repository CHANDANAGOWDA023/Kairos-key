import { useState } from "react";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";

import { api } from "../api/client";
import GradientButton from "../components/GradientButton";
import LoadingState from "../components/LoadingState";
import MockBadge from "../components/MockBadge";
import UniversityScoreCard from "../components/UniversityScoreCard";
import { PageShell } from "../layouts/AppShell";
import { universities } from "../data/demoUniversities";

export default function UniversityMatch() {
  const [selected, setSelected] = useState(["Stanford", "MIT", "Brown", "Yale"]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function toggleUniversity(name) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  }

  async function align() {
    setLoading(true);
    try {
      const response = await api.universityAlignment({ universities: selected });
      setResult(response);
      toast.success("University alignment ready.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const resultByName = Object.fromEntries(
    (result?.results || []).map((item) => [item.university, item]),
  );

  return (
    <PageShell
      eyebrow="University Persona Alignment"
      title="Shape essay strategy for each school without pretending to predict admission"
      description="Select universities and compare writing traits such as curiosity, leadership, creativity, impact, independence, innovation, and depth."
      actions={result ? <MockBadge mode={result.mode} /> : null}
    >
      <section className="premium-surface rounded-lg p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Select universities</h2>
            <p className="mt-1 text-sm text-slate-600">
              {selected.length} selected for this demo review.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton onClick={align} icon={Building2} disabled={loading}>
              Check Alignment
            </GradientButton>
            {loading ? <LoadingState label="Comparing essay traits..." /> : null}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {universities.map((school) => (
            <button
              key={school.name}
              type="button"
              className={`focus-ring rounded-lg border px-4 py-2 text-sm font-bold transition ${
                selected.includes(school.name)
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-kairos-purple/30"
              }`}
              onClick={() => toggleUniversity(school.name)}
            >
              {school.name}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {universities
          .filter((school) => selected.includes(school.name))
          .map((school) => (
            <UniversityScoreCard
              key={school.name}
              university={school}
              result={resultByName[school.name]}
            />
          ))}
      </div>

      <p className="mt-5 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
        {result?.disclaimer ||
          "This score is only a writing strategy guide. It does not predict or guarantee admission."}
      </p>
    </PageShell>
  );
}
