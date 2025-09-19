import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const PurchasesContext = createContext(null)

export function PurchasesProvider({ children }) {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    if (!user) { setPurchases([]); return }
    const raw = localStorage.getItem(`purchases_${user}`)
    setPurchases(raw ? JSON.parse(raw) : [])
  }, [user])

  useEffect(() => {
    if (!user) return
    localStorage.setItem(`purchases_${user}`, JSON.stringify(purchases))
  }, [purchases, user])

  const addPurchase = (item) => {
    setPurchases(prev => [{ ...item, purchasedAt: Date.now() }, ...prev])
  }

  const value = useMemo(() => ({ purchases, addPurchase }), [purchases])
  return <PurchasesContext.Provider value={value}>{children}</PurchasesContext.Provider>
}

export function usePurchases() {
  const ctx = useContext(PurchasesContext)
  if (!ctx) throw new Error('usePurchases must be used within PurchasesProvider')
  return ctx
}

