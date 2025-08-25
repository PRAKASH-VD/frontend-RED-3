import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency, getPrimaryImage, propertyAddress } from '../utils'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) return this.props.fallback || null
    return this.props.children
  }
}

export function PropertyCard(props) {
  const p = props?.property && typeof props.property === 'object' ? props.property : null
  const isCompared = props?.isCompared ?? false
  const onToggleCompare = props?.onToggleCompare

  // must have an id to render/link
  const id = p?._id || p?.id
  if (!p || !id) return null

  return (
    <div className="card overflow-hidden">
      <Link to={`/property/${id}`}>
        <img src={getPrimaryImage(p.images)} alt={p.title || p.type || 'Property'} className="h-48 w-full object-cover" />
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{p.title || p.type || 'Property'}</h3>
          <div className="text-brand font-bold">{formatCurrency(p.price)}</div>
        </div>
        <div className="text-sm text-gray-500">{propertyAddress(p)}</div>
        <div className="flex gap-3 text-xs text-gray-600">
          {p.type ? <span className="badge">{p.type}</span> : null}
          {p.bedrooms ? <span className="badge">{p.bedrooms} bd</span> : null}
          {p.bathrooms ? <span className="badge">{p.bathrooms} ba</span> : null}
          {p.size ? <span className="badge">{p.size} sqft</span> : null}
        </div>
        <div className="flex justify-between pt-2">
          <Link to={`/property/${id}`} className="btn-outline text-gray-700">Details</Link>
          <button onClick={() => onToggleCompare?.(p)} className={`btn ${isCompared ? 'bg-gray-800 text-white' : 'btn-outline text-gray-700'}`}>
            {isCompared ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  )
}