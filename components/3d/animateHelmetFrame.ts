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

  // Viewport setup (Check if PC or Mobile)
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

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

  // Phase 5: Move Top Right, Spin, Zoom Out (8.8vh -> 9.7vh)
  const p5 = Math.min(Math.max((scrollPx - VH * 8.8) / (VH * 0.9), 0), 1);
  const ease5 = Math.sin(p5 * Math.PI * 0.5);

  // -----------------------------------------------------
  // 1. SCROLL X POSITION — Left -> Center -> Right
  // -----------------------------------------------------
  const restXTarget = isMobile ? 0.8 : 1.0; // The default offset added later
  const posLeft = isMobile ? -0.8 : -1.0; // Exact Left position on screen
  const posCenter = 0.0; // Exact Center position on screen
  const posRight = isMobile ? 0.8 : 1.0; // Exact Right position on screen

  // We must subtract restXTarget from our desired screen positions because it gets added back later
  const rawLeft = posLeft - restXTarget;
  const rawCenter = posCenter - restXTarget;
  const rawRight = posRight - restXTarget;

  const targetX1 = THREE.MathUtils.lerp(0, rawLeft, ease1); // To left
  const targetX2 = THREE.MathUtils.lerp(targetX1, rawCenter, ease2); // Left to Center
  const targetX3 = THREE.MathUtils.lerp(targetX2, rawRight, ease3); // Center to Right
  const targetX4 = THREE.MathUtils.lerp(targetX3, rawCenter, ease4); // Right back to Center
  
  const posTopRightX = isMobile ? 1.0 : 1.5;
  const rawTopRightX = posTopRightX - restXTarget;
  const targetX5 = THREE.MathUtils.lerp(targetX4, rawTopRightX, ease5); // Center to Top Right Corner
  const rawTargetX = targetX5;

  // -----------------------------------------------------
  // 2. Y POSITION (UP/DOWN MOVEMENT)
  // -----------------------------------------------------
  const heroEndY = isMobile ? -1.6 : -2;
  const moveUpAmount = isMobile ? 0.3 : 0.6;
  const targetY1 = heroEndY + (moveUpAmount * ease1); // Move up when going left
  const targetY2 = THREE.MathUtils.lerp(targetY1, heroEndY, ease2); // Back down to normal when centered
  const targetY3 = targetY2 + (moveUpAmount * ease3); // Move up again when going right
  const targetY4 = targetY3 + (moveUpAmount * 2 * ease4); // Move further up
  const targetY5 = targetY4 + (moveUpAmount * 3 * ease5); // Move to Top corner
  const baseY = targetY5;
  const dipY = 0; // No dipping on scroll

  // -----------------------------------------------------
  // 3. MODEL SCALE (ZOOM IN/OUT)
  // -----------------------------------------------------
  const heroEndScale = isMobile ? 1.1 : isTablet ? 1.4 : 1.7;
  const scaleReduction = isMobile ? 0.15 : 0.25;
  const scale1 = heroEndScale - (scaleReduction * ease1); // Scale down when left
  const scale2 = THREE.MathUtils.lerp(scale1, heroEndScale, ease2); // Scale normal when centered
  const scale3 = scale2 - (scaleReduction * ease3); // Scale down when right
  const zoomOutScale = isMobile ? 0.4 : isTablet ? 0.5 : 0.7; // MORE Extra zoom out for phase 4
  const scale4 = THREE.MathUtils.lerp(scale3, zoomOutScale, ease4); // Zoom out
  const topCornerScale = isMobile ? 0.2 : isTablet ? 0.25 : 0.3; // Very small for top corner
  const scale5 = THREE.MathUtils.lerp(scale4, topCornerScale, ease5); // Zoom out to corner
  const currentScale = scale5;
  helmetGroup.scale.set(currentScale, currentScale, currentScale);

  // -----------------------------------------------------
  // 4. MODEL ROTATION - Face Right -> Forward -> Left
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
  
  // Phase 5: Do a full 360 degree spin (Math.PI * 2) while moving to the right corner
  // It should end up facing forward (rawRotCenter) after spinning
  const spinAmount = Math.PI * 2;
  const rot5 = THREE.MathUtils.lerp(rot4, rawRotCenter + spinAmount, ease5);
  const visionRot = rot5;

  helmetGroup.position.z = 1.5;

  // Intro Animation Logic
  if (elapsedTime > state.introStartTime + 0.6) {
    introProgress += 0.007; // Faster intro
    if (introProgress > 1) introProgress = 1;
  }
  const easeIntro = Math.sin(introProgress * Math.PI * 0.5);
  const restX = isMobile ? 0.8 : 1.0;             // resting position: slightly right of center
  const restRotation = -0.6;                      // resting rotation: slight left-facing angle
  const introX = restX + (1 - easeIntro) * (isMobile ? 3.3 : 5.5);
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
