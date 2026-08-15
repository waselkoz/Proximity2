'use client';

// A lightweight audio engine using the native Web Audio API.
// Requires 0 network requests, 0 dependencies, and executes in < 1ms.

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Plays a deep, premium mechanical "click".
 * Uses a dual-oscillator approach: a low 'thud' and a high 'snap'.
 */
export const playMechanicalClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // 1. The "Thud" (Low Sine Wave)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(100, now);
    thudOsc.frequency.exponentialRampToValueAtTime(20, now + 0.08);
    thudGain.gain.setValueAtTime(0.3, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    
    // 2. The "Snap" (High Square Wave)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(1000, now);
    snapOsc.frequency.exponentialRampToValueAtTime(100, now + 0.02);
    snapGain.gain.setValueAtTime(0.05, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);

    thudOsc.start(now);
    snapOsc.start(now);
    thudOsc.stop(now + 0.08);
    snapOsc.stop(now + 0.02);
  } catch (e) {}
};

/**
 * Plays a tiny, high-tech "tick" for hover states.
 */
export const playHoverTick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2500, now);
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.015);

    // Extremely quiet
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.015);
  } catch (e) {}
};
