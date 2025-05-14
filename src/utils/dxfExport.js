/**
 * dxfExport.js - Utilities for exporting panel models to DXF format
 * 
 * This file contains functions for converting 3D model geometry to DXF format
 * for compatibility with CAD software.
 */

import * as THREE from 'three';

/**
 * Main export function - converts panels to DXF format and triggers download
 * 
 * @param {Array} panels - Array of panel objects with their properties
 * @param {String} filename - Name for the exported file
 * @returns {Boolean} - Success status of the export
 */
export const exportToDXF = (panels, filename = 'panel_export.dxf') => {
  try {
    // Create the DXF content
    let dxfContent = createDXFHeader();
    
    // Add each panel to the DXF content
    panels.forEach(panel => {
      const { type, label, position, rotation, size, thickness } = panel;
      
      if (type === 'square') {
        dxfContent += createSquarePanelDXF(label, position, rotation, size, thickness);
      } else if (type === 'pentagon') {
        dxfContent += createPentagonPanelDXF(label, position, rotation, size, thickness);
      }
    });
    
    // Add the DXF footer
    dxfContent += createDXFFooter();
    
    // Create and trigger download
    downloadDXF(dxfContent, filename);
    
    return true;
  } catch (error) {
    console.error("Error exporting DXF:", error);
    return false;
  }
};

/**
 * Extract panel data from Model component
 * 
 * @returns {Array} - Array of panel data objects
 */
export const extractPanelData = () => {
  return [
    {
      id: "panel1",
      type: 'square',
      label: 'EX-1',
      position: [0, 5, -1.3],
      rotation: [Math.PI / 2, 0, 0],
      size: 10,
      thickness: 0.3
    },
    {
      id: "panel2",
      type: 'square',
      label: 'EX-3',
      position: [0, -4.7, -1.3],
      rotation: [Math.PI / 2, 0, 0],
      size: 10,
      thickness: 0.3
    },
    {
      id: "panel3",
      type: 'pentagon',
      label: 'EX-2',
      position: [4.7, 0, 0],
      rotation: [0, Math.PI / 2, Math.PI / 2],
      size: 10,
      thickness: 0.3
    },
    {
      id: "panel4",
      type: 'pentagon',
      label: 'EX-4',
      position: [-5, 0, 0],
      rotation: [0, Math.PI / 2, Math.PI / 2],
      size: 10,
      thickness: 0.3
    }
  ];
};

/**
 * Create the DXF file header
 * 
 * @returns {String} - DXF header section
 */
const createDXFHeader = () => {
  return `0 
SECTION
2
HEADER
9
$ACADVER
1
AC1021
9
$INSBASE
10
0.0
20
0.0
30
0.0
9
$EXTMIN
10
-100.0
20
-100.0
30
-100.0
9
$EXTMAX
10
100.0
20
100.0
30
100.0
0
ENDSEC
0
SECTION
2
TABLES
0
TABLE
2
LAYER
70
1
0
LAYER
2
PANELS
70
0
62
7
6
CONTINUOUS
0
ENDTAB
0
TABLE
2
LTYPE
70
1
0
LTYPE
2
CONTINUOUS
70
0
3
Solid line
72
65
73
0
40
0.0
0
ENDTAB
0
TABLE
2
STYLE
70
1
0
STYLE
2
STANDARD
70
0
40
0.0
41
1.0
0
ENDTAB
0
ENDSEC
0
SECTION
2
ENTITIES
`;
};

/**
 * Create the DXF file footer
 * 
 * @returns {String} - DXF footer section
 */
const createDXFFooter = () => {
  return `0
ENDSEC
0
SECTION
2
OBJECTS
0
ENDSEC
0
EOF
`;
};

/**
 * Apply 3D transformations to points
 * 
 * @param {Array} points - Array of [x,y,z] point coordinates
 * @param {Array} position - [x,y,z] position offset
 * @param {Array} rotation - [x,y,z] rotation in radians
 * @returns {Array} - Transformed points
 */
const applyTransformation = (points, position, rotation) => {
  // Create a transformation matrix
  const matrix = new THREE.Matrix4();
  
  // Apply position offset
  matrix.makeTranslation(position[0], position[1], position[2]);
  
  // Create rotation matrices
  const rotationX = new THREE.Matrix4().makeRotationX(rotation[0]);
  const rotationY = new THREE.Matrix4().makeRotationY(rotation[1]);
  const rotationZ = new THREE.Matrix4().makeRotationZ(rotation[2]);
  
  // Combine all transformations
  matrix.multiply(rotationX).multiply(rotationY).multiply(rotationZ);
  
  // Apply transformation to all points
  return points.map(point => {
    const vector = new THREE.Vector3(point[0], point[1], point[2]);
    vector.applyMatrix4(matrix);
    return [vector.x, vector.y, vector.z];
  });
};

/**
 * Create DXF entities for a square panel
 * 
 * @param {String} label - Panel label (EX-1, EX-3)
 * @param {Array} position - [x,y,z] position
 * @param {Array} rotation - [x,y,z] rotation in radians
 * @param {Number} size - Panel size
 * @param {Number} thickness - Panel thickness
 * @returns {String} - DXF entities for square panel
 */
