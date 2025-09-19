
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(true)
  const [selectedRole, setSelectedRole] = useState('buyer')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    try {
      // Check if account exists and matches selected role
      const normalized = email.trim().toLowerCase()
      const stored = localStorage.getItem(`user_${normalized}`)
      if (!stored) throw new Error('Account not found. Please sign up first.')
      const data = JSON.parse(stored)
      if (data.role !== selectedRole) {
        throw new Error(`This account is registered as a ${data.role}. Please select the correct role.`)
      }
      login(email, password, selectedRole, remember)
      if (selectedRole === 'seller') {
        navigate('/seller')
      } else {
        navigate('/marketplace')
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="container-max min-h-[80vh] flex items-center justify-center">
      <div className="glass-card max-w-md w-full mx-auto p-8">
        <h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
          Log in
        </h2>
        <p className="text-sm text-gray-600 mb-4">Use your <strong>@students.ucu.ac.ug</strong> email to continue.</p>
        <div className="space-y-4">
          <input aria-label="Email" className="input" type="email" placeholder="student@students.ucu.ac.ug" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input aria-label="Password" className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="role" value="buyer" checked={selectedRole === 'buyer'} onChange={()=>setSelectedRole('buyer')} />
              <span>Buyer</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="role" value="seller" checked={selectedRole === 'seller'} onChange={()=>setSelectedRole('seller')} />
              <span>Seller</span>
            </label>
          </div>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /><span>Remember me</span></label>
          {error && <div className="text-sm text-red-600 animate-fadein">{error}</div>}
          <button onClick={handleLogin} className="btn-primary w-full text-base py-3">Log in</button>
        </div>
        <div className="mt-6 text-sm flex justify-between">
          <Link to="/forgot" className="text-primary hover:underline">Forgot password?</Link>
          <Link to="/signup" className="text-primary hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  )
}

