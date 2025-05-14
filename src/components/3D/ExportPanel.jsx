import React, { useState } from 'react';
import { exportToDXF, extractPanelData } from '../../utils/dxfExport';

/**
 * ExportPanel component - Provides UI for exporting panel data to DXF
 * 
 * @returns {JSX.Element} The export panel UI
 */
const ExportPanel = () => {
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });

  // Handle export button click
  const handleExport = async () => {
    try {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Preparing DXF export...'
      });

      // Extract panel data and export to DXF
      const panels = extractPanelData();
      const success = exportToDXF(panels, 'panel_layout.dxf');

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

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Export Panel Layout</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Export the current panel layout to DXF format for use in CAD software.
        </p>

        <div className="bg-gray-100 p-3 rounded-md mb-3">
          <h3 className="font-medium text-sm mb-2">Included in export:</h3>
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Square panels (EX-1, EX-3)</li>
            <li>Pentagon panels (EX-2, EX-4)</li>
            <li>Panel dimensions and positions</li>
            <li>Panel labels and identifiers</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleExport}
          disabled={exportStatus.isExporting}
          className={`px-4 py-2 rounded-md text-white ${exportStatus.isExporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {exportStatus.isExporting ? 'Exporting...' : 'Export to DXF'}
        </button>

        {exportStatus.message && (
          <div
            className={`text-sm px-3 py-1 rounded-md ${exportStatus.success === true
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
      </div>
    </div>
  );
};

export default ExportPanel;