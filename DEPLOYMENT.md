# Kairos & Key Deployment Guide

This guide deploys the app on free tiers:

- Frontend: React + Vite on Vercel
- Backend: Flask API on Render
- AI: Google Gemini API
- Docker: not required

## 1. File Placement

```text
kairos-and-key/
  render.yaml
  .gitignore
  README.md
  DEPLOYMENT.md

  backend/
    app.py
    flask_app.py
    requirements.txt
    runtime.txt
    .env.example
    app/
      __init__.py
      services/
        ai_service.py

  frontend/
    package.json
    vercel.json
    .env.example
    src/
      api/
        client.js
```

Important files:

- `backend/app.py`: Local Flask launcher for `python app.py`.
- `backend/flask_app.py`: Shared Flask app factory and API routes.
- `backend/app/__init__.py`: Exports the Flask app so Render can run `gunicorn app:app --bind 0.0.0.0:$PORT`.
- `backend/requirements.txt`: Python dependencies for Render.
- `backend/runtime.txt`: Python version for Render.
- `render.yaml`: Render Blueprint for the backend.
- `frontend/vercel.json`: Vercel config for Vite and React Router routes.
- `frontend/src/api/client.js`: Reads `VITE_API_URL` and calls the backend.
- `.gitignore`: Keeps `.env` files and build artifacts out of Git.

## 2. Local Backend Test

Open PowerShell:

```powershell
cd "D:\Kairos & Key\kairos-and-key\backend"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
notepad .env
```

Set `backend/.env` like this:

```env
AI_PROVIDER=gemini
USE_MOCK_AI=false
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
GEMINI_API_KEY=your_gemini_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Start Flask locally:

```powershell
python app.py
```

Test health:

```powershell
Invoke-RestMethod http://localhost:8000/health
```

Test one AI route:

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8000/api/story-discovery `
  -ContentType "application/json" `
  -Body '{"text":"I helped my grandmother learn WhatsApp."}'
```

## 3. Local Frontend Test

Open a second PowerShell terminal:

```powershell
cd "D:\Kairos & Key\kairos-and-key\frontend"
npm install
Copy-Item .env.example .env
notepad .env
```

Use:

```env
VITE_API_URL=http://localhost:8000
```

Run the app:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173
```

## 4. Git And GitHub Push

From the project root:

```powershell
cd "D:\Kairos & Key\kairos-and-key"
git init
git add .
git commit -m "Prepare production deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Before pushing, confirm `.env` is not staged:

```powershell
git status --short
```

You should not see `backend/.env` or `frontend/.env`.

## 5. Render Backend Deployment

Use the free Render Web Service plan.

Option A: Render Blueprint

1. Push the repo to GitHub.
2. Go to Render.
3. Click `New +`.
4. Choose `Blueprint`.
5. Connect your GitHub repo.
6. Render will read `render.yaml`.
7. Add the secret environment variables when Render asks.

Option B: Manual Web Service

1. Go to Render.
2. Click `New +`.
3. Choose `Web Service`.
4. Connect your GitHub repo.
5. Set `Root Directory`:

```text
backend
```

6. Set `Build Command`:

```text
pip install -r requirements.txt
```

7. Set `Start Command`:

```text
gunicorn app:app --bind 0.0.0.0:$PORT
```

8. Set `Instance Type` to the free plan.
9. Add environment variables:

```env
AI_PROVIDER=gemini
USE_MOCK_AI=false
GEMINI_MODEL=gemini-2.5-flash
GEMINI_API_KEY=your_gemini_key_here
CORS_ORIGINS=http://localhost:5173
```

10. Deploy.

After Render deploys, copy your backend URL. It will look like:

```text
https://kairos-and-key-backend.onrender.com
```

Test:

```powershell
Invoke-RestMethod https://YOUR_RENDER_SERVICE.onrender.com/health
```

## 6. Vercel Frontend Deployment

Use the free Vercel Hobby plan.

Dashboard method:

1. Go to Vercel.
2. Click `Add New Project`.
3. Import your GitHub repo.
4. Set `Root Directory`:

```text
frontend
```

5. Vercel should detect Vite.
6. Confirm:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

7. Add environment variable:

```env
VITE_API_URL=https://YOUR_RENDER_SERVICE.onrender.com
```

8. Deploy.

CLI method:

```powershell
cd "D:\Kairos & Key\kairos-and-key\frontend"
npm install -g vercel
vercel login
vercel env add VITE_API_URL production
vercel --prod
```

When prompted for `VITE_API_URL`, paste your Render backend URL.

## 7. Final CORS Update

After Vercel deploys, copy your Vercel URL:

```text
https://your-vercel-app.vercel.app
```

Go back to Render and update:

```env
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

If you also want local testing:

```env
CORS_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:5173,http://127.0.0.1:5173
```

Redeploy or restart the Render service after changing env vars.

## 8. Common Deployment Fixes

### CORS Errors

Symptoms:

- Browser console says CORS blocked.
- Frontend works locally but not on Vercel.

Fix:

```env
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

Use the exact Vercel URL. Do not add a trailing slash.

### Backend 404 Errors

Correct backend paths include `/api`:

```text
/api/story-discovery
/api/hidden-story
/api/analyze-draft
/health
```

If `/story-discovery` returns 404, use `/api/story-discovery`.

### Vercel Page Refresh 404

React Router pages need a rewrite. This project includes:

```text
frontend/vercel.json
```

If a route 404s on refresh, confirm Vercel project root is `frontend` and redeploy.

### Render Cold Starts

Render free services sleep when inactive. The first request can take 30 seconds or more. This is normal on the free tier.

Fixes:

- Wait and refresh once.
- Open `/health` first to wake the backend.
- Upgrade Render only if you need always-on behavior.

### Missing Dependencies

If Render logs say `ModuleNotFoundError`, check:

```text
backend/requirements.txt
```

Then redeploy. The build command must be:

```text
pip install -r requirements.txt
```

### Render 502 Or Port Errors

Use this start command:

```text
gunicorn app:app --bind 0.0.0.0:$PORT
```

Render provides `$PORT` dynamically. Do not hardcode `8000` in the Render start command.

### Gemini API Errors

If the backend returns mock fallback or Gemini errors:

1. Confirm `GEMINI_API_KEY` exists in Render environment variables.
2. Confirm `USE_MOCK_AI=false`.
3. Confirm `GEMINI_MODEL=gemini-2.5-flash`.
4. Check Render logs.
5. If Gemini returns temporary high-demand errors, wait and retry.

## 9. Free Tier Notes

- Vercel Hobby is enough for the static React frontend.
- Render free web services may sleep after inactivity.
- Gemini API free tier has rate limits.
- Do not expose your Gemini key in frontend code or Vercel variables.

## 10. Production Checklist

Before final deployment:

```powershell
cd "D:\Kairos & Key\kairos-and-key\backend"
python app.py
```

```powershell
cd "D:\Kairos & Key\kairos-and-key\frontend"
npm run build
```

Confirm:

- `backend/.env` is not committed.
- `frontend/.env` is not committed.
- Render has `GEMINI_API_KEY`.
- Vercel has `VITE_API_URL`.
- Render has `CORS_ORIGINS` set to your Vercel URL.
