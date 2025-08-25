import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        // if token exists, me() will send it via interceptor
        const u = await authService.me()
        setUser(u || null)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const register = async (payload) => {
    const data = await authService.register(payload)
    const token = data?.token
    if (token) localStorage.setItem('auth_token', token)
    setUser(data?.user || null)
    return data?.user || null
  }

  const login = async (payload) => {
    const data = await authService.login(payload)
    const token = data?.token
    if (token) localStorage.setItem('auth_token', token)
    setUser(data?.user || null)
    return data?.user || null
  }

  const logout = async () => {
    try { await authService.logout() } catch {}
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)