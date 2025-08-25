import { formatCurrency, getPrimaryImage } from '../utils'
import { Link } from 'react-router-dom'

export default function AgentProfile({ agent, properties = [] }) {
  return (
    <div className="container py-6 space-y-6">
      <div className="card p-6 flex flex-col md:flex-row items-center gap-6">
        <img src={agent.avatar || 'https://i.pravatar.cc/120'} alt={agent.name} className="h-24 w-24 rounded-full object-cover" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{agent.name}</h1>
          <div className="text-gray-600">{agent.email}</div>
          <p className="text-gray-700 mt-2">{agent.bio}</p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="badge">Listings: {properties.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p._id} className="card overflow-hidden">
            <Link to={`/property/${p._id}`}>
              <img src={getPrimaryImage(p.images)} className="h-40 w-full object-cover" />
            </Link>
            <div className="p-3 space-y-1">
              <div className="font-medium line-clamp-1">{p.title || p.type}</div>
              <div className="text-brand font-bold">{formatCurrency(p.price)}</div>
              <Link to={`/property/${p._id}`} className="text-brand text-sm underline">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}