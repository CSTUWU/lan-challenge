import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface LoadedHelmetResult {
  helmetGroup: THREE.Group;
  helmetPivot: THREE.Group;
  loadedModel: THREE.Object3D;
  modelHalf: THREE.Vector2;
}

export function loadGhostHelmetModel(
  scene: THREE.Scene,
  onLoaded: (result: LoadedHelmetResult) => void,
  onProgress: (percent: number, statusText: string) => void
): () => void {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);

  const modelHalf = new THREE.Vector2(1, 1);

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
      modelHalf.set((size.x * scale) / 2, (size.y * scale) / 2);

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

      const helmetPivot = new THREE.Group();
      helmetPivot.add(model);

      const helmetGroup = new THREE.Group();
      helmetGroup.position.set(0, -0.2, 0);
      helmetGroup.add(helmetPivot);

      scene.add(helmetGroup);

      onLoaded({ helmetGroup, helmetPivot, loadedModel: model, modelHalf });
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

  return () => {
    dracoLoader.dispose();
  };
}
