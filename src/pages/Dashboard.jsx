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
    <div className="container-max mt-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card"><div className="card-body"><p className="text-xs text-gray-500">Welcome</p><h3 className="text-lg font-semibold">{user?.split('@')[0]}</h3></div></div>
        <div className="card"><div className="card-body"><p className="text-xs text-gray-500">Active Listings</p><h3 className="text-lg font-semibold">{12}</h3></div></div>
        <div className="card"><div className="card-body"><p className="text-xs text-gray-500">Purchases</p><h3 className="text-lg font-semibold">{5}</h3></div></div>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Campus Updates</h3>
        <div className="grid gap-3">
          {notifications.map((n, idx) => (
            <Notification key={idx} message={n} />
          ))}
        </div>
      </section>
    </div>
  )
}

