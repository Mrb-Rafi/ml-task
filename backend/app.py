from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds
from sklearn.model_selection import train_test_split
from collections import defaultdict
import os

app = Flask(__name__)

frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
if os.environ.get('FLASK_ENV') == 'production':
    allowed_origins = [frontend_url] if frontend_url else ["*"]
else:
    allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

CORS(app, resources={
    r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
}, supports_credentials=True)

database_url = os.environ.get('DATABASE_URL', 'sqlite:///recommendations.db')
if database_url.startswith('postgres://'):
    engine = create_engine('sqlite:///recommendations.db', echo=False)
else:
    engine = create_engine(database_url, echo=False)
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    interests = Column(String(500))
    skills = Column(String(500))
    time_per_week = Column(Integer)
    ratings = relationship('Rating', back_populates='user')

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    description = Column(String(1000))
    category = Column(String(100))
    ratings = relationship('Rating', back_populates='course')

class Rating(Base):
    __tablename__ = 'ratings'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    course_id = Column(Integer, ForeignKey('courses.id'))
    rating = Column(Float)
    user = relationship('User', back_populates='ratings')
    course = relationship('Course', back_populates='ratings')

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

def init_sample_courses():
    session = Session()
    course_count = session.query(Course).count()
    
    if course_count < 50:
        sample_courses = [
            Course(title="Introduction to Machine Learning", description="Learn the fundamentals of ML algorithms and applications", category="Data Science"),
            Course(title="Python for Data Analysis", description="Pandas, NumPy, and data visualization techniques", category="Data Science"),
            Course(title="Deep Learning Fundamentals", description="Neural networks and deep learning architectures", category="Data Science"),
            Course(title="SQL Database Design", description="Database architecture and optimization strategies", category="Data Science"),
            Course(title="Data Visualization with Tableau", description="Create compelling visualizations and dashboards", category="Data Science"),
            Course(title="Big Data Analytics", description="Hadoop, Spark, and distributed computing", category="Data Science"),
            Course(title="Natural Language Processing", description="Text analysis, sentiment analysis, and NLP models", category="Data Science"),
            Course(title="Computer Vision", description="Image processing and recognition systems", category="Data Science"),
            Course(title="Time Series Analysis", description="Forecasting and trend analysis techniques", category="Data Science"),
            Course(title="Statistical Modeling", description="Advanced statistical methods and hypothesis testing", category="Data Science"),
            Course(title="Data Mining", description="Pattern discovery and knowledge extraction from data", category="Data Science"),
            Course(title="Reinforcement Learning", description="Q-learning, policy gradients, and RL applications", category="Data Science"),
            Course(title="Web Development Bootcamp", description="Full-stack web development from scratch", category="Programming"),
            Course(title="React Advanced Patterns", description="Advanced React techniques and best practices", category="Programming"),
            Course(title="JavaScript Mastery", description="Advanced JavaScript concepts and ES6+ features", category="Programming"),
            Course(title="Node.js Backend Development", description="Build scalable server-side applications", category="Programming"),
            Course(title="Python Programming Mastery", description="Advanced Python concepts and design patterns", category="Programming"),
            Course(title="Java Enterprise Development", description="Spring Boot, microservices, and enterprise patterns", category="Programming"),
            Course(title="C++ Advanced Programming", description="Memory management, templates, and STL", category="Programming"),
            Course(title="Go Programming Language", description="Concurrent programming and Go best practices", category="Programming"),
            Course(title="Rust Systems Programming", description="Memory safety and high-performance systems", category="Programming"),
            Course(title="TypeScript Deep Dive", description="Type safety and advanced TypeScript features", category="Programming"),
            Course(title="Vue.js Complete Guide", description="Modern frontend framework development", category="Programming"),
            Course(title="Angular Framework Mastery", description="Enterprise Angular applications", category="Programming"),
            Course(title="Django Web Framework", description="Python web development with Django", category="Programming"),
            Course(title="Flask API Development", description="RESTful APIs and microservices with Flask", category="Programming"),
            Course(title="GraphQL API Design", description="Modern API architecture with GraphQL", category="Programming"),
            Course(title="Data Structures and Algorithms", description="Master DSA concepts and problem-solving", category="Computer Science"),
            Course(title="System Design", description="Design scalable distributed systems", category="Computer Science"),
            Course(title="Cloud Computing Basics", description="AWS, Azure, and GCP fundamentals", category="Computer Science"),
            Course(title="Operating Systems", description="Process management, memory, and file systems", category="Computer Science"),
            Course(title="Computer Networks", description="TCP/IP, HTTP, and network protocols", category="Computer Science"),
            Course(title="Distributed Systems", description="Consensus algorithms and distributed computing", category="Computer Science"),
            Course(title="Database Systems", description="ACID properties, transactions, and indexing", category="Computer Science"),
            Course(title="Compiler Design", description="Lexical analysis, parsing, and code generation", category="Computer Science"),
            Course(title="Cryptography", description="Encryption, hashing, and security protocols", category="Computer Science"),
            Course(title="Software Architecture", description="Design patterns and architectural principles", category="Computer Science"),
            Course(title="Concurrent Programming", description="Threading, synchronization, and parallel computing", category="Computer Science"),
            Course(title="Algorithm Design", description="Greedy algorithms, dynamic programming, and optimization", category="Computer Science"),
            Course(title="Ethical Hacking", description="Penetration testing and security assessment", category="Cybersecurity"),
            Course(title="Network Security", description="Firewalls, intrusion detection, and network defense", category="Cybersecurity"),
            Course(title="Web Application Security", description="OWASP Top 10 and secure coding practices", category="Cybersecurity"),
            Course(title="Cryptography and Security", description="Encryption, digital signatures, and PKI", category="Cybersecurity"),
            Course(title="iOS Development with Swift", description="Build native iOS applications", category="Mobile Development"),
            Course(title="Android Development", description="Kotlin and Java for Android apps", category="Mobile Development"),
            Course(title="React Native", description="Cross-platform mobile app development", category="Mobile Development"),
            Course(title="Flutter Development", description="Dart and Flutter for mobile apps", category="Mobile Development"),
            Course(title="Docker and Containerization", description="Container orchestration and Docker best practices", category="DevOps"),
            Course(title="Kubernetes Mastery", description="Container orchestration at scale", category="DevOps"),
            Course(title="CI/CD Pipelines", description="Automated testing and deployment", category="DevOps"),
            Course(title="Git Version Control", description="Advanced Git workflows and collaboration", category="DevOps"),
            Course(title="UI/UX Design Principles", description="User-centered design and usability", category="UI/UX Design"),
            Course(title="Figma Design Mastery", description="Prototyping and design systems", category="UI/UX Design"),
        ]
        
        existing_titles = {c.title for c in session.query(Course).all()}
        new_courses = [c for c in sample_courses if c.title not in existing_titles]
        if new_courses:
            session.add_all(new_courses)
            session.commit()
    session.close()

