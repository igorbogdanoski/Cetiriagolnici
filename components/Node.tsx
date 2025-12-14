import React from 'react';
import { NodeData } from '../types';

interface NodeProps extends NodeData {
    onClick: (node: NodeData) => void;
    isActive: boolean;
    isDimmed: boolean;
}

const Node: React.FC<NodeProps> = (props) => {
    const { type, text, x, y, id, onClick, isActive, isDimmed } = props;
    
    const isDecision = type === 'decision';
    const isStart = type === 'start';
    const isResult = type === 'result';
    
    let baseClasses = "absolute flex items-center justify-center text-center font-medium shadow-md transition-all duration-500 z-10 node-enter";
    let styleClasses = "";
    let stateClasses = "";
    
    if (isActive) stateClasses = "node-active";
    else if (isDimmed) stateClasses = "node-inactive";
    
    if (isStart) styleClasses = "bg-slate-800 text-white rounded-full w-28 py-2 text-sm";
    else if (isDecision) styleClasses = "bg-white border-2 border-amber-300 text-slate-700 rounded-xl w-40 md:w-48 py-3 text-xs md:text-sm hover:scale-105";
    else if (isResult) styleClasses = `bg-indigo-600 text-white border-2 border-indigo-400 rounded-lg w-16 h-16 md:w-20 md:h-20 text-2xl font-bold cursor-pointer hover:bg-indigo-500 hover:scale-110 hover:shadow-lg ring-4 ring-indigo-100 ${isActive ? '' : 'animate-pulse'}`;
    
    return (
        <div 
            id={id} 
            className={`${baseClasses} ${styleClasses} ${stateClasses}`} 
            style={{ left: x, top: y }} 
            onClick={() => isResult && onClick(props)}
        >
            {isResult ? "?" : text}
        </div>
    );
};

export default Node;