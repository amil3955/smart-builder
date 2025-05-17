import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, RefreshCw } from 'lucide-react';
import { useUIStore } from '../../../store';
import MainBuilding from './MainBuilding';
import Details from './Details';
import DoorAndWindow from './DoorAndWindow';
import Packages from './Packages';
import JobForm from './JobForm';

// Individual sidebar section component
const RightSidebar = () => {

    const [activeTab, setActiveTab] = useState('main');
    const tabs = [
        { id: 'main', label: 'Main Building' },
        { id: 'details', label: 'Details' },
        { id: 'door-window', label: 'Door and Window' },
        { id: 'packages', label: 'Packages' },
        { id: 'job', label: 'Job' }
    ];

    return (
        <div className="w-96 h-full flex flex-col bg-gray-50 border-l border-gray-200">
            {/* Sidebar Header - Tab Navigation */}
            <div className="flex border-b justify-between items-center border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`p-2 text-xs font-medium w-24 leading-3 h-11 border-r border-gray-200 hover:border-b-blue-500 border-b-2 duration-100 ${activeTab === tab.id
                            ? 'bg-white text-blue-500 border-b-2 border-b-blue-500 '
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'main' && (<MainBuilding />)}
                {activeTab === 'details' && (<Details />)}
                {activeTab === 'door-window' && (<DoorAndWindow />)}
                {activeTab === 'packages' && (<Packages />)}
                {activeTab === 'job' && (<JobForm />)}
            </div>
        </div>
    );
};

export default RightSidebar;