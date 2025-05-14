import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { usePanelContext } from '../../contexts/PanelContext';

const Sidebar = () => {
  // Initial state for the tree structure
  const [expandedItems, setExpandedItems] = useState({
    Select: true,
    Panels: true,
  });
  
  // State to track the active folder
  const [activeFolder, setActiveFolder] = useState('Panels');
  
  // Get panel selection context
  const { selectedPanel, selectPanel, panelData } = usePanelContext();
  
  // State for panels found in the model
  const [panels, setPanels] = useState({
    'ROOF': ['ROOF-1', 'ROOF-2'],
    'EXT': ['EXT-1', 'EXT-2', 'EXT-3', 'EXT-4'],
  });

  // Toggle expanded state for an item
  const toggleExpand = (itemKey) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [itemKey]: !prevState[itemKey],
    }));
  };

  // Set the active folder
  const handleFolderClick = (folderKey) => {
    setActiveFolder(folderKey);
  };
  
  // Handle panel selection from the sidebar
  const handlePanelClick = (panelId) => {
    selectPanel(panelId);
  };
  
  // Check if a panel is selected
  const isPanelSelected = (panelId) => {
    return selectedPanel === panelId;
  };

  return (
    <div className="bg-gray-100 w-52 h-full overflow-auto">
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
          <span className={`mr-1 ${activeFolder === 'Select' ? 'text-white' : 'text-gray-500'}`}>
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
          <span className={`mr-1 ${activeFolder === 'Panels' ? 'text-white' : 'text-gray-500'}`}>
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
            {/* ROOF panels */}
            <div className="mb-1">
              <div
                className={`flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100`}
                onClick={() => toggleExpand('ROOF')}
              >
                <span className="mr-1 text-gray-500">
                  {expandedItems['ROOF'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
                <Folder size={14} className="mr-2 text-yellow-500" />
                <span>ROOF</span>
              </div>
              
              {expandedItems['ROOF'] && panels.ROOF.map((panel) => (
                <div
                  key={panel}
                  className={`flex items-center py-1 px-2 ml-3 text-sm cursor-pointer 
                    ${isPanelSelected(panel) ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                  onClick={() => handlePanelClick(panel)}
                >
                  <File size={14} className="mr-2 text-blue-500" />
                  <span>{panel}</span>
                </div>
              ))}
            </div>
            
            {/* EXT panels */}
            <div className="mb-1">
              <div
                className={`flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100`}
                onClick={() => toggleExpand('EXT')}
              >
                <span className="mr-1 text-gray-500">
                  {expandedItems['EXT'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
                <Folder size={14} className="mr-2 text-yellow-500" />
                <span>EXT</span>
              </div>
              
              {expandedItems['EXT'] && panels.EXT.map((panel) => (
                <div
                  key={panel}
                  className={`flex items-center py-1 px-2 ml-3 text-sm cursor-pointer 
                    ${isPanelSelected(panel) ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                  onClick={() => handlePanelClick(panel)}
                >
                  <File size={14} className="mr-2 text-blue-500" />
                  <span>{panel}</span>
                </div>
              ))}
            </div>
            
            {/* Any other detected panels would be added here */}
            {Object.entries(panelData)
              .filter(([key]) => !key.includes('ROOF') && !key.includes('EXT'))
              .map(([panelId]) => (
                <div
                  key={panelId}
                  className={`flex items-center py-1 px-2 text-sm cursor-pointer 
                    ${isPanelSelected(panelId) ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                  onClick={() => handlePanelClick(panelId)}
                >
                  <File size={14} className="mr-2 text-blue-500" />
                  <span>{panelId}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;