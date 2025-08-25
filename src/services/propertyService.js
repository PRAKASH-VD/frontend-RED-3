import { http } from './http'

// Translate UI filter params → API query params
const toApiQuery = (p = {}) => {
  const out = {}

  // text search
  if (p.search && p.search.trim()) out.q = p.search.trim()
  if (p.city && p.city.trim()) out.city = p.city.trim()
  if (p.type) out.type = p.type

  // numbers (ensure valid)
  const toNum = (v) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }

  const minPrice = toNum(p.minPrice)
  const maxPrice = toNum(p.maxPrice)
  if (minPrice !== undefined) out.minPrice = minPrice
  if (maxPrice !== undefined) out.maxPrice = maxPrice
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    // avoid invalid range
    delete out.maxPrice
  }

  // bedrooms = "X+" → minBedrooms
  const minBedrooms = toNum(p.bedrooms)
  if (minBedrooms !== undefined) out.minBedrooms = minBedrooms

  // pagination/sort passthrough
  if (p.page) out.page = toNum(p.page)
  if (p.limit) out.limit = toNum(p.limit)
  if (p.sort) out.sort = p.sort
  if (p.order) out.order = p.order

  return out
}

export const propertyService = {
  async list(params = {}) {
    const query = toApiQuery(params)
    const { data } = await http.get('/properties', {
      params: query,
      withCredentials: false,
    })

    const array =
      Array.isArray(data) ? data :
      Array.isArray(data?.data) ? data.data :
      Array.isArray(data?.items) ? data.items :
      Array.isArray(data?.properties) ? data.properties : []

    const items = array.filter(Boolean).map(p => ({
      ...p,
      _id: p._id || p.id,
    }))

    const total = typeof data?.total === 'number' ? data.total : items.length
    return { items, total }
  },

  async get(id) {
    const { data } = await http.get(`/properties/${id}`, {
      withCredentials: false,
    })
    const p = data?.data || data
    return p && typeof p === 'object'
      ? { ...p, _id: p._id || p.id }
      : null
  },
}
