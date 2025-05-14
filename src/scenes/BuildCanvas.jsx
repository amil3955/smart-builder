import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import GLBModel from './GLBModel';
import LoadingIndicator from '../components/3D/LoadingIndicator';
import ModelControls from '../components/3D/ModelControls';

function BuildCanvas() {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadError, setLoadError] = useState(null);

    // Handle model loading progress
    const handleProgress = (xhr) => {
        if (xhr.lengthComputable) {
            const progress = Math.round((xhr.loaded / xhr.total) * 100);
            setLoadingProgress(progress);
        }
    };
    // Handle model loading error
    const handleError = (error) => {
        console.error('Error loading model:', error);
        setLoadError(error.message || 'Failed to load model');
    };
    return (
        <div className="w-full h-full">
            <Canvas
                shadows
                gl={{ antialias: true }}
            >
                {/* OrthographicCamera for 2D-like front view */}
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, 50]}
                    zoom={65} 
                    near={0.1}
                    far={1000}
                />

                {/* Lighting optimized for edge visibility */}
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[10, 0, 10]}
                    intensity={0.6}
                    castShadow
                />
                <directionalLight
                    position={[-5, -5, 5]}
                    intensity={0}
                />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.4}
                />

                {/* White background */}
                <color attach="background" args={['#ffffff']} />
                
                <Suspense fallback={<LoadingIndicator progress={loadingProgress} />}>
                    <ModelControls initialView="front" />
                    <GLBModel 
                        onProgress={handleProgress}
                        onError={handleError}
                    />
                </Suspense>
            </Canvas>
            
            {/* Show error message if loading fails */}
            {loadError && (
                <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2">
                    Error: {loadError}
                </div>
            )}
        </div>
    );
}

export default BuildCanvas;