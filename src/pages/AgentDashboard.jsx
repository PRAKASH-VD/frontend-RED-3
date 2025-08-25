import { useEffect, useState } from 'react'
import { agentService } from '../services/agentService'
import { propertyService } from '../services/propertyService'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

export default function AgentDashboard() {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const { register: regProfile, handleSubmit: handleProfile, reset: resetProfile } = useForm()

  const load = async () => {
    setLoading(true)
    try {
      const res = await agentService.myProperties()
      setListings(Array.isArray(res) ? res : (res.items || []))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (values) => {
    try {
      if (editing?._id) await propertyService.update(editing._id, values)
      else await propertyService.create(values)
      reset(); setEditing(null); await load()
    } catch (e) {
      alert('Save failed')
    }
  }

  const onEdit = (p) => { setEditing(p); reset(p) }
  const onDelete = async (p) => {
    if (!confirm('Delete this property?')) return
    await propertyService.remove(p._id); await load()
  }

  const onSaveProfile = async (values) => {
    await agentService.upsertProfile(values)
    alert('Profile saved')
  }

  return (
    <div className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-3">{editing ? 'Edit Property' : 'Add Property'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="input" placeholder="Title" {...register('title', { required: true })} />
            <input className="input" placeholder="Type (House, Apartment...)" {...register('type')} />
            <input className="input" placeholder="Price" type="number" {...register('price', { required: true })} />
            <input className="input" placeholder="Size (sqft)" type="number" {...register('size')} />
            <input className="input" placeholder="Bedrooms" type="number" {...register('bedrooms')} />
            <input className="input" placeholder="Bathrooms" type="number" {...register('bathrooms')} />
            <input className="input" placeholder="Address" {...register('address')} />
            <input className="input" placeholder="City" {...register('city')} />
            <input className="input" placeholder="State" {...register('state')} />
            <input className="input" placeholder="Latitude" type="number" step="any" {...register('location.lat')} />
            <input className="input" placeholder="Longitude" type="number" step="any" {...register('location.lng')} />
            <input className="input md:col-span-2" placeholder="Primary Image URL" {...register('images.0')} />
            <textarea className="input md:col-span-2" rows={3} placeholder="Description" {...register('description')} />
            <div className="md:col-span-2 flex gap-3">
              <button className="btn-primary" type="submit">{editing ? 'Update' : 'Create'}</button>
              {editing ? <button type="button" className="btn-outline" onClick={() => { setEditing(null); reset({}) }}>Cancel</button> : null}
            </div>
          </form>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-3">My Listings</div>
          {loading && <div>Loading...</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2">Title</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">City</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(p => (
                  <tr key={p._id} className="border-t">
                    <td className="py-2">{p.title}</td>
                    <td className="py-2">{p.type}</td>
                    <td className="py-2">{p.city}</td>
                    <td className="py-2">{p.price}</td>
                    <td className="py-2 space-x-2">
                      <button className="btn-outline text-gray-700" onClick={() => onEdit(p)}>Edit</button>
                      <button className="btn-outline text-red-600" onClick={() => onDelete(p)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!listings.length && !loading && (
                  <tr><td colSpan="5" className="py-4 text-center text-gray-500">No listings</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="card p-4">
          <div className="font-semibold mb-3">My Agent Profile</div>
          <form onSubmit={handleProfile(onSaveProfile)} className="space-y-3">
            <input className="input" placeholder="Name" defaultValue={user?.name} {...regProfile('name')} />
            <input className="input" placeholder="Phone" {...regProfile('phone')} />
            <input className="input" placeholder="Avatar URL" {...regProfile('avatar')} />
            <textarea className="input" rows={3} placeholder="Bio" {...regProfile('bio')} />
            <button className="btn-outline" type="submit">Save Profile</button>
          </form>
        </div>
      </aside>
    </div>
  )
}