init_sample_courses()

model_data = None

class SVDModel:
    def __init__(self, user_ids, course_ids, user_mean_ratings, course_mean_ratings, 
                 user_factors, course_factors, global_mean):
        self.user_ids = user_ids
        self.course_ids = course_ids
        self.user_mean_ratings = user_mean_ratings
        self.course_mean_ratings = course_mean_ratings
        self.user_factors = user_factors
        self.course_factors = course_factors
        self.global_mean = global_mean
        self.user_id_to_idx = {uid: idx for idx, uid in enumerate(user_ids)}
        self.course_id_to_idx = {cid: idx for idx, cid in enumerate(course_ids)}
    
    def predict(self, user_id, course_id):
        if user_id not in self.user_id_to_idx or course_id not in self.course_id_to_idx:
            return self.global_mean
        
        user_idx = self.user_id_to_idx[user_id]
        course_idx = self.course_id_to_idx[course_id]
        
        user_bias = self.user_mean_ratings[user_idx] - self.global_mean
        course_bias = self.course_mean_ratings[course_idx] - self.global_mean
        interaction = np.dot(self.user_factors[user_idx], self.course_factors[course_idx])
        
        prediction = self.global_mean + user_bias + course_bias + interaction
        prediction = max(1.0, min(5.0, prediction))
        
        return prediction

