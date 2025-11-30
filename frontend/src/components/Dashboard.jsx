import { useState, useEffect } from 'react'
import { getApiUrl } from '../config'
import './Dashboard.css'

function Dashboard({ userId }) {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [ratings, setRatings] = useState({})
  const [pendingRatings, setPendingRatings] = useState({}) // Temporary ratings before confirmation
  const [recommendations, setRecommendations] = useState([])
  const [explanations, setExplanations] = useState({})
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('rate')

  useEffect(() => {
    loadData()
  }, [userId])

  const loadData = async () => {
    try {
      const [userRes, coursesRes, ratingsRes, recRes, metricsRes] = await Promise.all([
        fetch(getApiUrl(`api/users/${userId}`)),
        fetch(getApiUrl('api/courses')),
        fetch(getApiUrl(`api/ratings/user/${userId}`)),
        fetch(getApiUrl(`api/recommendations/${userId}`)),
        fetch(getApiUrl('api/metrics'))
      ])

      const userData = await userRes.json()
      const coursesData = await coursesRes.json()
      const ratingsData = await ratingsRes.json()
      const recData = await recRes.json()
      
      setUser(userData)
      setCourses(coursesData)
      
      const ratingsMap = {}
      ratingsData.forEach(r => {
        ratingsMap[r.course_id] = r.rating
      })
      setRatings(ratingsMap)
      
      setRecommendations(recData.recommendations || [])
      setExplanations(recData.explanations || {})

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json()
        setMetrics(metricsData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStarClick = (courseId, rating) => {
    // Set temporary rating (preview)
    setPendingRatings(prev => ({ ...prev, [courseId]: rating }))
  }

  const handleConfirmRating = async (courseId) => {
    const rating = pendingRatings[courseId]
    if (!rating) return

    try {
      await fetch(getApiUrl('api/ratings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          course_id: courseId,
          rating: rating
        })
      })
      
      // Move from pending to confirmed
      setRatings(prev => ({ ...prev, [courseId]: rating }))
      setPendingRatings(prev => {
        const newPending = { ...prev }
        delete newPending[courseId]
        return newPending
      })
      
      // Reload recommendations
      const recRes = await fetch(getApiUrl(`api/recommendations/${userId}`))
      const recData = await recRes.json()
      setRecommendations(recData.recommendations || [])
      setExplanations(recData.explanations || {})
    } catch (error) {
      console.error('Error saving rating:', error)
    }
  }

  const handleUnrate = async (courseId) => {
    if (!window.confirm('Are you sure you want to remove your rating for this course?')) {
      return
    }

    try {
      await fetch(getApiUrl('api/ratings'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          course_id: courseId
        })
      })
      
      // Remove from ratings
      setRatings(prev => {
        const newRatings = { ...prev }
        delete newRatings[courseId]
        return newRatings
      })
      
      // Reload recommendations
      const recRes = await fetch(getApiUrl(`api/recommendations/${userId}`))
      const recData = await recRes.json()
      setRecommendations(recData.recommendations || [])
      setExplanations(recData.explanations || {})
    } catch (error) {
      console.error('Error deleting rating:', error)
      alert('Failed to remove rating. Please try again.')
    }
  }

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete your account and all your data? This cannot be undone.')) {
      return
    }

    try {
      await fetch(getApiUrl(`api/users/${userId}`), {
        method: 'DELETE'
      })
      
      // Clear local storage and redirect
      localStorage.removeItem('userId')
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete account. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p className="user-info">
            {user?.interests?.length} interests • {user?.skills?.length} skills • {user?.time_per_week}h/week
          </p>
        </div>
        <div className="header-actions">
          {metrics && (
            <div className="metrics-card">
              <div className="metric">
                <span className="metric-label">RMSE</span>
                <span className="metric-value">{metrics.rmse}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Precision@5</span>
                <span className="metric-value">{metrics.top_k_precision}</span>
              </div>
            </div>
          )}
          <button className="delete-user-button" onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'rate' ? 'active' : ''}`}
          onClick={() => setActiveTab('rate')}
        >
          Rate Courses
        </button>
        <button
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
      </div>

      {activeTab === 'rate' && (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h3>{course.title}</h3>
                <span className="category">{course.category}</span>
              </div>
              <p className="course-description">{course.description}</p>
              <div className="rating-section">
                <span className="rating-label">Rate this course:</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => {
                    const currentRating = ratings[course.id] || pendingRatings[course.id] || 0
                    return (
                      <button
                        key={star}
                        className={`star ${currentRating >= star ? 'filled' : ''} ${pendingRatings[course.id] && !ratings[course.id] ? 'pending' : ''}`}
                        onClick={() => handleStarClick(course.id, star)}
                      >
                        ★
                      </button>
                    )
                  })}
                </div>
                {(ratings[course.id] || pendingRatings[course.id]) && (
                  <span className="current-rating">
                    ({ratings[course.id] || pendingRatings[course.id]}/5)
                    {pendingRatings[course.id] && !ratings[course.id] && ' (pending)'}
                  </span>
                )}
                {pendingRatings[course.id] && !ratings[course.id] && (
                  <button
                    className="rate-button"
                    onClick={() => handleConfirmRating(course.id)}
                  >
                    Rate
                  </button>
                )}
                {ratings[course.id] && (
                  <>
                    <span className="rated-badge">✓ Rated</span>
                    <button
                      className="unrate-button"
                      onClick={() => handleUnrate(course.id)}
                      title="Remove rating"
                    >
                      Unrate
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="recommendations-section">
          {recommendations.length === 0 ? (
            <div className="empty-state">
              {Object.keys(ratings).length >= courses.length ? (
                <>
                  <p>You've rated all available courses! 🎉</p>
                  <p className="empty-state-subtitle">
                    Check back later for new courses, or try rating some courses differently to see how recommendations change.
                  </p>
                </>
              ) : Object.keys(ratings).length < 3 ? (
                <>
                  <p>Rate at least 3 courses to get personalized recommendations!</p>
                  <p className="empty-state-subtitle">
                    You've rated {Object.keys(ratings).length} course{Object.keys(ratings).length !== 1 ? 's' : ''} so far.
                  </p>
                </>
              ) : (
                <>
                  <p>Loading recommendations...</p>
                  <p className="empty-state-subtitle">
                    You've rated {Object.keys(ratings).length} courses. Recommendations are being generated.
                  </p>
                  <button 
                    className="refresh-button"
                    onClick={loadData}
                  >
                    Refresh
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="recommendations-grid">
              {recommendations.map(rec => (
                <div key={rec.course_id} className="recommendation-card">
                  <div className="recommendation-header">
                    <h3>{rec.title}</h3>
                    <div className="predicted-rating">
                      <span className="rating-value">{rec.predicted_rating.toFixed(2)}</span>
                      <span className="rating-label-small">predicted</span>
                    </div>
                  </div>
                  <p className="course-description">{rec.description}</p>
                  <div className="explanation">
                    <div className="explanation-icon">💡</div>
                    <div className="explanation-text">
                      {explanations[rec.course_id]?.message || 'Recommended for you'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard

