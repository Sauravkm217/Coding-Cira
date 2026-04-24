'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CLevelPage() {
  const [step, setStep] = useState(0); // 0 = Intro, 1 = Challenge, 2 = Success
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const checkAnswer = () => {
    if (inputCode.trim().toLowerCase() === 'printf') {
      setStep(2);
      setErrorMsg(false);
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={styles.backBtn}>← Map</Link>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: step === 0 ? '33%' : step === 1 ? '66%' : '100%' }} />
        </div>
      </header>

      <main style={styles.main}>
        {step === 0 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.mascot}>🤖</div>
            <h2>Welcome to C!</h2>
            <p style={styles.text}>
              "C" is one of the oldest and most powerful programming languages! It is like the master key to how computers work. 
              Let's learn how to print text to the screen!
            </p>
            <button className="btn btn-primary" onClick={() => setStep(1)} style={{ width: '100%' }}>Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="card animate-pop" style={styles.card}>
            <h2>Complete the Code!</h2>
            <p style={styles.text}>We use a special command to print text to the screen. Fill in the blank to print "Hello World!"</p>
            
            <div style={styles.codeBlock}>
              <input 
                type="text" 
                value={inputCode} 
                onChange={(e) => { setInputCode(e.target.value); setErrorMsg(false); }}
                style={styles.inputCode}
                placeholder="____"
                autoFocus
              />
              <span style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'monospace' }}>("Hello World!");</span>
            </div>

            {errorMsg && (
              <div className="animate-pop" style={styles.error}>
                Oops! Try asking Tutor Cira for a hint!
              </div>
            )}

            <button className="btn btn-secondary" onClick={checkAnswer} style={{ width: '100%', marginTop: '20px' }}>
              Check Answer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card animate-pop" style={{...styles.card, background: 'var(--secondary)', color: 'white', borderColor: 'var(--secondary)'}}>
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ color: 'white' }}>Level Complete!</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '24px' }}>You earned +10 Coins</p>
            
            <Link href="/" className="btn" style={{ background: 'white', color: 'var(--secondary)', width: '100%', borderBottom: '4px solid #e0e0e0' }}>
              Continue
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
  },
  backBtn: {
    fontWeight: 'bold',
    color: 'var(--text-secondary)',
  },
  progressBar: {
    flex: 1,
    height: '16px',
    background: 'var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'var(--secondary)',
    transition: 'width 0.4s ease',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
    padding: '40px 30px',
  },
  mascot: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    lineHeight: 1.6,
  },
  codeBlock: {
    background: '#1e1e1e',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputCode: {
    background: '#333',
    border: '2px solid var(--primary)',
    color: 'var(--primary)',
    padding: '8px',
    borderRadius: '8px',
    width: '100px',
    fontSize: '1.2rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    outline: 'none',
  },
  error: {
    background: '#ffe5e5',
    color: 'var(--danger)',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '20px',
    fontWeight: 'bold',
    border: '2px solid var(--danger)'
  }
};
