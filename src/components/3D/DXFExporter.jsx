// src/components/3D/DXFExporter.jsx
import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { exportGLBtoDXF } from '../../utils/glbToDXF';
import { useGLTF } from '@react-three/drei';    
import { Canvas } from '@react-three/fiber';    

/**
 * DXFExporter component - Exports the current 3D scene to a 2D DXF file
 * Must be used within a React Three Fiber Canvas component
 * 
 * @param {Object} props Component props
 * @param {string} props.position Position for the UI [x,y,z]
 * @param {string} props.buttonText Text to display on the export button
 * @param {string} props.filename Filename for the exported DXF
 * @param {boolean} props.includeLabels Whether to include labels in the export
 * @param {function} props.onExportComplete Callback when export completes
 * @returns {JSX.Element} Component that renders an export button in 3D space
 */
const DXFExporter = ({
  position = [0, 0, 0],
  buttonText = "Export to DXF",
  filename = "wall_layout.dxf",
  includeLabels = true,
  onExportComplete = null
}) => {
  const { scene } = useThree();
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });

  // Handle export button click
  const handleExport = async (e) => {
    // Prevent the event from propagating to other objects
    e.stopPropagation();
    
    try {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Preparing DXF export...'
      });

      // Export the scene to DXF
      const success = await exportGLBtoDXF(scene, {
        filename,
        includeLabels,
        onComplete: (success, error) => {
          if (onExportComplete) {
            onExportComplete(success, error);
          }
        }
      });

      // Update status based on export result
      setExportStatus({
        isExporting: false,
        success,
        message: success ? 'Export completed!' : 'Export failed.'
      });

      // Clear status message after a delay
      setTimeout(() => {
        setExportStatus(prevStatus => ({
          ...prevStatus,
          message: ''
        }));
      }, 3000);

    } catch (error) {
      console.error('Error during export:', error);

      setExportStatus({
        isExporting: false,
        success: false,
        message: `Export error: ${error.message}`
      });
    }
  };

  return (
    <mesh position={position}>
      {/* Export button */}
      <Html transform>
        <div className="bg-white p-2 rounded-md shadow-lg">
          <button
            onClick={handleExport}
            disabled={exportStatus.isExporting}
            className={`px-4 py-2 rounded-md text-white ${
              exportStatus.isExporting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {exportStatus.isExporting ? 'Exporting...' : buttonText}
          </button>
          
          {/* Status message */}
          {exportStatus.message && (
            <div
              className={`mt-2 text-sm px-3 py-1 rounded-md text-center ${
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
      </Html>
    </mesh>
  );
};

// Example usage:
<Canvas>
  <ambientLight />
  {/* <GLBModel /> */}
  <DXFExporter position={[0, -5, 0]} filename="wall_layout.dxf" />
</Canvas>

export default DXFExporter;