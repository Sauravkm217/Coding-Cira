'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/components/GamificationContext';
import { ROADMAP_ITEMS } from '@/data/roadmap';

export default function HomePage() {
  const { levelProgress, playSound, coins, badges } = useGamification();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const sections = [
    {
      id: "c",
      title: "Basics of C",
      desc: "Start from scratch! Learn variables & print logic",
      icon: "🚀",
      color: "var(--primary)",
      href: "/levels/c",
      tag: "Foundations",
    },
    {
      id: "cpp",
      title: "Basics of C++",
      desc: "Object Oriented fun, streams & blueprints",
      icon: "✨",
      color: "var(--secondary)",
      href: "/levels/cpp",
      tag: "OOP & Games",
    },
    {
      id: "python",
      title: "Python Basics",
      desc: "Learn the snake way: clean syntax & loops",
      icon: "🐍",
      color: "var(--warning)",
      href: "/levels/python",
      tag: "Data & Scripts",
    },
    {
      id: "ai",
      title: "Basics of AI",
      desc: "Future is here: Prompts, datasets & neural nets",
      icon: "🧠",
      color: "#9333ea",
      href: "/levels/ai",
      tag: "Intelligence",
    },
  ];

  const handleRoadmapClick = (itemName: string) => {
    playSound('click');
    setToastMsg(`${itemName} is launching soon! Stay tuned 🚀`);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="animate-pop" style={styles.toast}>
          <span>💡</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Banner */}
      <div className="animate-pop" style={styles.hero}>
        <div style={styles.heroBadge}>✨ Gamified Coding for Future Engineers</div>
        <h1 style={styles.title}>Sparks Curiosity ✨</h1>
        <p style={styles.subtitle}>
          Interactive bite-sized study notes, hands-on challenges, real-time terminal output, and Tutor Cira AI!
        </p>

        <div style={styles.quickStatsRow}>
          <div style={styles.miniStat}>
            <span style={{ fontSize: '1.4rem' }}>🪙</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{coins} Coins</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ready to spend</div>
            </div>
          </div>
          <div style={styles.miniStat}>
            <span style={{ fontSize: '1.4rem' }}>🏆</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{badges.length} Badges</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Unlocked</div>
            </div>
          </div>
          <div style={styles.miniStat}>
            <span style={{ fontSize: '1.4rem' }}>🤖</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Tutor Cira</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Always online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Tracks Section */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Explore Tracks 🗺️
      </h2>

      <div style={styles.sectionsGrid}>
        {sections.map((sec) => {
          const progress = levelProgress[sec.id] || 0;
          const isComplete = progress >= 100;

          return (
            <div
              key={sec.id}
              className="card"
              style={{
                ...styles.sectionCard,
                borderBottomColor: sec.color,
                borderBottomWidth: '5px',
              }}
            >
              <div style={styles.cardTopRow}>
                <span style={{ ...styles.categoryTag, color: sec.color, borderColor: sec.color }}>
                  {sec.tag}
                </span>
                {isComplete && (
                  <span style={styles.completedBadge}>✓ Complete</span>
                )}
              </div>

              <div style={styles.iconWrapper}>{sec.icon}</div>
              <h3 style={styles.sectionTitle}>{sec.title}</h3>
              <p style={styles.sectionDesc}>{sec.desc}</p>

              {/* Progress Bar */}
              <div style={{ width: '100%', marginBottom: '20px', marginTop: 'auto' }}>
                <div style={styles.progressLabelRow}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Progress
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: sec.color }}>
                    {progress}%
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${progress}%`,
                      backgroundColor: sec.color,
                    }}
                  />
                </div>
              </div>

              {/* Dual Action Buttons: Learn & Practice */}
              <div style={styles.btnRow}>
                <Link
                  href={`/learn/${sec.id}`}
                  className="btn"
                  onClick={() => playSound('click')}
                  style={styles.learnBtn}
                >
                  📖 Learn
                </Link>

                <Link
                  href={sec.href}
                  className="btn"
                  onClick={() => playSound('click')}
                  style={{
                    ...styles.practiceBtn,
                    backgroundColor: sec.color,
                    borderBottom: '4px solid rgba(0,0,0,0.2)',
                  }}
                >
                  ⚡ Practice
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Hint banner */}
      <div style={styles.footerTip}>
        <span>💡</span>
        <span>
          Tip: Read the <strong>📖 Learn</strong> notes to study concepts & earn extra coins before tackling the <strong>⚡ Practice</strong> challenges!
        </span>
      </div>

      {/* Coming Soon / Roadmap Section */}
      <div style={{ marginTop: '54px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '6px', color: 'var(--text-primary)' }}>
          🚀 Coming Soon
        </h2>
        <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: 0 }}>
          We&apos;re constantly expanding Coding Cira with new languages and smarter AI tutoring.
        </p>
      </div>

      <div style={styles.sectionsGrid}>
        {ROADMAP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleRoadmapClick(item.name)}
            style={{
              ...styles.sectionCard,
              opacity: 0.65,
              cursor: 'pointer',
              borderBottomColor: item.category === 'ai-model' ? '#c084fc' : '#cbd5e1',
              borderBottomWidth: '4px',
              backgroundColor: '#ffffff',
            }}
            title="Click to check status"
          >
            <div style={styles.cardTopRow}>
              <span
                style={{
                  ...styles.categoryTag,
                  color: item.category === 'ai-model' ? '#9333ea' : '#64748b',
                  borderColor: item.category === 'ai-model' ? '#d8b4fe' : '#e2e8f0',
                  background: item.category === 'ai-model' ? '#faf5ff' : '#f8fafc',
                }}
              >
                {item.category === 'ai-model' ? 'AI MODEL' : 'LANGUAGE'}
              </span>
              <span style={styles.comingSoonBadge}>🔒 Planned</span>
            </div>

            <div style={styles.iconWrapper}>{item.icon}</div>
            <h3 style={styles.sectionTitle}>{item.name}</h3>
            <p style={styles.sectionDesc}>{item.description}</p>

            <div style={{ width: '100%', marginTop: 'auto', paddingTop: '10px' }}>
              <div style={styles.comingSoonPill}>
                Coming Soon
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '30px 20px',
    position: 'relative',
  },
  toast: {
    position: 'fixed',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1e293b',
    color: '#f8fafc',
    padding: '12px 24px',
    borderRadius: '24px',
    fontWeight: 800,
    fontSize: '0.95rem',
    boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1.5px solid #334155',
  },
  hero: {
    textAlign: 'center',
    padding: '40px 24px',
    background: 'white',
    borderRadius: '24px',
    border: '2px solid var(--border)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    marginBottom: '36px',
  },
  heroBadge: {
    display: 'inline-block',
    background: '#eff6ff',
    color: '#0284c7',
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: 800,
    fontSize: '0.85rem',
    marginBottom: '16px',
    border: '1px solid #bae6fd',
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: 900,
    marginBottom: '10px',
    letterSpacing: '-0.5px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '1.15rem',
    color: 'var(--text-secondary)',
    maxWidth: '560px',
    margin: '0 auto 28px auto',
    lineHeight: 1.5,
  },
  quickStatsRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #f1f5f9',
  },
  miniStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f8fafc',
    padding: '8px 18px',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    textAlign: 'left',
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  sectionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    padding: '28px 24px',
    borderRadius: '20px',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },
  cardTopRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  categoryTag: {
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: '8px',
    border: '1px solid',
  },
  completedBadge: {
    background: '#dcfce7',
    color: '#15803d',
    fontSize: '0.75rem',
    fontWeight: 800,
    padding: '2px 8px',
    borderRadius: '8px',
  },
  comingSoonBadge: {
    background: '#f1f5f9',
    color: '#64748b',
    fontSize: '0.72rem',
    fontWeight: 800,
    padding: '2px 8px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  comingSoonPill: {
    background: '#f1f5f9',
    color: '#475569',
    border: '1.5px solid #cbd5e1',
    borderRadius: '20px',
    padding: '8px 16px',
    fontWeight: 800,
    fontSize: '0.85rem',
    display: 'inline-block',
    letterSpacing: '0.5px',
  },
  iconWrapper: {
    fontSize: '3.2rem',
    margin: '8px 0 14px 0',
  },
  sectionTitle: {
    fontSize: '1.35rem',
    fontWeight: 900,
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  sectionDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    marginBottom: '20px',
    lineHeight: 1.5,
  },
  progressLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  progressBar: {
    width: '100%',
    height: '12px',
    background: '#e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '8px',
    transition: 'width 0.5s ease-in-out',
  },
  btnRow: {
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  learnBtn: {
    flex: 1,
    background: 'white',
    color: 'var(--text-primary)',
    border: '2px solid var(--border)',
    borderBottom: '4px solid #cbd5e1',
    padding: '10px 14px',
    fontSize: '0.9rem',
    borderRadius: '14px',
  },
  practiceBtn: {
    flex: 1.2,
    color: 'white',
    padding: '10px 14px',
    fontSize: '0.9rem',
    borderRadius: '14px',
  },
  footerTip: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fefce8',
    border: '1px solid #fef08a',
    borderRadius: '16px',
    padding: '14px 20px',
    fontSize: '0.92rem',
    color: '#854d0e',
  },
};
