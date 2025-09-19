import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { resetPassword, confirmReset } = useAuth()

  const handleReset = () => {
    try {
      const c = resetPassword(email)
      setStatus(`Reset code generated: ${c} (mock). Enter it below to set new password.`)
      setError('')
    } catch (e) {
      setError(e.message)
      setStatus('')
    }
  }

  const handleConfirm = () => {
    try {
      confirmReset(email, code, newPassword)
      setStatus('Password updated. You can now log in.')
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="container-max">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Forgot password</h2>
        <p className="text-sm text-gray-600 mb-4">Enter your <strong>@ucu.ac.ug</strong> email to receive a reset link.</p>
        <div className="space-y-3">
          <input aria-label="Email" className="input" type="email" placeholder="student@ucu.ac.ug" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleReset} className="btn-secondary w-full">Generate reset code</button>
          <input aria-label="Code" className="input" placeholder="Enter reset code" value={code} onChange={(e)=>setCode(e.target.value)} />
          <input aria-label="New password" className="input" type="password" placeholder="New password (min 6 chars)" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
          {error && <div className="text-sm text-red-600">{error}</div>}
          {status && <div className="text-sm text-green-700">{status}</div>}
          <button onClick={handleConfirm} className="btn-primary w-full">Set new password</button>
        </div>
        <div className="mt-4 text-sm">
          Remembered it? <Link to="/login" className="text-primary">Back to login</Link>
        </div>
      </div>
    </div>
  )
}

