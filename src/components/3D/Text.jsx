import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text as DreiText } from '@react-three/drei';

// Custom Text component to ensure we're using Drei's Text properly
const Text = ({ children, position = [0, 0, 0], size = 0.2, color = "#000000", ...props }) => {
  return (
    <DreiText
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.01}
      outlineColor="#ffffff"
      {...props}
    >
      {children}
    </DreiText>
  );
};

export default Text;