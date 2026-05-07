import json
import os
from typing import Any
from urllib import error, request
from urllib.parse import quote

from dotenv import load_dotenv

load_dotenv()


GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini").lower()


SYSTEM_PROMPT = """
You are Kairos & Key, an ethical college admissions essay coach.
You help students discover authentic stories, reflect deeply, preserve voice,
and revise honestly. Never invent experiences, fabricate achievements, or write
a full essay as if you are the student. Return strict JSON only.
"""


TASK_PROMPTS = {
    "story_discovery": "Extract values, themes, traits, essay angles, follow-up questions, uniqueness_score, and reflection_depth_score from the student's story.",
    "hidden_story": "Find the deeper meaning inside an ordinary memory and coach the student toward specificity without fabricating details.",
    "thematic_threading": "Connect micro-stories into a coherent identity thread and suggest essay thesis options.",
    "essay_coach": "Give section-by-section coaching on hook, context, conflict, turning point, reflection, and future connection.",
    "show_dont_tell": "Transform a generic claim into sensory, truthful storytelling prompts and a sample stronger sentence.",
    "cliche_detect": "Detect cliches, generic phrasing, resume tone, fake endings, and AI-sounding language.",
    "voice_fingerprint": "Analyze natural writing voice across samples and identify voice-preservation risks.",
    "analyze_draft": "Score authenticity, emotional depth, specificity, reflection, memorability, cliche risk, and AI-sounding risk.",
    "admissions_review": "Respond like an admissions reader, focusing on what the essay reveals and what still feels missing.",
    "university_alignment": "Evaluate essay strategy alignment for selected universities without implying admissions prediction.",
    "essay_consistency": "Compare multiple essays for repeated stories, inconsistent values, and portfolio balance.",
    "cultural_context": "Gently separate the student's values from external expectations and propose authentic reflection prompts.",
    "scholarship_review": "Review for scholarship fit around financial context, leadership, community impact, goals, responsibility, and resilience.",
}


def _use_mock_ai() -> bool:
    return os.getenv("USE_MOCK_AI", "false").lower() in {"1", "true", "yes"}


def _provider_api_key_configured() -> bool:
    if AI_PROVIDER == "gemini":
        return bool(os.getenv("GEMINI_API_KEY"))
    return False


def _parse_json_content(content: str) -> dict[str, Any]:
    text = (content or "{}").strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return json.loads(text or "{}")


def _shape_for_value(value: Any) -> Any:
    if isinstance(value, dict):
        return {key: _shape_for_value(item) for key, item in value.items()}
    if isinstance(value, list):
        if not value:
            return []
        return [_shape_for_value(value[0])]
    return type(value).__name__


def _expected_response_shape(task_type: str, user_input: dict[str, Any] | str) -> dict[str, Any]:
    sample = mock_response(task_type, user_input).copy()
    sample.pop("mode", None)
    sample.pop("input_echo", None)
    return _shape_for_value(sample)


def _unwrap_task_result(task_type: str, result: dict[str, Any]) -> dict[str, Any]:
    wrapper_keys = {
        "result",
        "results",
        "response",
        "output",
        task_type,
        f"{task_type}_result",
        f"{task_type}_results",
    }

    if len(result) == 1:
        key = next(iter(result))
        value = result[key]
        if isinstance(value, dict) and (
            key in wrapper_keys or key.endswith("_result") or key.endswith("_results")
        ):
            return value

    for key in wrapper_keys:
        value = result.get(key)
        if isinstance(value, dict):
            return value

    return result


def _primary_text(user_input: dict[str, Any] | str) -> str:
    if isinstance(user_input, str):
        return user_input
    for key in ("text", "draft", "memory", "university"):
        value = user_input.get(key)
        if value:
            return str(value)
    if user_input.get("essays"):
        return " ".join(user_input["essays"].values())
    if user_input.get("sections"):
        return " ".join(user_input["sections"].values())
    return json.dumps(user_input, ensure_ascii=True)


def call_gemini(prompt: str, system_prompt: str = SYSTEM_PROMPT) -> dict[str, Any]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    if AI_PROVIDER != "gemini":
        raise RuntimeError(f"Unsupported AI_PROVIDER: {AI_PROVIDER}")

    endpoint = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{quote(GEMINI_MODEL, safe='')}:generateContent?key={quote(api_key, safe='')}"
    )
    payload = {
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.6,
            "responseMimeType": "application/json",
        },
    }
    body = json.dumps(payload).encode("utf-8")
    req = request.Request(
        endpoint,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=60) as response:
            data = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Gemini API request failed: {detail}") from exc

    try:
        content = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"Gemini API returned an unexpected response: {data}") from exc

    return _parse_json_content(content)


def call_configured_ai(prompt: str, system_prompt: str = SYSTEM_PROMPT) -> dict[str, Any]:
    if AI_PROVIDER == "gemini":
        return call_gemini(prompt, system_prompt)
    raise RuntimeError(f"Unsupported AI_PROVIDER: {AI_PROVIDER}")


