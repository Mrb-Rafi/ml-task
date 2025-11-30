import { useState } from 'react'
import { getApiUrl } from '../config'
import './ProfileSetup.css'

const INTERESTS = [
  'Data Science', 'Web Development', 'Machine Learning', 'Mobile Development',
  'Cloud Computing', 'Cybersecurity', 'Game Development', 'UI/UX Design'
]

const SKILLS = [
  'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 'SQL',
  'TensorFlow', 'Docker', 'AWS', 'Git', 'MongoDB'
]

function ProfileSetup({ onComplete }) {
  const [name, setName] = useState('')
  const [selectedInterests, setSelectedInterests] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [timePerWeek, setTimePerWeek] = useState(5)
  const [loading, setLoading] = useState(false)

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(getApiUrl('api/users'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          interests: selectedInterests,
          skills: selectedSkills,
          time_per_week: timePerWeek
        })
      })
      const data = await response.json()
      onComplete(data.id)
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-setup">
      <div className="profile-card">
        <h1>Create Your Profile</h1>
        <p className="subtitle">Help us recommend the perfect courses for you</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Interests</label>
            <div className="chip-container">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  className={`chip ${selectedInterests.includes(interest) ? 'active' : ''}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="chip-container">
              {SKILLS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  className={`chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Time per Week (hours)</label>
            <input
              type="number"
              min="1"
              max="40"
              value={timePerWeek}
              onChange={(e) => setTimePerWeek(parseInt(e.target.value))}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileSetup

