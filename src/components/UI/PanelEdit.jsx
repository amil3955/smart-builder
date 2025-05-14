import React, { useState, useEffect } from 'react';
import { usePanelContext } from '../../contexts/PanelContext';

const PanelEdit = () => {
    // State for slider value
    const [sliderValue, setSliderValue] = useState(25);
    
    // Get context for panel selection
    const { selectedPanel, panelData, updatePanelData, deselectPanel } = usePanelContext();

    // Handler for slider change
    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        setSliderValue(value);
        
        // Update the selected panel's data if one is selected
        if (selectedPanel) {
            updatePanelData(selectedPanel, { sliderValue: value });
        }
    };

    // Reset to default values
    const handleReset = () => {
        setSliderValue(25);
        
        // Reset panel data if a panel is selected
        if (selectedPanel) {
            updatePanelData(selectedPanel, { sliderValue: 25 });
        }
    };

    // When a panel is selected, update the UI with its data
    useEffect(() => {
        if (selectedPanel && panelData[selectedPanel]?.sliderValue !== undefined) {
            setSliderValue(panelData[selectedPanel].sliderValue);
        } else {
            // Default value for new selections
            setSliderValue(25);
        }
    }, [selectedPanel, panelData]);

    return (
        <div className="flex flex-col w-96 h-full bg-gray-100">
            {/* Header text */}
            <div className="bg-blue-600 text-white p-4 font-medium">
                {selectedPanel ? `Editing Panel: ${selectedPanel}` : 'Select a panel to edit'}
            </div>

            {/* Main content area */}
            <div className="flex-1 p-4">
                {selectedPanel ? (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-medium text-gray-900 mb-2">Panel Properties</h3>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm text-gray-600">Panel ID</label>
                                    <div className="bg-gray-50 p-2 rounded text-sm">{selectedPanel}</div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-600">Thickness</label>
                                    <div className="flex items-center">
                                        <input 
                                            type="range" 
                                            min="1" 
                                            max="100" 
                                            value={sliderValue} 
                                            onChange={handleSliderChange}
                                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                        />
                                        <span className="ml-2 text-sm">{sliderValue / 100}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={deselectPanel}
                            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Deselect Panel
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Click on a panel in the 3D view to select it
                    </div>
                )}
            </div>

            {/* Bottom controls */}
            <div className="flex items-center border-t border-gray-200 p-2">
                {/* Reset button */}
                <button 
                    className="bg-yellow-500 p-2 mr-2 rounded flex items-center justify-center w-12 h-10"
                    onClick={handleReset}
                >
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