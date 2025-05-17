import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Plus, Trash } from 'lucide-react';

const DraggableModal = ({ isOpen, onClose }) => {
  // Modal position state
  const [position, setPosition] = useState({ x: 1400, y: 100 });

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Tab state
  const [activeTab, setActiveTab] = useState('Create Overhead');

  // Accordion states for sections
  const [styleAccordion, setStyleAccordion] = useState(true);
  const [openingAccordion, setOpeningAccordion] = useState(false);

  // Selected door style
  const [selectedDoorStyle, setSelectedDoorStyle] = useState(null);

  // Category dropdown state
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Category');

  // Added items list
  const [addedItems, setAddedItems] = useState(['12" Soffit Box Trim']);

  // Item search text
  const [searchText, setSearchText] = useState('');

  // Door options data
  const doorStyles = [
    { id: 'solid', label: 'Solid', path: '/assets/images/doorstyle/walkdoor_solid.png' },
    { id: 'panel', label: 'Panel', path: '/assets/images/doorstyle/walkdoor_panel.png' },
    { id: 'commercial', label: 'Commercial', path: '/assets/images/doorstyle/walkdoor_commercial.png' },
    { id: 'patio', label: 'Patio', path: '/assets/images/doorstyle/walkdoor_patio.png' },
    { id: 'sidelight', label: 'Sidelight', path: '/assets/images/doorstyle/walkdoor_sidelight.png' },
    { id: 'dutch', label: 'Dutch', path: '/assets/images/doorstyle/walkdoor_dutch.png' },
    { id: 'all', label: 'All', path: '/assets/images/doorstyle/walkdoor_all.png' },
    { id: 'custom', label: 'Custom', path: '/assets/images/doorstyle/walkdoor_custom.png' }
  ];

  // Door opening options
  const doorOpenings = [
    { id: 'steel_lh', label: 'Open Steel Door LH OS' },
    { id: 'solid_lis', label: '3x68 LIS Solid Steel Door' },
    { id: 'solid_los', label: '3x68 LOS Solid Steel Door' },
    { id: 'solid_ris', label: '3x68 RIS Solid Steel Door' },
    { id: 'solid_ros', label: '3x68 ROS Solid Steel Door' }
  ];

  // Category options
  const categoryOptions = [
    'Framing',
    'Sheathing',
    'Trim',
    'Foundation',
    'Hardware',
    'Slider Hardware',
    'Connector',
    'Fastener',
    'Labor',
    'Freight'
  ];

  // Start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Calculate the offset from the click position to the modal's top-left corner
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      // Update position based on mouse position and initial offset
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  // End dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Toggle style accordion
  const toggleStyleAccordion = () => {
    setStyleAccordion(!styleAccordion);
    if (!styleAccordion) {
      setOpeningAccordion(false);
    }
  };

  // Toggle opening accordion
  const toggleOpeningAccordion = () => {
    setOpeningAccordion(!openingAccordion);
    if (!openingAccordion) {
      setStyleAccordion(false);
    }
  };

  // Handle door style selection
  const handleDoorStyleSelect = (styleId) => {
    setSelectedDoorStyle(styleId);
    setStyleAccordion(false);
    // If we selected a style, auto-open the opening selection
    setOpeningAccordion(true);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  // Add a new item
  const handleAddItem = () => {
    // This would normally add a new item based on selection
    // For demo, we'll just add a placeholder
    setAddedItems([...addedItems, `New ${selectedCategory} Item`]);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const newItems = [...addedItems];
    newItems.splice(index, 1);
    setAddedItems(newItems);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 shadow-sm"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={(e) => {
        // Only close if clicking on the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white shadow-lg rounded w-[440px]"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Draggable */}
        <div
          className="relative bg-blue-500 text-white py-2 px-4 flex justify-between items-center cursor-grab"
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={onClose}
            className="text-gray-500 bg-white hover:bg-gray-300 rounded p-1 ml-auto"
          >
            <X size={17} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 text-lg font-bold ${activeTab === 'Create Overhead'
              ? 'text-black  border-b-2 border-blue-500'
              : 'text-gray-500'
              }`}
            onClick={() => handleTabChange('Create Overhead')}
          >
            Create Overhead
          </button>
          <button
            className={`py-2 px-4 text-lg font-bold ${activeTab === 'Add-Ons'
              ? 'text-black border-b-2 border-blue-500'
              : 'text-gray-500'
              }`}
            onClick={() => handleTabChange('Add-Ons')}
          >
            Add-Ons
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-h-[70vh] h-[36rem] shadow-md">
          {activeTab === 'Create Overhead' ? (
            <div className="m-3 mt-6">
              {/* Style Selector Accordion */}
              <div className="mt-3 mb-6 bg-gray-100 flex justify-between items-center cursor-pointer border-b border-gray-300" onClick={toggleStyleAccordion}>
                <span className="font-medium text-sm p-2">Select A Style</span>
                <div className="w-9 h-9 bg-blue-500 flex items-center justify-center text-white">
                  {styleAccordion ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </div>

              {/* Door Style Grid */}
              {styleAccordion && (
                <div className="grid grid-cols-4 gap-4 bg-gray-50">
                  {doorStyles.map((style) => (
                    <div key={style.id} className="flex flex-col items-center">
                      <div
                        className={`
                          w-full aspect-square cursor-pointer
                          bg-container bg-center bg-no-repeat
                          transition-all duration-200 relative bg-gray-100
                          ${selectedDoorStyle === style.id
                            ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                            : 'hover:scale-105 border border-gray-200'
                          }
                        `}
                        onClick={() => handleDoorStyleSelect(style.id)}
                        style={{
                          backgroundImage: `url(${style.path})`,
                        }}
                      >
                        <div
                          className={`
                            absolute inset-0 
                            ${selectedDoorStyle === style.id
                              ? 'bg-blue-500 bg-opacity-10'
                              : 'hover:bg-black hover:bg-opacity-5'
                            }
                          `}
                        />
                      </div>
                      <div className="text-center text-sm font-medium mt-2">
                        {style.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Opening Selector Accordion */}
              <div className="bg-gray-100 flex justify-between items-center my-3 cursor-pointer border-b border-gray-300" onClick={toggleOpeningAccordion}>
                <span className="font-medium text-sm p-2">Select An Opening</span>
                <div className="w-9 h-9 bg-blue-500 flex items-center justify-center text-white">
                  {openingAccordion ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </div>
              
              {/* Door Opening Selection */}
              {openingAccordion && (
                <div className="p-3">
                  {/* Search and Filter Row */}
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      placeholder="search"
                      className="border border-gray-300 rounded px-3 py-1 flex-grow"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="width"
                      className="border border-gray-300 rounded px-3 py-1 w-16"
                    />
                    <input
                      type="text"
                      placeholder="height"
                      className="border border-gray-300 rounded px-3 py-1 w-16"
                    />
                    <button className="bg-blue-500 text-white px-4 py-1 rounded">
                      Apply
                    </button>
                  </div>

                  {/* Door Opening Options List */}
                  <div className="max-h-96 overflow-y-auto shadow-md">
                    {doorOpenings.map((door, index) => (
                      <div key={door.id} className={`flex items-center p-2 border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="mr-3">
                          <svg className="w-10 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="6" y="2" width="12" height="20" />
                            <rect x="9" y="6" width="6" height="12" stroke="currentColor" fill="none" />
                          </svg>
                        </div>
                        <span className="text-sm">{door.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Add-Ons Tab Content
            <div className="p-4">
              {/* Add/Remove buttons */}
              <div className="flex space-x-2 mb-4 bg-gray-100 py-2 px-4">
                <button className="bg-white border border-gray-300 rounded-sm p-1">
                  <Plus size={16} />
                </button>
                <button className="bg-white border border-gray-300 rounded-sm p-1">
                  <Trash size={16} />
                </button>
              </div>

              {/* Added Items List */}
              <div className="space-y-2 mb-4">
                {addedItems.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-2 flex justify-between items-center">
                    <span className="text-sm">{item}</span>
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {/* If no items added, show empty rows */}
                {addedItems.length === 0 && (
                  <>
                    <div className="bg-gray-100 p-2">&nbsp;</div>
                    <div className="bg-gray-100 p-2">&nbsp;</div>
                    <div className="bg-gray-100 p-2">&nbsp;</div>
                  </>
                )}
              </div>

              {/* Category Selector and Add Item Row */}
              <div className="flex space-x-2 items-center mb-4">
                <div className="relative">
                  <button
                    className="flex items-center justify-between border border-gray-300 rounded px-3 py-1 w-32 bg-white"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  >
                    <span className="text-sm">{selectedCategory}</span>
                    <ChevronDown size={16} />
                  </button>

                  {/* Category Dropdown Menu */}
                  {categoryDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg w-40 z-50">
                      {categoryOptions.map((category) => (
                        <button
                          key={category}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1 flex-grow"
                  placeholder="Search items..."
                />

                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={handleAddItem}
                >
                  Add Items
                </button>
              </div>

              {/* Placeholder rows */}
              <div className="space-y-2">
                <div className="bg-gray-100 p-2">&nbsp;</div>
                <div className="bg-gray-100 p-2">&nbsp;</div>
                <div className="bg-gray-100 p-2">&nbsp;</div>
                <div className="bg-gray-100 p-2">&nbsp;</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraggableModal;