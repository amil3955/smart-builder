import React from 'react';
import SquarePanel from './SquarePanel';
import PentagonPanel from './PentagonPanel';

const PanelScene = () => {
  // Panel properties
  const panelThickness = 0.2;
  const squareSize = 2;
  const pentagonRadius = 1.5;

  return (
    <group>
      {/* Position the pentagon panel on the left */}
      <PentagonPanel 
        position={[-2.5, 0, 0]} 
        radius={pentagonRadius} 
        thickness={panelThickness} 
      />
      
      {/* Position the square panel on the right */}
      <SquarePanel 
        position={[2.5, 0, 0]} 
        size={squareSize} 
        thickness={panelThickness} 
      />
      
      {/* Add a ground plane for better visual context */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  );
};

export default PanelScene;