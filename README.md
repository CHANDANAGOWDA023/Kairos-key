# Kairos & Key

Kairos & Key is a full-stack AI college admissions essay coaching demo. It helps students discover authentic stories, preserve their voice, and revise with reflection. It should not fabricate stories, invent achievements, or write dishonest essays.

## Production Stack

- Frontend: React + Vite, deployed on Vercel
- Backend: Flask API, deployed on Render
- AI: Google Gemini API through the backend only
- Server: Gunicorn on Render, no Docker required

## Folder Structure

```text
kairos-and-key/
  backend/
    app.py                 # Local Flask launcher: python app.py
    flask_app.py           # Shared Flask app factory and routes
    requirements.txt       # Python dependencies
    runtime.txt            # Render Python version
    .env.example           # Backend env template, no real secrets
    app/
      __init__.py          # Exports Flask app for Render: gunicorn app:app
      services/
        ai_service.py      # Gemini integration and mock fallback
  frontend/
    src/
      api/client.js        # Uses VITE_API_URL
    .env.example           # Frontend env template
    vercel.json            # Vercel SPA routing config
    package.json
  render.yaml              # Render Blueprint config
  DEPLOYMENT.md            # Step-by-step deployment guide
```

## Environment Variables

Backend variables on Render:

```env
AI_PROVIDER=gemini
USE_MOCK_AI=false
GEMINI_API_KEY=your_gemini_key_here
GEMINI_MODEL=gemini-2.5-flash
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

Frontend variable on Vercel:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

Never put `GEMINI_API_KEY` in the frontend. The browser should only know the backend URL.

## Local Testing

Backend:

```powershell
cd "D:\Kairos & Key\kairos-and-key\backend"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# Edit backend\.env and add your GEMINI_API_KEY
python app.py
```

Frontend, in a second terminal:

```powershell
cd "D:\Kairos & Key\kairos-and-key\frontend"
npm install
Copy-Item .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Deployment

Full beginner-friendly instructions are in [DEPLOYMENT.md](DEPLOYMENT.md).
