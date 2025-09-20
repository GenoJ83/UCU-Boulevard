import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categories, mockListings } from '../data/listings.js';
import { useToast } from '../components/Toast.jsx';
import Modal from '../components/Modal.jsx';
import ContactSeller from '../components/ContactSeller.jsx';
import { usePurchases } from '../context/PurchasesContext.jsx';
import { useReviews } from '../context/ReviewContext.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewList from '../components/ReviewList.jsx';
import Recommendations from '../components/Recommendations.jsx';

export default function Marketplace() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('all') // all | product | service
  const { show } = useToast()
  const [selected, setSelected] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addPurchase } = usePurchases();
  const { addReview, getListingReviews, hasUserReviewed } = useReviews();
  const { user } = useAuth();

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
    show(`Payment initiated for "${item.title}" — UGX ${item.price.toLocaleString()}.`);
    setTimeout(() => { 
      addPurchase(item); 
      show(`Payment successful! Seller ${item.seller} will contact you.`);
      // Refresh recommendations after purchase
      if (window.recommendationsRefresh) {
        window.recommendationsRefresh();
      }
    }, 1200);
  };

  const handleReviewSubmit = async ({ listingId, rating, comment }) => {
    try {
      await addReview(listingId, rating, comment);
      show('Thank you for your review!');
      setShowReviewForm(false);
      // Refresh reviews
      setSelected({...selected});
    } catch (error) {
      show(error.message || 'Failed to submit review', 'error');
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
    setShowReviewForm(false);
  };

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
          <ProductCard 
            key={item.id} 
            item={item} 
            onPay={handlePay} 
            onView={setSelected}
            onContact={(item) => {
              setSelected(item);
              setContactOpen(true);
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-500 py-8">No listings found.</div>
        )}
      </div>

      {/* Recommendations */}
      <Recommendations title="Recommended for You" maxItems={5} />

      {/* Product Details Modal */}
      <Modal 
        open={!!selected} 
        onClose={() => {
          setSelected(null);
          setShowReviews(false);
          setShowReviewForm(false);
        }} 
        title={selected?.title}
      >
        {selected && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selected.image || 'https://via.placeholder.com/400x300'} 
                  alt={selected.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <p className="text-gray-600 mt-2">{selected.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold">UGX {selected.price.toLocaleString()}</span>
                  {selected.priceMax && (
                    <span className="text-gray-500 ml-2">- {selected.priceMax.toLocaleString()}</span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge">{selected.category}</span>
                  <span className="badge">{selected.type}</span>
                  {selected.negotiable && <span className="badge">Negotiable</span>}
                </div>
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => handlePay(selected)}
                    className="w-full btn-primary"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => setContactOpen(true)}
                    className="w-full btn-secondary"
                  >
                    Contact Seller
                  </button>
                  <button 
                    onClick={toggleReviews}
                    className="w-full btn-ghost"
                  >
                    {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {showReviews && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-medium">Customer Reviews</h4>
                  {!showReviewForm && user && !hasUserReviewed(selected.id, user.id) && (
                    <button 
                      onClick={() => setShowReviewForm(true)}
                      className="btn-secondary"
                    >
                      Write a Review
                    </button>
                  )}
                </div>

                {showReviewForm && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <ReviewForm 
                      listingId={selected.id}
                      onReviewSubmit={handleReviewSubmit}
                      onCancel={() => setShowReviewForm(false)}
                      userHasReviewed={user ? hasUserReviewed(selected.id, user.id) : false}
                    />
                  </div>
                )}

                <ReviewList listingId={selected.id} />
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Contact Seller Modal */}
      <Modal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={`Contact ${selected?.seller || 'Seller'}`}
      >
        {selected && <ContactSeller item={selected} onClose={() => setContactOpen(false)} />}
      </Modal>

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

