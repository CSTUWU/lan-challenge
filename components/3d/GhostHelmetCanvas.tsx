'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface GhostHelmetCanvasProps {
  onProgress: (percent: number, statusText: string) => void;
  onStanceUpdate: (percentage: number) => void;
  onPlayAimSound: () => void;
}

export function GhostHelmetCanvas({
  onProgress,
  onStanceUpdate,
  onPlayAimSound,
}: GhostHelmetCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050709, 0.008);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffe6d5, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.8);
    keyLight.position.set(0, 4, 6);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0x00d0ff, 1.8);
    backLight.position.set(0, 3, -5);
    scene.add(backLight);

    const leftOrangeRim = new THREE.PointLight(0x00ff66, 6.0, 12);
    leftOrangeRim.position.set(-3.0, 1.0, 1.0);
    scene.add(leftOrangeRim);

    const rightOrangeRim = new THREE.PointLight(0x00e65c, 6.0, 12);
    rightOrangeRim.position.set(3.0, 1.0, 1.0);
    scene.add(rightOrangeRim);

    const chestLight = new THREE.PointLight(0x00ff66, 3.5, 6);
    chestLight.position.set(0, -1.2, 2.0);
    scene.add(chestLight);

    // Floating Sparks & Embers (Optimized count for 60+ FPS)
    const NUM_EMBERS = 350;
    const emberPositions = new Float32Array(NUM_EMBERS * 3);
    for (let i = 0; i < NUM_EMBERS; i++) {
      emberPositions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.04,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // GLTF Loading
    let helmetPivot: THREE.Group | null = null;
    let helmetGroup: THREE.Group | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/models/classic_ghost.glb',
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 3.8;
        const scale = targetSize / (maxDim || 1);

        model.scale.set(scale, scale, scale);
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.transparent = false;
              mat.opacity = 1.0;
              mat.depthWrite = true;
              mat.depthTest = true;
              mat.roughness = 0.35;
              mat.metalness = 0.65;
              mat.needsUpdate = true;
            }
          }
        });

        helmetPivot = new THREE.Group();
        helmetPivot.add(model);

        helmetGroup = new THREE.Group();
        helmetGroup.position.set(0, -0.2, 0);
        helmetGroup.add(helmetPivot);

        scene.add(helmetGroup);
        onProgress(100, 'TACTICAL 3D GLB READY');
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          const loadedMb = (xhr.loaded / (1024 * 1024)).toFixed(1);
          const totalMb = (xhr.total / (1024 * 1024)).toFixed(1);
          onProgress(percent, `STREAMING GLB DATA: ${loadedMb} MB / ${totalMb} MB`);
        }
      }
    );

    // Mouse Parallax with Smooth Passive Listener
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll Logic with Passive Listener
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const heroTriggerHeight = window.innerHeight * 1.35 - window.innerHeight;
      let progress = scrollY / (heroTriggerHeight || 1);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      targetScrollProgress = progress;
      const percentage = Math.round(targetScrollProgress * 100);
      onStanceUpdate(percentage);

      if (progress > 0.65 && !soundPlayedRef.current) {
        onPlayAimSound();
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

    // Smooth Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.05;
      const p = currentScrollProgress;

      if (helmetGroup && helmetPivot) {
        const breath = Math.sin(elapsedTime * 0.8) * 0.025;
        const breathRot = Math.cos(elapsedTime * 0.5) * 0.015;

        // Upright Y-axis spin: Align model front face straight forward + 360 turn
        const initialYOffset = 0;
        helmetPivot.rotation.x = 0;
        helmetPivot.rotation.y = initialYOffset + p * Math.PI * 2 + breathRot;
        helmetPivot.rotation.z = 0;

        const curveP = Math.sin(p * Math.PI * 0.5);

        const width = window.innerWidth;
        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;

        const startX = 0.0;
        const endX = isMobile ? 0.35 : isTablet ? 0.8 : 2.55;

        const targetX = THREE.MathUtils.lerp(startX, endX, curveP);
        helmetGroup.position.x += (targetX + mouseX * 0.15 - helmetGroup.position.x) * 0.08;

        const startY = -1.1;
        const endY = isMobile ? 1.0 : isTablet ? 0.8 : 0.8;
        helmetGroup.position.y = THREE.MathUtils.lerp(startY, endY, curveP) + breath;

        const startZoom = 3.6;
        const endZoom = isMobile ? 0.8 : 0.8;
        helmetGroup.position.z = THREE.MathUtils.lerp(startZoom, endZoom, curveP);

        const startScale = 1.0;
        const endScale = isMobile ? 0.32 : isTablet ? 0.38 : 0.40;
        const currentScale = THREE.MathUtils.lerp(startScale, endScale, curveP);
        helmetGroup.scale.set(currentScale, currentScale, currentScale);

        if (leftOrangeRim && rightOrangeRim) {
          leftOrangeRim.intensity = 4.5 + p * 4.0 + Math.sin(elapsedTime * 2) * 0.3;
          rightOrangeRim.intensity = 4.5 + p * 4.0 + Math.cos(elapsedTime * 2) * 0.3;
        }
      }

      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (0.4 - mouseY * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0.25, 0);

      // Animate embers efficiently
      const posArr = emberParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < NUM_EMBERS; i++) {
        posArr[i * 3 + 1] += 0.008 + Math.sin(elapsedTime + i) * 0.002;
        posArr[i * 3 + 0] += Math.sin(elapsedTime * 0.8 + i) * 0.003;
        if (posArr[i * 3 + 1] > 3) {
          posArr[i * 3 + 1] = -3;
          posArr[i * 3 + 0] = (Math.random() - 0.5) * 8;
        }
      }
      emberParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      emberGeo.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, [onProgress, onStanceUpdate, onPlayAimSound]);

  return (
    <div ref={mountRef} id="canvas-container" className="fixed inset-0 w-full h-full pointer-events-none z-0 transform-gpu">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
