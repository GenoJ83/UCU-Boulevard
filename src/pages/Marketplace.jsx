import React, { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { categories, mockListings } from '../data/listings.js'
import { useToast } from '../components/Toast.jsx'
import Modal from '../components/Modal.jsx'
import ContactSeller from '../components/ContactSeller.jsx'
import { usePurchases } from '../context/PurchasesContext.jsx'

export default function Marketplace() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('all') // all | product | service
  const { show } = useToast()
  const [selected, setSelected] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)
  const { addPurchase } = usePurchases()

  const [page, setPage] = useState(1)
  const pageSize = 6
  const items = mockListings

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      const matchesQ = !q || it.title.toLowerCase().includes(q) || it.description.toLowerCase().includes(q) || String(it.price).includes(q) || it.category.toLowerCase().includes(q)
      const matchesC = category === 'All' || it.category === category
      const matchesT = type === 'all' || it.type === type
      return matchesQ && matchesC && matchesT
    })
  }, [items, query, category, type])

  const handlePay = (item) => {
    show(`Payment initiated for "${item.title}" — UGX ${item.price.toLocaleString()}.`)
    setTimeout(() => { addPurchase(item); show(`Payment successful! Seller ${item.seller} will contact you.`) }, 1200)
  }

  return (
    <div className="container-max">
      <div className="mt-6 mb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input aria-label="Search listings" className="input" placeholder="Search by title, description, price..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <select aria-label="Filter by category" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="select" onChange={(e)=>{/* mock sort */}}>
              <option>Sort: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.filter(c=>c!=='All').map(c => (
              <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1.5 rounded-full text-sm ${category===c?'bg-primary text-white':'bg-gray-100 hover:bg-gray-200'}`}>{c}</button>
            ))}
            <button onClick={()=>setCategory('All')} className={`px-3 py-1.5 rounded-full text-sm ${category==='All'?'bg-primary text-white':'bg-gray-100 hover:bg-gray-200'}`}>All</button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Type:</span>
            <button onClick={()=>setType('all')} className={`px-3 py-1.5 rounded-full ${type==='all'?'bg-primary text-white':'bg-gray-100 hover:bg-gray-200'}`}>All</button>
            <button onClick={()=>setType('product')} className={`px-3 py-1.5 rounded-full ${type==='product'?'bg-primary text-white':'bg-gray-100 hover:bg-gray-200'}`}>Products</button>
            <button onClick={()=>setType('service')} className={`px-3 py-1.5 rounded-full ${type==='service'?'bg-primary text-white':'bg-gray-100 hover:bg-gray-200'}`}>Services</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.slice(0, page*pageSize).map((item) => (
          <ProductCard key={item.id} item={item} onPay={handlePay} onView={setSelected} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-500 py-8">No listings found.</div>
        )}
      </div>

      {filtered.length > page*pageSize && (
        <div className="flex justify-center mt-6">
          <button className="btn-secondary" onClick={()=>setPage(p=>p+1)}>Load more</button>
        </div>
      )}

      <Modal open={!!selected} onClose={()=>setSelected(null)} title={selected?.title}
        actions={<>
          <button className="btn-secondary" onClick={()=>setSelected(null)}>Close</button>
          <button className="btn-secondary" onClick={()=>{ setContactOpen(true) }}>Contact</button>
          <button className="btn-primary" onClick={()=>{ handlePay(selected); setSelected(null) }}>Pay</button>
        </>}>
        {selected && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <img src={selected.image} alt={selected.title} className="w-full h-56 object-cover rounded" />
            </div>
            <div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="badge">{selected.category}</span>
                <span className="badge">{selected.type}</span>
                <span className="badge">{selected.negotiable ? 'Negotiable' : 'Fixed'}</span>
              </div>
              <div className="mt-3 font-semibold">UGX {selected.price.toLocaleString()} {selected.priceMax && `– ${selected.priceMax.toLocaleString()}`}</div>
              <div className="text-xs text-gray-500 mt-1">Seller: {selected.seller}</div>
            </div>
          </div>
        )}
      </Modal>
      <ContactSeller item={selected} open={contactOpen} onClose={()=>setContactOpen(false)} />
    </div>
  )
}

