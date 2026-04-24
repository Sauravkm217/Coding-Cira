'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>🤖 Coding Cira</div>
        <div style={styles.stats}>
          <div style={styles.statPill}>🔥 5</div>
          <div style={styles.statPill}>🪙 120</div>
        </div>
      </header>
      
      <main style={styles.main}>
        <div className="animate-pop" style={styles.hero}>
          <h1 style={styles.title}>Sparks Curiosity ✨</h1>
          <p style={styles.subtitle}>Let's play and learn coding today!</p>
        </div>
        
        <div style={styles.sectionsGrid}>
          {sections.map((sec, i) => (
            <Link href={sec.href} key={i} className="card" style={{...styles.sectionCard, borderBottomColor: sec.color, borderBottomWidth: '4px'}}>
              <div style={styles.iconWrapper}>{sec.icon}</div>
              <h2 style={styles.sectionTitle}>{sec.title}</h2>
              <p style={styles.sectionDesc}>{sec.desc}</p>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: sec.progress, backgroundColor: sec.color }} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

const sections = [
  { title: "Basics of C", desc: "Start from scratch!", icon: "🚀", progress: "80%", color: "var(--primary)", href: "/levels/c" },
  { title: "Basics of C++", desc: "Object Oriented fun", icon: "✨", progress: "40%", color: "var(--secondary)", href: "/levels/cpp" },
  { title: "Python Basics", desc: "Learn the snake way", icon: "🐍", progress: "10%", color: "var(--warning)", href: "/levels/python" },
  { title: "Basics of AI", desc: "Future is here", icon: "🧠", progress: "0%", color: "#9c27b0", href: "/levels/ai" },
];

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: 'var(--primary)',
  },
  stats: {
    display: 'flex',
    gap: '12px',
  },
  statPill: {
    background: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    border: '2px solid var(--border)',
    fontSize: '1.1rem',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'white',
    borderRadius: '24px',
    border: '2px solid var(--border)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 900,
    marginBottom: '10px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  sectionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    textDecoration: 'none',
  },
  iconWrapper: {
    fontSize: '3rem',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '8px',
  },
  sectionDesc: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
  },
  progressBar: {
    width: '100%',
    height: '14px',
    background: 'var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: 'auto',
  },
  progressFill: {
    height: '100%',
    borderRadius: '8px',
    transition: 'width 0.5s ease-in-out',
  }
};
