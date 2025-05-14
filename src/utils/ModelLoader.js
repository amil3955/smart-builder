// src/utils/ModelLoader.js
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * Helper function to load GLB/GLTF models with DRACO compression support
 * @param {string} path - Path to the GLTF/GLB file
 * @param {object} options - Loading options
 * @returns {object} - Loaded model data
 */
export function loadGLTFModel(path, options = {}) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');  // Path to draco decoder
  
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  
  return new Promise((resolve, reject) => {
    loader.load(
      path, 
      (gltf) => {
        // Process model if needed
        if (options.processModel) {
          options.processModel(gltf);
        }
        resolve(gltf);
      },
      (progress) => {
        // Handle loading progress
        if (options.onProgress) {
          options.onProgress(progress);
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        reject(error);
      }
    );
  });
}

/**
 * React hook to load a GLTF/GLB model
 * @param {string} path - Path to the GLTF/GLB file 
 * @returns {object} - Loaded GLTF/GLB data
 */
export function useGLTFModel(path) {
  // Setup DRACO loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  
  // Configure GLTFLoader with DRACO support
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  
  // Load the model
  return useLoader(GLTFLoader, path, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });
}

/**
 * Create material variants for a model (useful for hover effects)
 * @param {object} gltf - Loaded GLTF model 
 * @param {object} materialOverrides - Material properties to override
 */
export function createMaterialVariants(gltf, materialOverrides = {}) {
  const scene = gltf.scene;
  
  // Find all meshes in the scene
  scene.traverse((object) => {
    if (object.isMesh && object.material) {
      // Store original material
      object.userData.originalMaterial = object.material.clone();
      
      // Store hover material (a modified version of the original)
      const hoverMaterial = object.material.clone();
      
      // Apply overrides for hover material
      Object.entries(materialOverrides).forEach(([key, value]) => {
        if (key in hoverMaterial) {
          hoverMaterial[key] = value;
        }
      });
      
      object.userData.hoverMaterial = hoverMaterial;
    }
  });
  
  return gltf;
}

export default {
  loadGLTFModel,
  useGLTFModel,
  createMaterialVariants
};