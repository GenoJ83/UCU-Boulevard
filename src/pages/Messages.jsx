import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getConversations, getThread, sendMessage } from '../utils/messages.js'
import MessageList from '../components/MessageList.jsx'
import MessageThread from '../components/MessageThread.jsx'

export default function Messages() {
  const { user } = useAuth()
  const [selected, setSelected] = useState(null)
  const [input, setInput] = useState('')
  const [refresh, setRefresh] = useState(0)

  const conversations = getConversations(user)
  const thread = selected ? getThread(user, selected) : []

  const handleSend = () => {
    if (!input.trim() || !selected) return
    sendMessage(user, selected, input.trim())
    setInput('')
    setRefresh(r => r + 1)
  }

  return (
    <div className="container-max mt-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-lg font-semibold mb-3">Conversations</h2>
        <MessageList conversations={conversations} current={selected} onSelect={setSelected} />
      </div>
      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-3">Messages</h2>
        {selected ? (
          <>
            <MessageThread thread={thread} currentUser={user} />
            <div className="flex gap-2 mt-3">
              <input
                className="input flex-1"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
              />
              <button className="btn-primary" onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-sm">Select a conversation to view messages.</div>
        )}
      </div>
    </div>
  )
}
