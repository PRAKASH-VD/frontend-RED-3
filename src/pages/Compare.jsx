import { useMemo } from 'react'
import { formatCurrency, getPrimaryImage } from '../utils'
import { Link } from 'react-router-dom'

export default function Compare() {
  const items = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('compare') || '[]') } catch { return [] }
  }, [])
  if (!items.length) return <div className="container py-10">No properties selected.</div>
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => (
          <div key={p._id} className="card overflow-hidden">
            <img src={getPrimaryImage(p.images)} className="h-40 w-full object-cover" />
            <div className="p-4 space-y-1">
              <div className="font-semibold">{p.title || p.type}</div>
              <div className="text-brand font-bold">{formatCurrency(p.price)}</div>
              <div className="text-sm text-gray-600">{[p.address, p.city, p.state].filter(Boolean).join(', ')}</div>
              <div className="flex gap-3 text-xs text-gray-700">
                {p.bedrooms ? <span className="badge">{p.bedrooms} bd</span> : null}
                {p.bathrooms ? <span className="badge">{p.bathrooms} ba</span> : null}
                {p.size ? <span className="badge">{p.size} sqft</span> : null}
                {p.type ? <span className="badge">{p.type}</span> : null}
              </div>
              <Link to={`/property/${p._id}`} className="text-brand text-sm underline">View details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}