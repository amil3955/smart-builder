import React, { useState } from "react";
import AdvancedEdit from "../../pages/AdvancedEdit"; // Import the AdvancedEdit component
import ThreeView from "../../pages/ThreeView"; // Import the ThreeView component
import TwoView from "../../pages/TwoView"; // Import the TwoDView component
import JobReview from "../../pages/JobReview"; // Import the JobReview component
import Drawings from "../../pages/Drawings"; // Import the Drawings component
import Test from "../../pages/Test"; // Import the Test component

function TabNavigation() {
  const [activeTab, setActiveTab] = useState("Advanced Edit"); // State to track the active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex items-center border-b">
        <button
          className={`px-4 py-2 border-r ${
            activeTab === "3d View" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800"
          }`}
          onClick={() => handleTabClick("3d View")}
        >
          3d View
        </button>
        <button
          className={`px-4 py-2 border-r ${
            activeTab === "2d View" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800"
          }`}
          onClick={() => handleTabClick("2d View")}
        >
          2d View
        </button>
        <button
          className={`px-4 py-2 border-r ${
            activeTab === "Job Review" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800"
          }`}
          onClick={() => handleTabClick("Job Review")}
        >
          Job Review
        </button>
        <button
          className={`px-4 py-2 border-r ${
            activeTab === "Drawings" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800"
          }`}
          onClick={() => handleTabClick("Drawings")}
        >
          Drawings
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Advanced Edit" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800"
          }`}
          onClick={() => handleTabClick("Advanced Edit")}
        >
          Advanced Edit
        </button>
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <button className="px-4 py-2 text-blue-600">CREATE OPTION</button>
        <button className="px-4 py-2 text-blue-600 border-l">PRINT</button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "3d View" && <ThreeView />}
        {activeTab === "2d View" && <TwoView />}
        {activeTab === "Job Review" && <JobReview />}
        {activeTab === "Drawings" && <Drawings />}
        {activeTab === "Advanced Edit" && <AdvancedEdit />}
        {/* {activeTab === "Test" && <Test />} */}
      </div>
    </div>
  );
}

export default TabNavigation;