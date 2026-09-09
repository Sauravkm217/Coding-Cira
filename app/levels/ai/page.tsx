'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/components/GamificationContext';
import Confetti from '@/components/Confetti';

export default function AiLevelPage() {
  const { updateProgress, playSound } = useGamification();
  const [currentStep, setCurrentStep] = useState(0);
  // 0: Intro, 1: Challenge 1 (prompts), 2: Challenge 2 (training data), 3: Challenge 3 (weights), 4: Victory

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
      if (input1.trim().toLowerCase() === 'prompt') {
        setTerminalOutput("$ ai_agent.infer()\n[Tokenizing instruction...]\nAI Model: 'The solar system has 8 planets orbiting the Sun!' 🌌\n\n[Inference completed in 120ms]");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(2);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ ai_agent.infer()\nValidationError: Missing input key. Expected 'prompt'.");
        setErrorMsg("Hint: The input text instruction provided to an AI model is called a 'prompt'.");
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
      if (input2.trim().toLowerCase() === 'dataset' || input2.trim().toLowerCase() === 'data') {
        setTerminalOutput("$ python train_model.py\nLoading 10,000 cat & dog examples...\nEpoch 1/5 - Loss: 0.42 - Accuracy: 88%\nEpoch 5/5 - Loss: 0.08 - Accuracy: 98.4%\nModel trained successfully! 🐾");
        playSound('success');
        setTimeout(() => {
          setCurrentStep(3);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ python train_model.py\nValueError: No training dataset found. Did you mean 'dataset' or 'data'?");
        setErrorMsg("Hint: The collection of examples used to train AI is called a 'dataset'.");
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
      if (input3.trim().toLowerCase() === 'weights' || input3.trim().toLowerCase() === 'weight') {
        setTerminalOutput("$ python evaluate.py\nOptimizing 7 Billion Neural Weights via Gradient Descent...\n⚡ Forward Pass... Loss optimized!\n🧠 Superintelligence Spark Activated!\n\n[Success: Model Ready for Deployment!]");
        playSound('fanfare');
        updateProgress('ai', 3, 3, 30);
        setTimeout(() => {
          setCurrentStep(4);
          setTerminalOutput(null);
        }, 1400);
      } else {
        setTerminalOutput("$ python evaluate.py\nRuntimeError: Unknown neural parameter. Expected 'weights'.");
        setErrorMsg("Hint: The internal adjustable parameters in a neural network are known as 'weights'.");
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
        <span style={{ fontWeight: 800, color: '#9333ea', minWidth: '45px', textAlign: 'right' }}>
          {progressPercent}%
        </span>
      </header>

      <main style={styles.main}>
        {/* STEP 0: Intro */}
        {currentStep === 0 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.mascot}>🧠</div>
            <h1 style={styles.cardTitle}>Basics of AI</h1>
            <p style={styles.description}>
              Discover the secrets behind Artificial Intelligence, Large Language Models (LLMs), neural networks, and how machines learn from data!
            </p>
            <div style={styles.infoBox}>
              💡 <strong>Goal:</strong> Complete 3 interactive AI challenges to earn <strong>+30 Coins</strong> and unlock the prestigious <strong>AI Pioneer 🧠</strong> badge!
            </div>
            <button
              className="btn"
              onClick={() => {
                setCurrentStep(1);
                playSound('click');
              }}
              style={{
                width: '100%',
                marginTop: '20px',
                background: '#9333ea',
                color: 'white',
                borderBottom: '4px solid #7e22ce',
                fontWeight: 800,
              }}
            >
              Start Challenge 1 →
            </button>
          </div>
        )}

        {/* STEP 1: Prompt Engineering */}
        {currentStep === 1 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 1 of 3: Prompts</div>
            <h2 style={styles.cardTitle}>Talking to an AI</h2>
            <p style={styles.description}>
              When you talk to ChatGPT or Gemini, the instruction you supply to steer its response is called a:
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>ai_query.py</span>
              </div>
              <div className="terminal-body">
                <div>ai_client = GeminiClient()</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <span style={{ color: '#fff' }}>user_</span>
                  <input
                    type="text"
                    value={input1}
                    onChange={e => { setInput1(e.target.value); setErrorMsg(null); }}
                    style={styles.codeFillInput}
                    placeholder="_____"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>= &quot;Explain the solar system!&quot;</span>
                </div>
                <div>response = ai_client.generate(user_prompt)</div>
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
                background: '#9333ea',
                color: 'white',
                borderBottom: '4px solid #7e22ce',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Evaluating Prompt with AI... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 2: Datasets */}
        {currentStep === 2 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 2 of 3: Training Data</div>
            <h2 style={styles.cardTitle}>Teaching the Model</h2>
            <p style={styles.description}>
              Instead of writing manual rules, we feed thousands of examples to an algorithm. What do we call this collection of examples?
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>train.py</span>
              </div>
              <div className="terminal-body">
                <div>model = VisionClassifier()</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <span style={{ color: '#fff' }}>training_</span>
                  <input
                    type="text"
                    value={input2}
                    onChange={e => { setInput2(e.target.value); setErrorMsg(null); }}
                    style={styles.codeFillInput}
                    placeholder="____"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>= load_images(&quot;cats_vs_dogs/&quot;)</span>
                </div>
                <div>model.fit(training_dataset, epochs=5)</div>
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
                background: '#9333ea',
                color: 'white',
                borderBottom: '4px solid #7e22ce',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Training Neural Network... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 3: Neural Weights */}
        {currentStep === 3 && (
          <div className="card animate-pop" style={styles.card}>
            <div style={styles.stepBadge}>Challenge 3 of 3: Neural Parameters</div>
            <h2 style={styles.cardTitle}>How Neural Networks Learn</h2>
            <p style={styles.description}>
              A neural network consists of billions of connected artificial neurons. During training, the computer tunes these connection strengths called:
            </p>

            <div className="terminal-window" style={{ marginBottom: '16px' }}>
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '8px' }}>neural_net.py</span>
              </div>
              <div className="terminal-body">
                <div>loss = compute_loss(predictions, targets)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                  <span style={{ color: '#fff' }}>model.update_</span>
                  <input
                    type="text"
                    value={input3}
                    onChange={e => { setInput3(e.target.value); setErrorMsg(null); }}
                    style={{ ...styles.codeFillInput, width: '95px' }}
                    placeholder="______"
                    autoFocus
                  />
                  <span style={{ color: '#fff' }}>(learning_rate=0.01)</span>
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
              onClick={runChallenge3}
              disabled={isCompiling}
              style={{
                width: '100%',
                marginTop: '16px',
                background: '#9333ea',
                color: 'white',
                borderBottom: '4px solid #7e22ce',
                fontWeight: 800,
              }}
            >
              {isCompiling ? 'Tuning Neural Weights... ⏳' : '▶ Run & Check Answer'}
            </button>
          </div>
        )}

        {/* STEP 4: Victory */}
        {currentStep === 4 && (
          <div className="card animate-pop" style={styles.victoryCard}>
            <div style={{ fontSize: '4.5rem', marginBottom: '12px' }}>🧠</div>
            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '8px' }}>AI Track Mastered!</h1>
            <p style={{ fontSize: '1.2rem', color: '#f3e8ff', marginBottom: '24px' }}>
              Spectacular! You learned prompts, datasets, and how neural weights power artificial intelligence!
            </p>

            <div style={styles.rewardPill}>
              <span>🪙 +30 Coins Earned</span>
              <span>⭐ Badge: AI Pioneer</span>
            </div>

            <Link
              href="/"
              className="btn"
              onClick={() => playSound('click')}
              style={{
                background: 'white',
                color: '#7e22ce',
                width: '100%',
                fontWeight: 900,
                fontSize: '1.1rem',
                borderBottom: '4px solid #e9d5ff',
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
    background: 'linear-gradient(90deg, #c084fc, #9333ea)',
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
    background: '#f3e8ff',
    color: '#7e22ce',
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
    border: '2px solid #c084fc',
    color: '#c084fc',
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
    color: '#d8b4fe',
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
    background: 'linear-gradient(135deg, #9333ea, #6b21a8)',
    color: 'white',
    textAlign: 'center',
    padding: '48px 32px',
    borderRadius: '24px',
    border: 'none',
    boxShadow: '0 20px 40px rgba(147, 51, 234, 0.35)',
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
