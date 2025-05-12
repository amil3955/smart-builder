import React, { useState } from 'react';

const PanelEdit = () => {
    // State for slider value
    const [sliderValue, setSliderValue] = useState(25);

    // Handler for slider change
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    return (
        <div className="flex flex-col w-96 h-full bg-gray-100">
            {/* Header text */}
            <div className="text-center p-4 text-gray-800">
                Select a panel to edit
            </div>

            {/* Main content area - empty in the screenshot */}
            <div className="flex-1">
            </div>

            {/* Bottom controls */}
            <div className="flex items-center border-t border-gray-200 p-2">
                {/* Reset button */}
                <button className="bg-yellow-500 p-2 mr-2 rounded flex items-center justify-center w-12 h-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>

                {/* Slider */}
                <div className="flex-1">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Value label */}
                <div className="ml-2 text-gray-600 w-6 text-right">
                    {sliderValue > 90 ? '9s' : (sliderValue / 10).toFixed(1) + 's'}
                </div>
            </div>
        </div>
    );
};

export default PanelEdit;