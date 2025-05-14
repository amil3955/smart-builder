import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePanelContext } from '../../contexts/PanelContext';

/**
 * Component to add camera controls and model interaction tools
 */
const ModelControls = ({ initialView = 'front' }) => {
  const controlsRef = useRef();
  const { camera, scene } = useThree();
  const { selectedPanel } = usePanelContext();

  // Initial camera setup for front-facing 2D-like view
  useEffect(() => {
    if (scene && camera && controlsRef.current) {
      // Calculate bounding box of the scene
      const boundingBox = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      boundingBox.getCenter(center);
      boundingBox.getSize(size);

      // Set initial view position based on props
      if (initialView === 'front') {
        // Front view (2D-like orthographic view)
        camera.position.set(0, 0, -50);
        controlsRef.current.target.set(0, 0, 0);
      } else {
        // Default view (slightly angled)
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(maxDim * 0.5, maxDim * 0.5, maxDim);
        controlsRef.current.target.copy(center);
      }
      
      // Apply updates
      camera.lookAt(0, 0, 0);
      controlsRef.current.update();
      
    }
  }, [scene, camera, initialView]);

  // Force matrix updates on every frame to ensure proper rendering during rotation
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
      // Force the entire scene to update its matrix world
      if (scene) {
        scene.updateMatrixWorld(true);
      }
    }
  });

  // Handle window resize to maintain proper aspect ratio
  useEffect(() => {
    const handleResize = () => {
      if (camera) {
        if (camera.isPerspectiveCamera) {
          camera.aspect = window.innerWidth / window.innerHeight;
        } else if (camera.isOrthographicCamera) {
          // Maintain consistent zoom level on resize for orthographic camera
          const aspect = window.innerWidth / window.innerHeight;
          const frustumSize = 30;
          camera.left = frustumSize * aspect / -2;
          camera.right = frustumSize * aspect / 2;
          camera.top = frustumSize / 2;
          camera.bottom = frustumSize / -2;
        }
        
        camera.updateProjectionMatrix();
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      minDistance={2}
      maxDistance={100}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      enableDamping={true}
      dampingFactor={0.1}
      enableZoom={true}
      enableRotate={true}
      enablePan={true}
      rotateSpeed={0.5}
      zoomSpeed={0.7}
      panSpeed={0.5}
    />
  );
};

export default ModelControls;