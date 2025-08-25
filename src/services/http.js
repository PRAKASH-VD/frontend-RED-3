import axios from 'axios'

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

// Add token from localStorage to every request
http.interceptors.request.use((config) => {
  // use the same key as AuthContext (auth_token)
  const token = localStorage.getItem('auth_token')
  if (token) config.headers = config.headers || {}, (config.headers.Authorization = `Bearer ${token}`)
  return config
})


// Optional: auto-logout on 401
http.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // localStorage.removeItem('auth_token')
    }
    return Promise.reject(err)
  }
)