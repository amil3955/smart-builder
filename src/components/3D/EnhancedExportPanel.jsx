// src/components/3D/EnhancedExportPanel.jsx
import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { exportGLBtoDXF } from '../../utils/glbToDXF';
import { exportToDXF, extractPanelData } from '../../utils/dxfExport';

/**
 * Enhanced ExportPanel component - Provides UI for exporting panel data to DXF
 * Supports both existing panel data export and direct GLB model export
 * 
 * @returns {JSX.Element} The export panel UI
 */
const EnhancedExportPanel = () => {
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: '',
    method: null
  });

  // Get access to the Three.js scene for direct GLB export
  const { scene } = useThree();

  // Handle legacy export (using existing panel data)
  const handleLegacyExport = async () => {
    try {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Preparing panel data export...',
        method: 'legacy'
      });

      // Extract panel data and export to DXF using the existing method
      const panels = extractPanelData();
      const success = exportToDXF(panels, 'panel_layout.dxf');

      // Update status based on export result
      setExportStatus({
        isExporting: false,
        success: success,
        message: success ? 'Panel data export completed!' : 'Panel data export failed.',
        method: 'legacy'
      });

      // Clear status message after a delay
      setTimeout(() => {
        setExportStatus(prevStatus => ({
          ...prevStatus,
          message: ''
        }));
      }, 3000);

    } catch (error) {
      console.error('Error during panel data export:', error);

      setExportStatus({
        isExporting: false,
        success: false,
        message: `Panel data export error: ${error.message}`,
        method: 'legacy'
      });
    }
  };

  // Handle direct GLB export (new method)
  const handleDirectExport = async () => {
    try {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Extracting geometry from 3D model...',
        method: 'direct'
      });

      // Export the scene directly to DXF
      const success = await exportGLBtoDXF(scene, {
        filename: 'wall_layout.dxf',
        includeLabels: true,
        onComplete: (success, error) => {
          if (error) {
            console.error('Direct export error:', error);
          }
        }
      });

      // Update status based on export result
      setExportStatus({
        isExporting: false,
        success: success,
        message: success ? '3D model export completed!' : '3D model export failed.',
        method: 'direct'
      });

      // Clear status message after a delay
      setTimeout(() => {
        setExportStatus(prevStatus => ({
          ...prevStatus,
          message: ''
        }));
      }, 3000);

    } catch (error) {
      console.error('Error during 3D model export:', error);

      setExportStatus({
        isExporting: false,
        success: false,
        message: `3D model export error: ${error.message}`,
        method: 'direct'
      });
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Export Panel Layout</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Export the current panel layout to DXF format for use in CAD software.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Legacy Export Method */}
          <div className="bg-gray-100 p-3 rounded-md">
            <h3 className="font-medium text-sm mb-2">Panel Data Export:</h3>
            <ul className="text-sm text-gray-700 list-disc pl-5 mb-3">
              <li>Uses predefined panel data</li>
              <li>Square panels (EX-1, EX-3)</li>
              <li>Pentagon panels (EX-2, EX-4)</li>
              <li>Includes panel dimensions and labels</li>
            </ul>
            <button
              onClick={handleLegacyExport}
              disabled={exportStatus.isExporting}
              className={`w-full px-4 py-2 rounded-md text-white ${exportStatus.isExporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {exportStatus.isExporting && exportStatus.method === 'legacy' ? 'Exporting...' : 'Export Panel Data'}
            </button>
          </div>

          {/* Direct GLB Export Method */}
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <h3 className="font-medium text-sm mb-2">3D Model Export (New):</h3>
            <ul className="text-sm text-gray-700 list-disc pl-5 mb-3">
              <li>Extracts geometry directly from 3D model</li>
              <li>Creates clean 2D wall layout</li>
              <li>Preserves exact visual appearance</li>
              <li>Includes all visible panel edges</li>
            </ul>
            <button
              onClick={handleDirectExport}
              disabled={exportStatus.isExporting}
              className={`w-full px-4 py-2 rounded-md text-white ${exportStatus.isExporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {exportStatus.isExporting && exportStatus.method === 'direct' ? 'Extracting...' : 'Export 3D Model to DXF'}
            </button>
          </div>
        </div>

        {exportStatus.message && (
          <div
            className={`text-sm px-3 py-2 rounded-md ${exportStatus.success === true
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

      <div className="mt-4 text-xs text-gray-500">
        <p>
          Note: The exported DXF file can be opened in AutoCAD, FreeCAD, LibreCAD, and other CAD software.
        </p>
        <p className="mt-1">
          For best results with wall layouts, use the new 3D Model Export option which creates a cleaner 2D representation.
        </p>
      </div>
    </div>
  );
};

export default EnhancedExportPanel;