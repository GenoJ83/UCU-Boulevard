
import React, { useState } from 'react';
import { fetchChatbotResponse } from '../utils/chatbotApi.js';

export default function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your AI assistant. Ask me about common items or tell me your budget for recommendations.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setError('');
    const userMsg = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await fetchChatbotResponse([...messages, userMsg]);
      setMessages(msgs => [...msgs, { from: 'bot', text: reply }]);
    } catch (e) {
      setError('Sorry, the assistant is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 bg-white rounded-xl shadow-xl border border-primary flex flex-col">
          <div className="bg-primary text-white px-4 py-2 rounded-t-xl flex items-center justify-between">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white">✕</button>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-80">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? 'text-left' : 'text-right'}>
                <span className={msg.from === 'bot' ? 'inline-block bg-gray-100 text-gray-800 px-3 py-2 rounded-lg mb-1' : 'inline-block bg-primary text-white px-3 py-2 rounded-lg mb-1'}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Assistant is typing...</div>}
            {error && <div className="text-xs text-red-500">{error}</div>}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="input flex-1"
              placeholder="Ask about items or budget..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button className="btn-primary" onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      ) : (
        <button className="btn-primary rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-2xl" onClick={() => setOpen(true)}>
          🤖
        </button>
      )}
    </div>
  );
}
