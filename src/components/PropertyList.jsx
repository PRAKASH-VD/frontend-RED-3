import { useEffect, useRef, useState } from "react"
import PropertyCard from "./PropertyCard"
import SearchFilters from "./SearchFilters"
import { propertyService } from "../services/propertyService"

export default function PropertyList() {
  const [properties, setProperties] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({})
  const debounceRef = useRef(null)

  // handle filters with debounce
  const handleFiltersChange = (next) => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setParams(next), 300)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await propertyService.list(params)
        setProperties(res.items)
        setTotal(res.total)
      } catch (err) {
        console.error("Failed to load properties", err)
        setProperties([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params])

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      <SearchFilters onChange={handleFiltersChange} />

      {loading ? (
        <div className="text-center py-8">Loading properties...</div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No properties found
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        Total: {total} properties
      </div>
    </section>
  )
}
