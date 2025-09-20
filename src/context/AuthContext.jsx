import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null) // 'buyer' | 'seller'
  const [remember, setRemember] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('ucu_user')
    const storedRole = localStorage.getItem('ucu_role')
    if (stored) setUser(stored)
    if (storedRole) setRole(storedRole)
  }, [])

  const login = (email, password, nextRole, rememberMe = true) => {
    const normalized = email.trim().toLowerCase()
    if (!/^\S+@students\.ucu\.ac\.ug$/.test(normalized)) {
      throw new Error('Please use a valid UCU email (example@students.ucu.ac.ug)')
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    // Mock: check stored credentials
    const stored = localStorage.getItem(`user_${normalized}`)
    if (stored) {
      const data = JSON.parse(stored)
      if (data.password !== password) {
        throw new Error('Invalid password')
      }
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('ucu_user', normalized)
      storage.setItem('ucu_role', data.role)
      setUser(normalized)
      setRole(data.role)
      setRemember(!!rememberMe)
    } else {
      throw new Error('Account not found. Please sign up first.')
    }
  }

  const signup = (email, password, selectedRole, profile = {}) => {
    const normalized = email.trim().toLowerCase()
    if (!/^\S+@students\.ucu\.ac\.ug$/.test(normalized)) {
      throw new Error('Please use a valid UCU email (example@students.ucu.ac.ug)')
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    // Mock: store user data
    const userData = { email: normalized, password, role: selectedRole, ...profile }
    localStorage.setItem(`user_${normalized}`, JSON.stringify(userData))
    // Don't auto-login, require them to login
    return true
  }

  const logout = () => {
    localStorage.removeItem('ucu_user')
    localStorage.removeItem('ucu_role')
    sessionStorage.removeItem('ucu_user')
    sessionStorage.removeItem('ucu_role')
    setUser(null)
    setRole(null)
  }

  const resetPassword = (email) => {
    const normalized = email.trim().toLowerCase()
    if (!/^\S+@students\.ucu\.ac\.ug$/.test(normalized)) {
      throw new Error('Please use a valid UCU email (example@students.ucu.ac.ug)')
    }
    // Mock: generate code and store temporary token
    const code = Math.floor(100000 + Math.random()*900000).toString()
    sessionStorage.setItem(`reset_${normalized}`, code)
    return code
  }

  const confirmReset = (email, code, newPassword) => {
    const normalized = email.trim().toLowerCase()
    const stored = sessionStorage.getItem(`reset_${normalized}`)
    if (!stored || stored !== code) throw new Error('Invalid or expired reset code')
    if (!newPassword || newPassword.length < 6) throw new Error('Password must be at least 6 characters')
    const userKey = `user_${normalized}`
    const userData = localStorage.getItem(userKey)
    if (!userData) throw new Error('Account not found')
    const parsed = JSON.parse(userData)
    parsed.password = newPassword
    localStorage.setItem(userKey, JSON.stringify(parsed))
    sessionStorage.removeItem(`reset_${normalized}`)
    return true
  }

  const value = useMemo(() => ({ user, role, login, signup, logout, resetPassword, confirmReset, setRole, remember, setRemember }), [user, role, remember])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

