'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function useTacticalAudio() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      const droneFilter = ctx.createBiquadFilter();

      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(55, ctx.currentTime);

      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(240, ctx.currentTime);

      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(ctx.destination);
      droneOsc.start();
    } catch (e) {
      console.warn('Audio Context init blocked until interaction', e);
    }
  }, []);

  const playGunCockSound = useCallback(() => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const t = ctx.currentTime;

      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(800, t);
      snapOsc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

      snapGain.gain.setValueAtTime(0.4, t);
      snapGain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.onended = () => {
        snapOsc.disconnect();
        snapGain.disconnect();
      };
      snapOsc.start(t);
      snapOsc.stop(t + 0.08);

      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(150, t + 0.05);
      subOsc.frequency.exponentialRampToValueAtTime(40, t + 0.25);

      subGain.gain.setValueAtTime(0.6, t + 0.05);
      subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.26);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.onended = () => {
        subOsc.disconnect();
        subGain.disconnect();
      };
      subOsc.start(t + 0.05);
      subOsc.stop(t + 0.26);
    } catch (e) {
      console.warn(e);
    }
  }, [isAudioEnabled]);

  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    setIsAudioEnabled((prev) => {
      const nextState = !prev;
      if (audioCtxRef.current) {
        if (nextState) {
          if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
          }
          setTimeout(playGunCockSound, 50);
        } else {
          if (audioCtxRef.current.state === 'running') {
            audioCtxRef.current.suspend();
          }
        }
      }
      return nextState;
    });
  }, [initAudio, playGunCockSound]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { isAudioEnabled, toggleAudio, playGunCockSound };
}
