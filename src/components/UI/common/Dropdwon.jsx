import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

const Dropdown = ({
    id,
    options = [],
    defaultValue = null,
    hasHelp = false,
    onChange = () => { }
}) => {
    // State for dropdown's open/closed status
    const [isOpen, setIsOpen] = useState(false);

    // State for the selected value (initialize with default or first option)
    const [selectedValue, setSelectedValue] = useState(
        defaultValue || (options.length > 0 ? options[0] : '')
    );

    // Toggle dropdown open/closed
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Handle selecting an option
    const handleSelect = (option) => {
        setSelectedValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="w-full text-xs">
                {/* Dropdown container */}
                <div className="relative">
                    {/* Dropdown button */}
                    <button
                        type="button"
                        onClick={handleToggle}
                        className="flex items-center justify-between w-full px-2 py-1 text-sm border border-gray-300 bg-white rounded"
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                    >
                        <span className="truncate">{selectedValue}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                            <ul
                                className="py-1 max-h-60 overflow-auto"
                                role="listbox"
                            >
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className={`px-2 py-2 text-sm cursor-pointer ${selectedValue === option ? 'bg-blue-100' : 'hover:bg-gray-100'
                                            }`}
                                        role="option"
                                        aria-selected={selectedValue === option}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Help icon */}
                    {hasHelp && (
                        <div className="absolute right-[-24px] top-1/2 -translate-y-1/2">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-yellow-800">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default Dropdown;
