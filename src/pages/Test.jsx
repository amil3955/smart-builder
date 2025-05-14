import React from 'react';
import BuildCanvasWithDXF from "../scenes/BuildCanvasWithDXF";
import Sidebar from "../components/UI/Sidebar";
import PanelEdit from "../components/UI/PanelEdit";

function Test() {   
    return (
        <div className="w-full flex h-[calc(100vh-140px)]">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <div className="flex-1 bg-gray-50">
                    <BuildCanvasWithDXF />
                </div>
            </div>
            <PanelEdit />
        </div>
    );
}

export default Test;