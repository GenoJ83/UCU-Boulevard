import React from 'react'
import { useFavorites } from '../context/FavoritesContext.jsx'

const placeholder = 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop'

export default function ProductCard({ item, onContact, onView }) {
  const imageUrl = item.image || placeholder
  const { favoriteIds, toggleFavorite } = useFavorites()
  const isFav = favoriteIds.includes(item.id)
  return (
    <div className="card group overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <img src={imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-2">
            <span className="badge whitespace-nowrap">{item.category}</span>
            <button aria-label="Favorite" onClick={()=>toggleFavorite(item.id)} className={`btn-ghost p-1 ${isFav?'text-red-600':''}`}>♥</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">UGX {item.price.toLocaleString()}</span>
            {item.priceMax && <span className="text-sm text-gray-600">– {item.priceMax.toLocaleString()}</span>}
            {item.negotiable ? (
              <span className="badge">Negotiable</span>
            ) : (
              <span className="badge">Fixed</span>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onView?.(item)} className="btn-ghost">Details</button>
            <button onClick={() => onContact(item)} className="btn-primary">Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  )
}

