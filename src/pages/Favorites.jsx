import React from 'react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getAllListingsCombined } from '../utils/listings.js'
import { useToast } from '../components/Toast.jsx'

export default function Favorites() {
  const { favoriteIds } = useFavorites()
  const { show } = useToast()
  const items = getAllListingsCombined().filter(i => favoriteIds.includes(i.id))

  const handlePay = (item) => {
    show(`Payment initiated for "${item.title}" — UGX ${item.price.toLocaleString()}.`)
    setTimeout(() => show(`Payment successful! Seller ${item.seller} will contact you.`), 1200)
  }

  return (
    <div className="container-max mt-6">
      <h2 className="text-lg font-semibold mb-3">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <ProductCard key={item.id} item={item} onPay={handlePay} />
        ))}
        {items.length===0 && <div className="text-sm text-gray-500">No favorites yet.</div>}
      </div>
    </div>
  )
}

