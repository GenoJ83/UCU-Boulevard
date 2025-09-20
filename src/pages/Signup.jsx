import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('buyer')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleSignup = () => {
    try {
      signup(email, password, role, { name, phone })
      setSuccess('Account created! Please log in.')
      setError('')
      // Don't auto-navigate, require login
    } catch (e) {
      setError(e.message)
      setSuccess('')
    }
  }

  return (
    <div className="container-max min-h-[80vh] flex items-center justify-center">
      <div className="glass-card max-w-md w-full mx-auto p-8">
        <h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
          Create your account
        </h2>
  <p className="text-sm text-gray-600 mb-4">Sign up with your <strong>@students.ucu.ac.ug</strong> email.</p>
        <div className="space-y-4">
          <input aria-label="Name" className="input" type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <input aria-label="Phone" className="input" type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          <input aria-label="Email" className="input" type="email" placeholder="student@students.ucu.ac.ug" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input aria-label="Password" className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="buyer" checked={role==='buyer'} onChange={(e)=>setRole(e.target.value)} /><span>Buyer</span></label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="seller" checked={role==='seller'} onChange={(e)=>setRole(e.target.value)} /><span>Seller</span></label>
          </div>
          {error && <div className="text-sm text-red-600 animate-fadein">{error}</div>}
          {success && <div className="text-sm text-green-600 animate-fadein">{success}</div>}
          <button onClick={handleSignup} className="btn-primary w-full text-base py-3">Sign up</button>
        </div>
        <div className="mt-6 text-sm text-center">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}

