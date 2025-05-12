import React from 'react';
import SquarePanel from '../components/3D/SquarePanel';
import PentagonPanel from '../components/3D/PentagonPanel';
function Model() {

    const panelProps = {
        thickness: 0.3,
        color: "#aaaaaa",
        hoverColor: "#4287f5",
        mode: "2d", // Use 2D mode to match screenshot
    };

    return (
        <>
            {/* XZ Plane */}
            <SquarePanel
                position={[0, 5, -1.3]} // Centered on the XZ plane
                rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around X-axis
                size={10}
                thickness={0.3}
                color={"#dfe2e8"}
                hoverColor={"#3574d4"}
                dimensionLabels={{ top: "EX-1" }}
                {...panelProps}
            />
            <SquarePanel
                position={[0, -4.7, -1.3]} // Centered on the XZ plane
                rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around X-axis
                size={10}
                thickness={0.3}
                color={"#dfe2e8"}
                hoverColor={"#3574d4"}
                dimensionLabels={{ top: "EX-3" }}
                {...panelProps}
            />

            {/* YZ Plane */}
            <PentagonPanel
                position={[4.7, 0, 0]} // Centered on the YZ plane
                rotation={[0, Math.PI / 2, Math.PI / 2]} // Rotate 90 degrees around Y-axis
                size={10}
                thickness={0.3}
                color={"#dfe2e8"}
                hoverColor={"#3574d4"}
                dimensionLabels={{ top: "EX-2" }}
                {...panelProps}
            />
            <PentagonPanel
                position={[-5, 0, 0]} // Centered on the YZ plane
                rotation={[0, Math.PI / 2, Math.PI / 2]} // Rotate 90 degrees around Y-axis
                size={10}
                thickness={0.3}
                color={"#dfe2e8"}
                hoverColor={"#3574d4"}
                dimensionLabels={{ top: "EX-4" }}
                {...panelProps}
            />
        </>
    );
}

export default Model;