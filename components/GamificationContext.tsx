'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface GamificationState {
  coins: number;
  streak: number;
  soundEnabled: boolean;
  levelProgress: Record<string, number>; // trackId -> percentage (0 to 100)
  completedSteps: Record<string, number>; // trackId -> highest step completed
  badges: string[];
  addCoins: (amount: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  updateProgress: (trackId: string, currentStep: number, totalSteps: number, rewardCoins?: number) => void;
  resetProgress: () => void;
  playSound: (sound: 'coin' | 'success' | 'error' | 'click' | 'fanfare') => void;
}

const STORAGE_KEY = 'coding_cira_game_state_v1';

const defaultState = {
  coins: 120,
  streak: 5,
  soundEnabled: true,
  levelProgress: {
    c: 33,
    cpp: 0,
    python: 0,
    ai: 0,
  },
  completedSteps: {
    c: 1,
    cpp: 0,
    python: 0,
    ai: 0,
  },
  badges: ['Early Bird ✨'],
};

const GamificationContext = createContext<GamificationState | null>(null);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState(defaultState.coins);
  const [streak, setStreak] = useState(defaultState.streak);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [levelProgress, setLevelProgress] = useState<Record<string, number>>(defaultState.levelProgress);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number>>(defaultState.completedSteps);
  const [badges, setBadges] = useState<string[]>(defaultState.badges);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.coins === 'number') setCoins(parsed.coins);
        if (typeof parsed.streak === 'number') setStreak(parsed.streak);
        if (typeof parsed.soundEnabled === 'boolean') setSoundEnabled(parsed.soundEnabled);
        if (parsed.levelProgress) setLevelProgress(parsed.levelProgress);
        if (parsed.completedSteps) setCompletedSteps(parsed.completedSteps);
        if (Array.isArray(parsed.badges)) setBadges(parsed.badges);
      }
    } catch (e) {
      console.error('Failed to load game state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data = {
        coins,
        streak,
        soundEnabled,
        levelProgress,
        completedSteps,
        badges,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  }, [coins, streak, soundEnabled, levelProgress, completedSteps, badges, isLoaded]);

  // Audio synthesis using Web Audio API
  const playSound = (sound: 'coin' | 'success' | 'error' | 'click' | 'fanfare') => {
    if (!soundEnabled || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (sound === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (sound === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (sound === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
        });
      } else if (sound === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(130, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (sound === 'fanfare') {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
        });
      }
    } catch {
      // Audio context might be restricted before user interaction
    }
  };

  const addCoins = (amount: number) => {
    setCoins(c => c + amount);
    playSound('coin');
  };

  const updateProgress = (trackId: string, currentStep: number, totalSteps: number, rewardCoins: number = 10) => {
    const calculated = Math.min(100, Math.round((currentStep / totalSteps) * 100));
    setLevelProgress(prev => ({
      ...prev,
      [trackId]: Math.max(prev[trackId] || 0, calculated),
    }));

    setCompletedSteps(prev => ({
      ...prev,
      [trackId]: Math.max(prev[trackId] || 0, currentStep),
    }));

    if (rewardCoins > 0) {
      addCoins(rewardCoins);
    }

    // Award badges if applicable
    if (calculated >= 100) {
      const badgeNames: Record<string, string> = {
        c: 'Master of C 🚀',
        cpp: 'C++ Architect 🏛️',
        python: 'Snake Charmer 🐍',
        ai: 'AI Pioneer 🧠',
      };
      const badge = badgeNames[trackId];
      if (badge) {
        setBadges(prev => (prev.includes(badge) ? prev : [...prev, badge]));
      }
    }
  };

  const resetProgress = () => {
    setCoins(defaultState.coins);
    setStreak(defaultState.streak);
    setLevelProgress(defaultState.levelProgress);
    setCompletedSteps(defaultState.completedSteps);
    setBadges(defaultState.badges);
    localStorage.removeItem(STORAGE_KEY);
    playSound('click');
  };

  return (
    <GamificationContext.Provider
      value={{
        coins,
        streak,
        soundEnabled,
        levelProgress,
        completedSteps,
        badges,
        addCoins,
        setSoundEnabled,
        updateProgress,
        resetProgress,
        playSound,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
