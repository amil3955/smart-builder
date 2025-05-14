// src/scenes/BuildCanvasWithDXF.jsx
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import GLBModel from './GLBModel';
import LoadingIndicator from '../components/3D/LoadingIndicator';
import ModelControls from '../components/3D/ModelControls';
import { exportGLBtoDXF } from '../utils/glbToDXF';

// Component to handle DXF export within the Canvas context
const DXFExportHandler = ({ onExportComplete }) => {
  // Get access to the Three.js scene
  const { scene } = useThree();
  
  // Expose a method to export the scene to DXF
  useEffect(() => {
    // Add the export function to the window object for external access
    window.exportSceneToDXF = async (options = {}) => {
      try {
        const result = await exportGLBtoDXF(scene, {
          filename: options.filename || 'wall_layout.dxf',
          includeLabels: options.includeLabels !== false, // Default to true
          ...options
        });
        
        if (onExportComplete) {
          onExportComplete(true);
        }
        
        return result;
      } catch (error) {
        console.error('Error exporting to DXF:', error);
        
        if (onExportComplete) {
          onExportComplete(false, error);
        }
        
        return false;
      }
    };
    
    // Clean up on unmount
    return () => {
      delete window.exportSceneToDXF;
    };
  }, [scene, onExportComplete]);
  
  // This component doesn't render anything
  return null;
};

function BuildCanvasWithDXF() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });
  
  // Handle DXF export button click
  const handleExportDXF = () => {
    setExportStatus({
      isExporting: true,
      success: null,
      message: 'Preparing DXF export...'
    });
    
    // Call the export function exposed by DXFExportHandler
    if (window.exportSceneToDXF) {
      window.exportSceneToDXF({
        filename: 'wall_layout.dxf',
        includeLabels: true
      });
    } else {
      setExportStatus({
        isExporting: false,
        success: false,
        message: 'Export function not available. Please wait for the scene to load.'
      });
    }
  };
  
  // Handle export completion
  const handleExportComplete = (success, error) => {
    setExportStatus({
      isExporting: false,
      success,
      message: success 
        ? 'DXF export completed successfully!' 
        : `Export failed: ${error ? error.message : 'Unknown error'}`
    });
    
    // Clear message after a delay
    setTimeout(() => {
      setExportStatus(prevState => ({
        ...prevState,
        message: ''
      }));
    }, 3000);
  };

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
    <div className="relative w-full h-full">
      {/* Export button overlay */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleExportDXF}
          disabled={exportStatus.isExporting}
          className={`px-4 py-2 rounded-md text-white ${
            exportStatus.isExporting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {exportStatus.isExporting ? 'Exporting...' : 'Export to DXF'}
        </button>
        
        {exportStatus.message && (
          <div
            className={`mt-2 text-sm px-3 py-2 rounded-md ${
              exportStatus.success === true
                ? 'bg-green-100 text-green-700'
                : exportStatus.success === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
            }`}
          >
            {exportStatus.message}
          </div>
        )}
      </div>
      
      {/* 3D Canvas */}
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
        
        {/* DXF Export Handler */}
        <DXFExportHandler onExportComplete={handleExportComplete} />
        
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

export default BuildCanvasWithDXF;