def run_ai_task(task_type: str, user_input: dict[str, Any] | str) -> dict[str, Any]:
    if _use_mock_ai() or not _provider_api_key_configured():
        return mock_response(task_type, user_input)

    expected_shape = _expected_response_shape(task_type, user_input)
    prompt = {
        "task": task_type,
        "instructions": TASK_PROMPTS.get(task_type, "Coach the student ethically."),
        "student_input": user_input,
        "required_output": {
            "style": "Actionable, specific, warm, never dishonest, JSON only.",
            "top_level_keys": list(expected_shape.keys()),
            "json_shape": expected_shape,
            "rule": "Return one JSON object with these top-level keys. Do not wrap it inside another result key.",
        },
    }

    try:
        result = call_configured_ai(json.dumps(prompt, ensure_ascii=True), SYSTEM_PROMPT)
        result = _unwrap_task_result(task_type, result)
        result.setdefault("mode", AI_PROVIDER)
        result.setdefault("model", GEMINI_MODEL)
        return result
    except Exception as exc:
        fallback = mock_response(task_type, user_input)
        fallback["mode"] = "mock_fallback"
        fallback["warning"] = f"{AI_PROVIDER} call failed, returned mock response: {exc}"
        return fallback


def mock_response(task_type: str, user_input: dict[str, Any] | str) -> dict[str, Any]:
    text = _primary_text(user_input)
    responses = {
        "story_discovery": {
            "mode": "mock",
            "core_values": ["patience", "curiosity", "family loyalty", "quiet leadership"],
            "emotional_themes": ["feeling underestimated", "care expressed through teaching", "bridging generations"],
            "personality_traits": ["observant", "methodical", "empathetic", "low-ego problem solver"],
            "possible_essay_angles": [
                "A small teaching moment that revealed your instinct to translate complexity for others.",
                "A memory about being misunderstood that became a source of self-knowledge.",
                "How a repeated habit of fixing small problems became a larger intellectual identity.",
            ],
            "follow_up_questions": [
                "What exact detail from the moment still feels vivid in your body?",
                "What did you believe about yourself before this happened?",
                "Where does this same pattern show up in school, family, or friendships?",
            ],
            "uniqueness_score": 86,
            "reflection_depth_score": 78,
            "coach_note": "The promising part is not the event itself; it is the pattern of attention it reveals.",
        },
        "hidden_story": {
            "mode": "mock",
            "why_this_story_matters": "This memory is small enough to feel honest, but it opens into patience, technology accessibility, and intergenerational care.",
            "possible_essay_angle": "Use the WhatsApp lesson as a doorway into how you learned to translate systems for people who feel left behind.",
            "what_this_reveals": ["empathy", "teaching ability", "cultural bridge-building", "respect for elders", "practical creativity"],
            "how_to_make_less_generic": [
                "Name the exact misunderstanding or repeated mistake.",
                "Include one line of dialogue that only your grandmother would say.",
                "Connect the memory to a later moment where you helped someone learn.",
            ],
            "opening_hook_idea": "The first time my grandmother sent a voice note, she whispered as if the phone might keep a secret.",
            "coach_note": "Keep the story ordinary. The specificity is what makes it feel uncommon.",
        },
        "thematic_threading": {
            "mode": "mock",
            "thesis": "Your strongest narrative thread connects patience, experimentation, family memory, and scientific curiosity.",
            "thread_nodes": ["Grandmother's kitchen", "Failed science fair", "Fermentation curiosity", "Teaching a younger sibling"],
            "essay_thread": [
                "Open with a sensory family memory.",
                "Shift into experimentation and failure.",
                "Reflect on why patience became your way of understanding people and systems.",
                "End with future-facing curiosity, not a neat moral.",
            ],
            "risk": "Do not force every story into one metaphor. Let the connection feel discovered.",
        },
        "essay_coach": {
            "mode": "mock",
            "section_feedback": {
                "Hook": "Lead with a precise action or image instead of announcing a lesson.",
                "Context": "Give just enough background to understand the stakes. Avoid family history overload.",
                "Conflict": "Make the inner conflict visible: what did you not understand yet?",
                "Turning Point": "The change should be subtle and believable, not a sudden personality transformation.",
                "Reflection": "Name the before-and-after in your thinking.",
                "Future Connection": "Connect to how you now approach learning, community, or research.",
            },
            "warnings": ["The draft may become too polished if every sentence sounds like a conclusion."],
            "next_revision": "Add one messy, concrete moment where the plan did not work.",
        },
        "show_dont_tell": {
            "mode": "mock",
            "why_it_is_weak": "The sentence states a virtue but gives the reader no scene, pressure, or evidence.",
            "sensory_questions": [
                "Where were you when the hard work became visible?",
                "What object, sound, or repeated action proves the effort?",
                "What almost made you stop?",
            ],
            "memory_prompts": [
                "Describe the last failed attempt before something worked.",
                "Show the physical evidence of effort in the room.",
                "Include a small decision nobody else noticed.",
            ],
            "stronger_example": "By 2 a.m., my desk was covered in circuit wires, cold coffee, and three failed sketches, but the motor finally moved.",
            "rewrite_instruction": "Rewrite the claim as a scene with one object, one obstacle, and one action.",
        },
        "cliche_detect": {
            "mode": "mock",
            "cliche_risk_score": 62,
            "highlighted_issues": [
                {"label": "Generic opening", "example": "Ever since I was young", "severity": "medium"},
                {"label": "Resume-like tone", "example": "I led, organized, and achieved", "severity": "high"},
                {"label": "Neat inspirational ending", "example": "This taught me to never give up", "severity": "medium"},
            ],
            "why_it_is_weak": "The idea explains achievement before it reveals personality.",
            "how_to_personalize": ["Add a private doubt.", "Use a scene only you could tell.", "Show the cost or tradeoff."],
            "creative_pivots": [
                "Write about the smallest decision inside the achievement.",
                "Start after the award, when the emotional consequence became clear.",
            ],
        },
        "voice_fingerprint": {
            "mode": "mock",
            "natural_tone": "Warm, observant, slightly wry, reflective without being theatrical.",
            "vocabulary_level": "Clear academic language with occasional sensory phrasing.",
            "sentence_rhythm": "Medium-length sentences, strongest when alternating detail with reflection.",
            "formality_score": 68,
            "authenticity_notes": [
                "Your natural voice uses concrete objects before abstract claims.",
                "Your casual sample has a lighter rhythm that the essay should preserve.",
            ],
            "risk": "Current draft sounds too polished in the conclusion. Reintroduce one sentence that sounds like how you actually think.",
        },
        "analyze_draft": {
            "mode": "mock",
            "scores": {
                "Authenticity": 84,
                "Emotional depth": 76,
                "Specificity": 72,
                "Reflection": 79,
                "Memorability": 81,
                "Cliche risk": 34,
                "AI-sounding risk": 28,
            },
            "strengths": ["Specific family scene", "Clear intellectual curiosity", "Believable growth"],
            "improvements": ["Deepen the moment of uncertainty.", "Replace one abstract paragraph with a scene."],
        },
        "admissions_review": {
            "mode": "mock",
            "card_title": "Admissions Reader Reaction",
            "first_impression": "This essay shows curiosity, but the emotional stakes are still low.",
            "what_the_essay_reveals": ["patience", "technical curiosity", "care for family"],
            "what_is_memorable": "The image of translating technology across generations feels vivid and distinctive.",
            "what_feels_generic": "The final paragraph leans on familiar language about growth and perseverance.",
            "needs_deeper_reflection": "I understand what you did, but not yet why it mattered to you.",
            "final_reader_reaction": "Promising and sincere; one more layer of vulnerability would make it linger.",
            "admissions_style_score": 82,
        },
        "university_alignment": {
            "mode": "mock",
            "disclaimer": "This score is only a writing strategy guide. It does not predict or guarantee admission.",
            "results": [
                {"university": "Stanford", "alignment_score": 88, "missing_traits": ["risk-taking"], "suggested_framing": "Emphasize experimentation, initiative, and human-centered technology."},
                {"university": "MIT", "alignment_score": 84, "missing_traits": ["technical depth"], "suggested_framing": "Add the mechanics of the problem you solved and how failure shaped your method."},
                {"university": "Brown", "alignment_score": 91, "missing_traits": ["academic freedom"], "suggested_framing": "Connect your curiosity to self-directed interdisciplinary learning."},
                {"university": "Yale", "alignment_score": 79, "missing_traits": ["community contribution"], "suggested_framing": "Show how your reflective habits affect a broader group."},
            ],
        },
        "essay_consistency": {
            "mode": "mock",
            "repeated_stories": ["Family technology story appears in Common App and scholarship draft."],
            "inconsistent_personality": ["MIT supplement sounds more boastful than the other pieces."],
            "missing_values": ["community impact", "playfulness", "academic independence"],
            "portfolio_strategy": "Use Essay 1 to show resilience, Essay 2 to show curiosity, Essay 3 to show community impact.",
            "emotional_variety": "Strong intellectual range, but add one warmer human scene outside family.",
        },
        "cultural_context": {
            "mode": "mock",
            "student_values": ["curiosity", "steadiness", "being useful in quiet ways"],
            "external_expectations": ["prestige pressure", "achievement-first framing", "fear of disappointing family"],
            "authentic_essay_topics": [
                "A private moment when you chose learning over appearing impressive.",
                "The difference between the achievement your family celebrates and the one that changed you.",
            ],
            "gentle_reflection_prompts": [
                "Which part of this story would still matter if no college ever read it?",
                "What sentence feels true but scary to say plainly?",
            ],
        },
        "scholarship_review": {
            "mode": "mock",
            "financial_context": "Present context with dignity and specificity; avoid reducing yourself to hardship.",
            "leadership": "Show responsibility through repeated action, not a title.",
            "community_impact": "Quantify who benefited, then explain what you learned from them.",
            "future_goals": "Connect your goal to a concrete problem you want to keep solving.",
            "resilience": "Strong if framed as adaptation rather than inspirational packaging.",
            "revision_steps": ["Add one budget or responsibility detail.", "Clarify how the scholarship changes your capacity to contribute."],
        },
    }
    result = responses.get(task_type, responses["story_discovery"]).copy()
    result["input_echo"] = text[:280]
    return result
