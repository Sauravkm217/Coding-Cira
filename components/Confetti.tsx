'use client';

import React, { useEffect, useState } from 'react';

const COLORS = ['#1cb0f6', '#58cc02', '#ff4b4b', '#ffc800', '#9c27b0', '#ec4899', '#38bdf8'];

export default function Confetti({ count = 40 }: { count?: number }) {
  const [pieces, setPieces] = useState<Array<{ id: number; left: string; color: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 0.5}s`,
      duration: `${1.8 + Math.random() * 1.5}s`,
    }));
    setPieces(generated);
  }, [count]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', pointerEvents: 'none', zIndex: 99999, overflow: 'hidden' }}>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
