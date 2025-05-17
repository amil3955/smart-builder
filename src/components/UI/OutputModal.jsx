// Example: Adding DXF export to OutputModal.jsx
import React, { useState, useEffect } from 'react';
import { useThree, Canvas } from '@react-three/fiber';

const DXFExportHandler = ({ onExportComplete }) => {
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

const OutputModalWithDXF = ({ isOpen, onClose }) => {
  const [checkboxState, setCheckboxState] = useState({
    pdfSections: [
      { key: 'coverSheet', checked: false, name: 'Cover Sheet' },
      { key: 'disclaimer', checked: false, name: 'Disclaimer' },
      { key: 'materialListPdf', checked: false, name: 'Material List PDF' },
      { key: 'postLayoutPdf', checked: false, name: 'Post Layout PDF' },
      { key: 'crossSections', checked: false, name: 'Cross Sections' },
      { key: 'wallLayoutPdf', checked: false, name: 'Wall Layout PDF' },
      { key: 'combinedAssemblyDrawings', checked: false, name: 'Combined Assembly Drawings' },
      { key: 'trussLayoutPdf', checked: false, name: 'Truss Layout PDF' },
      { key: 'viewElevations', checked: false, name: '4 View Elevations' },
      { key: 'assemblyDrawings', checked: false, name: 'Assembly Drawings' },
      { key: 'sheathingDrawings', checked: false, name: 'Sheathing Drawings' },
      { key: 'elevations', checked: false, name: 'Elevations' },
      { key: 'rawCutListPdf', checked: false, name: 'Raw Cut List PDF' },
      { key: 'kneeBracingDetail', checked: false, name: 'Knee Bracing Detail' },
      { key: 'newQuote1Page', checked: false, name: 'New Quote (1 Page)' },
      { key: 'newQuote2Page', checked: false, name: 'New Quote (2 Pages)' },
    ],
    otherFiles: [
      { key: 'salesQuoteProposal', checked: false, name: 'Sales Quote Proposal' },
      { key: 'sampleSalesContract', checked: false, name: 'Sample Sales Contract' },
      { key: 'materialListExcel', checked: false, name: 'Material List Excel' },
      { key: 'crossSectionsOther', checked: false, name: 'Cross Sections' },
      { key: 'sheathingDrawingsOther', checked: false, name: 'Sheathing Drawings' },
      // Add our new DXF export option
      { key: 'wallLayout2DDXF', checked: false, name: 'Wall Layout 2D DXF (Clean Export)' },
      { key: 'wallLayoutDxf', checked: false, name: 'Wall Layout DXF (Legacy)' },
      { key: 'postLayoutDxf', checked: false, name: 'Post Layout DXF' },
      { key: 'trussLayoutDxf', checked: false, name: 'Truss Layout DXF' },
      { key: 'assemblyDxfs', checked: false, name: 'Assembly DXFs' },
      { key: 'documentTemplate', checked: false, name: 'Document Template' },
      { key: 'jobDataCsv', checked: false, name: 'Job Data CSV' },
      { key: 'pickList', checked: false, name: 'Pick List' },
      { key: 'excelWorkbook', checked: false, name: 'Excel Workbook' },
      { key: 'csvTemplate', checked: false, name: 'CSV Template' },
      { key: 'centralLinkUpload', checked: false, name: 'Central Link Upload' },
      { key: 'sketchUpFile', checked: false, name: 'SketchUp File' },
      { key: 'ezmFile', checked: false, name: 'EZM File' },
      { key: 'condocSketchUpFile', checked: false, name: 'Condoc SketchUp File' },
      { key: 'pfsfProposal', checked: false, name: 'PF/SF Proposal' },
    ],
  });

  // State for export status
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });

  // Generic handleChange function
  const handleChange = (section, key) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [section]: prevState[section].map((item) =>
        item.key === key ? { ...item, checked: !item.checked } : item
      ),
    }));
  };
  // Toggle all checkboxes for all categories
  const toggleAllCategories = (value) => {
    setCheckboxState((prevState) => ({
      pdfSections: prevState.pdfSections.map((item) => ({ ...item, checked: value })),
      otherFiles: prevState.otherFiles.map((item) => ({ ...item, checked: value })),
    }));
  };

  const handleExportComplete = (success, error) => {
    setExportStatus({
      isExporting: false,
      success,
      message: success
        ? 'DXF export completed successfully!'
        : `Export failed: ${error ? error.message : 'Unknown error'}`
    });

    setExportStatus(prevState => ({
      ...prevState,
      message: ''
    }));
  };

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
  // Download selected checkboxes
  const handleDownload = () => {
    const selectedPdfSections = checkboxState.pdfSections.filter((item) => item.checked);
    const selectedOtherFiles = checkboxState.otherFiles.filter((item) => item.checked);
    const wallLayout2DDXF = selectedOtherFiles.find(item => item.key === 'wallLayout2DDXF');

    if (wallLayout2DDXF) {
      setExportStatus({
        isExporting: true,
        success: null,
        message: 'Preparing Wall Layout 2D DXF export...'
      });

      setExportStatus({
        isExporting: false,
        success: true,
        message: 'Wall Layout 2D DXF export would happen here!'
      });

      // Clear the message after a few seconds
      handleExportDXF();
      setExportStatus(prevStatus => ({
        ...prevStatus,
        message: ''
      }));

    } else {
      // Regular download flow for other selected items
      alert('Download initiated for selected items.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-4xl">
        {/* Modal header */}
        <div className="bg-blue-500 text-white py-3 px-4 font-bold text-lg rounded-t-md">
          Download Outputs
        </div>
        <div className="p-4">
          {/* PDF Sections */}
          <div className="mb-4">
            <div className="bg-blue-500 text-white py-2 px-4 font-bold">
              PDF Sections:
            </div>
            <div className="grid grid-cols-4 gap-y-3 mt-3">
              {checkboxState.pdfSections.map(({ key, checked, name }) => (
                <div className="flex items-center" key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={checked}
                    onChange={() => handleChange('pdfSections', key)}
                    className="mr-2"
                  />
                  <label className="text-sm text-stone-950" htmlFor={key}>{name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Other Files */}
          <div className="mb-4">
            <div className="bg-blue-500 text-white py-2 px-4 font-bold">
              Other Files:
            </div>
            <div className="grid grid-cols-4 gap-y-3 mt-3">
              {checkboxState.otherFiles.map(({ key, checked, name }) => (
                <div className={`flex items-center ${key === 'wallLayout2DDXF' ? 'bg-blue-50 rounded p-1' : ''}`} key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={checked}
                    onChange={() => handleChange('otherFiles', key)}
                    className="mr-2"
                  />
                  <label
                    className={`text-sm ${key === 'wallLayout2DDXF' ? 'text-blue-800 font-medium' : 'text-stone-950'}`}
                    htmlFor={key}
                  >
                    {name}
                    {key === 'wallLayout2DDXF' && <span className="ml-1 text-xs bg-blue-200 text-blue-800 px-1 rounded">New</span>}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status message */}
          {exportStatus.message && (
            <div
              className={`mb-4 p-2 rounded text-sm ${exportStatus.success === true ? 'bg-green-100 text-green-700' :
                exportStatus.success === false ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}
            >
              {exportStatus.message}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
              onClick={() => toggleAllCategories(true)}
            >
              All On
            </button>
            <button
              className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
              onClick={() => toggleAllCategories(false)}
            >
              All Off
            </button>
            <button
              className={`bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 ${exportStatus.isExporting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              onClick={handleDownload}
              disabled={exportStatus.isExporting}
            >
              {exportStatus.isExporting ? 'Processing...' : 'Download'}
            </button>
            <button
              className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <div>
          <Canvas
            shadows
            style={{ position: 'absolute' }}
          >
            {/* DXF Export Handler */}
            <DXFExportHandler onExportComplete={handleExportComplete} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default OutputModalWithDXF;