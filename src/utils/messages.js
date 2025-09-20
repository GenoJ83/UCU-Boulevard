// Message storage and retrieval utilities
// Message format: { id, from, to, text, timestamp }

export function getConversations(currentUser) {
  // Returns a list of unique users this user has messaged with
  const all = getAllMessages(currentUser)
  const users = new Set()
  all.forEach(msg => {
    if (msg.from === currentUser) users.add(msg.to)
    if (msg.to === currentUser) users.add(msg.from)
  })
  return Array.from(users)
}

export function getAllMessages(currentUser) {
  // Returns all messages involving the current user
  const raw = localStorage.getItem('messages')
  if (!raw) return []
  const all = JSON.parse(raw)
  return all.filter(msg => msg.from === currentUser || msg.to === currentUser)
}

export function getThread(currentUser, otherUser) {
  // Returns all messages between currentUser and otherUser
  const raw = localStorage.getItem('messages')
  if (!raw) return []
  const all = JSON.parse(raw)
  return all.filter(msg =>
    (msg.from === currentUser && msg.to === otherUser) ||
    (msg.from === otherUser && msg.to === currentUser)
  ).sort((a, b) => a.timestamp - b.timestamp)
}

export function sendMessage(from, to, text) {
  const raw = localStorage.getItem('messages')
  const all = raw ? JSON.parse(raw) : []
  const msg = {
    id: Date.now() + Math.random(),
    from,
    to,
    text,
    timestamp: Date.now()
  }
  all.push(msg)
  localStorage.setItem('messages', JSON.stringify(all))
  return msg
}
