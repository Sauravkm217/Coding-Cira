'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/components/GamificationContext';
import Confetti from '@/components/Confetti';

export default function PythonLevelPage() {
  const { updateProgress, playSound } = useGamification();
  const [currentStep, setCurrentStep] = useState(0);
  // 0: Intro, 1: Challenge 1 (print), 2: Challenge 2 (for loop), 3: Challenge 3 (def function), 4: Victory

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const runChallenge1 = () => {
    setIsCompiling(true);
    setErrorMsg(null);
    setTerminalOutput(null);
    playSound('click');

    setTimeout(() => {
      setIsCompiling(false);
      if (input1.trim().toLowerCase() === 'print') {
        setTerminalOutput("$ python3 script.py\nHello Python World! 🐍\n\n[Finished in 0.04s]");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(2);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ python3 script.py\nNameError: name '" + input1 + "' is not defined.");
        setErrorMsg("Hint: Python uses the simple 'print' command to show output.");
        playSound('error');
      }
    }, 500);
  };

  const runChallenge2 = () => {
    setIsCompiling(true);
    setErrorMsg(null);
    setTerminalOutput(null);
    playSound('click');

    setTimeout(() => {
      setIsCompiling(false);
      if (input2.trim().toLowerCase() === 'for') {
        setTerminalOutput("$ python3 script.py\nCasting Sparkle ✨\nCasting Lightning ⚡\nCasting Shield 🛡️\n\n[All spells cast successfully!]");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(3);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ python3 script.py\nSyntaxError: invalid syntax. Loop keyword expected.");
        setErrorMsg("Hint: Python uses the 'for' keyword to iterate through items in a list.");
        playSound('error');
      }
    }, 500);
  };

  const runChallenge3 = () => {
    setIsCompiling(true);
    setErrorMsg(null);
    setTerminalOutput(null);
    playSound('click');

    setTimeout(() => {
      setIsCompiling(false);
      if (input3.trim().toLowerCase() === 'def') {
        setTerminalOutput("$ python3 script.py\n🔮 Magic potion brewed with 100 Power!\n\n[Finished in 0.03s]");
        playSound('fanfare');
        updateProgress('python', 3, 3, 30);
        setTimeout(() => {
          setCurrentStep(4);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ python3 script.py\nSyntaxError: invalid syntax. Expected keyword to define function.");
        setErrorMsg("Hint: Functions in Python are defined with the 3-letter keyword 'def'.");
        playSound('error');
      }
    }, 500);
  };

  const progressPercent = Math.round((currentStep / 4) * 100);

  return (
    <div style={styles.container}>
      {currentStep === 4 && <Confetti count={50} />}

      {/* Header */}
      <header style={styles.header}>
        <Link href="/" className="btn" style={styles.backBtn} onClick={() => playSound('click')}>
          ← Map
        </Link>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
        </div>
        <span style={{ fontWeight: 800, color: 'var(--warning)', minWidth: '45px', textAlign: 'right' }}>
          {progressPercent}%
        </span>
      </header>

      <main style={styles.main}>
        {/* STEP 0: Intro */}
        {currentStep === 0 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.mascot}>🐍</div>
            <h1 style={styles.cardTitle}>Python Basics</h1>
            <p style={styles.description}>
              Python is the most popular, readable, and versatile language in the world! Used by NASA, Google, YouTube, and AI researchers worldwide.
            </p>
            <div style={styles.infoBox}>
              💡 <strong>Goal:</strong> Complete 3 interactive Python quests to earn <strong>+30 Coins</strong> and unlock the <strong>Snake Charmer 🐍</strong> badge!
            </div>
            <button
              className="btn btn-warning"
              onClick={() => {
                setCurrentStep(1);
                playSound('click');
              }}
              style={{ width: '100%', marginTop: '20px', color: '#78350f', background: 'var(--warning)', borderBottom: '4px solid #d97706' }}
            >
              Start Challenge 1 →
            </button>
          </div>
        )}

        {/* STEP 1: print */}
        {currentStep === 1 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 1 of 3: Clean Output</div>
            <h2 style={styles.cardTitle}>Print in Python</h2>
            <p style={styles.description}>
              No semicolons, no headers! In Python, printing is as simple as it gets. Fill in the command:
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>script.py</span>
              </div>
              <div className="terminal-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <input
                    type="text"
                    value={input1}
                    onChange={e => { setInput1(e.target.value); setErrorMsg(null); }}
                    style={styles.codeFillInput}
                    placeholder="____"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>(&quot;Hello Python World! 🐍&quot;)</span>
                </div>
              </div>
            </div>

            {terminalOutput && (
              <div style={styles.consolePreview}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {terminalOutput}
                </pre>
              </div>
            )}

            {errorMsg && (
              <div className="animate-pop" style={styles.errorBox}>
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              className="btn"
              onClick={runChallenge1}
              disabled={isCompiling}
              style={{
                width: '100%',
                marginTop: '16px',
                background: '#eab308',
                color: '#422006',
                borderBottom: '4px solid #ca8a04',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Running Python... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 2: Loops */}
        {currentStep === 2 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 2 of 3: Loops & Iteration</div>
            <h2 style={styles.cardTitle}>Looping Through Spells</h2>
            <p style={styles.description}>
              We have a list of spells. What keyword starts the loop through each item?
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>loop.py</span>
              </div>
              <div className="terminal-body">
                <div>spells = [&quot;Sparkle ✨&quot;, &quot;Lightning ⚡&quot;, &quot;Shield 🛡️&quot;]</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <input
                    type="text"
                    value={input2}
                    onChange={e => { setInput2(e.target.value); setErrorMsg(null); }}
                    style={{ ...styles.codeFillInput, width: '60px' }}
                    placeholder="__"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>spell in spells:</span>
                </div>
                <div style={{ paddingLeft: '24px' }}>
                  <span className="code-func">print</span>(f&quot;Casting &#123;spell&#125;&quot;)
                </div>
              </div>
            </div>

            {terminalOutput && (
              <div style={styles.consolePreview}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {terminalOutput}
                </pre>
              </div>
            )}

            {errorMsg && (
              <div className="animate-pop" style={styles.errorBox}>
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              className="btn"
              onClick={runChallenge2}
              disabled={isCompiling}
              style={{
                width: '100%',
                marginTop: '16px',
                background: '#eab308',
                color: '#422006',
                borderBottom: '4px solid #ca8a04',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Running Python... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 3: Functions */}
        {currentStep === 3 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 3 of 3: Defining Functions</div>
            <h2 style={styles.cardTitle}>Define a Function</h2>
            <p style={styles.description}>
              Functions let us package code into reusable actions. What 3 letters define a function in Python?
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>magic.py</span>
              </div>
              <div className="terminal-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                  <input
                    type="text"
                    value={input3}
                    onChange={e => { setInput3(e.target.value); setErrorMsg(null); }}
                    style={{ ...styles.codeFillInput, width: '65px' }}
                    placeholder="___"
                    autoFocus
                  />
                  <span className="code-func">brew_potion</span>(power):
                </div>
                <div style={{ paddingLeft: '24px' }}>
                  <span className="code-func">print</span>(f&quot;🔮 Magic potion brewed with &#123;power&#125; Power!&quot;)
                </div>
                <div style={{ marginTop: '8px' }}>brew_potion(100)</div>
              </div>
            </div>

            {terminalOutput && (
              <div style={styles.consolePreview}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {terminalOutput}
                </pre>
              </div>
            )}

            {errorMsg && (
              <div className="animate-pop" style={styles.errorBox}>
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              className="btn"
              onClick={runChallenge3}
              disabled={isCompiling}
              style={{
                width: '100%',
                marginTop: '16px',
                background: '#eab308',
                color: '#422006',
                borderBottom: '4px solid #ca8a04',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Running Python... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 4: Victory */}
        {currentStep === 4 && (
          <div className="card animate-pop" style={styles.victoryCard}>
            <div style={{ fontSize: '4.5rem', marginBottom: '12px' }}>🐍</div>
            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '8px' }}>Python Mastered!</h1>
            <p style={{ fontSize: '1.2rem', color: '#fef3c7', marginBottom: '24px' }}>
              Awesome! You mastered Python print statements, list iteration, and function definitions!
            </p>

            <div style={styles.rewardPill}>
              <span>🪙 +30 Coins Earned</span>
              <span>⭐ Badge: Snake Charmer</span>
            </div>

            <Link
              href="/"
              className="btn"
              onClick={() => playSound('click')}
              style={{
                background: 'white',
                color: '#b45309',
                width: '100%',
                fontWeight: 900,
                fontSize: '1.1rem',
                borderBottom: '4px solid #fde68a',
              }}
            >
              Return to Track Map 🚀
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '24px 20px',
    minHeight: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
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
  progressBar: {
    flex: 1,
    height: '16px',
    background: '#e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ffc800, #eab308)',
    transition: 'width 0.4s ease-in-out',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    textAlign: 'center',
    padding: '36px 28px',
  },
  mascot: {
    fontSize: '4.5rem',
    marginBottom: '16px',
    animation: 'float 3s ease-in-out infinite',
  },
  stepBadge: {
    display: 'inline-block',
    background: '#fef3c7',
    color: '#92400e',
    fontWeight: 800,
    fontSize: '0.85rem',
    padding: '4px 12px',
    borderRadius: '16px',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '1.8rem',
    fontWeight: 900,
    marginBottom: '12px',
    color: 'var(--text-primary)',
  },
  description: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  infoBox: {
    background: '#f8fafc',
    border: '1.5px dashed var(--border)',
    borderRadius: '12px',
    padding: '14px',
    fontSize: '0.95rem',
    textAlign: 'left',
    color: '#334155',
  },
  codeFillInput: {
    background: '#1f2937',
    border: '2px solid #facc15',
    color: '#facc15',
    padding: '4px 10px',
    borderRadius: '8px',
    width: '90px',
    fontSize: '1.1rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    outline: 'none',
    textAlign: 'center',
  },
  consolePreview: {
    background: '#030712',
    color: '#fef08a',
    borderRadius: '10px',
    padding: '12px 16px',
    textAlign: 'left',
    marginBottom: '12px',
    border: '1px solid #1f2937',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '0.9rem',
    marginBottom: '12px',
    border: '1px solid #fca5a5',
    textAlign: 'left',
  },
  victoryCard: {
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    textAlign: 'center',
    padding: '48px 32px',
    borderRadius: '24px',
    border: 'none',
    boxShadow: '0 20px 40px rgba(245, 158, 11, 0.35)',
  },
  rewardPill: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '12px 20px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-around',
    fontWeight: 800,
    marginBottom: '32px',
    fontSize: '1rem',
  },
};
