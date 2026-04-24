'use client';
import { useState, useEffect, useRef } from 'react';

export default function AiTutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Hi! I'm Cira, your AI tutor. Stuck on a coding problem? Ask me for a hint!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "Oops, my spark circuits are busy. Try again!" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Connection error!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Avatar */}
      <div 
        className="animate-float"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'var(--primary)',
          boxShadow: '0 8px 24px rgba(28, 176, 246, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 1000,
          border: '4px solid white',
          transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        🤖
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          right: '24px',
          width: '320px',
          height: '450px',
          background: 'white',
          borderRadius: 'var(--radius)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          border: '2px solid var(--border)',
          overflow: 'hidden',
          animation: 'popIn 0.3s ease'
        }}>
          <div style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '16px',
            fontWeight: 800,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Tutor Cira ✨</span>
            <button onClick={() => setIsOpen(false)} style={{background: 'none', border:'none', color:'white', cursor:'pointer', fontWeight: 800}}>X</button>
          </div>
          
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f9f9f9',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary)' : 'white',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                maxWidth: '85%',
                fontSize: '0.95rem',
                lineHeight: 1.4,
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', padding: '12px', color: 'var(--text-secondary)' }}>
                Thinking... 💭
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for a hint..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button 
              onClick={sendMessage}
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontWeight: 800
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
