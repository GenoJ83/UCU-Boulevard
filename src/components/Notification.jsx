import React from 'react'

export default function Notification({ message, modern }) {
  return modern ? (
    <div className="rounded-xl bg-gradient-to-r from-primary/10 to-white/80 border border-primary/20 px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2 animate-fadein">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-primary"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
      <span>{message}</span>
    </div>
  ) : (
    <div className="rounded border border-primary/30 bg-primary/5 px-3 py-2 text-sm">{message}</div>
  )
}

