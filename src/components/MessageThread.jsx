import React, { useRef, useEffect } from 'react'

export default function MessageThread({ thread, currentUser }) {
  const bottomRef = useRef(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread])
  return (
    <div className="flex flex-col gap-2 h-80 overflow-y-auto bg-white rounded p-3 border">
      {thread.length === 0 && <div className="text-gray-400 text-sm">No messages yet.</div>}
      {thread.map(msg => (
        <div key={msg.id} className={`flex ${msg.from === currentUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.from === currentUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="text-xs font-semibold mb-1">{msg.from}</div>
            <div>{msg.text}</div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">{new Date(msg.timestamp).toLocaleString()}</div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
