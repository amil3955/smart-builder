import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei'; // Import Text from drei for 3D text

export function SquarePanel({
  position = [position],
  rotation = [rotation],
  size = {size},
  thickness = {thickness},
  color = {color},
  hoverColor = {hoverColor},
  dimensionLabels = {dimensionLabels},
}) {
  const [hovered, setHovered] = useState(false);

  // Create a square shape
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = size;
    const squareHeight = size * 0.75;

    const ax = -width / 2, ay = -squareHeight / 2; // Bottom left
    const bx = width / 2, by = -squareHeight / 2;  // Bottom right
    const cx = width / 2, cy = squareHeight / 2;   // Top right
    const dx = -width / 2, dy = squareHeight / 2;  // Top left

    shape.moveTo(ax, ay);
    shape.lineTo(bx, by);
    shape.lineTo(cx, cy);
    shape.lineTo(dx, dy);
    shape.closePath();

    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [size, thickness]);

  // Store the vertices for label positioning
  const vertices = useMemo(() => {
    const width = size;
    const squareHeight = size * 0.75;
    return {
      c: new THREE.Vector3(-1, squareHeight / 2, 0), // Center top vertex
      d: new THREE.Vector3(width / 2, -squareHeight / 2, 0), // Bottom right vertex
    };
  }, [size]);

  // Create edges geometry for clean wireframe without diagonals
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 15);
  }, [geometry]);

  // Function to create a panel
  const createPanel = (panelColor, position = [0, 0, 0], opacity=0.7) => (
    <mesh
      position={position}
      geometry={geometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={panelColor}
        transparent = {true}
        opacity={opacity}
      />
    </mesh>
  );

  // Function to create dimension labels
  const createDimensionLabels = () => {
    const { c, d } = vertices;
    return (
      <group>
        <Text
          position={[0, 3.8, thickness / 2 + 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {dimensionLabels.top}
        </Text>
      </group>
    );
  };

  return (
    <group
      position={position}
      rotation={rotation} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main panel */}
      {createPanel(color)}

      {/* Clean wireframe edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#7d7d7d" linewidth={1} />
      </lineSegments>

      {/* Dimension labels */}
      {createDimensionLabels()}

      {/* Show hover effect panels when hovered */}
      {hovered && (
        <>
          {/* Top panel */}
          {createPanel(hoverColor, [0, 0, thickness], 0.5)}
          {/* Bottom panel */}
          {createPanel(hoverColor, [0, 0, -thickness], 0.5)}
        </>
      )}
    </group>
  );
}

export default SquarePanel;