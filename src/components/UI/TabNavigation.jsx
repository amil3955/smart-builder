import React, { useState } from "react";
import AdvancedEdit from "../../pages/AdvancedEdit";
import ThreeView from "../../pages/3dView";
import TwoView from "../../pages/2dView";
import JobReview from "../../pages/JobReview";
import Drawings from "../../pages/Drawings";

// Define tab configuration
const TABS = [
  { id: '3d-view', label: '3d View', component: ThreeView },
  { id: '2d-view', label: '2d View', component: TwoView },
  { id: 'job-review', label: 'Job Review', component: JobReview },
  { id: 'drawings', label: 'Drawings', component: Drawings },
  { id: 'advanced-edit', label: 'Advanced Edit', component: AdvancedEdit },
];

const ACTION_BUTTONS = [
  { id: 'create-option', label: 'CREATE OPTION' },
  { id: 'print', label: 'PRINT', className: 'border-l' }
];

function TabNavigation() {
  const [activeTab, setActiveTab] = useState(TABS[0].label);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex items-center border-b">
        {TABS.map(({ id, label }, index) => (
          <button
            key={id}
            className={`px-4 py-2 ${
              index !== TABS.length - 1 ? 'border-r' : ''
            } ${
              activeTab === label 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-800"
            }`}
            onClick={() => handleTabClick(label)}
          >
            {label}
          </button>
        ))}
        
        <div className="flex-grow" />

        {/* Action Buttons */}
        {ACTION_BUTTONS.map(({ id, label, className = '' }) => (
          <button 
            key={id}
            className={`px-4 py-2 text-blue-600 ${className}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {TABS.map(({ label, component: Component }) => 
          activeTab === label && <Component key={label} />
        )}
      </div>
    </div>
  );
}

export default TabNavigation;