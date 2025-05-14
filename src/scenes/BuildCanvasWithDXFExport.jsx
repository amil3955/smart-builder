// src/scenes/BuildCanvasWithDXFExport.jsx
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import GLBModel from './GLBModel';
import LoadingIndicator from '../components/3D/LoadingIndicator';
import ModelControls from '../components/3D/ModelControls';
import DXFExporter from '../components/3D/DXFExporter';
import ExpertDXFExportButton from '../components/3D/ExportDXFButton';
/**
 * BuildCanvasWithDXFExport - Enhanced version of BuildCanvas with DXF export
 * Adds a DXF export button to the 3D scene for easy access
 */
function BuildCanvasWithDXFExport() {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadError, setLoadError] = useState(null);
    const [exportComplete, setExportComplete] = useState(null);

    // Handle model loading progress
    const handleProgress = (xhr) => {
        if (xhr.lengthComputable) {
            const progress = xhr.loaded / xhr.total;
            setLoadingProgress(progress);
        }
    };

    // Handle model loading error
    const handleError = (error) => {
        console.error('Error loading model:', error);
        setLoadError(error.message || 'Failed to load model');
    };

    // Handle export completion
    const handleExportComplete = (success, error) => {
        setExportComplete({
            success,
            message: success 
                ? 'Wall layout exported successfully!' 
                : `Export failed: ${error?.message || 'Unknown error'}`
        });
        
        // Clear message after a delay
        setTimeout(() => {
            setExportComplete(null);
        }, 3000);
    };

    return (
        <div className="relative w-full h-full">
            {/* Export status message overlay */}
            {exportComplete && (
                <div className={`absolute top-4 right-4 z-10 px-4 py-2 rounded ${
                    exportComplete.success 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                    {exportComplete.message}
                </div>
            )}
            
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
                   
                    
                    {/* Add DXF Exporter to the scene */}
                    <DXFExporter 
                        position={[0, -8, 0]} 
                        buttonText="Export Wall Layout to DXF"
                        filename="wall_layout.dxf"
                        includeLabels={true}
                        onExportComplete={handleExportComplete}
                    />
                </Suspense>
                {/* <ExpertDXFExportButton /> */}

            </Canvas>
            
            {/* Show error message if loading fails */}
            {loadError && (
                <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2">
                    Error: {loadError}
                </div>
            )}
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-3 rounded shadow text-sm">
                <p className="font-bold mb-1">DXF Export Instructions:</p>
                <ol className="list-decimal ml-4">
                    <li>Click the "Export Wall Layout to DXF" button</li>
                    <li>The DXF file will be automatically downloaded</li>
                    <li>Open in AutoCAD, FreeCAD, or other CAD software</li>
                </ol>
            </div>
        </div>
    );
}

export default BuildCanvasWithDXFExport;