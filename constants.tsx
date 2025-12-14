import React from 'react';
import { ShapeData, NodeData, EdgeData } from './types';

export const shapesData: Record<string, ShapeData> = {
    'res_h': {
        name: 'Рамнокрак Трапез',
        aliases: ['рамнокрак трапез', 'рамнокрак'],
        description: 'Трапез кај кој краците се еднакви.',
        properties: ['Аглите при основата се еднакви.', 'Дијагоналите се со еднаква должина.', 'Има една оска на симетрија.'],
        formulas: { L: 'a + b + 2c', P: '((a + b) / 2) · h' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Основа a' }, { id: 'b', label: 'Основа b' }, { id: 'c', label: 'Крак c' }, { id: 'h', label: 'Висина h' }],
            calculate: (vals) => ({ L: (vals.a || 0) + (vals.b || 0) + 2 * (vals.c || 0), P: ((vals.a || 0) + (vals.b || 0)) / 2 * (vals.h || 0) })
        },
        draw: () => <polygon points="30,80 170,80 140,20 60,20" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Саксија за цвеќе',
            draw: () => (<g><path d="M60 110 L140 110 L160 40 L40 40 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" /><rect x="35" y="25" width="130" height="15" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="2" /><path d="M70 25 Q75 10 65 0 M100 25 Q100 5 100 0 M130 25 Q125 10 135 0" stroke="#166534" strokeWidth="3" fill="none" /><circle cx="65" cy="0" r="5" fill="#f472b6" /><circle cx="100" cy="0" r="5" fill="#f472b6" /><circle cx="135" cy="0" r="5" fill="#f472b6" /></g>)
        }
    },
    'res_i': {
        name: 'Трапез',
        aliases: ['трапез', 'трапезоид'],
        description: 'Четириаголник со еден пар паралелни страни.',
        properties: ['Паралелните страни се викаат основи.', 'Другите две страни се викаат краци.', 'Збирот на аглите што лежат на ист крак е 180°.'],
        formulas: { L: 'a + b + c + d', P: '((a + b) / 2) · h' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Основа a' }, { id: 'b', label: 'Основа b' }, { id: 'c', label: 'Крак c' }, { id: 'd', label: 'Крак d' }, { id: 'h', label: 'Висина h' }],
            calculate: (vals) => ({ L: (vals.a || 0) + (vals.b || 0) + (vals.c || 0) + (vals.d || 0), P: ((vals.a || 0) + (vals.b || 0)) / 2 * (vals.h || 0) })
        },
        draw: () => <polygon points="20,80 180,80 140,20 60,20" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Златна прачка',
            draw: () => (<g><polygon points="40,90 160,90 140,40 60,40" fill="#fbbf24" stroke="#b45309" strokeWidth="2" /><path d="M60 40 L140 40 L150 30 L70 30 Z" fill="#fcd34d" stroke="#b45309" strokeWidth="1" /><path d="M160 90 L140 40 L150 30 L170 80 Z" fill="#d97706" stroke="#b45309" strokeWidth="1" /><text x="100" y="75" fontSize="16" fontWeight="bold" fill="#92400e" textAnchor="middle" style={{ fontFamily: 'serif' }}>999.9</text></g>)
        }
    },
    'res_j': {
        name: 'Квадрат',
        aliases: ['квадрат'],
        description: 'Правилен четириаголник со сите страни и агли еднакви.',
        properties: ['Сите агли се 90°.', 'Сите страни се еднакви.', 'Дијагоналите се еднакви и се преполовуваат.'],
        formulas: { L: '4 · a', P: 'a²' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Страна a' }],
            calculate: (vals) => ({ L: 4 * (vals.a || 0), P: (vals.a || 0) ** 2 })
        },
        draw: () => <rect x="50" y="25" width="100" height="100" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Прозорец',
            draw: () => (<g><rect x="50" y="25" width="100" height="100" fill="#bae6fd" stroke="#0369a1" strokeWidth="6" /><line x1="100" y1="25" x2="100" y2="125" stroke="#0369a1" strokeWidth="4" /><line x1="50" y1="75" x2="150" y2="75" stroke="#0369a1" strokeWidth="4" /><rect x="45" y="125" width="110" height="8" fill="#e2e8f0" stroke="#64748b" /></g>)
        }
    },
    'res_k': {
        name: 'Правоаголник',
        aliases: ['правоаголник'],
        description: 'Паралелограм со сите агли по 90°.',
        properties: ['Дијагоналите се со еднаква должина.', 'Дијагоналите се преполовуваат.', 'Спротивните страни се еднакви.'],
        formulas: { L: '2 · (a + b)', P: 'a · b' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Страна a' }, { id: 'b', label: 'Страна b' }],
            calculate: (vals) => ({ L: 2 * ((vals.a || 0) + (vals.b || 0)), P: (vals.a || 0) * (vals.b || 0) })
        },
        draw: () => <rect x="30" y="40" width="140" height="70" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Смартфон / Таблет',
            draw: () => (<g><rect x="65" y="15" width="70" height="120" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" /><rect x="69" y="25" width="62" height="100" fill="#38bdf8" /><circle cx="100" cy="128" r="3" fill="#475569" /><rect x="90" y="18" width="20" height="2" rx="1" fill="#475569" /><rect x="75" y="35" width="10" height="10" rx="2" fill="#fff" opacity="0.5" /><rect x="90" y="35" width="10" height="10" rx="2" fill="#fff" opacity="0.5" /><rect x="105" y="35" width="10" height="10" rx="2" fill="#fff" opacity="0.5" /></g>)
        }
    },
    'res_l': {
        name: 'Делтоид',
        aliases: ['делтоид'],
        description: 'Четириаголник со два пара соседни еднакви страни.',
        properties: ['Дијагоналите се сечат под прав агол.', 'Едната дијагонала ја преполовува другата.', 'Аглите меѓу нееднаквите страни се еднакви.'],
        formulas: { L: '2 · (a + b)', P: '(d₁ · d₂) / 2' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Страна a' }, { id: 'b', label: 'Страна b' }, { id: 'd1', label: 'd₁' }, { id: 'd2', label: 'd₂' }],
            calculate: (vals) => ({ L: 2 * ((vals.a || 0) + (vals.b || 0)), P: ((vals.d1 || 0) * (vals.d2 || 0)) / 2 })
        },
        draw: () => <polygon points="100,10 160,60 100,140 40,60" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Змеј (Играчка)',
            draw: () => (<g><path d="M100 20 L150 60 L100 130 L50 60 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" /><line x1="100" y1="20" x2="100" y2="130" stroke="#fca5a5" strokeWidth="1" /><line x1="50" y1="60" x2="150" y2="60" stroke="#fca5a5" strokeWidth="1" /><path d="M100 130 Q110 150 100 160 Q90 170 110 180" stroke="#7f1d1d" strokeWidth="2" fill="none" /></g>)
        }
    },
    'res_m': {
        name: 'Ромб',
        aliases: ['ромб'],
        description: 'Паралелограм со сите страни еднакви.',
        properties: ['Дијагоналите се сечат под прав агол.', 'Дијагоналите се симетрали на аглите.', 'Висините се еднакви.'],
        formulas: { L: '4 · a', P: 'a · h' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Страна a' }, { id: 'h', label: 'Висина h' }],
            calculate: (vals) => ({ L: 4 * (vals.a || 0), P: (vals.a || 0) * (vals.h || 0) })
        },
        draw: () => <polygon points="100,10 160,75 100,140 40,75" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Сообраќаен знак',
            draw: () => (<g><rect x="98" y="100" width="4" height="60" fill="#57534e" /><path d="M100 10 L150 60 L100 110 L50 60 Z" fill="#facc15" stroke="#1c1917" strokeWidth="2" /><path d="M100 20 L140 60 L100 100 L60 60 Z" fill="none" stroke="#1c1917" strokeWidth="2" /></g>)
        }
    },
    'res_n': {
        name: 'Паралелограм',
        aliases: ['паралелограм'],
        description: 'Четириаголник со два пара паралелни страни.',
        properties: ['Спротивните страни се еднакви.', 'Спротивните агли се еднакви.', 'Дијагоналите се преполовуваат.'],
        formulas: { L: '2 · (a + b)', P: 'a · h' },
        calcConfig: {
            inputs: [{ id: 'a', label: 'Страна a' }, { id: 'b', label: 'Страна b' }, { id: 'h', label: 'Висина h' }],
            calculate: (vals) => ({ L: 2 * ((vals.a || 0) + (vals.b || 0)), P: (vals.a || 0) * (vals.h || 0) })
        },
        draw: () => <polygon points="40,90 160,90 190,30 70,30" fill="#6366f1" stroke="white" strokeWidth="2" />,
        realWorld: {
            label: 'Гума за бришење',
            draw: () => (<g><path d="M50 100 L150 100 L170 50 L70 50 Z" fill="#f87171" stroke="#b91c1c" strokeWidth="2" /><path d="M70 50 L170 50 L180 40 L80 40 Z" fill="#fca5a5" stroke="#b91c1c" strokeWidth="1" /><path d="M170 50 L150 100 L160 90 L180 40 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" /><text x="110" y="85" fontSize="14" fontWeight="bold" fill="#7f1d1d" textAnchor="middle" transform="skewX(-20)">ERASER</text></g>)
        }
    }
};

