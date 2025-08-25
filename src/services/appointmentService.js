import { http } from './http'

export const appointmentService = {
  async create({ propertyId, datetime, note }) {
    const { data } = await http.post('/appointments', { propertyId, datetime, note })
    return data
  },
  async listMine() {
    const { data } = await http.get('/appointments/me')
    return data
  },
  async updateStatus(id, status) {
    const { data } = await http.put(`/appointments/${id}`, { status })
    return data
  }
}