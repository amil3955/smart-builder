import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useUIStore } from '../../../store';
import Dropdown from './DropdownMenu';

const BottomToolbar = () => {
  const { activeOption, changeViewExpanded, setActiveOption, toggleChangeView } = useUIStore();
  
  // Options for the toolbar
  const viewOptions = [
    { id: 'shell', label: 'Shell' },
    { id: 'frame', label: 'Frame' },
    { id: 'roof', label: 'Roof' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'landscapeSettings', label: 'Landscape Settings' },
  ];
  
  return (
    <div className="w-full pt-1 bg-white">
        <div className="bottom-0 left-0 right-0 bg-blue-500 text-white flex items-center justify-between py-1 px-2 shadow-lg">
        <div className="flex items-center space-x-2">
            <div className="font-bold text-sm tracking-wide mr-6">VIEW OPTIONS</div>
            
            {viewOptions.map((option) => (
            <button
                key={option.id}
                className="px-4 py-1 text-sm font-medium rounded bg-white text-black hover:bg-gray-200" 
                onClick={() => setActiveOption(option.id)}
            >
                {option.label}
            </button>
            ))}
            
            <div className="relative">
                {/* <Dropdown /> */}
            <button
                className="px-4 py-1 text-sm font-medium rounded bg-white text-black hover:bg-blue-50 flex items-center"
                onClick={toggleChangeView}
            >
                <span>Change View</span>
                {changeViewExpanded ? (
                <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                <ChevronDown className="ml-1 w-4 h-4" />
                )}
            </button>
            
            {changeViewExpanded && (
                <div className="absolute bottom-10 left-0 bg-white text-blue-800 shadow-lg rounded-t overflow-hidden w-40 border border-gray-200 z-10">
                <button className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">3D View</button>
                <button className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">2D Top View</button>
                <button className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">2D Front View</button>
                <button className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">2D Side View</button>
                <button className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">Interior View</button>
                </div>
            )}
            </div>
        </div>
        
        <div className="text-sm font-medium text-white">
            Powered by SmartBuild
        </div>
        </div>
    </div>
  );
};

export default BottomToolbar;