import React from 'react'

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-xl card">
        <div className="card-body">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button aria-label="Close" className="btn-ghost" onClick={onClose}>✕</button>
          </div>
          <div className="mt-3">
            {children}
          </div>
          {actions && (
            <div className="mt-4 flex items-center justify-end gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