def train_model_from_dataframe(df):
    if len(df) < 3:
        return None
    
    user_ids = sorted(df['user_id'].unique())
    course_ids = sorted(df['course_id'].unique())
    
    user_id_to_idx = {uid: idx for idx, uid in enumerate(user_ids)}
    course_id_to_idx = {cid: idx for idx, cid in enumerate(course_ids)}
    
    n_users = len(user_ids)
    n_courses = len(course_ids)
    rating_matrix = np.zeros((n_users, n_courses))
    
    for _, row in df.iterrows():
        user_idx = user_id_to_idx[row['user_id']]
        course_idx = course_id_to_idx[row['course_id']]
        rating_matrix[user_idx, course_idx] = row['rating']
    
    global_mean = df['rating'].mean()
    user_means = np.array([df[df['user_id'] == uid]['rating'].mean() for uid in user_ids])
    course_means = np.array([df[df['course_id'] == cid]['rating'].mean() for cid in course_ids])
    
    normalized_matrix = rating_matrix.copy()
    for i in range(n_users):
        mask = rating_matrix[i] > 0
        if mask.sum() > 0:
            normalized_matrix[i, mask] -= user_means[i]
    
    n_factors = min(50, min(n_users, n_courses) - 1)
    if n_factors < 1:
        n_factors = 1
    
    if n_users == 1 or np.sum(normalized_matrix != 0) < 5:
        user_factors = np.zeros((n_users, n_factors))
        course_factors = np.zeros((n_courses, n_factors))
    else:
        try:
            max_factors = min(n_factors, min(n_users, n_courses) - 1)
            if max_factors < 1:
                max_factors = 1
            U, sigma, Vt = svds(normalized_matrix, k=max_factors)
            sigma = np.diag(sigma)
            user_factors = U @ np.sqrt(sigma)
            course_factors = (np.sqrt(sigma) @ Vt).T
        except:
            user_factors = np.zeros((n_users, n_factors))
            course_factors = np.zeros((n_courses, n_factors))
    
    return SVDModel(
        user_ids, course_ids, user_means, course_means,
        user_factors, course_factors, global_mean
    )

def train_model():
    global model_data
    session = Session()
    ratings_data = session.query(Rating).all()
    session.close()
    
    if len(ratings_data) < 3:
        return None
    
    ratings_list = [(r.user_id, r.course_id, r.rating) for r in ratings_data]
    df = pd.DataFrame(ratings_list, columns=['user_id', 'course_id', 'rating'])
    
    model_data = train_model_from_dataframe(df)
    return model_data

@app.route('/')
def index():
    return jsonify({
        'message': 'Course Recommender API',
        'endpoints': {
            'POST /api/users': 'Create a new user',
            'GET /api/users/<id>': 'Get user by ID',
            'GET /api/courses': 'Get all courses',
            'POST /api/ratings': 'Create/update a rating',
            'GET /api/ratings/user/<id>': 'Get user ratings',
            'GET /api/recommendations/<id>': 'Get recommendations for user',
            'GET /api/metrics': 'Get model evaluation metrics'
        }
    })

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    session = Session()
    user = User(
        name=data['name'],
        interests=','.join(data.get('interests', [])),
        skills=','.join(data.get('skills', [])),
        time_per_week=data.get('time_per_week', 0)
    )
    session.add(user)
    session.commit()
    user_id = user.id
    session.close()
    return jsonify({'id': user_id, 'message': 'User created successfully'})

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    session = Session()
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        session.close()
        return jsonify({'error': 'User not found'}), 404
    
    result = {
        'id': user.id,
        'name': user.name,
        'interests': user.interests.split(',') if user.interests else [],
        'skills': user.skills.split(',') if user.skills else [],
        'time_per_week': user.time_per_week
    }
    session.close()
    return jsonify(result)

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    session = Session()
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        session.close()
        return jsonify({'error': 'User not found'}), 404
    
    session.query(Rating).filter(Rating.user_id == user_id).delete()
    session.delete(user)
    session.commit()
    session.close()
    
    train_model()
    
    return jsonify({'message': 'User and all ratings deleted successfully'})

