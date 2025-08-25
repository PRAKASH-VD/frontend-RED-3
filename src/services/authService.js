import { http } from './http'

export const authService = {
  async register({ username, email, password }) {
    const { data } = await http.post('/auth/register', { username, email, password })
    return data
  },
  async login({ email, password }) {
    const { data } = await http.post('/auth/login', { email, password })
    return data
  },
  async me() {
    const { data } = await http.get('/auth/me')
    return data?.user ?? null
  },
  async logout() {
    const { data } = await http.post('/auth/logout')
    return data
  }
}