export const nodes: NodeData[] = [
    { id: 'start', type: 'start', text: 'СТАРТ', x: '50%', y: 20 },
    { id: 'q1', type: 'decision', text: 'Само еден пар паралелни страни?', x: '50%', y: 100 },
    { id: 'q2', type: 'decision', text: 'Две страни со иста должина?', x: '25%', y: 220 },
    { id: 'q3', type: 'decision', text: 'Сите агли се 90°?', x: '75%', y: 220 },
    { id: 'res_h', type: 'result', text: '', x: '15%', y: 350 },
    { id: 'res_i', type: 'result', text: '', x: '35%', y: 350 },
    { id: 'q4', type: 'decision', text: 'Сите страни се со иста должина?', x: '60%', y: 350 },
    { id: 'q5', type: 'decision', text: 'Два пара еднакви агли?', x: '88%', y: 350 },
    { id: 'res_j', type: 'result', text: '', x: '50%', y: 500 },
    { id: 'res_k', type: 'result', text: '', x: '70%', y: 500 },
    { id: 'res_l', type: 'result', text: '', x: '95%', y: 500 },
    { id: 'q6', type: 'decision', text: 'Сите страни се со иста должина?', x: '82%', y: 500 },
    { id: 'res_m', type: 'result', text: '', x: '75%', y: 650 },
    { id: 'res_n', type: 'result', text: '', x: '90%', y: 650 },
];

