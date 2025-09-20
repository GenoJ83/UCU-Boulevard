import React from 'react'

export default function MessageList({ conversations, current, onSelect }) {
  return (
    <div className="space-y-2">
      {conversations.length === 0 && <div className="text-gray-400 text-sm">No conversations yet.</div>}
      {conversations.map(user => (
        <div key={user} className="flex items-center gap-2">
          <button
            className={`flex-1 text-left px-4 py-2 rounded transition ${current === user ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => onSelect(user)}
          >
            {user}
          </button>
          <a href={`/profile/${encodeURIComponent(user)}`} className="text-primary text-xs hover:underline">View Profile</a>
        </div>
      ))}
    </div>
  )
}
