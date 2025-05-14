// src/utils/glbToDXF.js
import * as THREE from 'three';
import { createDXFHeader, createDXFFooter } from './dxfExport';

/**
 * Exports a 2D DXF file from a loaded GLB model
 * 
 * @param {THREE.Scene} scene - The loaded Three.js scene containing the model
 * @param {Object} options - Export options
 * @param {String} options.filename - Name for the exported file (default: 'wall_layout.dxf')
 * @param {Boolean} options.includeLabels - Whether to include panel labels (default: true)
 * @param {Number} options.precision - Decimal precision for coordinates (default: 4)
 * @param {Function} options.onComplete - Callback function when export is complete
 * @returns {Promise<Boolean>} - Success status of the export
 */
export const exportGLBtoDXF = async (scene, options = {}) => {
  // Default options
  const {
    filename = 'wall_layout.dxf',
    includeLabels = true,
    precision = 4,
    onComplete = null,
    layerName = 'WALL_LAYOUT'
  } = options;

  try {
    // Clone the scene to avoid modifying the original
    const clonedScene = scene.clone();
    
    // Initialize DXF content with header
    let dxfContent = createDXFHeader();
    
    // Extract 2D geometry from the scene
    const edges = extractEdgeGeometry(clonedScene, precision);
    
    // Add extracted edges to DXF
    edges.forEach(edge => {
      dxfContent += createDXFLine(
        edge.start,
        edge.end,
        layerName
      );
    });
    
    // Add panel labels if requested
    if (includeLabels) {
      const labels = extractPanelLabels(clonedScene, precision);
      labels.forEach(label => {
        dxfContent += createDXFText(
          label.text,
          label.position,
          0.5, // Text height
          layerName
        );
      });
    }
    
    // Finalize DXF with footer
    dxfContent += createDXFFooter();
    
    // Trigger download
    downloadDXF(dxfContent, filename);
    
    // Call the completion callback if provided
    if (onComplete) {
      onComplete(true);
    }
    
    return true;
  } catch (error) {
    console.error("Error exporting GLB to DXF:", error);
    
    // Call the completion callback with error status
    if (onComplete) {
      onComplete(false, error);
    }
    
    return false;
  }
};

/**
 * Extract edge geometry from a 3D scene to create a 2D layout
 * 
 * @param {THREE.Scene} scene - Three.js scene
 * @param {Number} precision - Coordinate decimal precision
 * @returns {Array} - Array of edge objects with start and end points
 */
const extractEdgeGeometry = (scene, precision) => {
  const edges = [];
  const processedEdges = new Set(); // To avoid duplicates
  
  // Temporarily project to 2D by setting z=0 for visual match with screenshot
  // Create a top-down orthographic projection
  const projectTo2D = (point) => {
    // Round coordinates to the specified precision for cleaner DXF output
    return {
      x: Number(point.x.toFixed(precision)),
      y: Number(point.y.toFixed(precision)),
      z: 0 // Flatten to 2D
    };
  };
  
  // Process all meshes in the scene
  scene.traverse((object) => {
    if (object.isMesh) {
      // Skip objects that aren't panels or aren't visible
      if ((!object.name.includes('EXT') && !object.name.includes('Panel')) || 
          object.visible === false) {
        return;
      }
      
      // Create an EdgesGeometry to extract visible edges
      const edgeGeometry = new THREE.EdgesGeometry(object.geometry, 15); // 15° threshold
      
      // Get edge vertices
      const positions = edgeGeometry.attributes.position.array;
      
      // Process edges (each edge has 2 vertices, each vertex has 3 coordinates)
      for (let i = 0; i < positions.length; i += 6) {
        // Extract start and end vertices
        const startVertex = new THREE.Vector3(
          positions[i], positions[i + 1], positions[i + 2]
        );
        const endVertex = new THREE.Vector3(
          positions[i + 3], positions[i + 4], positions[i + 5]
        );
        
        // Apply object's world transformation
        startVertex.applyMatrix4(object.matrixWorld);
        endVertex.applyMatrix4(object.matrixWorld);
        
        // Project to 2D
        const start = projectTo2D(startVertex);
        const end = projectTo2D(endVertex);
        
        // Create a unique key for this edge to avoid duplicates
        const edgeKey1 = `${start.x},${start.y}|${end.x},${end.y}`;
        const edgeKey2 = `${end.x},${end.y}|${start.x},${start.y}`;
        
        // Only add unique edges
        if (!processedEdges.has(edgeKey1) && !processedEdges.has(edgeKey2)) {
          edges.push({ start, end });
          processedEdges.add(edgeKey1);
        }
      }
    }
  });
  
  return edges;
};

/**
 * Extract panel labels and positions from the scene
 * 
 * @param {THREE.Scene} scene - Three.js scene
 * @param {Number} precision - Coordinate decimal precision
 * @returns {Array} - Array of label objects with text and position
 */
const extractPanelLabels = (scene, precision) => {
  const labels = [];
  const panelCenters = {};
  
  // First pass: find all panels and calculate their centers
  scene.traverse((object) => {
    if (object.isMesh && (object.name.includes('EXT') || object.name.includes('Panel'))) {
      // Calculate bounding box center
      const boundingBox = new THREE.Box3().setFromObject(object);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      
      // Store center with panel name
      let panelName = object.name;
      if (panelName.includes('EXT')) {
        // Format panel name (e.g., "EXT_1" to "EX-1")
        const parts = panelName.split('_');
        if (parts.length > 1) {
          panelName = `EX-${parts[1]}`;
        }
      }
      
      panelCenters[panelName] = {
        x: Number(center.x.toFixed(precision)),
        y: Number(center.y.toFixed(precision)),
        z: 0 // Keep it flat for 2D
      };
    }
  });
  
  // Convert to array of labels
  Object.entries(panelCenters).forEach(([name, position]) => {
    labels.push({
      text: name,
      position
    });
  });
  
  return labels;
};

/**
 * Create a DXF line entity
 * 
 * @param {Object} start - {x,y,z} start point
 * @param {Object} end - {x,y,z} end point
 * @param {String} layer - Layer name
 * @returns {String} - DXF line definition
 */
const createDXFLine = (start, end, layer) => {
  return `0
LINE
8
${layer}
10
${start.x}
20
${start.y}
30
${start.z}
11
${end.x}
21
${end.y}
31
${end.z}
`;
};

/**
 * Create a DXF text entity
 * 
 * @param {String} text - Text content
 * @param {Object} position - {x,y,z} position
 * @param {Number} height - Text height
 * @param {String} layer - Layer name
 * @returns {String} - DXF text definition
 */
const createDXFText = (text, position, height, layer) => {
  return `0
TEXT
8
${layer}
10
${position.x}
20
${position.y}
30
${position.z}
40
${height}
1
${text}
7
STANDARD
`;
};

/**
 * Create and trigger download of DXF file
 * 
 * @param {String} dxfContent - DXF file content
 * @param {String} filename - Name for the download file
 */
const downloadDXF = (dxfContent, filename) => {
  const blob = new Blob([dxfContent], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
  
  console.log(`GLB to DXF export completed: ${filename}`);
};

// Export functions for potential reuse
export {
  extractEdgeGeometry,
  extractPanelLabels,
  createDXFLine,
  createDXFText,
  downloadDXF
};