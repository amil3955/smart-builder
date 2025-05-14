// src/components/3D/ExportDXFButton.jsx
import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { exportGLBtoDXF } from '../../utils/glbToDXF';

/**
 * Component for exporting the current 3D view to a 2D DXF file
 */
const ExportDXFButton = ({ buttonText = "Export DXF", className = "" }) => {
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });

  // Get access to the Three.js scene
  const { scene } = useThree();

  // Handle export button click
  const handleExport = async () => {
    try {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Preparing DXF export...'
      });

      // Export the scene to DXF
      const success = await exportGLBtoDXF(scene, {
        filename: 'wall_layout.dxf',
        includeLabels: true,
        onComplete: (success, error) => {
          if (error) {
            console.error('Export error:', error);
          }
        }
      });

      // Update status based on export result
      setExportStatus({
        isExporting: false,
        success: success,
        message: success ? 'Export completed successfully!' : 'Export failed. Please try again.'
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

  // Default button styling if no className is provided
  const defaultClassName = className || "px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700";

  return (
    <div className="flex items-center">
      <button
        onClick={handleExport}
        disabled={exportStatus.isExporting}
        className={`${defaultClassName} ${exportStatus.isExporting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {exportStatus.isExporting ? 'Exporting...' : buttonText}
      </button>

      {exportStatus.message && (
        <div
          className={`ml-3 text-sm px-3 py-1 rounded-md ${
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
  );
};

export default ExportDXFButton;