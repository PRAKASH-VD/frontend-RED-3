import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { agentService } from '../services/agentService'
import PropertyCard from '../components/PropertyCard'

export default function Agent() {
  const { id } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const fetch = async () => {
      setLoading(true)
      try {
        const list = await agentService.propertiesByAgent(id)
        if (!ignore) setItems(list)
      } finally {
        setLoading(false)
      }
    }
    fetch()
    return () => { ignore = true }
  }, [id])

  if (loading) return <div className="container py-6">Loading...</div>

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-semibold mb-4">Agent’s Properties</h1>
      {items.length === 0 ? (
        <div>No properties found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(p => <PropertyCard key={p._id || p.id} property={p} />)}
        </div>
      )}
    </div>
  )
}