import { useState } from "react"

export default function SearchFilters({ onChange }) {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    type: "",
    bedrooms: "",
  })

  const update = (key, value) => {
    const next = { ...filters, [key]: value }
    setFilters(next)
    onChange(next)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-white shadow rounded-lg mb-6">
      <input
        type="text"
        placeholder="Search"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <input
        type="text"
        placeholder="City"
        value={filters.city}
        onChange={(e) => update("city", e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => update("minPrice", e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => update("maxPrice", e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
      </select>
      <select
        value={filters.bedrooms}
        onChange={(e) => update("bedrooms", e.target.value)}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
    </div>
  )
}
