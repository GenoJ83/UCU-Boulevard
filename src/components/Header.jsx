import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="container-max py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold">U</span>
          <span className="text-xl font-semibold">UCU Boulevard</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/marketplace" className={`px-3 py-1.5 rounded ${pathname==='/marketplace'?'bg-gray-100':''}`}>Marketplace</Link>
          {user && role==='seller' && (
            <Link to="/seller" className={`px-3 py-1.5 rounded ${pathname.startsWith('/seller')?'bg-gray-100':''}`}>Seller</Link>
          )}
          {user && (
            <>
              <Link to="/favorites" className={`px-3 py-1.5 rounded ${pathname==='/favorites'?'bg-gray-100':''}`}>Favorites</Link>
              <Link to="/purchases" className={`px-3 py-1.5 rounded ${pathname==='/purchases'?'bg-gray-100':''}`}>Purchases</Link>
            </>
          )}
          {user ? (
            <>
              <Link to="/dashboard" className={`px-3 py-1.5 rounded ${pathname==='/dashboard'?'bg-gray-100':''}`}>Dashboard</Link>
              <span className="hidden sm:inline text-sm text-gray-600">{user}</span>
              <button onClick={handleLogout} className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200">Logout</button>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Link to="/login" className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded bg-primary text-white hover:opacity-90">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

