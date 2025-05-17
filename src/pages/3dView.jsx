import BuildCanvas from "../scenes/BuildCanvas";
import Sidebar from "../components/UI/Sidebar";
import RightSidebar from "../components/UI/rightsidebar";
import MainToolbar from "../components/UI/3dview/MainToolbar";
import BottomToolbar from "../components/UI/3dview/BottomToolbar";
import { useUIStore } from "../store";

function ThreeView() {
  const { activeTab } = useUIStore();

  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      <MainToolbar />
      <div className="w-full flex h-[calc(100vh-140px)]">
        <div className="flex flex-col flex-1">
          <div className="flex-1 bg-gray-50">
            {/* <BuildCanvas /> */}
          </div>
          <BottomToolbar /> 
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default ThreeView;