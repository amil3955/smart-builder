import { useState } from 'react';
import { Text } from '@react-three/drei';

function Panel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], name }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[5, 5, 0.1]} />
        <meshStandardMaterial color={hovered ? "#e2e8f0" : "#d1d5db"} />
      </mesh>
      {name && (
        <>
          <Text
            position={[0, 2.6, 0.06]}
            fontSize={0.3}
            color="black"
          >
            {name}
          </Text>
        </>
      )}
    </group>
  );
}

export default Panel;