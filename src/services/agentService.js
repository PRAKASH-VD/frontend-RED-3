import api from './apiClient'
import { propertyService } from './propertyService'

export const agentService = {
  async list(params = {}) {
    const { data } = await api.get('/agents', { params })
    return data
  },
  async get(id) {
    // keep your existing implementation if you already have it
    return null
  },
  async myProperties() {
    const { data } = await api.get('/agents/me/properties')
    return data
  },
  async upsertProfile(payload) {
    const { data } = await api.put('/agents/me', payload)
    return data
  },
  async propertiesByAgent(id, params = {}) {
    const res = await propertyService.list({ ...params, agentId: id })
    return res.items
  }
}