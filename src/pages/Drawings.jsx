
/**
 * Drawings page component that includes export functionality
 */
function Drawings() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drawings & Export Options</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* DXF Export Panel - Now positioned outside the Canvas */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">DXF Export</h2>
          <p className="text-sm text-gray-600 mb-4">
            Export wall layouts and panels as 2D DXF files for use in CAD software.
          </p>
          {/* <ExportDXFPanel /> */}
        </div>
        
        {/* Legacy Export Panel */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Other Export Options</h2>
          <p className="text-sm text-gray-600 mb-4">
            Additional export options for panel data and layouts.
          </p>
          {/* <ExportPanel /> */}
        </div>
      </div>
    </div>
  );
}

export default Drawings;