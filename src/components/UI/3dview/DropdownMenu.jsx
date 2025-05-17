import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUIStore } from '../../../store';
import DraggableModal from '../modal/DraggableModal';

// Icon components as an object for easy mapping
const ICON_PATHS = {
  WalkDoor: '/assets/images/openings/walkdoor.png',
  OverheadDoors: '/assets/images/openings/overheaddoor.png',
  Sliders: '/assets/images/openings/slider.png',
  Windows: '/assets/images/openings/window.png',
  eavelight: '/assets/images/clearpanels/eavelight.png',
  skylight: '/assets/images/clearpanels/skylight.png',
};

// Menu items data with image paths
const OPENINGS_ITEMS = [
  { id: 'walkDoor', label: 'Walk Door', imagePath: ICON_PATHS.WalkDoor },
  { id: 'overheadDoors', label: 'Overhead Doors', imagePath: ICON_PATHS.OverheadDoors },
  { id: 'sliders', label: 'Sliders', imagePath: ICON_PATHS.Sliders },
  { id: 'windows', label: 'Windows', imagePath: ICON_PATHS.Windows },
];

const CLEARPANELS_ITEMS = [
  { id: 'eavelight', label: 'Eave Light', imagePath: ICON_PATHS.eavelight },
  { id: 'skylight', label: 'Sky Light', imagePath: ICON_PATHS.skylight },
];

// Updated DropdownMenuItem to use images
const DropdownMenuItem = ({ imagePath, label, onClick }) => (
  <button
    className="flex flex-col items-center justify-center p-4 hover:bg-gray-100 transition-colors w-full border-r last:border-r-0 border-gray-200"
    onClick={onClick}
  >
    <div className="w-24 h-12 flex items-center justify-center mb-2 text-gray-600">
      <img
        src={imagePath}
        alt={label}
        className="w-12 h-12 object-contain"
      />
    </div>
    <span className="text-xs text-black font-semibold">{label}</span>
  </button>
);

const StyleOptionButton = ({ option, isSelected, onClick, }) => {
  // Determine border color based on selected state and option highlights
  const getBorderColor = () => {
    if (isSelected) return 'border-blue-600';
    if (option.highlighted) return 'border-orange-500';
    return 'border-gray-300';
  };

  return (
    <button
      className={`relative flex flex-col items-center justify-center bg-transparent border-2 border-stone-800 hover:bg-gray-300 hover:opacity-50`}
      onClick={() => onClick(option.id)}
    >
      {/* Option thumbnail */}
      <div className="w-full aspect-square relative">
        {/* Building thumbnail - stylized representation */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-5/6 flex items-center justify-center relative">
            {/* Orange highlight on top of the lean-to if highlighted */}
            {option.highlighted && (
              <div className="absolute top-0 left-0 right-0 h-1/6 "></div>
            )}

            {/* Center text if it's a custom option */}

          </div>
        </div>
      </div>

      {/* Optional label could be added here */}
    </button>
  );
};


const Dropdown = ({ onSelect, label, initialSelected, id }) => {
  const { isOpenModal, openModal, closeModal } = useUIStore()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState(initialSelected);
  // Sample lean-to options
  const options = [
    { id: 'lean1', highlighted: true, position: 'top-left' },
    { id: 'lean2', highlighted: true, position: 'top-center' },
    { id: 'lean3', highlighted: true, position: 'top-right' },
    { id: 'lean4', highlighted: false, position: 'middle-left' },
    { id: 'lean5', highlighted: false, isCustom: true, position: 'middle-center' },
    { id: 'lean6', highlighted: false, position: 'middle-right' },
    { id: 'lean7', highlighted: true, position: 'bottom-left' },
    { id: 'lean8', highlighted: true, position: 'bottom-center' },
    { id: 'lean9', highlighted: true, position: 'bottom-right' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    setIsOpen(false);
    if (onSelect) onSelect(optionId);
    openModal();
    isOpenModal = false;
  };

  // Draggable Modal toggle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="px-4 py-1.5 flex items-center justify-between bg-white text-xs font-semibold text-gray-700 hover:bg-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown className="ml-2 h-3 w-3" />
      </div>
      <DraggableModal isOpen={isModalOpen} onClose={toggleModal} />
      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 w-auto bg-white shadow-lg rounded-md border border-gray-200">
          <div className="flex divide-x divide-gray-200 text-xs">
            {id === "openings" && OPENINGS_ITEMS.map(({ id, label, imagePath }) => (
              <DropdownMenuItem
                key={id}
                imagePath={imagePath}
                label={label}
                onClick={() => toggleModal(label)}
              />
            ))}
            {id === "clear-panels" && CLEARPANELS_ITEMS.map(({ id, label, imagePath }) => (
              <DropdownMenuItem
                key={id}
                imagePath={imagePath}
                label={label}
                onClick={() => handleItemClick(label)}
              />
            ))}
            {id === "porch" && isOpen && (
              <div className="absolute z-10 mt-1 origin-top-left bg-white border border-gray-300 rounded shadow-lg p-[2px]">
                <div className="grid grid-cols-3 w-36 border-stone-600 border-solid border-4"
                  style={{
                    backgroundImage: 'url(/assets/images/shed_options.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {options.map((option) => (
                    <StyleOptionButton
                      key={option.id}
                      option={option}
                      isSelected={selectedOption === option.id}
                      onClick={handleOptionClick}
                    />
                  ))}
                </div>
              </div>
            )}
            {id === "lean-to" && isOpen && (
              <div className="absolute z-10 mt-1 origin-top-left bg-white border border-gray-300 rounded shadow-lg p-[2px]">
                <div className="grid grid-cols-3 w-36 border-stone-600 border-solid border-4"
                  style={{
                    backgroundImage: 'url(/assets/images/shed_options.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {options.map((option) => (
                    <StyleOptionButton
                      key={option.id}
                      option={option}
                      isSelected={selectedOption === option.id}
                      onClick={handleOptionClick}
                    />
                  ))}
                </div>
              </div>
            )}
            {id === "awning" && isOpen && (
              <div className="absolute z-10 mt-1 origin-top-left bg-white border border-gray-300 rounded shadow-lg p-[2px]">
                <div className="grid grid-cols-3 w-36 border-stone-600 border-solid border-4"
                  style={{
                    backgroundImage: 'url(/assets/images/shed_options.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {options.map((option) => (
                    <StyleOptionButton
                      key={option.id}
                      option={option}
                      isSelected={selectedOption === option.id}
                      onClick={handleOptionClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dropdown;