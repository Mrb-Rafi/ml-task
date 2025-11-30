# 🚀 Quick Start: Deploy to Render (FREE)

## Prerequisites
- GitHub account
- Render account (free)

## Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy Backend (5 minutes)

1. Go to [render.com](https://render.com) → Sign up/Login
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select your repo
4. Settings:
   - **Name**: `course-recommender-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: **Free**
5. Click **"Create Web Service"**
6. Wait for deployment (~5-10 min)
7. **Copy your backend URL** (e.g., `https://course-recommender-backend.onrender.com`)

### 3. Deploy Frontend (5 minutes)

1. In Render, click **"New +"** → **"Static Site"**
2. Connect GitHub → Select your repo
3. Settings:
   - **Name**: `course-recommender-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: **Free**
4. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com` (from step 2)
5. Click **"Create Static Site"**
6. Wait for deployment (~3-5 min)
7. **Copy your frontend URL**

### 4. Update Backend CORS

1. Go back to your backend service
2. **Environment** tab → Add:
   - `FRONTEND_URL`: `https://your-frontend-url.onrender.com`
3. **Manual Deploy** → **Deploy latest commit**

### 5. Done! 🎉

Your app is live at your frontend URL!

**Note**: Free tier services may take 30-60 seconds to wake up after inactivity.

---

## Alternative: Railway (Also Free)

Railway offers $5 free credit monthly.

1. Go to [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. Add **Backend Service** (Empty Service):
   - Root: `backend`
   - Start: `gunicorn app:app --bind 0.0.0.0:$PORT`
4. Add **Frontend Service** (Static Site):
   - Root: `frontend`
   - Build: `npm install && npm run build`
   - Output: `dist`
5. Set environment variables (same as Render)

---

## Troubleshooting

**CORS errors?** → Make sure `FRONTEND_URL` is set in backend

**API not found?** → Check `VITE_API_URL` in frontend environment variables

**Build fails?** → Check that all dependencies are in `requirements.txt` and `package.json`

