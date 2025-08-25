export const formatCurrency = (value) =>
  typeof value === 'number'
    ? value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : value

export const truncate = (str = '', n = 120) => (str.length > n ? str.slice(0, n - 1) + '…' : str)

export const getPrimaryImage = (images) => {
  if (Array.isArray(images) && images.length) return images[0]
  if (typeof images === 'string') return images
  return 'https://via.placeholder.com/640x360?text=No+Image'
}

export const propertyAddress = (p) =>
  [p?.address, p?.city, p?.state].filter(Boolean).join(', ')