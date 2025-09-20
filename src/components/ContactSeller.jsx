
import React, { useState } from 'react'
import Modal from './Modal.jsx'
import { useToast } from './Toast.jsx'
import { sendMessage } from '../utils/messages.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function ContactSeller({ item, open, onClose }) {
  const [message, setMessage] = useState('')
  const { show } = useToast()
  const { user } = useAuth()
  const send = () => {
    if (!message.trim()) return
    if (!user || !item?.seller) {
      show('Unable to send message: missing user or seller.')
      return
    }
    sendMessage(user, item.seller, message)
    show('Message sent to seller!')
    setMessage('')
    onClose()
  }
  return (
    <Modal open={open} onClose={onClose} title={`Contact ${item?.seller}`}
      actions={<>
        <button className="btn-secondary" onClick={onClose}>Close</button>
        <button className="btn-primary" onClick={send}>Send</button>
      </>}>
      <textarea className="input h-32" placeholder="Write your message..." value={message} onChange={(e)=>setMessage(e.target.value)} />
    </Modal>
  )
}

