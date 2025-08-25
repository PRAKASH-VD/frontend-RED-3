// src/services/inquiryService.js
import { http } from './http'

export const inquiryService = {
  async create({ propertyId, name, email, message }) {
    const { data } = await http.post('/inquiries', {
      propertyId,
      name,
      email,
      message
    })
    return data
  }
}
