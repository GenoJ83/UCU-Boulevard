import React, { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { mockListings as seed } from '../data/listings.js'
import { useToast } from '../components/Toast.jsx'
import { usePurchases } from '../context/PurchasesContext.jsx'
import Modal from '../components/Modal.jsx'
import ContactSeller from '../components/ContactSeller.jsx'

function loadSellerListings(email) {
  const key = `seller_listings_${email}`
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : []
}

function saveSellerListings(email, items) {
  const key = `seller_listings_${email}`
  localStorage.setItem(key, JSON.stringify(items))
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const { show } = useToast()
  const [items, setItems] = useState(() => loadSellerListings(user) )
  const [form, setForm] = useState({ title: '', description: '', price: '', priceMax: '', negotiable: true, category: 'Textbooks', type: 'product', image: '' })
  const [editing, setEditing] = useState(null)
  const [selected, setSelected] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)
  const { addPurchase } = usePurchases()

  const all = useMemo(() => {
    return [
      ...seed.filter(i => i.seller === user),
      ...items,
    ]
  }, [seed, items, user])

  const handleCreate = () => {
    if (!form.title || !form.description || !form.price) return
    const newItem = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      price: Number(form.price),
      priceMax: form.priceMax ? Number(form.priceMax) : undefined,
      negotiable: !!form.negotiable,
      category: form.category,
      type: form.type,
      seller: user,
      image: form.image || undefined,
    }
    const next = [newItem, ...items]
    setItems(next)
    saveSellerListings(user, next)
    setForm({ title: '', description: '', price: '', priceMax: '', negotiable: true, category: 'Textbooks', type: 'product', image: '' })
    show('Listing created')
  }

  const startEdit = (item) => {
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      price: String(item.price),
      priceMax: item.priceMax ? String(item.priceMax) : '',
      negotiable: !!item.negotiable,
      category: item.category,
      type: item.type,
      image: item.image || ''
    })
  }

  const handleUpdate = () => {
    if (!editing) return
    const updated = {
      ...editing,
      title: form.title,
      description: form.description,
      price: Number(form.price),
      priceMax: form.priceMax ? Number(form.priceMax) : undefined,
      negotiable: !!form.negotiable,
      category: form.category,
      type: form.type,
      image: form.image || undefined,
    }
    const next = items.map(i => i.id === editing.id ? updated : i)
    setItems(next)
    saveSellerListings(user, next)
    setEditing(null)
    setForm({ title: '', description: '', price: '', priceMax: '', negotiable: true, category: 'Textbooks', type: 'product', image: '' })
    show('Listing updated')
  }

  const handleDelete = (id) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    saveSellerListings(user, next)
    show('Listing deleted')
  }

  const handlePay = (item) => {
    show(`Payment initiated for "${item.title}" — UGX ${item.price.toLocaleString()}.`)
    setTimeout(() => { addPurchase(item); show(`Payment successful! Seller ${item.seller} will contact you.`) }, 1200)
  }

  return (
    <div className="container-max mt-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card">
          <div className="card-body">
            <h2 className="text-lg font-semibold">{editing ? 'Edit Listing' : 'Create Listing'}</h2>
            <div className="mt-3 space-y-3">
              <input className="input" placeholder="Title" value={form.title} onChange={(e)=>setForm(v=>({...v, title:e.target.value}))} />
              <textarea className="input h-24" placeholder="Description" value={form.description} onChange={(e)=>setForm(v=>({...v, description:e.target.value}))} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="input" type="number" placeholder="Price (UGX)" value={form.price} onChange={(e)=>setForm(v=>({...v, price:e.target.value}))} />
                <input className="input" type="number" placeholder="Max Price (optional)" value={form.priceMax} onChange={(e)=>setForm(v=>({...v, priceMax:e.target.value}))} />
              </div>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={form.negotiable} onChange={(e)=>setForm(v=>({...v, negotiable:e.target.checked}))} /><span>Negotiable</span></label>
              <select className="select" value={form.category} onChange={(e)=>setForm(v=>({...v, category:e.target.value}))}>
                {['Textbooks','Electronics','Clothing','Home & Living','Accessories','Services'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="flex items-center gap-3 text-sm">
                <label className="inline-flex items-center gap-2"><input type="radio" name="type" value="product" checked={form.type==='product'} onChange={(e)=>setForm(v=>({...v, type:e.target.value}))} /><span>Product</span></label>
                <label className="inline-flex items-center gap-2"><input type="radio" name="type" value="service" checked={form.type==='service'} onChange={(e)=>setForm(v=>({...v, type:e.target.value}))} /><span>Service</span></label>
              </div>
              <div>
                <label className="text-sm text-gray-700">Image</label>
                <input className="input" type="file" accept="image/*" onChange={async (e)=>{
                  const file = e.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => setForm(v=>({...v, image: reader.result}))
                  reader.readAsDataURL(file)
                }} />
                {form.image && <img src={form.image} alt="preview" className="mt-2 h-28 w-full object-cover rounded" />}
              </div>
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={handleUpdate} className="btn-primary w-full">Save</button>
                  <button onClick={()=>{ setEditing(null); setForm({ title: '', description: '', price: '', priceMax: '', negotiable: true, category: 'Textbooks', type: 'product', image: '' }) }} className="btn-secondary w-full">Cancel</button>
                </div>
              ) : (
                <button onClick={handleCreate} className="btn-primary w-full">Publish</button>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">My Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {all.map(item => (
              <div key={item.id} className="relative">
                <ProductCard item={item} onPay={handlePay} onView={setSelected} />
                {item.seller===user && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button className="btn-ghost" onClick={()=>startEdit(item)}>Edit</button>
                    <button className="btn-ghost" onClick={()=>handleDelete(item.id)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
            {all.length===0 && <div className="text-sm text-gray-500">No listings yet.</div>}
          </div>
          <h2 className="text-lg font-semibold mt-8 mb-3">Other Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {seed.filter(i=>i.seller!==user).map(item => (
              <ProductCard key={item.id} item={item} onPay={handlePay} onView={setSelected} />
            ))}
          </div>
        </div>
      </div>

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

