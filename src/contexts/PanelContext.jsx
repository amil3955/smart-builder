import React, { createContext, useState, useContext } from 'react';

// Create context
const PanelContext = createContext();

// Custom hook to use the context
export const usePanelContext = () => useContext(PanelContext);

// Provider component
export const PanelProvider = ({ children }) => {
    // State for selected panel
    const [selectedPanel, setSelectedPanel] = useState(null);
    // State for panel data
    const [panelData, setPanelData] = useState({});
    // Function to select a panel
    const selectPanel = (panelId, data = {}) => {
        setSelectedPanel(panelId);
        setPanelData(prevData => ({
            ...prevData,
            [panelId]: { ...(prevData[panelId] || {}), ...data }
        }));
    };
    // Function to update panel data
    const updatePanelData = (panelId, data) => {
        setPanelData(prevData => ({
            ...prevData,
            [panelId]: { ...(prevData[panelId] || {}), ...data }
        }));
    };
    // Function to deselect the current panel
    const deselectPanel = () => {
        setSelectedPanel(null);
    };

    const [exportStatus, setExportStatus] = useState({
        isExporting: false,
        success: null,
        message: ''
    });
  
    // Value to be provided to consumers
    const value = {
        selectedPanel,
        panelData,
        selectPanel,
        updatePanelData,
        deselectPanel,
        exportStatus,
        setExportStatus
    };
    // Output the context provider
   

    return (
        <PanelContext.Provider value={value}>
            {children}
        </PanelContext.Provider>
    );
};

export default PanelContext;