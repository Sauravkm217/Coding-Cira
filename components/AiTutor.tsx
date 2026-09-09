'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useGamification } from './GamificationContext';

export default function AiTutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; source?: string }[]>([
    { role: 'assistant', text: "Hi! I'm Cira, your AI tutor 🤖 Stuck on a challenge or want to understand a coding concept? Ask me anytime!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const { playSound } = useGamification();

  // Determine current active level from URL
  const currentLevel = pathname?.includes('/levels/') ? pathname.split('/levels/')[1] : 'general';

  // Load custom API key from localStorage
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('coding_cira_user_gemini_key');
      if (savedKey) setCustomKey(savedKey);
    } catch {}
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = (key: string) => {
    setCustomKey(key);
    try {
      localStorage.setItem('coding_cira_user_gemini_key', key);
    } catch {}
    setShowKeyInput(false);
    setMessages(prev => [
      ...prev,
      { role: 'assistant', text: key.trim() ? "🔑 Custom Gemini API Key saved successfully!" : "🔑 Custom API Key cleared, using smart built-in tutor mode." }
    ]);
  };

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);
    playSound('click');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          level: currentLevel,
          userApiKey: customKey.trim() || undefined,
        })
      });

      const data = await res.json();
      const reply = data.reply || "Oops, my spark circuits are busy. Try asking again!";
      setMessages(prev => [...prev, { role: 'assistant', text: reply, source: data.source }]);
      playSound('success');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "⚡ Network hiccup! Ask me again in a moment." }]);
      playSound('error');
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "💡 Give me a hint for this challenge!",
    "👶 Explain this concept simply",
    "🔍 What is a variable?",
    "🎯 Why do we use semicolons?",
  ];

  return (
    <>
      {/* Floating Avatar Trigger */}
      <button
        className="animate-float"
        onClick={() => {
          setIsOpen(!isOpen);
          playSound('click');
        }}
        aria-label="Open AI Tutor"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1cb0f6, #0284c7)',
          boxShadow: '0 8px 24px rgba(28, 176, 246, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          cursor: 'pointer',
          zIndex: 1000,
          border: '4px solid white',
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '106px',
            right: '24px',
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            height: '520px',
            maxHeight: 'calc(100vh - 140px)',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            border: '2px solid var(--border)',
            overflow: 'hidden',
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1cb0f6, #0284c7)',
              color: 'white',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.1 }}>Tutor Cira ✨</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>
                  {currentLevel !== 'general' ? `Assisting with: ${currentLevel.toUpperCase()}` : 'Ready to help you code!'}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                title="Configure Gemini API Key"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  fontSize: '0.85rem',
                }}
              >
                ⚙️ Key
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Optional API Key configuration bar */}
          {showKeyInput && (
            <div style={{ background: '#f0f9ff', padding: '10px 14px', borderBottom: '1px solid #bae6fd', fontSize: '0.82rem' }}>
              <div style={{ marginBottom: '4px', fontWeight: 700, color: '#0369a1' }}>Gemini API Key (Optional):</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="password"
                  value={customKey}
                  onChange={e => setCustomKey(e.target.value)}
                  placeholder="AIzaSy..."
                  style={{
                    flex: 1,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #7dd3fc',
                    fontSize: '0.8rem',
                  }}
                />
                <button
                  onClick={() => saveApiKey(customKey)}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Messages body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#f8fafc',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? 'var(--primary)' : 'white',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '18px',
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  maxWidth: '88%',
                  fontSize: '0.92rem',
                  lineHeight: 1.45,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 14px',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                }}
              >
                Thinking sparks... 💭✨
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div
            style={{
              padding: '8px 12px',
              background: '#f1f5f9',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(chip)}
                style={{
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '8px',
              background: 'white',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for a clue or concept..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '24px',
                border: '1.5px solid var(--border)',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() ? 'var(--primary)' : '#e2e8f0',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: input.trim() ? 'pointer' : 'default',
                fontWeight: 900,
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
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
