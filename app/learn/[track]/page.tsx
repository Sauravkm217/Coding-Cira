'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TRACK_NOTES, NoteTopic } from '@/data/notes';
import { useGamification } from '@/components/GamificationContext';
import Confetti from '@/components/Confetti';

interface PageProps {
  params: Promise<{ track: string }>;
}

export default function LearnTrackPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const trackId = unwrappedParams.track;
  const trackData = TRACK_NOTES[trackId];

  const { addCoins, playSound } = useGamification();

  // State for active topic
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [claimedTopics, setClaimedTopics] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  // Load claimed status from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('coding_cira_claimed_notes');
      if (saved) {
        setClaimedTopics(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const activeTopic: NoteTopic | undefined = trackData?.topics[activeTopicIndex];

  // Reset timer when switching topic
  useEffect(() => {
    if (!activeTopic) return;
    const initialSeconds = Math.max(10, Math.round(activeTopic.readTimeMinutes * 60));
    setSecondsRemaining(initialSeconds);
    setIsTimerActive(true);
    setShowConfetti(false);
  }, [activeTopicIndex, activeTopic]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          playSound('click');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, secondsRemaining, playSound]);

  if (!trackData || !activeTopic) {
    return (
      <div style={styles.container}>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Track Notes Not Found</h2>
          <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>
            We could not find study notes for &quot;{trackId}&quot;.
          </p>
          <Link href="/" className="btn btn-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isClaimed = !!claimedTopics[activeTopic.id];
  const canClaim = secondsRemaining === 0 && !isClaimed;

  const handleClaimCoins = () => {
    if (!canClaim) return;
    addCoins(activeTopic.coinsOnComplete);
    playSound('fanfare');
    setShowConfetti(true);

    const updated = { ...claimedTopics, [activeTopic.id]: true };
    setClaimedTopics(updated);
    try {
      localStorage.setItem('coding_cira_claimed_notes', JSON.stringify(updated));
    } catch {}

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      {showConfetti && <Confetti count={40} />}

      {/* Header bar */}
      <div style={styles.headerRow}>
        <Link href="/" className="btn" style={styles.backBtn} onClick={() => playSound('click')}>
          ← Map
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.6rem' }}>{trackData.icon}</span>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
              {trackData.trackName} Study Notes
            </h1>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Topic {activeTopicIndex + 1} of {trackData.topics.length}
            </div>
          </div>
        </div>

        <Link
          href={`/levels/${trackId}`}
          className="btn"
          onClick={() => playSound('click')}
          style={{
            ...styles.practiceBtn,
            backgroundColor: trackData.color,
            color: 'white',
          }}
        >
          Practice Challenge ⚡
        </Link>
      </div>

      {/* Topic Tabs Navigation */}
      <div style={styles.tabsContainer}>
        {trackData.topics.map((t, idx) => {
          const active = idx === activeTopicIndex;
          const claimed = !!claimedTopics[t.id];
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTopicIndex(idx);
                playSound('click');
              }}
              style={{
                ...styles.tabButton,
                borderColor: active ? trackData.color : 'var(--border)',
                background: active ? 'white' : '#f8fafc',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: active ? 800 : 600,
              }}
            >
              <span>{t.title}</span>
              {claimed && <span style={styles.tabClaimedBadge}>✓ Claimed</span>}
            </button>
          );
        })}
      </div>

      {/* Main Study Card */}
      <div className="card animate-pop" style={styles.notesCard}>
        {/* Title & Metadata */}
        <div style={styles.notesHeader}>
          <div>
            <span style={{ ...styles.topicPill, color: trackData.color, borderColor: trackData.color }}>
              📖 Study Session
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-primary)' }}>
              {activeTopic.title}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {activeTopic.subtitle}
            </p>
          </div>

          {/* Countdown & Claim Box */}
          <div style={styles.timerBox}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Reading Timer
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'monospace', color: secondsRemaining === 0 ? 'var(--secondary)' : 'var(--primary)' }}>
              {secondsRemaining === 0 ? 'READY! 🎉' : formatTimer(secondsRemaining)}
            </div>

            <button
              className="btn"
              onClick={handleClaimCoins}
              disabled={!canClaim}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                borderRadius: '12px',
                background: isClaimed
                  ? '#e2e8f0'
                  : canClaim
                  ? 'var(--secondary)'
                  : '#cbd5e1',
                color: isClaimed ? '#64748b' : 'white',
                borderBottom: isClaimed
                  ? 'none'
                  : canClaim
                  ? '3px solid var(--secondary-shadow)'
                  : 'none',
                cursor: canClaim ? 'pointer' : 'default',
                marginTop: '4px',
              }}
            >
              {isClaimed ? '🪙 Claimed (+15)' : canClaim ? 'Claim +15 Coins! 🪙' : `Read to Unlock ⏳`}
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />

        {/* Study Paragraphs */}
        <div style={styles.paragraphsArea}>
          {activeTopic.paragraphs.map((p, pIdx) => (
            <p key={pIdx} style={styles.paragraphText}>
              {p}
            </p>
          ))}
        </div>

        {/* Code Snippet */}
        {activeTopic.codeSnippet && (
          <div style={{ margin: '24px 0' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '8px', color: '#475569' }}>
              💻 Live Code Reference:
            </div>
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>example.{trackId === 'ai' ? 'py' : trackId}</span>
              </div>
              <div className="terminal-body" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {activeTopic.codeSnippet}
              </div>
            </div>
          </div>
        )}

        {/* Key Takeaway Box */}
        <div style={styles.keyTakeawayBox}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0369a1', marginBottom: '4px' }}>
            💡 Key Takeaway:
          </div>
          <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.5 }}>
            {activeTopic.keyTakeaway}
          </div>
        </div>

        {/* Footer actions */}
        <div style={styles.footerRow}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {activeTopicIndex > 0 && (
              <button
                className="btn"
                onClick={() => {
                  setActiveTopicIndex(prev => prev - 1);
                  playSound('click');
                }}
                style={styles.navTopicBtn}
              >
                ← Previous Topic
              </button>
            )}

            {activeTopicIndex < trackData.topics.length - 1 && (
              <button
                className="btn"
                onClick={() => {
                  setActiveTopicIndex(prev => prev + 1);
                  playSound('click');
                }}
                style={styles.navTopicBtn}
              >
                Next Topic →
              </button>
            )}
          </div>

          <Link
            href={`/levels/${trackId}`}
            className="btn"
            onClick={() => playSound('click')}
            style={{
              background: trackData.color,
              color: 'white',
              borderBottom: '4px solid rgba(0,0,0,0.15)',
            }}
          >
            Ready for Challenges! 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '820px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '24px',
  },
  backBtn: {
    background: 'white',
    color: 'var(--text-secondary)',
    border: '2px solid var(--border)',
    padding: '8px 14px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 800,
  },
  practiceBtn: {
    padding: '8px 16px',
    fontSize: '0.85rem',
    borderRadius: '12px',
    borderBottom: '3px solid rgba(0,0,0,0.2)',
  },
  tabsContainer: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    marginBottom: '20px',
    paddingBottom: '4px',
  },
  tabButton: {
    padding: '10px 16px',
    borderRadius: '14px',
    border: '2px solid',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  tabClaimedBadge: {
    background: '#dcfce7',
    color: '#15803d',
    fontSize: '0.72rem',
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: '8px',
  },
  notesCard: {
    padding: '32px 28px',
  },
  notesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px',
  },
  topicPill: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    padding: '3px 10px',
    borderRadius: '10px',
    border: '1px solid',
  },
  timerBox: {
    background: '#f8fafc',
    border: '2px solid var(--border)',
    borderRadius: '16px',
    padding: '12px 18px',
    textAlign: 'center',
    minWidth: '160px',
  },
  paragraphsArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  paragraphText: {
    fontSize: '1.05rem',
    lineHeight: 1.7,
    color: '#334155',
  },
  keyTakeawayBox: {
    background: '#f0f9ff',
    border: '1.5px solid #bae6fd',
    borderRadius: '14px',
    padding: '16px 20px',
    marginTop: '20px',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '28px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border)',
  },
  navTopicBtn: {
    background: 'white',
    color: 'var(--text-primary)',
    border: '2px solid var(--border)',
    padding: '8px 14px',
    borderRadius: '12px',
    fontSize: '0.85rem',
  },
};
