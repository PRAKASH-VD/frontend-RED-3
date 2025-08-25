import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

export default function MapView({ properties = [] }) {
  const firstWithCoords = properties.find(p => p?.location?.lat && p?.location?.lng)
  const center = firstWithCoords ? [firstWithCoords.location.lat, firstWithCoords.location.lng] : [20.5937, 78.9629]

  return (
    <div className="card overflow-hidden">
      <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properties
            .filter(p => p?.location?.lat && p?.location?.lng)
            .map((p) => {
              const id = p._id || p.id
              if (!id) return null
              return (
                <Marker key={id} position={[p.location.lat, p.location.lng]} icon={markerIcon}>
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-semibold">{p.title || p.type}</div>
                      <div className="text-sm">{formatCurrency(p.price)}</div>
                      <Link to={`/property/${id}`} className="text-brand text-sm underline">View</Link>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
        </MapContainer>
      </div>
    </div>
  )
}