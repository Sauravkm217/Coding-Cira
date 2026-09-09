'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from './GamificationContext';

export default function Navbar() {
  const { coins, streak, soundEnabled, setSoundEnabled, resetProgress, badges } = useGamification();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.logoGroup}>
          <span style={styles.logoIcon}>🤖</span>
          <span style={styles.logoText}>Coding Cira</span>
          <span style={styles.sparkBadge}>v2.0</span>
        </Link>

        <div style={styles.rightGroup}>
          {/* Streak pill */}
          <div style={styles.statPill} title="Day Streak!">
            <span style={styles.streakFlame}>🔥</span>
            <span>{streak}</span>
          </div>

          {/* Coins pill */}
          <div style={{ ...styles.statPill, borderColor: 'var(--warning)' }} title="Coding Coins!">
            <span style={styles.coinIcon}>🪙</span>
            <span style={{ color: '#d97706', fontWeight: 900 }}>{coins}</span>
          </div>

          {/* Sound toggle button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={styles.iconButton}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Settings / Reset button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={styles.iconButton}
            title="Settings & Badges"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Settings & Badges Modal */}
      {showSettings && (
        <div style={styles.modalOverlay} onClick={() => setShowSettings(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Profile & Settings ⚙️</h3>
              <button
                onClick={() => setShowSettings(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.settingItem}>
                <div>
                  <strong>Sound Effects</strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Cute 8-bit audio feedback for learning
                  </div>
                </div>
                <button
                  className={`btn ${soundEnabled ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div style={{ marginTop: '16px' }}>
                <strong>Unlocked Badges 🏆</strong>
                <div style={styles.badgesContainer}>
                  {badges.map((b, i) => (
                    <span key={i} style={styles.badgePill}>{b}</span>
                  ))}
                </div>
              </div>

              <div style={styles.dangerZone}>
                <div>
                  <strong style={{ color: 'var(--danger)' }}>Reset Learning Progress</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Clears coins, badges, and starts fresh.
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all game progress?')) {
                      resetProgress();
                      setShowSettings(false);
                    }
                  }}
                  style={styles.resetBtn}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 900,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '2px solid var(--border)',
    padding: '12px 20px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.8rem',
    display: 'inline-block',
    animation: 'float 3s ease-in-out infinite',
  },
  logoText: {
    fontSize: '1.35rem',
    fontWeight: 900,
    color: 'var(--primary)',
    letterSpacing: '-0.5px',
  },
  sparkBadge: {
    fontSize: '0.7rem',
    background: 'linear-gradient(135deg, #1cb0f6, #a855f7)',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 800,
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontWeight: 800,
    border: '2px solid var(--border)',
    fontSize: '0.95rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  },
  streakFlame: {
    fontSize: '1.1rem',
  },
  coinIcon: {
    fontSize: '1.1rem',
  },
  iconButton: {
    background: 'white',
    border: '2px solid var(--border)',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '16px',
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '420px',
    border: '2px solid var(--border)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    animation: 'popIn 0.3s ease',
  },
  modalHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fafafa',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
  },
  modalBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  badgePill: {
    background: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fde68a',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 700,
  },
  dangerZone: {
    marginTop: '10px',
    paddingTop: '16px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetBtn: {
    background: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
    padding: '6px 12px',
    borderRadius: '8px',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};
