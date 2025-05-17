// Example: Integration into Navbar.jsx
import React, { useState } from "react";
import OutputModal from "./OutputModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState({
    isExporting: false,
    success: null,
    message: ''
  });
  
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-between px-4 py-1 h-14 bg-blue-500 text-white">
      <div className="flex items-center">
        <button className="bg-white text-blue-600 px-3 py-1 rounded mr-6 hover:bg-gray-100">HOME</button>
        <h1 className="text-sm font-medium">
          Create Job <br />
          <span className="font-normal text-xs">*untitled*</span>
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
          onClick={handleModalOpen}
        >
          Output
        </button>
        <button className="bg-white text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-100">MAKE QUOTE</button>
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300">SAVE</button>
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300">SAVE AS</button>
        <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800">SUPPORT</button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">HELP</button>
      </div>
      
      {/* Status message */}
      {exportStatus.message && (
        <div className="absolute top-16 right-4 bg-white text-gray-800 p-2 rounded shadow-md">
          {exportStatus.message}
        </div>
      )}
      {/* Download Outputs Modal */}
      <OutputModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default Navbar;