import { Link } from 'react-router-dom'
import { formatCurrency, getPrimaryImage, propertyAddress } from '../utils'

export default function PropertyCard({ property = null, onToggleCompare, isCompared }) {
  if (!property) return null
  const {
    _id,
    title,
    price,
    images,
    bedrooms,
    bathrooms,
    size,
    type
  } = property

  return (
    <div className="card overflow-hidden">
      <Link to={`/property/${_id}`}>
        <img
          src={getPrimaryImage(images)}
          alt={title || type || 'Property'}
          loading="lazy"
          className="w-full h-44 sm:h-52 md:h-60 object-cover"
        />
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{title || type}</h3>
          <div className="text-brand font-bold">{formatCurrency(price)}</div>
        </div>
        <div className="text-sm text-gray-500">{propertyAddress(property)}</div>
        <div className="flex gap-3 text-xs text-gray-600">
          <span className="badge">{type || 'Property'}</span>
          {bedrooms ? <span className="badge">{bedrooms} bd</span> : null}
          {bathrooms ? <span className="badge">{bathrooms} ba</span> : null}
          {size ? <span className="badge">{size} sqft</span> : null}
        </div>
        <div className="flex justify-between pt-2">
          <Link to={`/property/${_id}`} className="btn-outline text-gray-700">Details</Link>
          <button onClick={() => onToggleCompare?.(property)} className={`btn ${isCompared ? 'bg-gray-800 text-white' : 'btn-outline text-gray-700'}`}>
            {isCompared ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  )
}