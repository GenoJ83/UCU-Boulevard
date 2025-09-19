import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-900 via-primary to-purple-600 text-white">
        <div className="container-max py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Shape the Future Campus with UCU Boulevard</h1>
            <p className="mt-3 text-white/90">A trusted, accessible, and affordable marketplace for UCU students. Buy and sell textbooks, electronics, and more, 24/7.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/marketplace" className="btn-primary">Explore Marketplace</Link>
              <Link to="/signup" className="btn-secondary">Create Account</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="card">
              <div className="card-body">
                <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1200&auto=format&fit=crop" alt="Campus market" className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-max py-10">
        <h2 className="text-xl font-semibold">Why UCU Boulevard?</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card"><div className="card-body"><h3 className="font-semibold">Student-only access</h3><p className="text-sm text-gray-600 mt-1">Verified with @ucu.ac.ug emails for trust.</p></div></div>
          <div className="card"><div className="card-body"><h3 className="font-semibold">Accessible 24/7</h3><p className="text-sm text-gray-600 mt-1">Fast, mobile-friendly SPA powered by Vite.</p></div></div>
          <div className="card"><div className="card-body"><h3 className="font-semibold">Affordable deals</h3><p className="text-sm text-gray-600 mt-1">Find textbooks, electronics, and more.</p></div></div>
          <div className="card"><div className="card-body"><h3 className="font-semibold">Secure mock payments</h3><p className="text-sm text-gray-600 mt-1">Simulated checkout with clear confirmation.</p></div></div>
          <div className="card"><div className="card-body"><h3 className="font-semibold">Campus integration</h3><p className="text-sm text-gray-600 mt-1">Dashboard shows UCU events and notices.</p></div></div>
          <div className="card"><div className="card-body"><h3 className="font-semibold">Search & filters</h3><p className="text-sm text-gray-600 mt-1">Quickly find what you need by category.</p></div></div>
        </div>
      </section>
    </div>
  )
}

