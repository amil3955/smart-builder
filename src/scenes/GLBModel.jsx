import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePanelContext } from '../contexts/PanelContext';
import PanelRegistry from '../components/3D/PanelRegistry';
/**
 * Component for loading and rendering the GLB model with panel interaction
 */
function GLBModel({ onProgress, onError }) {
  const { scene, nodes, materials } = useGLTF('/assets/models/advanced/wall.glb', undefined,
    (xhr) => {
      if (onProgress) {
        onProgress(xhr);
      }
    },
    (error) => {
      console.error("Error loading GLB model:", error);
      if (onError) {
        onError(error);
      }
    }
  );

  const modelRef = useRef();
  const { camera } = useThree();
  const { selectedPanel, selectPanel, deselectPanel } = usePanelContext();
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [currentHoverEffect, setCurrentHoverEffect] = useState(null);
  const [panelCenters, setPanelCenters] = useState({});
  // Center the model in the scene on load and calculate panel centers
  useEffect(() => {
    if (scene) {
      // Get scene dimensions
      const boundingBox = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      boundingBox.getCenter(center);
      boundingBox.getSize(size);
      // Center the model
      scene.position.set(0, 0, 0);
      // Scale the model to match reference images
      scene.scale.set(2.4, 2.4, 2.4);
      // Update matrices
      scene.updateMatrixWorld(true);
      // Calculate and store panel centers for label positioning
      const panelPositions = {};
      scene.traverse((object) => {
        if (object.isMesh && (object.name.includes('EXT'))) {
          const panelBoundingBox = new THREE.Box3().setFromObject(object);
          const panelCenter = new THREE.Vector3();
          panelBoundingBox.getCenter(panelCenter);
          panelPositions[object.name] = panelCenter;
        }
      });
      setPanelCenters(Object.entries(panelPositions).map(([name, position]) => ({ name, position })));
    }
  }, [scene]);
  // Apply transparency and edge lines to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh) {
          // Store original material for later reference
          if (!object.userData.originalMaterial) {
            object.userData.originalMaterial = object.material.clone();
          }

          // Apply semi-transparency to all meshes
          object.material = object.material.clone(); // Clone to avoid affecting other instances
          object.material.transparent = true;
          object.material.opacity = 0.5;
          object.material.side = THREE.DoubleSide; // Show both sides of meshes
          object.material.needsUpdate = true;

          // Remove any existing edge lines first
          object.children.forEach(child => {
            if (child.isLineSegments) {
              object.remove(child);
            }
          });

          // Add edge lines to highlight model structure
          const edges = new THREE.EdgesGeometry(object.geometry, 15); // Angle threshold for edge detection
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({
              color: 0x595959,
              linewidth: 1,
              opacity: 0.7,
              transparent: false
            })
          );
          line.renderOrder = 1; // Ensure lines render on top
          object.add(line);

          // Set up panel identification
          if (object.name.includes('EXT')) {
            object.userData.isPanel = true;
            object.userData.panelName = object.name;
          } else if (object.parent && (object.parent.name.includes('Panel') ||
            object.parent.name.includes('EXT') ||
            object.parent.name.includes('ROOF'))) {
            object.userData.isPanel = true;
            object.userData.panelName = object.parent.name;
          } else {
            const panelId = `Panel-${object.id}`;
            object.userData.isPanel = true;
            object.userData.panelName = panelId;
          }
        }
      });
    }
  }, [scene]);
  // Create hover effect for a panel
  const createHoverEffect = (object) => {
    const hoverGroup = new THREE.Group();
    hoverGroup.name = `hover-effect-${object.uuid}`;

    // Get exact panel dimensions
    const boundingBox = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    boundingBox.getSize(size);
    boundingBox.getCenter(center);

    // Create improved hover material
    const createHoverMaterial = (side) => new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1c9ae8"),
      transparent: true,
      opacity: 1, // Fixed opacity value
      side: side,
      depthWrite: true, // Enable depth writing
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: side === THREE.FrontSide ? -2 : 2
    });
    // Create front and back faces
    [THREE.FrontSide, THREE.BackSide].forEach((side, index) => {
      const mesh = new THREE.Mesh(
        object.geometry.clone(),
        createHoverMaterial(side)
      );
      // Copy transforms exactly
      mesh.position.copy(object.position);
      mesh.rotation.copy(object.rotation);
      mesh.scale.copy(object.scale);
      mesh.matrix.copy(object.matrix);
      mesh.matrixWorld.copy(object.matrixWorld);

      // Apply offset based on panel name
      if (object.name.includes('EXT')) {
        const panelNumber = parseInt(object.name.split('_')[1]);
        if (!isNaN(panelNumber)) {
          const offset = index === 0 ? 0.15 : -0.15; // Slight offset for front/back faces
          switch (panelNumber) {
            case 1:
              mesh.position.y += offset;
              break;
            case 2:
              mesh.position.x -= offset;
              break;
            case 3:
              mesh.position.y -= offset;
              break;
            case 4:
              mesh.position.x += offset;
              break;
          }
        }
      }
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = true;
      mesh.userData.isHoverEffect = true;
      hoverGroup.add(mesh);
    });

    return hoverGroup;
  };
  // Update handle pointer over
  const handlePointerOver = (e) => {
    // e.stopPropagation();
    // Skip if already a hover effect or edge line
    if (e.object.userData.isHoverEffect || e.object.isLineSegments) return;

    if (e.object.userData.isPanel) {
      // Remove any existing hover effect
      if (currentHoverEffect) {
        currentHoverEffect.parent?.remove(currentHoverEffect);
        setCurrentHoverEffect(null);
      }
      // Create and add new hover effect
      const hoverEffect = createHoverEffect(e.object);
      e.object.parent.add(hoverEffect);
      setCurrentHoverEffect(hoverEffect);
      setHoveredPanel(e.object.uuid);
      document.body.style.cursor = 'pointer';
    }
  };

  // Handle pointer out
  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (e.object.userData.isHoverEffect || e.object.isLineSegments) return;

    if (e.object.userData.isPanel) {
      if (currentHoverEffect) {
        currentHoverEffect.parent?.remove(currentHoverEffect);
        setCurrentHoverEffect(null);
      }
      setHoveredPanel(null);
      document.body.style.cursor = 'auto';
    }
  };

  // Highlight selected panel
  useEffect(() => {
    if (!scene) return;

    // Get scene dimensions
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    boundingBox.getCenter(center);
    boundingBox.getSize(size);
    // Center the model
    scene.position.set(0, 0, 0);
    scene.scale.set(2.4, 2.4, 2.4);
    scene.updateMatrixWorld(true);
    // Reset all panels to their original appearance
    scene.traverse((object) => {
      if (object.isMesh && object.userData.isPanel && !object.userData.isHoverEffect) {
        if (object.userData.originalMaterial) {
          object.material.color.copy(object.userData.originalMaterial.color);
        }
        object.material.emissive = new THREE.Color(0xb0b0b0);
        object.material.needsUpdate = true;
      }
    });
    // Highlight the selected panel if there is one
    if (selectedPanel) {
      scene.traverse((object) => {
        if (object.isMesh &&
          object.userData.isPanel &&
          !object.userData.isHoverEffect &&
          (object.userData.panelName === selectedPanel || `Panel-${object.id}` === selectedPanel)) {
          // Add subtle emissive highlight to selected panel
          object.material.emissive = new THREE.Color(0x3574d4);
          object.material.emissiveIntensity = 0.3;
          object.material.needsUpdate = true;
        }
      });
    }
  }, [selectedPanel, scene]);

  // Clean up hover effects when component unmounts
  useEffect(() => {
    return () => {
      if (currentHoverEffect && currentHoverEffect.parent) {
        currentHoverEffect.parent.remove(currentHoverEffect);
      }
    };
  }, []);

  // Render panel label
  const renderPanelLabels = () => {
    const labels = [];

    if (!panelCenters || Object.keys(panelCenters).length === 0) {
      return labels;
    }

    Object.entries(panelCenters).forEach(([panelName, position], index) => {
      const pos = {};
      pos.x = position.position.x;
      pos.y = position.position.y;
      pos.z = position.position.z;

      // Adjust Z position based on even/odd index
      const zOffset = index % 2 === 0 ? -3.65 : -4.9; // Even elements go back, odd elements go forward
      const offset = index % 2 === 0 ? true : false;
      labels.push(
        <Text
          key={panelName}
          position={[pos.x, pos.y, pos.z + zOffset]}
          rotation={offset ? [-Math.PI, 0, Math.PI] : [-Math.PI, 0, -Math.PI / 2]}
          fontSize={0.25}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={2}
        >
          {"EXT-" + (Number(panelName) + 1)}
        </Text>
      );
    });

    return labels;
  };


  return (
    <group ref={modelRef}>
      <PanelRegistry />
      <primitive
        object={scene}
        scale={2.4}
        position={[0, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      {renderPanelLabels()}
    </group>
  );
}

// Preload the model
useGLTF.preload('/assets/models/advanced/wall.glb');

export default GLBModel;