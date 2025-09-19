import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)
  const show = useCallback((text) => {
    setMessage(text)
    setTimeout(() => setMessage(null), 2500)
  }, [])
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div role="status" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white px-4 py-2 rounded shadow min-w-[280px] text-sm">{message}</div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

