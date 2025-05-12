import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

const Sidebar = () => {
  // Initial state for the tree structure
  const [expandedItems, setExpandedItems] = useState({
    Select: true,
    Panels: true,
  });
  // State to track the active folder
  const [activeFolder, setActiveFolder] = useState('Panels');

  // Toggle expanded state for an item
  const toggleExpand = (itemKey) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [itemKey]: !prevState[itemKey],
    }));
  };

  // Set the active folder
  const handleFolderClick = (folderKey) => setActiveFolder(folderKey);

  return (
    <div className="bg-gray-100 w-52 h-full">
      {/* Select folder */}
      <div className="mb-1">
        <div
          className={`flex items-center py-1 px-2 text-sm cursor-pointer ${
            activeFolder === 'Select' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
          }`}
          onClick={() => {
            toggleExpand('Select');
            handleFolderClick('Select');
          }}
        >
          <span className="mr-1 text-gray-500">
            {expandedItems['Select'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <Folder
            size={16}
            className={`mr-2 ${
              activeFolder === 'Select' ? 'text-yellow-400' : 'text-yellow-500'
            }`}
          />
          <span className="font-medium">Select</span>
        </div>

        {/* Items in Select folder */}
        {expandedItems['Select'] && (
          <div className="ml-5">
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>Wall</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>Floor</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>Roof</span>
            </div>
          </div>
        )}
      </div>

      {/* Panels folder */}
      <div className="mb-1">
        <div
          className={`flex items-center py-1 px-2 text-sm cursor-pointer ${
            activeFolder === 'Panels' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
          }`}
          onClick={() => {
            toggleExpand('Panels');
            handleFolderClick('Panels');
          }}
        >
          <span className="mr-1">
            {expandedItems['Panels'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <Folder
            size={16}
            className={`mr-2 ${
              activeFolder === 'Panels' ? 'text-yellow-400' : 'text-yellow-500'
            }`}
          />
          <span className="font-medium">Panels</span>
        </div>

        {/* Items in Panels folder */}
        {expandedItems['Panels'] && (
          <div className="ml-5">
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>ROOF-1</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>ROOF-2</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>EXT-1</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>EXT-2</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>EXT-3</span>
            </div>
            <div className="flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100">
              <File size={16} className="mr-2 text-blue-500" />
              <span>EXT-4</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;