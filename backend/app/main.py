from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai import router as ai_router


app = FastAPI(
    title="Kairos & Key API",
    description="AI coaching API for the Kairos & Key college essay demo.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/api")


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "kairos-and-key-api"}
