import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { PurchasesProvider } from './context/PurchasesContext.jsx'
import { ReviewProvider } from './context/ReviewContext.jsx'
import { RecommendationProvider } from './context/RecommendationContext.jsx'
import Header from './components/Header.jsx'
import ChatbotAssistant from './components/ChatbotAssistant.jsx'
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
import Messages from './pages/Messages.jsx'
import Profile from './pages/Profile.jsx'
import PublicProfile from './pages/PublicProfile.jsx'

export default function App() {
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" replace />
    return children
  }

  const SellerRoute = ({ children }) => {
    const { user, role } = useAuth()
    if (!user) return <Navigate to="/login" replace />
    if (role !== 'seller') return <Navigate to="/dashboard" replace />
    return children
  }
  return (
    <AuthProvider>
      <FavoritesProvider>
        <PurchasesProvider>
          <ReviewProvider>
            <RecommendationProvider>
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
                      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
                      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                      <Route path="/profile/:email" element={<PublicProfile />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <footer className="mt-10 py-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} UCU Boulevard · Smart Campus · Hack UCU 2025
                  </footer>
                <ChatbotAssistant />
                </div>
              </ToastProvider>
            </RecommendationProvider>
          </ReviewProvider>
        </PurchasesProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}
