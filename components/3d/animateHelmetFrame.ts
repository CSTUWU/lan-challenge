import * as THREE from 'three';
import { TacticalLights } from './setupTacticalLighting';

export interface FrameState {
  currentScrollProgress: number;
  targetScrollProgress: number;
  introProgress: number;
  introStartTime: number;
  mouseX: number;
  mouseY: number;
}

export function animateHelmetFrame(
  helmetGroup: THREE.Group,
  helmetPivot: THREE.Group,
  modelHalf: THREE.Vector2,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  lights: TacticalLights,
  elapsedTime: number,
  state: FrameState
): { introProgress: number; currentScrollProgress: number } {
  const LOOK_AT_Y = 0.25;
  const TOP_SAFE_PX = 88;

  let { introProgress, currentScrollProgress } = state;
  // Use a delta-time-aware lerp factor for consistent smoothness across all frame rates
  const lerpFactor = 0.06;
  currentScrollProgress += (state.targetScrollProgress - currentScrollProgress) * lerpFactor;
  const p = currentScrollProgress;

  // Small floating animations (up and down slightly over time)
  const breath = Math.sin(elapsedTime * 0.8) * 0.025;
  const breathRot = Math.cos(elapsedTime * 0.5) * 0.015;

  // Calculate continuous scaling ratio based on standard 1200px desktop width
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const isMobile = width < 640;
  const baseWidth = 1200;
  const scaleRatio = Math.min(Math.max(width / baseWidth, 0.35), 1.2);

  // Use actual browser scrollY (raw, not smoothed) for precise pixel-based phase control
  const scrollPx = typeof window !== 'undefined' ? (window.pageYOffset || document.documentElement.scrollTop) : 0;
  const VH = typeof window !== 'undefined' ? (window.innerHeight || 800) : 800;

  // Phase 1: Move Left  (0 -> 1.0 vh)
  const p1 = Math.min(Math.max(scrollPx / (VH * 1.0), 0), 1);
  const ease1 = Math.sin(p1 * Math.PI * 0.5);

  // Phase 2: Move Center (2.0vh -> 2.9vh)
  const p2 = Math.min(Math.max((scrollPx - VH * 2.0) / (VH * 0.9), 0), 1);
  const ease2 = Math.sin(p2 * Math.PI * 0.5);

  // Phase 3: Move Right (3.9vh -> 5.0vh)
  const p3 = Math.min(Math.max((scrollPx - VH * 3.9) / (VH * 1.1), 0), 1);
  const ease3 = Math.sin(p3 * Math.PI * 0.5);

  // Phase 4: Center, Zoom Out, Move Up (6.0vh -> 6.8vh)
  const p4 = Math.min(Math.max((scrollPx - VH * 6.0) / (VH * 0.8), 0), 1);
  const ease4 = Math.sin(p4 * Math.PI * 0.5);

  // Phase 5: Zoom in as atmospheric background, show only top section (head/top)
  const phase5Start = isMobile ? 7.6 : 8.2;
  const p5 = Math.min(Math.max((scrollPx - VH * phase5Start) / (VH * 1.0), 0), 1);
  const ease5 = Math.sin(p5 * Math.PI * 0.5);

  // -----------------------------------------------------
  // 1. SCROLL X POSITION — Left -> Center -> Right -> Center Background
  // -----------------------------------------------------
  // Calculate true screen width in 3D world space
  const camDistForEdge = Math.max(camera.position.z - 1.5, 0.05); // Model is at z=1.5
  const halfViewH_Edge = camDistForEdge * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5);
  const halfViewW_Edge = halfViewH_Edge * camera.aspect;

  // Calculate the same max-w-6xl container boundaries used in the HTML layout
  const windowW = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const paddingX = windowW >= 768 ? 128 : 48; // md:px-16 is 64px*2=128px, px-6 is 24px*2=48px
  const containerW = Math.min(1152, windowW - paddingX); // max-w-6xl is 1152px
  const containerRatio = containerW / windowW;
  const containerEdgeX = halfViewW_Edge * containerRatio;

  // On Mobile, keep model centered horizontally so it stays focal in the top 55% zone
  const edgeMargin = isMobile ? 0 : 0.5 * scaleRatio;
  const screenEdgeX = isMobile ? 0.2 : Math.max(containerEdgeX - edgeMargin, 0.5 * scaleRatio);
  const restXTarget = isMobile ? 0 : Math.min(1.2 * scaleRatio, screenEdgeX * 0.6); // Default resting offset

  const posLeft = -screenEdgeX; // Dynamic Left position inside container
  const posCenter = 0.0; // Exact Center position on screen
  const posRight = screenEdgeX; // Dynamic Right position inside container

  // We must subtract restXTarget from our desired screen positions because it gets added back later
  const rawLeft = posLeft - restXTarget;
  const rawCenter = posCenter - restXTarget;
  const rawRight = posRight - restXTarget;

  const targetX1 = THREE.MathUtils.lerp(0, rawLeft, ease1); // To left
  const targetX2 = THREE.MathUtils.lerp(targetX1, rawCenter, ease2); // Left to Center
  const targetX3 = THREE.MathUtils.lerp(targetX2, rawRight, ease3); // Center to Right
  const targetX4 = THREE.MathUtils.lerp(targetX3, rawCenter, ease4); // Right back to Center

  // Phase 5: Stay perfectly centered in background (rawCenter) instead of going to top-right
  const targetX5 = THREE.MathUtils.lerp(targetX4, rawCenter, ease5);
  const rawTargetX = targetX5;

  // -----------------------------------------------------
  // 2. Y POSITION (UP/DOWN MOVEMENT)
  // -----------------------------------------------------
  // On mobile, position model in top focal area (-0.6 to -1.0)
  const heroEndY = isMobile ? -0.8 : -2.0 * scaleRatio;
  const moveUpAmount = isMobile ? 0.3 : 0.6 * scaleRatio;
  const targetY1 = heroEndY + (moveUpAmount * ease1); // Move up when going left
  const targetY2 = THREE.MathUtils.lerp(targetY1, heroEndY, ease2); // Back down to normal when centered
  const targetY3 = targetY2 + (moveUpAmount * ease3); // Move up again when going right
  // Phase 4: Move UP so it sits comfortably in the middle
  const phase4Y = heroEndY + (isMobile ? 0.4 : 1.0 * scaleRatio);
  const targetY4 = THREE.MathUtils.lerp(targetY3, phase4Y, ease4);
  
  // Phase 5: Push DOWN so only the upper/top portion of the zoomed helmet is visible at the top/center of screen
  const zoomedBackgroundY = isMobile ? -2.2 : -3.6 * scaleRatio;
  const targetY5 = THREE.MathUtils.lerp(targetY4, zoomedBackgroundY, ease5);
  const baseY = targetY5;
  const dipY = 0; // No dipping on scroll

  // -----------------------------------------------------
  // 3. MODEL SCALE (ZOOM IN/OUT)
  // -----------------------------------------------------
  const heroEndScale = isMobile ? 0.95 : 1.6 * scaleRatio;
  const scaleReduction = isMobile ? 0.15 : 0.25 * scaleRatio;
  const scale1 = heroEndScale - (scaleReduction * ease1); // Scale down when left
  const scale2 = THREE.MathUtils.lerp(scale1, heroEndScale, ease2); // Scale normal when centered
  const scale3 = scale2 - (scaleReduction * ease3); // Scale down when right
  const midScale = isMobile ? 0.8 : 1.2 * scaleRatio;
  const scale4 = THREE.MathUtils.lerp(scale3, midScale, ease4);
  
  // Phase 5: ZOOM IN significantly to become a giant background helmet motif
  const zoomedBackgroundScale = isMobile ? 2.4 : 3.8 * scaleRatio;
  const scale5 = THREE.MathUtils.lerp(scale4, zoomedBackgroundScale, ease5); // Zoom In
  const currentScale = scale5;
  helmetGroup.scale.set(currentScale, currentScale, currentScale);

  // -----------------------------------------------------
  // 4. MODEL ROTATION - Face Right -> Forward -> Left -> Face Forward
  // -----------------------------------------------------
  const baseRestRotation = -0.6; // The default offset added later
  const posRotLeft = Math.PI * 0.35; // Look Right (when on left side)
  const posRotCenter = 0.0; // Look exactly forward
  const posRotRight = -Math.PI * 0.35; // Look Left (when on right side)

  // We must subtract baseRestRotation because it gets added back later
  const rawRotLeft = posRotLeft - baseRestRotation;
  const rawRotCenter = posRotCenter - baseRestRotation;
  const rawRotRight = posRotRight - baseRestRotation;

  const rot1 = THREE.MathUtils.lerp(0, rawRotLeft, ease1); // To left side (looking right)
  const rot2 = THREE.MathUtils.lerp(rot1, rawRotCenter, ease2); // To center (looking forward)
  const rot3 = THREE.MathUtils.lerp(rot2, rawRotRight, ease3); // To right side (looking left)
  const rot4 = THREE.MathUtils.lerp(rot3, rawRotCenter, ease4); // Back to center (looking forward)

  // Phase 5: Smoothly face directly forward as a majestic background element
  const rot5 = THREE.MathUtils.lerp(rot4, rawRotCenter, ease5);
  const visionRot = rot5;

  // Push model slightly further back in Phase 5 so content scrolls cleanly over it
  const baseZ = isMobile ? (0.2 - p * 1.8) : 1.5;
  const targetZ5 = isMobile ? -0.8 : 0.6;
  helmetGroup.position.z = THREE.MathUtils.lerp(baseZ, targetZ5, ease5);

  // Intro Animation Logic
  if (elapsedTime > state.introStartTime + 0.6) {
    introProgress += 0.007; // Faster intro
    if (introProgress > 1) introProgress = 1;
  }
  const easeIntro = Math.sin(introProgress * Math.PI * 0.5);
  const restX = restXTarget;
  const restRotation = -0.6;
  const introX = restX + (1 - easeIntro) * (5.5 * scaleRatio);
  const introRot = restRotation + (1 - easeIntro) * (-Math.PI / 2);



  // Calculate Screen Bounds & Apply Positions
  const camDist = Math.max(camera.position.z - helmetGroup.position.z, 0.05);
  const halfViewH = camDist * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5);
  const viewportH = renderer.domElement.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 1);
  const centreY = camera.position.y + (camDist / Math.max(camera.position.z, 0.001)) * (LOOK_AT_Y - camera.position.y);
  const topSafeY = centreY + (1 - (2 * TOP_SAFE_PX) / viewportH) * halfViewH;

  const halfH = modelHalf.y * currentScale;

  // Remove clamps so the model can move completely left or right based on rawTargetX
  const scrollTargetX = rawTargetX + state.mouseX * 0.2;

  // Apply final movements with smooth lerp
  const targetX = scrollTargetX + introX;
  helmetGroup.position.x += (targetX - helmetGroup.position.x) * 0.06;
  helmetGroup.position.y = Math.min(baseY + dipY + breath, topSafeY - halfH);

  helmetPivot.rotation.x = 0;
  const targetRotY = visionRot + breathRot + introRot;
  helmetPivot.rotation.y += (targetRotY - helmetPivot.rotation.y) * 0.06;
  helmetPivot.rotation.z = 0;

  // Lights adjustments
  if (lights.leftOrangeRim && lights.rightOrangeRim) {
    lights.leftOrangeRim.intensity = 4.5 + p * 4.0 + Math.sin(elapsedTime * 2) * 0.3;
    lights.rightOrangeRim.intensity = 4.5 + p * 4.0 + Math.cos(elapsedTime * 2) * 0.3;
  }

  return { introProgress, currentScrollProgress };
}