@app.route('/api/courses', methods=['GET'])
def get_courses():
    session = Session()
    courses = session.query(Course).all()
    result = [{
        'id': c.id,
        'title': c.title,
        'description': c.description,
        'category': c.category
    } for c in courses]
    session.close()
    return jsonify(result)

@app.route('/api/ratings', methods=['POST'])
def create_rating():
    data = request.json
    session = Session()
    
    existing = session.query(Rating).filter(
        Rating.user_id == data['user_id'],
        Rating.course_id == data['course_id']
    ).first()
    
    if existing:
        existing.rating = data['rating']
    else:
        rating = Rating(
            user_id=data['user_id'],
            course_id=data['course_id'],
            rating=data['rating']
        )
        session.add(rating)
    
    session.commit()
    session.close()
    
    train_model()
    
    return jsonify({'message': 'Rating saved successfully'})

@app.route('/api/ratings', methods=['DELETE'])
def delete_rating():
    data = request.json
    session = Session()
    
    rating = session.query(Rating).filter(
        Rating.user_id == data['user_id'],
        Rating.course_id == data['course_id']
    ).first()
    
    if rating:
        session.delete(rating)
        session.commit()
        session.close()
        
        train_model()
        
        return jsonify({'message': 'Rating deleted successfully'})
    else:
        session.close()
        return jsonify({'error': 'Rating not found'}), 404

@app.route('/api/ratings/user/<int:user_id>', methods=['GET'])
def get_user_ratings(user_id):
    session = Session()
    ratings = session.query(Rating).filter(Rating.user_id == user_id).all()
    result = [{
        'course_id': r.course_id,
        'rating': r.rating
    } for r in ratings]
    session.close()
    return jsonify(result)

@app.route('/api/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    global model_data
    
    session = Session()
    
    all_courses = session.query(Course).all()
    user_ratings = session.query(Rating).filter(Rating.user_id == user_id).all()
    rated_course_ids = {r.course_id for r in user_ratings}
    
    if len(rated_course_ids) >= len(all_courses):
        session.close()
        return jsonify({
            'recommendations': [],
            'explanations': {},
            'message': 'You have rated all available courses!'
        })
    
    if model_data is None:
        train_model()
    
    if model_data is None:
        user_rated_courses = {r.course_id: r.rating for r in user_ratings}
        avg_ratings_by_category = {}
        for r in user_ratings:
            course = session.query(Course).filter(Course.id == r.course_id).first()
            if course:
                if course.category not in avg_ratings_by_category:
                    avg_ratings_by_category[course.category] = []
                avg_ratings_by_category[course.category].append(r.rating)
        
        category_scores = {cat: np.mean(ratings) for cat, ratings in avg_ratings_by_category.items()}
        
        fallback_recommendations = []
        for course in all_courses:
            if course.id not in rated_course_ids:
                score = category_scores.get(course.category, 3.0)
                fallback_recommendations.append({
                    'course_id': course.id,
                    'predicted_rating': score,
                    'title': course.title,
                    'description': course.description,
                    'category': course.category
                })
        
        fallback_recommendations.sort(key=lambda x: x['predicted_rating'], reverse=True)
        top_recommendations = fallback_recommendations[:10]
        
        explanations = {}
        for rec in top_recommendations:
            explanation = generate_explanation(user_id, rec['course_id'], session)
            explanations[rec['course_id']] = explanation
        
        session.close()
        return jsonify({
            'recommendations': top_recommendations,
            'explanations': explanations
        })
    
    predictions = []
    for course in all_courses:
        if course.id not in rated_course_ids:
            try:
                pred = model_data.predict(user_id, course.id)
                predictions.append({
                    'course_id': course.id,
                    'predicted_rating': pred,
                    'title': course.title,
                    'description': course.description,
                    'category': course.category
                })
            except:
                try:
                    pred = model_data.global_mean
                    predictions.append({
                        'course_id': course.id,
                        'predicted_rating': pred,
                        'title': course.title,
                        'description': course.description,
                        'category': course.category
                    })
                except:
                    pass
    
    predictions.sort(key=lambda x: x['predicted_rating'], reverse=True)
    top_recommendations = predictions[:10]
    
    explanations = {}
    for rec in top_recommendations:
        course_id = rec['course_id']
        explanation = generate_explanation(user_id, course_id, session)
        explanations[course_id] = explanation
    
    session.close()
    
    return jsonify({
        'recommendations': top_recommendations,
        'explanations': explanations
    })

def generate_explanation(user_id, course_id, session):
    similar_users = session.query(Rating).filter(
        Rating.course_id == course_id,
        Rating.rating >= 4.0
    ).limit(5).all()
    
    if similar_users:
        user_ids = [r.user_id for r in similar_users]
        user_ratings = session.query(Rating).filter(Rating.user_id == user_id).all()
        user_rated_courses = {r.course_id: r.rating for r in user_ratings}
        
        similar_items = []
        for similar_user_id in user_ids[:3]:
            similar_user_ratings = session.query(Rating).filter(
                Rating.user_id == similar_user_id
            ).all()
            common_courses = [r for r in similar_user_ratings if r.course_id in user_rated_courses]
            if common_courses:
                similar_items.append({
                    'user_id': similar_user_id,
                    'common_courses': len(common_courses)
                })
        
        if similar_items:
            return {
                'type': 'similar_users',
                'message': f"Users with similar preferences rated this course highly",
                'count': len(similar_items)
            }
    
    course = session.query(Course).filter(Course.id == course_id).first()
    similar_courses = session.query(Course).filter(
        Course.category == course.category,
        Course.id != course_id
    ).limit(3).all()
    
    if similar_courses:
        return {
            'type': 'similar_items',
            'message': f"Similar courses in {course.category} category",
            'count': len(similar_courses)
        }
    
    return {
        'type': 'general',
        'message': 'Recommended based on your profile'
    }

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    session = Session()
    ratings_data = session.query(Rating).all()
    session.close()
    
    if len(ratings_data) < 10:
        return jsonify({'error': 'Not enough data for metrics'}), 400
    
    ratings_list = [(r.user_id, r.course_id, r.rating) for r in ratings_data]
    df = pd.DataFrame(ratings_list, columns=['user_id', 'course_id', 'rating'])
    
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
    
    temp_model = train_model_from_dataframe(train_df)
    
    if temp_model is None:
        return jsonify({'error': 'Failed to train model'}), 400
    
    predictions = []
    actuals = []
    for _, row in test_df.iterrows():
        try:
            pred = temp_model.predict(row['user_id'], row['course_id'])
            predictions.append(pred)
            actuals.append(row['rating'])
        except:
            continue
    
    if len(predictions) == 0:
        return jsonify({'error': 'No predictions generated'}), 400
    
    rmse = np.sqrt(np.mean((np.array(predictions) - np.array(actuals)) ** 2))
    top_k_precision = calculate_top_k_precision(temp_model, test_df, k=5)
    
    return jsonify({
        'rmse': round(rmse, 4),
        'top_k_precision': round(top_k_precision, 4)
    })

def calculate_top_k_precision(model, test_df, k=5):
    if model is None:
        return 0.0
    
    user_predictions = defaultdict(list)
    for _, row in test_df.iterrows():
        try:
            pred = model.predict(row['user_id'], row['course_id'])
            user_predictions[row['user_id']].append((row['course_id'], pred, row['rating']))
        except:
            continue
    
    precisions = []
    for user_id, predictions_list in user_predictions.items():
        predictions_list.sort(key=lambda x: x[1], reverse=True)
        top_k = predictions_list[:k]
        relevant = sum(1 for _, _, true_r in top_k if true_r >= 4.0)
        if len(top_k) > 0:
            precisions.append(relevant / min(k, len(top_k)))
    
    return np.mean(precisions) if precisions else 0.0

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

