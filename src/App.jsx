import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import Header from './components/Header.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Marketplace from './pages/Marketplace.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'
import Favorites from './pages/Favorites.jsx'
import Purchases from './pages/Purchases.jsx'
import { PurchasesProvider } from './context/PurchasesContext.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function SellerRoute({ children }) {
  const { user, role } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'seller') return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <PurchasesProvider>
          <ToastProvider>
          <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <main className="pb-16">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
                <Route path="/seller" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
                <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
                <Route path="/purchases" element={<PrivateRoute><Purchases /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <footer className="mt-10 py-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} UCU Boulevard · Smart Campus · Hack UCU 2025
            </footer>
          </div>
          </ToastProvider>
        </PurchasesProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}