const createSquarePanelDXF = (label, position, rotation, size, thickness) => {
  // Generate square panel geometry
  const halfSize = size / 2;
  const height = size * 0.75;
  const halfHeight = height / 2;
  
  // Define panel faces as 3D points
  const topFace = [
    [-halfSize, -halfHeight, thickness],
    [halfSize, -halfHeight, thickness],
    [halfSize, halfHeight, thickness],
    [-halfSize, halfHeight, thickness],
    [-halfSize, -halfHeight, thickness], // Close the loop
  ];
  
  const bottomFace = [
    [-halfSize, -halfHeight, 0],
    [halfSize, -halfHeight, 0],
    [halfSize, halfHeight, 0],
    [-halfSize, halfHeight, 0],
    [-halfSize, -halfHeight, 0], // Close the loop
  ];
  
  // Apply transformations
  const transformedTopFace = applyTransformation(topFace, position, rotation);
  const transformedBottomFace = applyTransformation(bottomFace, position, rotation);
  
  // Create DXF content for the panel
  let dxfContent = '';
  
  // Add top face
  dxfContent += createPolyline(transformedTopFace, 'PANELS');
  
  // Add bottom face
  dxfContent += createPolyline(transformedBottomFace, 'PANELS');
  
  // Add side edges to connect top and bottom faces
  for (let i = 0; i < 4; i++) {
    dxfContent += createLine(
      transformedTopFace[i],
      transformedBottomFace[i],
      'PANELS'
    );
  }
  
  // Add panel label
  const labelPosition = calculateCentroid(transformedTopFace.slice(0, 4));
  dxfContent += createText(label, labelPosition, 0.5, 'PANELS');
  
  return dxfContent;
};

/**
 * Create DXF entities for a pentagon panel
 * 
 * @param {String} label - Panel label (EX-2, EX-4)
 * @param {Array} position - [x,y,z] position
 * @param {Array} rotation - [x,y,z] rotation in radians
 * @param {Number} size - Panel size
 * @param {Number} thickness - Panel thickness
 * @returns {String} - DXF entities for pentagon panel
 */
const createPentagonPanelDXF = (label, position, rotation, size, thickness) => {
  // Generate pentagon panel geometry
  const halfSize = size / 2;
  const height = size;
  
  // Define pentagon points based on the PentagonPanel component
  const topFace = [
    [-halfSize, -height/2, thickness],  // Bottom left
    [halfSize, -height/2, thickness],   // Bottom right
    [halfSize, height/4, thickness],    // Right middle
    [0, height/2, thickness],           // Top center
    [-halfSize, height/4, thickness],   // Left middle
    [-halfSize, -height/2, thickness],  // Close the loop
  ];
  
  const bottomFace = [
    [-halfSize, -height/2, 0],  // Bottom left
    [halfSize, -height/2, 0],   // Bottom right
    [halfSize, height/4, 0],    // Right middle
    [0, height/2, 0],           // Top center
    [-halfSize, height/4, 0],   // Left middle
    [-halfSize, -height/2, 0],  // Close the loop
  ];
  
  // Apply transformations
  const transformedTopFace = applyTransformation(topFace, position, rotation);
  const transformedBottomFace = applyTransformation(bottomFace, position, rotation);
  
  // Create DXF content for the panel
  let dxfContent = '';
  
  // Add top face
  dxfContent += createPolyline(transformedTopFace, 'PANELS');
  
  // Add bottom face
  dxfContent += createPolyline(transformedBottomFace, 'PANELS');
  
  // Add side edges to connect top and bottom faces
  for (let i = 0; i < 5; i++) {
    dxfContent += createLine(
      transformedTopFace[i],
      transformedBottomFace[i],
      'PANELS'
    );
  }
  
  // Add panel label
  const labelPosition = calculateCentroid(transformedTopFace.slice(0, 5));
  dxfContent += createText(label, labelPosition, 0.5, 'PANELS');
  
  return dxfContent;
};

/**
 * Create a DXF polyline entity
 * 
 * @param {Array} points - Array of [x,y,z] coordinates
 * @param {String} layer - Layer name
 * @returns {String} - DXF polyline definition
 */
const createPolyline = (points, layer) => {
  let dxfContent = `0
POLYLINE
8
${layer}
66
1
70
0
`;

  // Add vertices
  points.forEach(point => {
    dxfContent += `0
VERTEX
8
${layer}
10
${point[0].toFixed(6)}
20
${point[1].toFixed(6)}
30
${point[2].toFixed(6)}
`;
  });

  // Close the polyline
  dxfContent += `0
SEQEND
8
${layer}
`;

  return dxfContent;
};

/**
 * Create a DXF line entity
 * 
 * @param {Array} start - [x,y,z] start point
 * @param {Array} end - [x,y,z] end point
 * @param {String} layer - Layer name
 * @returns {String} - DXF line definition
 */
const createLine = (start, end, layer) => {
  return `0
LINE
8
${layer}
10
${start[0].toFixed(6)}
20
${start[1].toFixed(6)}
30
${start[2].toFixed(6)}
11
${end[0].toFixed(6)}
21
${end[1].toFixed(6)}
31
${end[2].toFixed(6)}
`;
};

/**
 * Create a DXF text entity
 * 
 * @param {String} text - Text content
 * @param {Array} position - [x,y,z] position
 * @param {Number} height - Text height
 * @param {String} layer - Layer name
 * @returns {String} - DXF text definition
 */
const createText = (text, position, height, layer) => {
  return `0
TEXT
8
${layer}
10
${position[0].toFixed(6)}
20
${position[1].toFixed(6)}
30
${position[2].toFixed(6)}
40
${height}
1
${text}
7
STANDARD
`;
};

/**
 * Calculate the centroid of a set of points
 * 
 * @param {Array} points - Array of [x,y,z] points
 * @returns {Array} - [x,y,z] centroid coordinates
 */
const calculateCentroid = (points) => {
  const numPoints = points.length;
  let sumX = 0, sumY = 0, sumZ = 0;
  
  points.forEach(point => {
    sumX += point[0];
    sumY += point[1];
    sumZ += point[2];
  });
  
  return [sumX / numPoints, sumY / numPoints, sumZ / numPoints];
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
  
  console.log(`DXF export completed: ${filename}`);
};