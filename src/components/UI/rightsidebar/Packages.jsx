import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { useUIStore } from '../../../store';

// Help icon component
const HelpIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-yellow-800">
    <AlertCircle className="w-4 h-4" />
  </div>
);

// Dropdown select component
const DropdownSelect = ({ id, options, disabled = false }) => {
  const { dropdownValues, setDropdownValue } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedValue = dropdownValues[id] || options[0];
  
  // Handle option selection
  const handleSelect = (option) => {
    setDropdownValue(id, option);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-2 py-1 text-left text-sm border border-gray-300 bg-white rounded ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="truncate text-sm">{selectedValue}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-40 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-50 ${
                  selectedValue === option ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Bundle item component
const BundleItem = ({ id, label, hasDropdown = true, dropdownOptions = [], hasHelp = false }) => {
  const { selectionsPackages, toggleSelection } = useUIStore();
  const isSelected = selectionsPackages[id];
  
  return (
    <div className="flex items-center space-x-2 py-1 border-b border-gray-200 last:border-b-0 hover:bg-blue-200">
      <div className="pl-2">
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          className="h-4 w-4 text-black border-gray-300 rounded"
          checked={isSelected}
          onChange={() => toggleSelection(id)}
        />
      </div>
      
      <div className="w-36 text-sm">
        <label htmlFor={`checkbox-${id}`} className="text-black cursor-pointer hover:underline">
          {label}
        </label>
      </div>
      
      {hasDropdown && (
        <div className="flex-1">
          <DropdownSelect
            id={id}
            options={dropdownOptions}
            disabled={!isSelected}
          />
        </div>
      )}
      
      {hasHelp && (
        <div className="pr-2">
          <HelpIcon />
        </div>
      )}
    </div>
  );
};

// Main Packages Page component
const PackagesPage = () => {
  // Bundle dropdown options
  const amountOptions = ['Enter Amount...', '$500', '$1000', '$1500', '$2000'];
  const foundationOptions = ['Foundation Cost...', '$1000', '$2000', '$3000'];
  const perDayOptions = ['Per Day Charge...', '$300/day', '$500/day', '$800/day'];
  const customOptions = ['Custom...', 'Option 1', 'Option 2', 'Option 3'];
  const gutterOptions = ['6"...', '5"', '6"', 'None'];
  
  // Add-on dropdown options
  const lagOptions = ['Star Con 4" Lags', 'Standard Lags', 'No Lags'];
  const bracingOptions = ['Untreated', 'Treated', 'None'];
  
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
      {/* Bundles Section */}
      <div className="bg-blue-100 px-4 py-2 text-center text-black font-medium border-b border-gray-300">
        Bundles
      </div>
      
      <div className="bg-white">
        <BundleItem id="labor" label="Labor" dropdownOptions={amountOptions} />
        <BundleItem id="concrete" label="Concrete" dropdownOptions={amountOptions} />
        <BundleItem id="foundation" label="Foundation" dropdownOptions={foundationOptions} />
        <BundleItem id="concretePump" label="Concrete Pump" dropdownOptions={perDayOptions} />
        <BundleItem id="liftSkytracCrane" label="Lift-Skytrac-Crane" dropdownOptions={customOptions} />
        <BundleItem id="permitsDrawings" label="Permits/Drawings" dropdownOptions={amountOptions} />
        <BundleItem id="miscFees" label="Misc. Fees" dropdownOptions={amountOptions} />
        <BundleItem id="freight" label="Freight" dropdownOptions={customOptions} />
        <BundleItem id="electrical" label="Electrical" dropdownOptions={customOptions} />
        <BundleItem id="hvacRadiantHeating" label="HVAC/Radiant Heating" dropdownOptions={amountOptions} />
        <BundleItem id="plumbing" label="Plumbing" dropdownOptions={amountOptions} />
        <BundleItem id="interiorTrimAndDoors" label="Interior Trim and Doors" dropdownOptions={amountOptions} />
        <BundleItem id="floorCoverings" label="Floor Coverings" dropdownOptions={amountOptions} />
        <BundleItem id="drywallPainting" label="Drywall/Painting" dropdownOptions={amountOptions} />
        <BundleItem id="cabinetsCountertops" label="Cabinets/Countertops" dropdownOptions={amountOptions} />
        <BundleItem id="gutters" label="Gutters" dropdownOptions={gutterOptions} hasHelp={true} />
        <BundleItem id="manual" label="_[Manual]" hasDropdown={false} />
      </div>
      
      {/* Add-ons Section */}
      <div className="bg-blue-100 px-4 py-2 text-center text-black font-medium border-t border-b border-gray-300">
        Add-ons
      </div>
      
      <div className="bg-white">
        <BundleItem 
          id="trussConnectionFasteners" 
          label="Truss Connection Fasteners" 
          dropdownOptions={lagOptions} 
        />
        <BundleItem 
          id="kneeBracing" 
          label="Knee Bracing" 
          dropdownOptions={bracingOptions} 
          hasHelp={true}
        />
        <BundleItem 
          id="cornerBracing" 
          label="Corner Bracing" 
          hasDropdown={false} 
          hasHelp={true}
        />
        <BundleItem 
          id="xBracing" 
          label="X - Bracing" 
          hasDropdown={false} 
          hasHelp={true}
        />
        <BundleItem 
          id="bottomChordBracing" 
          label="Bottom Chord Bracing" 
          hasDropdown={false} 
          hasHelp={true}
        />
        <BundleItem 
          id="bracingMisc" 
          label="Bracing Misc." 
          hasDropdown={false} 
          hasHelp={true}
        />
        <BundleItem 
          id="testOverhangLabor" 
          label="Test Overhang Labor..." 
          hasDropdown={false}
        />
      </div>
    </div>
  );
};

// Page wrapper with navigation
const Packages = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <PackagesPage />
    </div>
  );
};

export default Packages;