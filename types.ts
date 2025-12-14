import React from 'react';

export interface ShapeInput {
    id: string;
    label: string;
}

export interface CalcConfig {
    inputs: ShapeInput[];
    calculate: (vals: Record<string, number>) => { L: number; P: number };
}

export interface ShapeData {
    name: string;
    aliases: string[];
    description: string;
    properties: string[];
    formulas: { L: string; P: string };
    calcConfig?: CalcConfig;
    draw: () => React.ReactNode;
    realWorld: {
        label: string;
        draw: () => React.ReactNode;
    };
}

export interface NodeData {
    id: string;
    type: 'start' | 'decision' | 'result';
    text: string;
    x: string; // percentage string e.g., '50%'
    y: number; // pixels
}

export interface EdgeData {
    from: string;
    to: string;
    label?: string;
}

export type GameMode = 'explore' | 'game' | 'finished';