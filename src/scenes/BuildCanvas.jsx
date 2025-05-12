import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import Model from './Model'; 

function BuildCanvas() {

    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                // shadows
            >
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, 10]} // Centralized camera
                    zoom={60} // Controls scale
                    near={1}
                    far={2000}
                />
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[0, 10, 10]}
                    intensity={2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <color attach="background" args={['#ffffff']} />
                <OrbitControls
                    enableZoom={true}
                    enableRotate={true}
                    enablePan={true}
                    maxDistance={20}
                    minDistance={2}
                />
                <Model/>
            </Canvas>
        </div>
    );
}

export default BuildCanvas;