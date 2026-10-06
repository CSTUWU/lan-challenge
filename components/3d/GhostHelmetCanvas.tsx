'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HelmetCanvasFallback } from './HelmetCanvasFallback';
import { setupTacticalLighting } from './setupTacticalLighting';
import { createEmberParticles } from './createEmberParticles';
import { loadGhostHelmetModel, LoadedHelmetResult } from './loadGhostHelmetModel';
import { animateHelmetFrame } from './animateHelmetFrame';

interface GhostHelmetCanvasProps {
  onProgress: (percent: number, statusText: string) => void;
  onStanceUpdate: (percentage: number) => void;
  onScrollProgressUpdate: (progress: number) => void;
  onPlayAimSound: () => void;
}

export function GhostHelmetCanvas({
  onProgress,
  onStanceUpdate,
  onScrollProgressUpdate,
  onPlayAimSound,
}: GhostHelmetCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundPlayedRef = useRef(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const callbacksRef = useRef({ onProgress, onStanceUpdate, onScrollProgressUpdate, onPlayAimSound });
  useEffect(() => {
    callbacksRef.current = { onProgress, onStanceUpdate, onScrollProgressUpdate, onPlayAimSound };
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050709, 0.008);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: window.devicePixelRatio < 2, // Disable antialias on retina to save GPU
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio: 1 on mobile (perf), 1.5 on desktop (quality)
    const isMobileDevice = window.innerWidth < 768;
    renderer.setPixelRatio(isMobileDevice ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = !isMobileDevice; // Disable shadows on mobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const clock = new THREE.Clock();
    let introStartTime = Infinity;

    const tacticalLights = setupTacticalLighting(scene);
    const emberSystem = createEmberParticles(scene);

    let modelData: LoadedHelmetResult | null = null;

    const cleanupLoader = loadGhostHelmetModel(
      scene,
      (result) => {
        modelData = result;
        setIsModelLoaded(true);
        introStartTime = clock.getElapsedTime();
      },
      (percent, text) => callbacksRef.current.onProgress(percent, text)
    );

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch support for mobile model control
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = (touch.clientX / window.innerWidth - 0.5) * 0.6;
        mouseY = (touch.clientY / window.innerHeight - 0.5) * 0.6;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    const handleTouchEnd = () => { mouseX = 0; mouseY = 0; };
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let lastPercentage = -1;
    let lastStateUpdateTime = 0; // Throttle React state updates

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight || 1;

      let progress = scrollY <= vh * 1.4 ? scrollY / (vh * 1.4) : 1 + (scrollY - vh * 1.4) / vh;
      progress = Math.max(progress, 0);

      targetScrollProgress = progress;

      // Throttle React state updates to every 80ms to avoid re-render lag
      const now = performance.now();
      if (now - lastStateUpdateTime > 80) {
        lastStateUpdateTime = now;
        callbacksRef.current.onScrollProgressUpdate(progress);

        const percentage = Math.min(Math.round(targetScrollProgress * 100), 100);
        if (percentage !== lastPercentage) {
          lastPercentage = percentage;
          callbacksRef.current.onStanceUpdate(percentage);
        }
      }

      if (progress > 0.65 && !soundPlayedRef.current) {
        callbacksRef.current.onPlayAimSound();
        soundPlayedRef.current = true;
      } else if (progress < 0.3) {
        soundPlayedRef.current = false;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isCanvasVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
    }, { threshold: 0.05 });

    if (mountRef.current) observer.observe(mountRef.current);

    let introProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isCanvasVisible || document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      if (modelData) {
        const frameResult = animateHelmetFrame(
          modelData.helmetGroup,
          modelData.helmetPivot,
          modelData.modelHalf,
          camera,
          renderer,
          tacticalLights,
          elapsedTime,
          {
            currentScrollProgress,
            targetScrollProgress,
            introProgress,
            introStartTime,
            mouseX,
            mouseY,
          }
        );
        introProgress = frameResult.introProgress;
        currentScrollProgress = frameResult.currentScrollProgress;
      }

      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.06;
      camera.position.y += (0.4 - mouseY * 0.4 - camera.position.y) * 0.06;
      camera.lookAt(0, 0.25, 0);

      emberSystem.update(elapsedTime);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      cleanupLoader();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (modelData?.loadedModel) {
        modelData.loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
      }

      emberSystem.geometry.dispose();
      emberSystem.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} id="canvas-container" className="fixed inset-0 w-full h-full pointer-events-none z-20 transform-gpu">
      <HelmetCanvasFallback isLoaded={isModelLoaded} />
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
