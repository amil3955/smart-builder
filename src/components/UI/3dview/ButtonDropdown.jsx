import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Zustand store could be used here for global state management
// This is a simpler component version using local state

const StyleOptionButton = ({ option, isSelected, onClick }) => {
  // Determine border color based on selected state and option highlights
  const getBorderColor = () => {
    if (isSelected) return 'border-blue-600';
    if (option.highlighted) return 'border-orange-500';
    return 'border-gray-300';
  };

  return (
    <button
      className={`relative flex flex-col items-center justify-center p-1 ${getBorderColor()} border-2 bg-white hover:bg-gray-50 transition-colors rounded`}
      onClick={() => onClick(option.id)}
    >
      {/* Option thumbnail */}
      <div className="w-full aspect-square relative">
        {/* Building thumbnail - stylized representation */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-full h-5/6 bg-gray-400 flex items-center justify-center relative">
            {/* Orange highlight on top of the lean-to if highlighted */}
            {option.highlighted && (
              <div className="absolute top-0 left-0 right-0 h-1/6 bg-orange-500"></div>
            )}
            
            {/* Center text if it's a custom option */}
            {option.isCustom && (
              <span className="text-xs font-bold text-gray-600">CUSTOM</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Optional label could be added here */}
    </button>
  );
};

const ButtonDropdown = ({ 
  label = "Lean-to",
  initialSelected = null,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelected);
  const dropdownRef = useRef(null);
  
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
  };
  
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button trigger */}
      <button
        className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>
      
      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-10 mt-1 origin-top-left bg-white border border-gray-300 rounded shadow-lg p-2">
          <div className="grid grid-cols-3 gap-2 w-60">
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
  );
};

export default ButtonDropdown;
