# Course Recommender System

A web application that uses collaborative filtering and matrix factorization to recommend courses based on user profiles and ratings.

## Features

- **User Profiles**: Create profiles with interests, skills, and time availability
- **Course Rating**: Rate courses on a 1-5 scale
- **Recommendations**: Get personalized course recommendations using SVD matrix factorization
- **Explanations**: Understand why courses are recommended (similar users or items)
- **Evaluation Metrics**: View RMSE and top-k precision metrics

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Flask (Python)
- **ML**: NumPy, SciPy, Scikit-learn (SVD matrix factorization)
- **Database**: SQLite

## Setup

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Create a user profile with your interests, skills, and available time
2. Rate some courses (at least 3-4 for better recommendations)
3. View personalized recommendations in the dashboard
4. Check evaluation metrics to see model performance

## Color Palette

The app uses a dark pastel color scheme:
- Background: Deep purple gradients (#2d1b3d, #1a1a2e)
- Primary: Purple pastels (#a78bfa, #8b5cf6)
- Text: Light pastels (#e8d5e3, #b8a9c9)
- Accents: Soft purples and lavenders

## Deployment

### Deploying to Render

This project is configured for deployment on Render using `render.yaml`.

#### Backend Deployment
The backend is already deployed at: https://ml-task.onrender.com/

#### Frontend Deployment

1. **Using Render Dashboard:**
   - Go to your Render dashboard
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** course-recommender-frontend
     - **Root Directory:** `frontend`
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Add Environment Variable:
     - **Key:** `VITE_API_URL`
     - **Value:** `https://ml-task.onrender.com`

2. **Using render.yaml (Automatic):**
   - The `render.yaml` file is already configured
   - Render will automatically detect and deploy both services
   - Make sure to set the `FRONTEND_URL` environment variable in your backend service to your frontend URL after deployment

3. **Update Backend CORS:**
   - In your Render backend dashboard, add/update environment variable:
     - **Key:** `FRONTEND_URL`
     - **Value:** Your frontend Render URL (e.g., `https://course-recommender-frontend.onrender.com`)

#### After Deployment
- Test API calls from your deployed frontend
- Verify CORS is working correctly
- Check browser console for any errors

