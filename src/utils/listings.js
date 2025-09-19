import { mockListings } from '../data/listings.js'

export function getAllSellerListings() {
  const items = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('seller_listings_')) {
      try {
        const arr = JSON.parse(localStorage.getItem(key) || '[]')
        if (Array.isArray(arr)) items.push(...arr)
      } catch {}
    }
  }
  return items
}

export function getAllListingsCombined() {
  return [...mockListings, ...getAllSellerListings()]
}

