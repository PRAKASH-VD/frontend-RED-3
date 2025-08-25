import { useForm } from 'react-hook-form'
import { formatCurrency, getPrimaryImage, propertyAddress } from '../utils'
import { inquiryService } from '../services/inquiryService'
import { appointmentService } from '../services/appointmentService'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function PropertyDetails({ property }) {
  const { user } = useAuth()
  const { register, handleSubmit, reset } = useForm()
  const { register: reg2, handleSubmit: handleSubmit2, reset: reset2 } = useForm()

  const onInquiry = async (values) => {
    await inquiryService.create({ ...values, propertyId: property._id, agentId: property.agentId })
    reset()
    alert('Inquiry sent')
  }

  const onAppointment = async (values) => {
    await appointmentService.create({ ...values, propertyId: property._id })
    reset2()
    alert('Appointment requested')
  }

  return (
    <div className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <img src={getPrimaryImage(property.images)} className="w-full h-80 object-cover rounded-lg" alt={property.title} />
        <div className="card p-4 space-y-2">
          <h1 className="text-2xl font-bold">{property.title || property.type}</h1>
          <div className="text-sm text-gray-600">{propertyAddress(property)}</div>
          <div className="text-brand font-bold text-xl">{formatCurrency(property.price)}</div>
          <div className="flex gap-3 text-sm text-gray-700">
            {property.bedrooms ? <span className="badge">{property.bedrooms} bd</span> : null}
            {property.bathrooms ? <span className="badge">{property.bathrooms} ba</span> : null}
            {property.size ? <span className="badge">{property.size} sqft</span> : null}
            {property.type ? <span className="badge">{property.type}</span> : null}
          </div>
          <p className="text-gray-700 pt-2 whitespace-pre-wrap">{property.description}</p>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Contact Agent</div>
          {property.agent && (
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{property.agent.name}</div>
                <div className="text-gray-600">{property.agent.email}</div>
              </div>
              <Link to={`/agent/${property.agent._id}`} className="text-brand underline">View Profile</Link>
            </div>
          )}

          {!user ? (
            <div className="text-xs text-gray-500">
              Login to send an inquiry.
              <Link className="text-brand underline ml-1" to="/login">Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onInquiry)} className="space-y-3">
              <textarea className="input" placeholder="Message" rows={3} {...register('message', { required: true })} />
              <button className="btn-primary w-full" type="submit">Send Inquiry</button>
            </form>
          )}
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">Schedule a Viewing</div>
          {!user && <div className="text-xs text-gray-500">Login to schedule an appointment.</div>}
          <form onSubmit={handleSubmit2(onAppointment)} className="space-y-3">
            <input className="input" type="datetime-local" {...reg2('datetime', { required: true })} />
            <textarea className="input" placeholder="Notes" rows={3} {...reg2('notes')} />
            <button className="btn-outline w-full" type="submit" disabled={!user}>Request Appointment</button>
          </form>
        </div>
      </aside>
    </div>
  )
}