import React from 'react';
import { shapesData } from '../constants';

interface ShapeIconProps {
    shapeId: string;
    isRealWorld?: boolean;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ shapeId, isRealWorld = false }) => {
    const shape = shapesData[shapeId];
    if (!shape) return null;
    
    const content = isRealWorld ? shape.realWorld.draw() : shape.draw();
    const bgColor = isRealWorld ? "bg-orange-50 border-orange-200" : "bg-slate-100 border-slate-200";
    const label = isRealWorld ? shape.realWorld.label : "Геометриска Форма";
    
    return (
        <div className={`w-full h-40 ${bgColor} rounded-lg flex flex-col items-center justify-center mb-0 border shadow-inner relative overflow-hidden transition-all duration-500`}>
             {!isRealWorld && (
                 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #e2e8f0 25%, #e2e8f0 26%, transparent 27%, transparent 74%, #e2e8f0 75%, #e2e8f0 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #e2e8f0 25%, #e2e8f0 26%, transparent 27%, transparent 74%, #e2e8f0 75%, #e2e8f0 76%, transparent 77%, transparent)', backgroundSize: '20px 20px' }}></div>
             )}
            <svg width="200" height="150" viewBox="0 0 200 150" className="z-10 drop-shadow-md">{content}</svg>
            <span className="absolute bottom-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
    );
};

export default ShapeIcon;