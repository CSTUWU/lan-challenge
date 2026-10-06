import * as THREE from 'three';

export interface TacticalLights {
  leftOrangeRim: THREE.PointLight;
  rightOrangeRim: THREE.PointLight;
}

export function setupTacticalLighting(scene: THREE.Scene): TacticalLights {
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

  return { leftOrangeRim, rightOrangeRim };
}
