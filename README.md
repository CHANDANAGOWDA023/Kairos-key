# Kairos & Key

Kairos & Key is a polished demo web application for an ethical AI-powered college admissions essay coaching platform. It behaves like a personal story discovery coach, identity mapper, writing mentor, and admissions strategy assistant, not a simple essay generator.

## Product Philosophy

Kairos & Key helps students discover authentic stories, preserve their natural voice, structure essays, and revise with deeper reflection. It should not fabricate stories, invent achievements, or write dishonest essays.

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts, React Router, React Hot Toast
- Backend: FastAPI, Python, Pydantic, OpenAI Python SDK, CORS enabled
- Data: static/mock frontend data in `frontend/src/data/` and mock AI response logic in `backend/app/services/ai_service.py`

## Project Structure

```text
kairos-and-key/
  frontend/
    src/
      components/
      pages/
      layouts/
      data/
      api/
      utils/
  backend/
    app/
      main.py
      routes/
      services/
      schemas/
      static_data/
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs on `http://localhost:8000` by default.

## Mock Mode

Mock mode works without any API key. Copy `backend/.env.example` to `backend/.env` and keep:

```env
USE_MOCK_AI=true
```

If no `OPENAI_API_KEY` is present, the backend automatically returns high-quality mock AI responses.

## OpenAI Mode

To use OpenAI responses through the backend only:

```env
OPENAI_API_KEY=your_key_here
AI_PROVIDER=openai
USE_MOCK_AI=false
OPENAI_MODEL=gpt-4.1-mini
```

The frontend never receives or stores the API key. All AI calls go through FastAPI endpoints under `/api`.

## Features

- Landing page with ethical product storytelling
- Demo Student Dashboard for Maya Chen
- Story Discovery Engine
- Hidden Story Detector
- Life Timeline Visualizer
- Thematic Threading Map
- Guided Essay Builder
- Show, Don't Tell Transformer
- Cliche Detection System
- Voice Fingerprint Lab
- Essay Authenticity Score
- AI Mock Admissions Officer review
- University Persona Alignment
- Multi-Essay Consistency Checker
- Parent Pressure / Cultural Context Mode
- Scholarship Essay Optimizer
- Artifact & Audio Extraction Demo
- Brainstorming Game
- What NOT To Write Advisor
- Final Essay Review Page

## Demo Flow

1. Open the landing page.
2. Click `Start Story Discovery`.
3. Answer a reflective prompt.
4. Review extracted values and essay angles.
5. Add life events in the timeline.
6. Build the essay section by section.
7. Check the voice fingerprint.
8. Run cliche detection.
9. Get admissions officer feedback.
10. Check university alignment.

## Ethical AI Note

Kairos & Key is a coaching tool. It helps students express their own experiences and ideas. It should not fabricate stories, invent achievements, or write dishonest essays.
