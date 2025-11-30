# Deployment Guide - Free Hosting Options

This guide covers deploying both the frontend and backend for **FREE** using **Render** (recommended) or **Railway**.

## 🎯 Recommended: Render (Free Tier)

Render offers free hosting for both frontend and backend with:
- ✅ Free web services (with some limitations)
- ✅ Automatic deployments from GitHub
- ✅ SSL certificates included
- ✅ Environment variables support

---

## 📦 Step 1: Prepare Your Code

### 1.1 Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 1.2 Update Environment Variables

**Frontend** (`frontend/.env.production`):
```
VITE_API_URL=https://your-backend-app.onrender.com
```

**Backend**: Set in Render dashboard (see below)

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Create Backend Service

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `course-recommender-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: **Free**

### 2.2 Set Environment Variables

In Render dashboard, add:
- `FLASK_ENV`: `production`
- `FRONTEND_URL`: `https://your-frontend-app.onrender.com` (update after deploying frontend)
- `PORT`: `10000` (Render sets this automatically, but you can specify)

### 2.3 Deploy

Click **"Create Web Service"** and wait for deployment (~5-10 minutes first time).

**Note**: Your backend URL will be: `https://your-app-name.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Create Static Site

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `course-recommender-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: **Free**

### 3.2 Set Environment Variables

Add:
- `VITE_API_URL`: `https://your-backend-app.onrender.com` (from Step 2)

### 3.3 Update Backend CORS

Go back to your backend service and update:
- `FRONTEND_URL`: `https://your-frontend-app.onrender.com`

### 3.4 Deploy

Click **"Create Static Site"** and wait for deployment.

---

## 🔄 Alternative: Railway (Free Tier with $5 Credit)

Railway offers $5 free credit monthly, which is usually enough for small apps.

### Railway Backend Deployment

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repository
4. Add service → **"Empty Service"**
5. In settings:
   - **Root Directory**: `backend`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
6. Add environment variable:
   - `FRONTEND_URL`: Your frontend URL

### Railway Frontend Deployment

1. Add another service → **"Static Site"**
2. Root Directory: `frontend`
3. Build Command: `npm install && npm run build`
4. Output Directory: `dist`
5. Environment variable:
   - `VITE_API_URL`: Your backend URL

---

## 🆓 Other Free Options

### Fly.io (Free Tier)
- 3 shared VMs free
- Good for backend hosting
- More complex setup

### PythonAnywhere (Free Tier)
- Limited to Python apps
- Good for backend
- Frontend needs separate hosting

### Netlify (Frontend Only)
- Excellent for frontend
- Backend needs separate hosting (Render/Railway)

---

## 🔧 Troubleshooting

### Backend Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend
2. **Database Issues**: SQLite works on Render, but data resets on redeploy. Consider PostgreSQL for persistent data.
3. **Build Fails**: Check that all dependencies are in `requirements.txt`

### Frontend Issues

1. **API Not Found**: Verify `VITE_API_URL` is set correctly
2. **Build Errors**: Make sure all imports use `getApiUrl()` from `config.js`

### Database Persistence

For production, consider upgrading to PostgreSQL:
1. In Render, add a PostgreSQL database
2. Update `DATABASE_URL` in backend environment variables
3. Update SQLAlchemy connection string in `app.py`

---

## 📝 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render/Railway
- [ ] Frontend deployed to Render/Railway
- [ ] Environment variables set correctly
- [ ] CORS configured with frontend URL
- [ ] Test the deployed app!

---

## 🎉 You're Done!

Your app should now be live at:
- **Frontend**: `https://your-frontend-app.onrender.com`
- **Backend**: `https://your-backend-app.onrender.com`

**Note**: Free tier services may spin down after inactivity. First request after inactivity may take 30-60 seconds to wake up.

