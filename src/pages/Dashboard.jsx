import React from 'react'
import Notification from '../components/Notification.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const notifications = [
    'Bazaar Week! Deals across campus this Friday.',
    'Career Fair next Wednesday at the Main Hall.',
    'Library extended hours during exam season.',
  ]

  return (
    <div className="container-max mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 mb-1 tracking-wide">Welcome</p>
          <h3 className="text-2xl font-bold text-primary drop-shadow">{user?.split('@')[0]}</h3>
        </div>
        <div className="glass-card flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 mb-1 tracking-wide">Active Listings</p>
          <h3 className="text-2xl font-bold text-primary drop-shadow">{12}</h3>
        </div>
        <div className="glass-card flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 mb-1 tracking-wide">Purchases</p>
          <h3 className="text-2xl font-bold text-primary drop-shadow">{5}</h3>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
          Campus Updates
        </h3>
        <div className="grid gap-4">
          {notifications.map((n, idx) => (
            <Notification key={idx} message={n} modern />
          ))}
        </div>
      </section>
    </div>
  )
}

