import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    if (!user) { setFavoriteIds([]); return }
    const raw = localStorage.getItem(`fav_${user}`)
    setFavoriteIds(raw ? JSON.parse(raw) : [])
  }, [user])

  useEffect(() => {
    if (!user) return
    localStorage.setItem(`fav_${user}`, JSON.stringify(favoriteIds))
  }, [favoriteIds, user])

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
  }

  const value = useMemo(() => ({ favoriteIds, toggleFavorite }), [favoriteIds])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}

