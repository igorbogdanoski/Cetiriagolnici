import React, { useState, useEffect, useRef } from 'react';
import { nodes, edges, nodePaths, resultIds } from './constants';
import { NodeData, GameMode } from './types';
import Node from './components/Node';
import Connector from './components/Connector';
import Modal from './components/Modal';

const App = () => {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
    const [activePath, setActivePath] = useState<string[]>([]);
    
    const [gameMode, setGameMode] = useState<GameMode>('explore'); 
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameTarget, setGameTarget] = useState<string | null>(null);
    
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('geo_highscore');
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    const getNode = (id: string) => nodes.find(n => n.id === id);

    const handleNodeClick = (node: NodeData) => {
        if (gameMode === 'game') {
            if (node.id === gameTarget) setSelectedNode(node);
        } else {
            setSelectedNode(node);
        }
    };

    useEffect(() => {
        if (selectedNode) {
            setActivePath(nodePaths[selectedNode.id] || []);
        } else if (gameMode === 'game' && gameTarget) {
            setActivePath(nodePaths[gameTarget] || []);
        } else {
            setActivePath([]);
        }
    }, [selectedNode, gameTarget, gameMode]);

    const nextRound = () => {
        setSelectedNode(null);
        const randomId = resultIds[Math.floor(Math.random() * resultIds.length)];
        setGameTarget(randomId);
    };

    const startGame = () => {
        setGameMode('game');
        setScore(0);
        setTimeLeft(60);
        nextRound();
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setGameMode('finished');
                    setSelectedNode(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle high score updates when game finishes
    useEffect(() => {
        if (gameMode === 'finished') {
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('geo_highscore', score.toString());
            }
        }
    }, [gameMode, score, highScore]);

    const handleGameAnswer = () => {
        setScore(s => s + 10);
        nextRound();
    };

    const reducePoints = (amount: number) => {
        setScore(s => Math.max(0, s - amount));
    };

    const exitGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameMode('explore');
        setGameTarget(null);
        setSelectedNode(null);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
                <div className="bg-white p-4 shadow-sm z-20 flex justify-between items-center border-b border-slate-200">
                <div>
                    <h1 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                        Погоди го четириаголникот
                        {gameMode === 'explore' && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">🏆 Рекорд: {highScore}</span>}
                    </h1>
                    <p className="text-sm text-slate-500 hidden md:block">
                        {gameMode === 'explore' ? "Кликни на прашалниците (?) за да учиш" : "Следи ја патеката и погоди ја формата!"}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {gameMode === 'game' && (
                        <div className="flex gap-4 font-mono font-bold text-lg">
                            <div className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded">Поени: <span className="score-pop inline-block">{score}</span></div>
                            <div className={`${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-slate-600'} bg-slate-100 px-3 py-1 rounded`}>⏳ {timeLeft}s</div>
                        </div>
                    )}
                    {gameMode === 'explore' && (
                        <button onClick={startGame} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
                            <span>🎮</span> Започни Предизвик
                        </button>
                    )}
                    {(gameMode === 'game' || gameMode === 'finished') && (
                        <button onClick={exitGame} className="text-slate-400 hover:text-slate-600 font-medium">Излез</button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-auto p-8 relative" id="scroll-container">
                {gameMode === 'finished' && (
                    <div className="absolute inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full animate-popIn">
                            <div className="text-6xl mb-4">🏆</div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Крај на играта!</h2>
                            <p className="text-slate-500 mb-2">Вашиот резултат:</p>
                            <div className="text-6xl font-bold text-indigo-600 mb-4">{score}</div>
                            {score >= highScore && score > 0 && <div className="text-amber-500 font-bold mb-6 badge-unlock">🎉 НОВ РЕКОРД! 🎉</div>}
                            <button onClick={startGame} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg mb-3">Играј повторно</button>
                            <button onClick={exitGame} className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition">Назад кон учење</button>
                        </div>
                    </div>
                )}

                <div id="diagram-canvas" className="relative mx-auto bg-white rounded-xl shadow-lg border border-slate-200 transition-colors duration-500" style={{ width: '1200px', height: '800px', backgroundColor: selectedNode ? '#f8fafc' : 'white' }}>
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" /></marker>
                            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#f97316" /></marker>
                        </defs>
                        {edges.map((edge, i) => {
                            const isActive = activePath.includes(edge.from) && activePath.includes(edge.to);
                            const isDimmed = activePath.length > 0 && !isActive;
                            const sNode = getNode(edge.from);
                            const eNode = getNode(edge.to);
                            return <Connector key={i} startNode={sNode} endNode={eNode} label={edge.label} isActive={isActive} isDimmed={isDimmed} />
                        })}
                    </svg>
                    {nodes.map(node => {
                        const isActive = activePath.includes(node.id);
                        const isDimmed = activePath.length > 0 && !isActive;
                        return <Node key={node.id} {...node} isActive={isActive} isDimmed={isDimmed} onClick={handleNodeClick} />;
                    })}
                </div>
            </div>

            <Modal 
                isOpen={!!selectedNode} 
                nodeData={selectedNode} 
                gameMode={gameMode}
                onGameAnswer={handleGameAnswer}
                reducePoints={reducePoints}
                onClose={() => setSelectedNode(null)} 
            />
        </div>
    );
};

export default App;