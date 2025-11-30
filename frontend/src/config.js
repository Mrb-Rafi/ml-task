// API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const getApiUrl = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${API_URL}/${cleanPath}`
}

export default API_URL

