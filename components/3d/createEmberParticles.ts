import * as THREE from 'three';

export interface EmberParticlesSystem {
  particles: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  update: (elapsedTime: number) => void;
}

export function createEmberParticles(scene: THREE.Scene): EmberParticlesSystem {
  const isMobileDevice = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const NUM_EMBERS = isMobileDevice ? 150 : 350;
  const emberPositions = new Float32Array(NUM_EMBERS * 3);

  for (let i = 0; i < NUM_EMBERS; i++) {
    emberPositions[i * 3 + 0] = (Math.random() - 0.5) * 8;
    emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x00ff66,
    size: 0.04,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const update = (elapsedTime: number) => {
    const posArr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NUM_EMBERS; i++) {
      posArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003 + 0.002;
      posArr[i * 3 + 0] += Math.cos(elapsedTime + i * 0.5) * 0.0015;

      if (posArr[i * 3 + 1] > 3.5) {
        posArr[i * 3 + 1] = -3.5;
        posArr[i * 3 + 0] = (Math.random() - 0.5) * 8;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  };

  return { particles, geometry, material, update };
}
