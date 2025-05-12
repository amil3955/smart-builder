import React, { useState } from "react";
import OutputModal from "./OutputModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-between px-4 py-1 h-14 bg-blue-600 text-white">
      <div className="flex items-center">
        <button className="bg-white text-blue-600 px-3 py-1 rounded mr-6 hover:bg-gray-100">HOME</button>
        <h1 className="text-sm font-medium">
          Create Job <br />
          <span className="font-normal text-xs">*untitled*</span>
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Test DXF</button>
        <button
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
          onClick={handleModalOpen}
        >
          Output
        </button>
        <button className="bg-white text-gray-800 px-3 py-1 rounded text-sm">MAKE QUOTE</button>
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">SAVE</button>
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">SAVE AS</button>
        <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">SUPPORT</button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">HELP</button>
      </div>
      {/* Download Outputs Modal */}
      <OutputModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default Navbar;