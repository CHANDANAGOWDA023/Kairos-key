const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
  /\/$/,
  "",
);

const friendlyErrors = {
  storyDiscovery: "Story discovery could not finish.",
  hiddenStory: "Hidden story analysis could not finish.",
  thematicThreading: "Thread generation could not finish.",
  essayCoach: "Essay coaching could not finish.",
  showDontTell: "Show, don't tell coaching could not finish.",
  clicheDetect: "Cliche scan could not finish.",
  voiceFingerprint: "Voice analysis could not finish.",
  analyzeDraft: "Draft analysis could not finish.",
  admissionsReview: "Admissions review could not finish.",
  universityAlignment: "University alignment could not finish.",
  essayConsistency: "Consistency check could not finish.",
  culturalContext: "Cultural context coaching could not finish.",
  scholarshipReview: "Scholarship review could not finish.",
};

async function post(endpoint, payload, label) {
  let response;

  try {
    response = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      `${friendlyErrors[label] || "AI request failed."} Check that the backend is running and CORS allows this frontend URL.`,
    );
  }

  if (!response.ok) {
    throw new Error(friendlyErrors[label] || "AI request failed.");
  }

  return response.json();
}

export const api = {
  storyDiscovery: (payload) => post("story-discovery", payload, "storyDiscovery"),
  hiddenStory: (payload) => post("hidden-story", payload, "hiddenStory"),
  thematicThreading: (payload) =>
    post("thematic-threading", payload, "thematicThreading"),
  essayCoach: (payload) => post("essay-coach", payload, "essayCoach"),
  showDontTell: (payload) => post("show-dont-tell", payload, "showDontTell"),
  clicheDetect: (payload) => post("cliche-detect", payload, "clicheDetect"),
  voiceFingerprint: (payload) =>
    post("voice-fingerprint", payload, "voiceFingerprint"),
  analyzeDraft: (payload) => post("analyze-draft", payload, "analyzeDraft"),
  admissionsReview: (payload) =>
    post("admissions-review", payload, "admissionsReview"),
  universityAlignment: (payload) =>
    post("university-alignment", payload, "universityAlignment"),
  essayConsistency: (payload) =>
    post("essay-consistency", payload, "essayConsistency"),
  culturalContext: (payload) => post("cultural-context", payload, "culturalContext"),
  scholarshipReview: (payload) =>
    post("scholarship-review", payload, "scholarshipReview"),
};

export { API_BASE };
