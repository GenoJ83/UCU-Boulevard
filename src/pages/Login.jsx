import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('buyer')
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    try {
      login(email, password, role, remember)
      navigate(role === 'seller' ? '/seller' : '/marketplace')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="container-max">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Log in</h2>
        <p className="text-sm text-gray-600 mb-4">Use your <strong>@ucu.ac.ug</strong> email to continue.</p>
        <div className="space-y-3">
          <input aria-label="Email" className="input" type="email" placeholder="student@ucu.ac.ug" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input aria-label="Password" className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center gap-3 text-sm">
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="buyer" checked={role==='buyer'} onChange={(e)=>setRole(e.target.value)} /><span>Buyer</span></label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="role" value="seller" checked={role==='seller'} onChange={(e)=>setRole(e.target.value)} /><span>Seller</span></label>
          </div>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /><span>Remember me</span></label>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button onClick={handleLogin} className="btn-primary w-full">Log in</button>
        </div>
        <div className="mt-4 text-sm flex justify-between">
          <Link to="/forgot" className="text-primary">Forgot password?</Link>
          <Link to="/signup" className="text-primary">Create account</Link>
        </div>
      </div>
    </div>
  )
}

