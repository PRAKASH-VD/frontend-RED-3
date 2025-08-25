import React from 'react'
import { Link } from 'react-router-dom'
import PropertyList from '../components/PropertyList.jsx'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Find your next home, fast.
          </h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Search, compare and explore properties across cities with real‑time filters.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#list" className="btn bg-gradient-to-r from-indigo-500 to-sky-500 text-gray-900 hover:bg-gray-100">
              Browse Properties
            </a>
            <Link to="/compare" className="btn btn-outline text-white border-white/70 hover:bg-white/10">
              Compare
            </Link>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="list" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <PropertyList />
      </section>
    </main>
  )
}