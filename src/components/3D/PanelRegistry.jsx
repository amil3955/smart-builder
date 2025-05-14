import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePanelContext } from '../../contexts/PanelContext';

/**
 * Component that scans the scene for panels and registers them in context
 * This doesn't render anything, just processes the scene
 */
const PanelRegistry = () => {
  const { scene } = useThree();
  const { updatePanelData } = usePanelContext();

  // Scan the scene for panels when it changes
  useEffect(() => {
    if (scene) {

      // Keep track of panels we've found
      const foundPanels = {};

      // Scan for mesh objects that could be panels
      scene.traverse((object) => {
        if (object.isMesh) {
          let panelId = null;

          // Try to extract panel ID from name
          if (object.name.includes('Panel') ||
            object.name.includes('EXT') ||
            object.name.includes('ROOF')) {
            panelId = object.name;
          }
          // Check if parent has panel in name
          else if (object.parent &&
            (object.parent.name.includes('Panel') ||
              object.parent.name.includes('EXT') ||
              object.parent.name.includes('ROOF'))) {
            panelId = object.parent.name;
          }

          // If we found a panel ID, register it
          if (panelId && !foundPanels[panelId]) {
            foundPanels[panelId] = true;

            // Get world position for the panel
            const position = new THREE.Vector3();
            object.getWorldPosition(position);

            // Register this panel in the context
            updatePanelData(panelId, {
              position: [position.x, position.y, position.z],
              name: panelId,
              type: panelId.includes('ROOF') ? 'roof' :
                panelId.includes('EXT') ? 'exterior' : 'generic',
              object: object.uuid
            });
          }
        }
      });
    }

  }, [scene]);

  // This component doesn't render anything
  return null;
};

export default PanelRegistry;