'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply || 'No response from AI');
    } catch (error) {
      setReply('Failed to connect to AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Ask your financial question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {reply && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <strong>AI:</strong> {reply}
        </div>
      )}
    </div>
  );
}