export const edges: EdgeData[] = [
    { from: 'start', to: 'q1' }, { from: 'q1', to: 'q2', label: 'Да' }, { from: 'q1', to: 'q3', label: 'Не' },
    { from: 'q2', to: 'res_h', label: 'Да' }, { from: 'q2', to: 'res_i', label: 'Не' },
    { from: 'q3', to: 'q4', label: 'Да' }, { from: 'q3', to: 'q5', label: 'Не' },
    { from: 'q4', to: 'res_j', label: 'Да' }, { from: 'q4', to: 'res_k', label: 'Не' },
    { from: 'q5', to: 'q6', label: 'Да' }, { from: 'q5', to: 'res_l', label: 'Не' },
    { from: 'q6', to: 'res_m', label: 'Да' }, { from: 'q6', to: 'res_n', label: 'Не' },
];

export const resultIds = ['res_h', 'res_i', 'res_j', 'res_k', 'res_l', 'res_m', 'res_n'];

export const nodePaths: Record<string, string[]> = {
    'res_h': ['start', 'q1', 'q2', 'res_h'],
    'res_i': ['start', 'q1', 'q2', 'res_i'],
    'res_j': ['start', 'q1', 'q3', 'q4', 'res_j'],
    'res_k': ['start', 'q1', 'q3', 'q4', 'res_k'],
    'res_l': ['start', 'q1', 'q3', 'q5', 'res_l'],
    'res_m': ['start', 'q1', 'q3', 'q5', 'q6', 'res_m'],
    'res_n': ['start', 'q1', 'q3', 'q5', 'q6', 'res_n']
};