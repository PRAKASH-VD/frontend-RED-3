import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBase = 'px-3 py-2 text-sm rounded-md transition-colors relative'
  const linkActive = 'text-brand font-semibold after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand/80'
  const linkIdle = 'text-gray-700 hover:text-brand'
  const linkCls = ({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`

  const Initials = ({ name }) => {
    const text = (name || '').trim()
    const initials = text ? text.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() : 'U'
    return (
      <div className="h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center text-xs">
        {initials}
      </div>
    )
  }

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${scrolled ? 'bg-white/85 shadow-sm border-b' : 'bg-white/70 border-b'}`}>
      <div className="max-w-7xl mx-auto h-14 px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="font-semibold text-xl tracking-tight">
          <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Real</span>
          <span className="text-gray-900">Estate</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink end to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/compare" className={linkCls}>Compare</NavLink>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/login" className={linkCls}>Login</NavLink>
              <NavLink to="/register" className="px-3 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/bookings" className={linkCls}>Bookings</NavLink>
              <NavLink to="/cart" className={linkCls}>Cart</NavLink>
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100">
                  <Initials name={user.username || user.name || user.email} />
                  <span className="text-sm text-gray-700">{user.username || user.name || 'Profile'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg p-1 hidden group-hover:block">
                  <NavLink to="/profile" className="block px-3 py-2 text-sm rounded hover:bg-gray-50">Profile</NavLink>
                  <button onClick={logout} className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50">Logout</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden bg-white border-t transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-col">
          <NavLink end to="/" className={linkCls} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/compare" className={linkCls} onClick={() => setOpen(false)}>Compare</NavLink>
          <div className="h-px my-2 bg-gray-200" />
          {!user ? (
            <>
              <NavLink to="/login" className={linkCls} onClick={() => setOpen(false)}>Login</NavLink>
              <NavLink
                to="/register"
                className="mt-1 px-3 py-2 text-sm rounded-md bg-gray-900 text-white text-center hover:bg-gray-800 transition-colors"
                onClick={() => setOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/bookings" className={linkCls} onClick={() => setOpen(false)}>Bookings</NavLink>
              <NavLink to="/cart" className={linkCls} onClick={() => setOpen(false)}>Cart</NavLink>
              <NavLink to="/profile" className={linkCls} onClick={() => setOpen(false)}>Profile</NavLink>
              <button onClick={() => { setOpen(false); logout() }} className="mt-1 px-3 py-2 text-sm rounded-md border text-gray-700 hover:bg-gray-50">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}