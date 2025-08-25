import { useEffect, useState } from 'react'
import { propertyService } from '../services/propertyService'
import { agentService } from '../services/agentService'

export default function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [agents, setAgents] = useState([])

  useEffect(() => {
    const load = async () => {
      const [props, ags] = await Promise.all([
        propertyService.list(),
        agentService.list()
      ])
      setProperties(Array.isArray(props) ? props : (props.items || []))
      setAgents(Array.isArray(ags) ? ags : (ags.items || []))
    }
    load()
  }, [])

  return (
    <div className="container py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-4">
        <div className="font-semibold mb-3">All Properties</div>
        <div className="text-sm text-gray-600 mb-2">Total: {properties.length}</div>
        <div className="max-h-[420px] overflow-auto space-y-2">
          {properties.map(p => (
            <div key={p._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{p.type} • {p.city}</div>
              </div>
              <div className="text-xs">{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-3">Agents</div>
        <div className="text-sm text-gray-600 mb-2">Total: {agents.length}</div>
        <div className="max-h-[420px] overflow-auto space-y-2">
          {agents.map(a => (
            <div key={a._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-gray-500">{a.email}</div>
              </div>
              <div className="text-xs">{a.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}