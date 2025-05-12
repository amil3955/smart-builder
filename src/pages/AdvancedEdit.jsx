import BuildCanvas from "../scenes/BuildCanvas";
import Sidebar from "../components/UI/Sidebar";
import PanelEdit from "../components/UI/PanelEdit";

function AdvancedEdit() {   
    return (
        <div className="w-full flex h-[calc(100vh-140px)]">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <div className="flex-1 bg-gray-50">
                    <BuildCanvas />
                </div>
            </div>
            <PanelEdit />
        </div>
    );
}

export default AdvancedEdit;