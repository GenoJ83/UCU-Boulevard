import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-purple-700 to-purple-900 text-white min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/boulevard.jpeg" alt="UCU Boulevard" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-purple-900/70 to-black/70" />
        </div>
        <div className="container-max py-16 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl mb-3 text-white">
              Shape the Future Campus<br />with <span className="text-primary drop-shadow-2xl">UCU Boulevard</span>
            </h1>
            <p className="mt-3 text-white text-lg font-medium drop-shadow-2xl">A trusted, accessible, and affordable marketplace for UCU students. Buy and sell textbooks, electronics, and more, 24/7.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/marketplace" className="btn-primary shadow-lg text-base px-6 py-3">Explore Marketplace</Link>
              <Link to="/signup" className="btn-secondary text-base px-6 py-3">Create Account</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="glass-card p-0 overflow-hidden">
              <img src="/boulevard.jpeg" alt="UCU Boulevard" className="rounded-2xl scale-105 hover:scale-110 transition duration-500 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-max py-14">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
          Why UCU Boulevard?
        </h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Student-only access', desc: 'Verified with @ucu.ac.ug emails for trust.' },
            { title: 'Accessible 24/7', desc: 'Fast, mobile-friendly SPA powered by Vite.' },
            { title: 'Affordable deals', desc: 'Find textbooks, electronics, and more.' },
            { title: 'Secure mock payments', desc: 'Simulated checkout with clear confirmation.' },
            { title: 'Campus integration', desc: 'Dashboard shows UCU events and notices.' },
            { title: 'Search & filters', desc: 'Quickly find what you need by category.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card flex flex-col items-start gap-2 bg-white/90">
              <h3 className="font-semibold text-lg text-primary drop-shadow-2xl">{item.title}</h3>
              <p className="text-base text-gray-900 font-medium drop-shadow-2xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

