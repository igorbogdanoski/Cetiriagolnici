import React from 'react';
import { NodeData } from '../types';

interface ConnectorProps {
    startNode?: NodeData;
    endNode?: NodeData;
    label?: string;
    isActive: boolean;
    isDimmed: boolean;
    containerWidth?: number;
}

const Connector: React.FC<ConnectorProps> = ({ startNode, endNode, label, isActive, isDimmed, containerWidth = 1200 }) => {
    if (!startNode || !endNode) return null;

    const getCoords = (node: NodeData, isStart: boolean) => {
        // Parse percentage from string like "50%"
        const xPercent = parseFloat(node.x);
        const x = (xPercent / 100) * containerWidth;
        const y = node.y;
        
        let height = 0;
        if (node.type === 'start') height = 40; // Approx height of start node
        else if (node.type === 'decision') height = 60; // Approx height of decision node
        else height = 0; 
        
        return { x: x, y: isStart ? y + height : y };
    };

    const start = getCoords(startNode, true);
    const end = getCoords(endNode, false);
    const midY = start.y + (end.y - start.y) / 2;
    
    // Orthogonal routing
    const path = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
    const labelPos = { x: (start.x + end.x) / 2, y: midY };
    
    const strokeColor = isActive ? "#f97316" : "#94a3b8"; 
    const opacity = isDimmed ? 0.2 : 1; 
    const strokeWidth = isActive ? 4 : 2;
    const markerUrl = isActive ? "url(#arrowhead-active)" : "url(#arrowhead)";

    return (
        <g style={{ opacity, transition: 'all 0.5s ease' }}>
            <path 
                d={path} 
                stroke={strokeColor} 
                strokeWidth={strokeWidth} 
                fill="none" 
                markerEnd={markerUrl} 
                className={isActive ? "path-active" : ""} 
            />
            {label && (
                <foreignObject x={labelPos.x - 12} y={labelPos.y - 10} width="24" height="20">
                    <div className={`text-[10px] font-bold text-center border rounded transition-all duration-300 ${isActive ? 'bg-orange-100 text-orange-700 border-orange-300' : (label === 'Да' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200')}`}>
                        {label}
                    </div>
                </foreignObject>
            )}
        </g>
    );
};

export default Connector;