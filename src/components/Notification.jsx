import React from 'react'

export default function Notification({ message }) {
  return (
    <div className="rounded border border-primary/30 bg-primary/5 px-3 py-2 text-sm">{message}</div>
  )
}

