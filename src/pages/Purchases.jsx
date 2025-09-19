import React from 'react'
import { usePurchases } from '../context/PurchasesContext.jsx'

export default function Purchases() {
  const { purchases } = usePurchases()
  return (
    <div className="container-max mt-6">
      <h2 className="text-lg font-semibold mb-3">My Purchases</h2>
      <div className="grid gap-3">
        {purchases.map(p => (
          <div key={`${p.id}-${p.purchasedAt}`} className="card"><div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">UGX {p.price.toLocaleString()} {p.priceMax && `– ${p.priceMax.toLocaleString()}`}</div>
                <div className="text-xs text-gray-500">Seller: {p.seller}</div>
              </div>
              <div className="text-xs text-gray-500">{new Date(p.purchasedAt).toLocaleString()}</div>
            </div>
          </div></div>
        ))}
        {purchases.length===0 && <div className="text-sm text-gray-500">No purchases yet.</div>}
      </div>
    </div>
  )
}

