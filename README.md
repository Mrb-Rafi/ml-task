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
- **ML Library**: Surprise (SVD for matrix factorization)
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

