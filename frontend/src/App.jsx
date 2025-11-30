import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import ProfileSetup from './components/ProfileSetup'
import Dashboard from './components/Dashboard'
import About from './components/About'
import './App.css'

function App() {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId')
  })

  const handleProfileComplete = (id) => {
    setUserId(id)
    localStorage.setItem('userId', id)
  }

  return (
    <Router>
      <div className="app">
        <nav className="main-nav">
          <Link to="/about" className="nav-link">About</Link>
          {userId && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
        </nav>
        <Routes>
          <Route 
            path="/" 
            element={
              userId ? 
                <Navigate to="/dashboard" replace /> : 
                <ProfileSetup onComplete={handleProfileComplete} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              userId ? 
                <Dashboard userId={parseInt(userId)} /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

