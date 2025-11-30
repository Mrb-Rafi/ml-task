import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-section">
          <h1>About This Project</h1>
          
          <div className="author-info">
            <h2>Author Information</h2>
            <div className="info-card">
              <p><strong>Name:</strong> M. Rafiul Bahar Rafi</p>
              <p><strong>Student ID:</strong> 2109016</p>
              <p><strong>Program:</strong> BSc in Bioinformatics Engineering</p>
              <p><strong>Faculty:</strong> Faculty of Agricultural Engineering and Technology</p>
              <p><strong>University:</strong> Bangladesh Agricultural University</p>
              <p><strong>Course:</strong> Machine Learning, CSM 4122</p>
              <p><strong>Project Type:</strong> Course Assignment</p>
            </div>
          </div>

          <div className="project-overview">
            <h2>Project Overview</h2>
            <p>
              This is a full-stack web application that implements a collaborative filtering 
              recommendation system using matrix factorization (SVD - Singular Value Decomposition). 
              The system allows users to create profiles, rate courses, and receive personalized 
              course recommendations based on their preferences and similar users' behavior.
            </p>
          </div>

          <div className="tech-stack">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-category">
                <h3>Frontend</h3>
                <ul>
                  <li><strong>React 18.2</strong> - UI framework</li>
                  <li><strong>Vite</strong> - Build tool and dev server</li>
                  <li><strong>React Router</strong> - Client-side routing</li>
                  <li><strong>CSS3</strong> - Styling with dark pastel theme</li>
                </ul>
              </div>
              <div className="tech-category">
                <h3>Backend</h3>
                <ul>
                  <li><strong>Flask 3.0</strong> - Python web framework</li>
                  <li><strong>SQLAlchemy</strong> - ORM for database</li>
                  <li><strong>SQLite</strong> - Database (can be upgraded to PostgreSQL)</li>
                  <li><strong>Gunicorn</strong> - WSGI HTTP server for production</li>
                </ul>
              </div>
              <div className="tech-category">
                <h3>Machine Learning</h3>
                <ul>
                  <li><strong>NumPy</strong> - Numerical computing</li>
                  <li><strong>Pandas</strong> - Data manipulation</li>
                  <li><strong>SciPy</strong> - Scientific computing (SVD)</li>
                  <li><strong>Scikit-learn</strong> - ML utilities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="project-structure">
            <h2>Project Structure</h2>
            <div className="structure-tree">
              <div className="folder">
                <strong>ML_task/</strong>
                <div className="folder-content">
                  <div className="folder">
                    <strong>backend/</strong>
                    <div className="folder-content">
                      <div className="file">app.py - Main Flask application</div>
                      <div className="file">requirements.txt - Python dependencies</div>
                      <div className="file">Procfile - Production server config</div>
                      <div className="file">runtime.txt - Python version</div>
                      <div className="file">recommendations.db - SQLite database</div>
                    </div>
                  </div>
                  <div className="folder">
                    <strong>frontend/</strong>
                    <div className="folder-content">
                      <div className="folder">
                        <strong>src/</strong>
                        <div className="folder-content">
                          <div className="file">main.jsx - React entry point</div>
                          <div className="file">App.jsx - Main app component</div>
                          <div className="file">config.js - API configuration</div>
                          <div className="folder">
                            <strong>components/</strong>
                            <div className="folder-content">
                              <div className="file">ProfileSetup.jsx - User profile creation</div>
                              <div className="file">Dashboard.jsx - Main dashboard</div>
                              <div className="file">About.jsx - This page</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="file">package.json - Node dependencies</div>
                      <div className="file">vite.config.js - Vite configuration</div>
                      <div className="file">netlify.toml - Netlify deployment config</div>
                    </div>
                  </div>
                  <div className="file">README.md - Project documentation</div>
                  <div className="file">DEPLOYMENT.md - Deployment guide</div>
                  <div className="file">render.yaml - Render deployment config</div>
                </div>
              </div>
            </div>
          </div>

          <div className="file-details">
            <h2>File Descriptions</h2>
            
            <div className="file-section">
              <h3>Backend Files</h3>
              
              <div className="file-detail">
                <h4>app.py</h4>
                <p><strong>Purpose:</strong> Main Flask application with all API endpoints</p>
                <p><strong>Key Components:</strong></p>
                <ul>
                  <li><strong>Database Models:</strong> User, Course, Rating (SQLAlchemy ORM)</li>
                  <li><strong>SVDModel Class:</strong> Custom implementation of SVD matrix factorization</li>
                  <li><strong>API Endpoints:</strong>
                    <ul>
                      <li>POST /api/users - Create user profile</li>
                      <li>GET /api/users/:id - Get user details</li>
                      <li>DELETE /api/users/:id - Delete user account</li>
                      <li>GET /api/courses - Get all courses</li>
                      <li>POST /api/ratings - Create/update rating</li>
                      <li>DELETE /api/ratings - Remove rating</li>
                      <li>GET /api/ratings/user/:id - Get user's ratings</li>
                      <li>GET /api/recommendations/:id - Get personalized recommendations</li>
                      <li>GET /api/metrics - Get model evaluation metrics (RMSE, Precision@5)</li>
                    </ul>
                  </li>
                  <li><strong>ML Functions:</strong>
                    <ul>
                      <li>train_model() - Trains SVD model on all ratings</li>
                      <li>train_model_from_dataframe() - Trains model from DataFrame</li>
                      <li>generate_explanation() - Generates recommendation explanations</li>
                      <li>calculate_top_k_precision() - Calculates precision@k metric</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="file-detail">
                <h4>requirements.txt</h4>
                <p>Lists all Python dependencies with version constraints for compatibility with Python 3.12</p>
              </div>

              <div className="file-detail">
                <h4>Procfile</h4>
                <p>Specifies Gunicorn as the production WSGI server for Render deployment</p>
              </div>
            </div>

            <div className="file-section">
              <h3>Frontend Files</h3>
              
              <div className="file-detail">
                <h4>App.jsx</h4>
                <p>Main React component that handles routing between ProfileSetup and Dashboard pages</p>
              </div>

              <div className="file-detail">
                <h4>ProfileSetup.jsx</h4>
                <p><strong>Purpose:</strong> User onboarding component</p>
                <p><strong>Features:</strong></p>
                <ul>
                  <li>Name input</li>
                  <li>Interest selection (chip-based UI)</li>
                  <li>Skill selection (chip-based UI)</li>
                  <li>Time per week input</li>
                  <li>Creates user profile via API</li>
                </ul>
              </div>

              <div className="file-detail">
                <h4>Dashboard.jsx</h4>
                <p><strong>Purpose:</strong> Main user interface after login</p>
                <p><strong>Features:</strong></p>
                <ul>
                  <li><strong>Two Tabs:</strong>
                    <ul>
                      <li>Rate Courses - Browse and rate available courses</li>
                      <li>Recommendations - View personalized course recommendations</li>
                    </ul>
                  </li>
                  <li><strong>Rating System:</strong>
                    <ul>
                      <li>5-star rating interface</li>
                      <li>Preview before confirming</li>
                      <li>"Rate" button to confirm</li>
                      <li>"Unrate" button to remove ratings</li>
                    </ul>
                  </li>
                  <li><strong>Recommendations:</strong>
                    <ul>
                      <li>Shows top 10 recommended courses</li>
                      <li>Displays predicted ratings</li>
                      <li>Explains why each course is recommended</li>
                    </ul>
                  </li>
                  <li><strong>Metrics Display:</strong> Shows RMSE and Precision@5</li>
                  <li><strong>Account Management:</strong> Delete account button</li>
                </ul>
              </div>

              <div className="file-detail">
                <h4>config.js</h4>
                <p>Centralized API configuration that reads VITE_API_URL environment variable for production deployment</p>
              </div>

              <div className="file-detail">
                <h4>CSS Files</h4>
                <p>Component-specific styling with dark pastel color palette:
                  <ul>
                    <li>Background: Deep purple gradients (#2d1b3d, #1a1a2e)</li>
                    <li>Primary: Purple pastels (#a78bfa, #8b5cf6)</li>
                    <li>Text: Light pastels (#e8d5e3, #b8a9c9)</li>
                    <li>Glassmorphism effects with backdrop blur</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div className="workflow-section">
            <h2>Application Workflow</h2>
            
            <div className="workflow-step">
              <h3>1. User Registration</h3>
              <ol>
                <li>User visits the application</li>
                <li>Fills out profile form (name, interests, skills, time availability)</li>
                <li>Frontend sends POST request to /api/users</li>
                <li>Backend creates User record in database</li>
                <li>User ID stored in localStorage</li>
                <li>Redirect to Dashboard</li>
              </ol>
            </div>

            <div className="workflow-step">
              <h3>2. Course Rating</h3>
              <ol>
                <li>User browses courses in "Rate Courses" tab</li>
                <li>Clicks stars to preview rating (shows in purple)</li>
                <li>Clicks "Rate" button to confirm</li>
                <li>Frontend sends POST /api/ratings with user_id, course_id, rating</li>
                <li>Backend saves/updates rating in database</li>
                <li>Backend retrains recommendation model</li>
                <li>Frontend refreshes recommendations</li>
              </ol>
            </div>

            <div className="workflow-step">
              <h3>3. Recommendation Generation</h3>
              <ol>
                <li>User clicks "Recommendations" tab</li>
                <li>Frontend requests GET /api/recommendations/:user_id</li>
                <li>Backend checks if model exists, trains if needed (requires ≥3 ratings)</li>
                <li>Backend creates user-course rating matrix</li>
                <li>Applies SVD (Singular Value Decomposition) for matrix factorization</li>
                <li>For each unrated course:
                  <ul>
                    <li>Calculates predicted rating using: global_mean + user_bias + course_bias + interaction</li>
                    <li>Interaction = dot product of user and course latent factors</li>
                  </ul>
                </li>
                <li>Sorts courses by predicted rating</li>
                <li>Generates explanations (similar users or similar items)</li>
                <li>Returns top 10 recommendations with explanations</li>
              </ol>
            </div>

            <div className="workflow-step">
              <h3>4. Model Training Process</h3>
              <ol>
                <li>Collects all ratings from database</li>
                <li>Creates user-course rating matrix</li>
                <li>Calculates global mean, user means, course means</li>
                <li>Normalizes matrix by subtracting user means</li>
                <li>Applies SVD decomposition: U, Σ, V^T</li>
                <li>Reconstructs latent factors:
                  <ul>
                    <li>User factors = U × √Σ</li>
                    <li>Course factors = (√Σ × V^T)^T</li>
                  </ul>
                </li>
                <li>Stores factors for prediction</li>
              </ol>
            </div>

            <div className="workflow-step">
              <h3>5. Evaluation Metrics</h3>
              <ol>
                <li>User views metrics in dashboard header</li>
                <li>Frontend requests GET /api/metrics</li>
                <li>Backend splits ratings into train/test (80/20)</li>
                <li>Trains model on training set</li>
                <li>Calculates RMSE on test set</li>
                <li>Calculates Precision@5 (top-k precision)</li>
                <li>Returns metrics to frontend</li>
              </ol>
            </div>
          </div>

          <div className="ml-algorithm">
            <h2>Machine Learning Algorithm: Collaborative Filtering with SVD</h2>
            
            <div className="algorithm-detail">
              <h3>Matrix Factorization Approach</h3>
              <p>
                The recommendation system uses <strong>Singular Value Decomposition (SVD)</strong> 
                for collaborative filtering. This is a matrix factorization technique that decomposes 
                the user-item rating matrix into lower-dimensional latent factor matrices.
              </p>
              
              <h4>Mathematical Model:</h4>
              <div className="formula">
                <p><strong>R ≈ U × Σ × V^T</strong></p>
                <p>Where:</p>
                <ul>
                  <li><strong>R</strong> = User-Course Rating Matrix (m × n)</li>
                  <li><strong>U</strong> = User Latent Factors (m × k)</li>
                  <li><strong>Σ</strong> = Singular Values (k × k diagonal)</li>
                  <li><strong>V^T</strong> = Course Latent Factors (k × n)</li>
                  <li><strong>k</strong> = Number of latent factors (typically 50)</li>
                </ul>
              </div>

              <h4>Prediction Formula:</h4>
              <div className="formula">
                <p><strong>predicted_rating = global_mean + user_bias + course_bias + (user_factors · course_factors)</strong></p>
                <p>Where:</p>
                <ul>
                  <li><strong>global_mean</strong> = Average of all ratings</li>
                  <li><strong>user_bias</strong> = User's average rating - global_mean</li>
                  <li><strong>course_bias</strong> = Course's average rating - global_mean</li>
                  <li><strong>user_factors · course_factors</strong> = Dot product of latent factors</li>
                </ul>
              </div>

              <h4>Advantages:</h4>
              <ul>
                <li>Handles sparse rating matrices well</li>
                <li>Captures latent user preferences and course characteristics</li>
                <li>Scalable to large datasets</li>
                <li>Provides interpretable recommendations</li>
              </ul>
            </div>
          </div>

          <div className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🎯 User Profiles</h3>
                <p>Create detailed profiles with interests, skills, and time availability</p>
              </div>
              <div className="feature-card">
                <h3>⭐ Rating System</h3>
                <p>Rate courses 1-5 stars with preview before confirmation</p>
              </div>
              <div className="feature-card">
                <h3>🤖 ML Recommendations</h3>
                <p>Personalized recommendations using SVD matrix factorization</p>
              </div>
              <div className="feature-card">
                <h3>💡 Explanations</h3>
                <p>Understand why courses are recommended (similar users/items)</p>
              </div>
              <div className="feature-card">
                <h3>📊 Evaluation Metrics</h3>
                <p>View RMSE and Precision@5 metrics for model performance</p>
              </div>
              <div className="feature-card">
                <h3>🎨 Modern UI</h3>
                <p>Dark pastel theme with glassmorphism effects</p>
              </div>
              <div className="feature-card">
                <h3>🔄 Unrate Courses</h3>
                <p>Remove ratings to update preferences</p>
              </div>
              <div className="feature-card">
                <h3>🗑️ Account Management</h3>
                <p>Delete account and start fresh</p>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h2>Deployment</h2>
            <p>
              The application can be deployed to various hosting platforms. Both frontend and backend 
              can be deployed separately:
            </p>
            <ul>
              <li><strong>Backend:</strong> Python web service with Gunicorn</li>
              <li><strong>Frontend:</strong> Static site built with Vite</li>
              <li><strong>Database:</strong> SQLite (can be upgraded to PostgreSQL for production)</li>
              <li><strong>Environment Variables:</strong> Configured for production CORS and API URLs</li>
            </ul>
          </div>

          <div className="conclusion">
            <h2>Conclusion</h2>
            <p>
              This project demonstrates a complete implementation of a collaborative filtering 
              recommendation system using matrix factorization. It combines modern web development 
              practices with machine learning algorithms to create a user-friendly course 
              recommendation platform. The system learns from user behavior and provides 
              personalized recommendations with explanations, making it both functional and 
              educational.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

