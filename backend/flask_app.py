import os
from typing import Any

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from app.services.ai_service import run_ai_task

load_dotenv()


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


def _cors_origins() -> list[str]:
    configured = os.getenv("CORS_ORIGINS", "")
    if configured.strip():
        return [origin.strip() for origin in configured.split(",") if origin.strip()]

    return [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


def create_app() -> Flask:
    flask_app = Flask(__name__)
    flask_app.config["JSON_SORT_KEYS"] = False
    flask_app.config["MAX_CONTENT_LENGTH"] = int(
        os.getenv("MAX_CONTENT_LENGTH", "1048576")
    )

    CORS(
        flask_app,
        resources={r"/*": {"origins": _cors_origins()}},
        supports_credentials=False,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    @flask_app.get("/")
    def index():
        return jsonify(
            {
                "service": "kairos-and-key-api",
                "status": "ok",
                "docs": "Use POST /api/<task-name> for AI coaching tasks.",
            }
        )

    @flask_app.get("/health")
    def health_check():
        return jsonify({"status": "ok", "service": "kairos-and-key-api"})

    @flask_app.get("/api/health")
    def api_health_check():
        return jsonify({"status": "ok", "service": "kairos-and-key-api"})

    @flask_app.post("/api/<route_name>")
    def run_task(route_name: str):
        task_type = TASK_ROUTES.get(route_name)
        if not task_type:
            return jsonify({"error": f"Unknown API route: {route_name}"}), 404

        payload: dict[str, Any] = request.get_json(silent=True) or {}
        result = run_ai_task(task_type, payload)
        return jsonify(result)

    @flask_app.errorhandler(413)
    def payload_too_large(_error):
        return jsonify({"error": "Request payload is too large."}), 413

    @flask_app.errorhandler(404)
    def not_found(_error):
        return jsonify({"error": "Route not found."}), 404

    @flask_app.errorhandler(500)
    def server_error(_error):
        return jsonify({"error": "Internal server error."}), 500

    return flask_app


app = create_app()
