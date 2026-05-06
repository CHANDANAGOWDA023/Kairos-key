from fastapi import APIRouter

from app.schemas.requests import AIRequest
from app.services.ai_service import run_ai_task

router = APIRouter(tags=["AI Coaching"])


TASK_ROUTES = {
    "story-discovery": "story_discovery",
    "hidden-story": "hidden_story",
    "thematic-threading": "thematic_threading",
    "essay-coach": "essay_coach",
    "show-dont-tell": "show_dont_tell",
    "cliche-detect": "cliche_detect",
    "voice-fingerprint": "voice_fingerprint",
    "analyze-draft": "analyze_draft",
    "admissions-review": "admissions_review",
    "university-alignment": "university_alignment",
    "essay-consistency": "essay_consistency",
    "cultural-context": "cultural_context",
    "scholarship-review": "scholarship_review",
}


def _run(route_name: str, payload: AIRequest):
    return run_ai_task(TASK_ROUTES[route_name], payload.model_dump())


@router.post("/story-discovery")
def story_discovery(payload: AIRequest):
    return _run("story-discovery", payload)


@router.post("/hidden-story")
def hidden_story(payload: AIRequest):
    return _run("hidden-story", payload)


@router.post("/thematic-threading")
def thematic_threading(payload: AIRequest):
    return _run("thematic-threading", payload)


@router.post("/essay-coach")
def essay_coach(payload: AIRequest):
    return _run("essay-coach", payload)


@router.post("/show-dont-tell")
def show_dont_tell(payload: AIRequest):
    return _run("show-dont-tell", payload)


@router.post("/cliche-detect")
def cliche_detect(payload: AIRequest):
    return _run("cliche-detect", payload)


@router.post("/voice-fingerprint")
def voice_fingerprint(payload: AIRequest):
    return _run("voice-fingerprint", payload)


@router.post("/analyze-draft")
def analyze_draft(payload: AIRequest):
    return _run("analyze-draft", payload)


@router.post("/admissions-review")
def admissions_review(payload: AIRequest):
    return _run("admissions-review", payload)


@router.post("/university-alignment")
def university_alignment(payload: AIRequest):
    return _run("university-alignment", payload)


@router.post("/essay-consistency")
def essay_consistency(payload: AIRequest):
    return _run("essay-consistency", payload)


@router.post("/cultural-context")
def cultural_context(payload: AIRequest):
    return _run("cultural-context", payload)


@router.post("/scholarship-review")
def scholarship_review(payload: AIRequest):
    return _run("scholarship-review", payload)
