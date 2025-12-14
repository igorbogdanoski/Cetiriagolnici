import React, { useState, useEffect } from 'react';
import { CalcConfig } from '../types';

interface CalculatorProps {
    config: CalcConfig;
}

const Calculator: React.FC<CalculatorProps> = ({ config }) => {
    const [values, setValues] = useState<Record<string, number>>({});
    const [results, setResults] = useState({ L: 0, P: 0 });

    const handleChange = (id: string, val: string) => {
        const numVal = parseFloat(val);
        const newValues = { ...values, [id]: isNaN(numVal) ? 0 : numVal };
        setValues(newValues);
    };

    useEffect(() => {
        setResults(config.calculate(values));
    }, [values, config]);

    const formatResult = (num: number) => Number.isInteger(num) ? num : num.toFixed(2);

    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-indigo-900 mb-3 border-b border-indigo-200 pb-1 flex justify-between items-center">
                <span>🧮 Калкулатор</span>
                <span className="text-xs font-normal text-indigo-500">Внеси вредности</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {config.inputs.map(input => (
                    <div key={input.id} className="flex flex-col">
                        <label className="text-xs text-indigo-600 mb-1 font-semibold">{input.label}</label>
                        <input 
                            type="number" 
                            min="0" 
                            className="px-2 py-1 border border-indigo-200 rounded text-sm focus:outline-none focus:border-indigo-500" 
                            placeholder="0" 
                            onChange={(e) => handleChange(input.id, e.target.value)} 
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-lg border border-indigo-100">
                <div className="text-center">
                    <span className="block text-xs font-semibold text-indigo-400 uppercase">Периметар (L)</span>
                    <span className="text-xl font-mono font-bold text-indigo-600 transition-all duration-300">
                        {formatResult(results.L)}
                    </span>
                </div>
                <div className="text-center border-l border-indigo-100">
                    <span className="block text-xs font-semibold text-indigo-400 uppercase">Плоштина (P)</span>
                    <span className="text-xl font-mono font-bold text-indigo-600 transition-all duration-300">
                        {formatResult(results.P)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Calculator;