import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CompareBar() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const onStorage = () => {
      try { setItems(JSON.parse(localStorage.getItem('compare') || '[]')) } catch {}
    }
    onStorage()
    const id = setInterval(onStorage, 1000)
    return () => clearInterval(id)
  }, [])
  if (!items.length) return null
  return (
    <div className="fixed bottom-4 left-0 right-0">
      <div className="container">
        <div className="card p-3 flex items-center justify-between">
          <div className="text-sm">{items.length} selected for comparison</div>
          <Link to="/compare" className="btn-primary">Compare</Link>
        </div>
      </div>
    </div>
  )
}