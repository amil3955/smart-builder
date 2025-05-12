import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei'; // Import Text from drei for 3D text

export function PentagonPanel({
    position = [position],
    rotation = { rotation },
    size = { size },
    thickness = { thickness },
    color = { color },
    hoverColor = { hoverColor },
    dimensionLabels = { dimensionLabels}
}) {
    const [hovered, setHovered] = useState(false);

    // Create a pentagon shape with 90° angles at the bottom corners
    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        const width = size;
        const height = size * 1;

        const ax = -width / 2, ay = -height / 2;
        const bx = width / 2, by = -height / 2;
        const cx = width / 2, cy = height / 4;
        const dx = 0, dy = height / 2;
        const ex = -width / 2, ey = height / 4;

        shape.moveTo(ax, ay);
        shape.lineTo(bx, by);
        shape.lineTo(cx, cy);
        shape.lineTo(dx, dy);
        shape.lineTo(ex, ey);
        shape.closePath();

        const extrudeSettings = {
            depth: thickness,
            bevelEnabled: false
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, [size, thickness]);

    // Store the vertices for label positioning
    const vertices = useMemo(() => {
        const width = size;
        const height = size * 1;
        return {
            d: new THREE.Vector3(0, height / 2, 0),
            e: new THREE.Vector3(-width / 2, height / 4, 0)
        };
    }, [size]);

    // Create edges geometry for clean wireframe without diagonals
    const edgesGeometry = useMemo(() => {
        return new THREE.EdgesGeometry(geometry, 15); // 15 degrees threshold to eliminate small edges
    }, [geometry]);

    // Function to create a panel
    const createPanel = (panelColor, position = [0, 0, 0], opacity = 1) => (
        <mesh
            position={position}
            geometry={geometry}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                color={panelColor}
                transparent={true}
                opacity={opacity}
            />
        </mesh>
    );

    // Function to create dimension labels
    const createDimensionLabels = () => {
        const { d, e } = vertices;
        return (
            <group>
                {/* Top edge label */}
                <Text
                    position={[0, (e.y + d.y) / 1.6 + 0.4, thickness / 2]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={0.3}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                >
                    {dimensionLabels.top}
                </Text>
            </group>
        );
    };

    return (
        <group
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Main panel */}
            {createPanel(color)}

            {/* Clean wireframe edges without diagonals */}
            <lineSegments geometry={edgesGeometry}>
                <lineBasicMaterial color="#7d7d7d" linewidth={1} />
            </lineSegments>

            {/* Dimension labels */}
            {createDimensionLabels()}

            {/* Show hover effect panels when hovered */}
            {hovered && (
                <>
                    {/* Panel in front */}
                    {createPanel(hoverColor, [0, 0, thickness], 0.5)}

                    {/* Panel behind */}
                    {createPanel(hoverColor, [0, 0, -thickness], 0.5)}
                </>
            )}
        </group>
    );
}

export default PentagonPanel;