import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('buyer')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleSignup = () => {
    try {
      signup(email, password, role)
      setSuccess('Account created! Please log in.')
      setError('')
      // Don't auto-navigate, require login
    } catch (e) {
      setError(e.message)
      setSuccess('')
    }
  }

  return (
    <div className="container-max">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Create your account</h2>
        <p className="text-sm text-gray-600 mb-4">Sign up with your <strong>@ucu.ac.ug</strong> email.</p>
        <div className="space-y-3">
          <input aria-label="Email" className="input" type="email" placeholder="student@ucu.ac.ug" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input aria-label="Password" className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center gap-3 text-sm">
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="buyer" checked={role==='buyer'} onChange={(e)=>setRole(e.target.value)} /><span>Buyer</span></label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="seller" checked={role==='seller'} onChange={(e)=>setRole(e.target.value)} /><span>Seller</span></label>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">{success}</div>}
          <button onClick={handleSignup} className="btn-primary w-full">Sign up</button>
        </div>
        <div className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-primary">Log in</Link>
        </div>
      </div>
    </div>
  )
}

