'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/components/GamificationContext';
import Confetti from '@/components/Confetti';

export default function CppLevelPage() {
  const { updateProgress, playSound } = useGamification();
  const [currentStep, setCurrentStep] = useState(0); 
  // 0: Intro, 1: Challenge 1 (cout), 2: Challenge 2 (class), 3: Challenge 3 (methods), 4: Victory
  
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
      if (input1.trim().toLowerCase() === 'cout') {
        setTerminalOutput("$ g++ main.cpp -o app && ./app\nHello C++!\n\n[Process exited 0 - SUCCESS]");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(2);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ g++ main.cpp -o app\nmain.cpp: error: 'std::" + input1 + "' was not declared in this scope. Did you mean 'std::cout'?");
        setErrorMsg("Hint: In C++, the standard character output stream is named 'cout'.");
        playSound('error');
      }
    }, 600);
  };

  const runChallenge2 = () => {
    setIsCompiling(true);
    setErrorMsg(null);
    setTerminalOutput(null);
    playSound('click');

    setTimeout(() => {
      setIsCompiling(false);
      if (input2.trim().toLowerCase() === 'class') {
        setTerminalOutput("$ g++ main.cpp -o app && ./app\nRobot Hero Blueprint compiled successfully!\n\n[Process exited 0 - SUCCESS]");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(3);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ g++ main.cpp -o app\nmain.cpp: error: unknown type specifier. Did you mean 'class'?");
        setErrorMsg("Hint: In C++, we define object blueprints using the 'class' keyword.");
        playSound('error');
      }
    }, 600);
  };

  const runChallenge3 = () => {
    setIsCompiling(true);
    setErrorMsg(null);
    setTerminalOutput(null);
    playSound('click');

    setTimeout(() => {
      setIsCompiling(false);
      if (input3.trim() === '.') {
        setTerminalOutput("$ g++ main.cpp -o app && ./app\n[Robot activated]\n⚡ Laser power: 100%\n🤖 Robot initialized!\n\n[Process exited 0 - SUCCESS]");
        playSound('fanfare');
        updateProgress('cpp', 3, 3, 30);
        setTimeout(() => {
          setCurrentStep(4);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ g++ main.cpp -o app\nmain.cpp: error: member access syntax error. Use the dot operator '.' to access methods.");
        setErrorMsg("Hint: Use the dot operator '.' between the object name and its method (bot.powerUp()).");
        playSound('error');
      }
    }, 600);
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
        <span style={{ fontWeight: 800, color: 'var(--secondary)', minWidth: '45px', textAlign: 'right' }}>
          {progressPercent}%
        </span>
      </header>

      <main style={styles.main}>
        {/* STEP 0: Intro */}
        {currentStep === 0 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.mascot}>✨</div>
            <h1 style={styles.cardTitle}>Basics of C++</h1>
            <p style={styles.description}>
              C++ adds powerful Object-Oriented superpowers onto C! It is used to build AAA games (Unreal Engine), high-frequency trading platforms, and self-driving cars.
            </p>
            <div style={styles.infoBox}>
              💡 <strong>Goal:</strong> Master 3 interactive C++ challenges to earn <strong>+30 Coins</strong> and unlock the <strong>C++ Architect 🏛️</strong> badge!
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCurrentStep(1);
                playSound('click');
              }}
              style={{ width: '100%', marginTop: '20px' }}
            >
              Start Challenge 1 →
            </button>
          </div>
        )}

        {/* STEP 1: cout */}
        {currentStep === 1 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 1 of 3: Output Streams</div>
            <h2 style={styles.cardTitle}>Output with Streams</h2>
            <p style={styles.description}>
              Instead of <code>printf</code>, C++ uses stream operators <code>&lt;&lt;</code> to send data out to the screen. Fill in the missing stream object:
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>main.cpp</span>
              </div>
              <div className="terminal-body">
                <div><span className="code-keyword">#include</span> <span className="code-string">&lt;iostream&gt;</span></div>
                <div style={{ marginTop: '6px' }}><span className="code-type">int</span> <span className="code-func">main</span>() &#123;</div>
                <div style={{ paddingLeft: '20px', display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <span style={{ color: '#fff' }}>std::</span>
                  <input
                    type="text"
                    value={input1}
                    onChange={e => { setInput1(e.target.value); setErrorMsg(null); }}
                    style={styles.codeFillInput}
                    placeholder="____"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>&lt;&lt; &quot;Hello C++!&quot; &lt;&lt; std::endl;</span>
                </div>
                <div style={{ paddingLeft: '20px' }}><span className="code-keyword">return</span> 0;</div>
                <div>&#125;</div>
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
              className="btn btn-secondary"
              onClick={runChallenge1}
              disabled={isCompiling}
              style={{ width: '100%', marginTop: '16px' }}
            >
              {isCompiling ? 'Compiling C++ code... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 2: Classes */}
        {currentStep === 2 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 2 of 3: Object Blueprints</div>
            <h2 style={styles.cardTitle}>Create a Blueprint</h2>
            <p style={styles.description}>
              C++ is famous for Object-Oriented Programming. What keyword is used to declare a custom class?
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>hero.cpp</span>
              </div>
              <div className="terminal-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                  <input
                    type="text"
                    value={input2}
                    onChange={e => { setInput2(e.target.value); setErrorMsg(null); }}
                    style={styles.codeFillInput}
                    placeholder="_____"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>Robot &#123;</span>
                </div>
                <div style={{ paddingLeft: '20px' }}><span className="code-keyword">public:</span></div>
                <div style={{ paddingLeft: '40px' }}><span className="code-type">int</span> battery = 100;</div>
                <div style={{ paddingLeft: '40px' }}><span className="code-type">void</span> <span className="code-func">powerUp</span>();</div>
                <div>&#125;;</div>
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
              className="btn btn-secondary"
              onClick={runChallenge2}
              disabled={isCompiling}
              style={{ width: '100%', marginTop: '16px' }}
            >
              {isCompiling ? 'Compiling C++ code... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 3: Objects & Methods */}
        {currentStep === 3 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 3 of 3: Calling Methods</div>
            <h2 style={styles.cardTitle}>Activate the Robot</h2>
            <p style={styles.description}>
              We created a <code>bot</code> object from our Robot class. What single symbol (operator) connects the object to its <code>powerUp()</code> method?
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>main.cpp</span>
              </div>
              <div className="terminal-body">
                <div>Robot bot;</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <span style={{ color: '#fff' }}>bot</span>
                  <input
                    type="text"
                    value={input3}
                    onChange={e => { setInput3(e.target.value); setErrorMsg(null); }}
                    style={{ ...styles.codeFillInput, width: '45px' }}
                    placeholder="."
                    maxLength={1}
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>powerUp();</span>
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
              className="btn btn-secondary"
              onClick={runChallenge3}
              disabled={isCompiling}
              style={{ width: '100%', marginTop: '16px' }}
            >
              {isCompiling ? 'Compiling C++ code... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 4: Victory */}
        {currentStep === 4 && (
          <div className="card animate-pop" style={styles.victoryCard}>
            <div style={{ fontSize: '4.5rem', marginBottom: '12px' }}>🏛️</div>
            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '8px' }}>C++ Track Completed!</h1>
            <p style={{ fontSize: '1.2rem', color: '#f0fdf4', marginBottom: '24px' }}>
              Incredible work! You conquered streams, classes, and object methods!
            </p>

            <div style={styles.rewardPill}>
              <span>🪙 +30 Coins Earned</span>
              <span>⭐ Badge: C++ Architect</span>
            </div>

            <Link
              href="/"
              className="btn"
              onClick={() => playSound('click')}
              style={{
                background: 'white',
                color: 'var(--secondary)',
                width: '100%',
                fontWeight: 900,
                fontSize: '1.1rem',
                borderBottom: '4px solid #bbf7d0',
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
    background: 'linear-gradient(90deg, #58cc02, #22c55e)',
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
    background: '#dcfce7',
    color: '#15803d',
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
    border: '2px solid #4ade80',
    color: '#4ade80',
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
    color: '#4ade80',
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
    background: 'linear-gradient(135deg, #58cc02, #16a34a)',
    color: 'white',
    textAlign: 'center',
    padding: '48px 32px',
    borderRadius: '24px',
    border: 'none',
    boxShadow: '0 20px 40px rgba(88, 204, 2, 0.35)',
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
