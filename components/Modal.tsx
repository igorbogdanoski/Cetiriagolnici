import React, { useState, useEffect } from 'react';
import { NodeData, GameMode } from '../types';
import { shapesData } from '../constants';
import { checkFuzzyMatch, speakText } from '../utils';
import ShapeIcon from './ShapeIcon';
import Calculator from './Calculator';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeData: NodeData | null;
    gameMode: GameMode;
    onGameAnswer: (correct: boolean) => void;
    reducePoints: (amount: number) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, nodeData, gameMode, onGameAnswer, reducePoints }) => {
    if (!isOpen || !nodeData) return null;

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<'guessing' | 'correct' | 'revealed'>('guessing');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [hintVisible, setHintVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    
    const correctData = shapesData[nodeData.id];

    useEffect(() => {
        setInputValue('');
        setStatus('guessing');
        setFeedbackMsg('');
        setHintVisible(false);
        setIsMinimized(false);
    }, [nodeData]);

    useEffect(() => {
        if (isOpen && gameMode !== 'game' && !isMinimized) {
            if (status === 'correct' || status === 'revealed') {
                speakText(correctData.name + ". " + correctData.description);
            }
        }
    }, [status, isOpen, isMinimized, gameMode, correctData]);

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackMsg('');
        const result = checkFuzzyMatch(inputValue, correctData.aliases);
        if (result.match) {
            setStatus('correct');
            if (!result.exact) setFeedbackMsg(`(Прифатено: Мислевте на "${result.correction}"?)`);
            if (gameMode === 'game' && onGameAnswer) setTimeout(() => onGameAnswer(true), 1000);
        } else {
            const container = document.getElementById('modal-card');
            if(container) {
                container.classList.add('animate-shake');
                setTimeout(() => container.classList.remove('animate-shake'), 500);
            }
            if (gameMode !== 'game') alert("Обиди се повторно! Провери го правописот.");
        }
    };

    const useHint = () => {
        setHintVisible(true);
        if (gameMode === 'game' && reducePoints) reducePoints(5);
    };

    const reset = () => {
        setInputValue('');
        setStatus('guessing');
        setFeedbackMsg('');
        onClose();
    };

    const isSolved = status === 'correct' || status === 'revealed';
    
    // If minimized, show small button at bottom right
    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 z-50 animate-popIn">
                <button 
                    onClick={() => setIsMinimized(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 transform transition hover:scale-105"
                >
                    <span>🔼</span> Отвори Прашање
                </button>
            </div>
        );
    }

    // Normal Modal
    const backdropClass = gameMode === 'game' ? "bg-slate-900/80 backdrop-blur-sm" : "bg-slate-900/60 backdrop-blur-sm"; 

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClass} transition-all duration-300`}>
            <div id="modal-card" className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden modal-enter max-h-[95vh] flex flex-col border border-slate-200">
                <div className={`p-6 text-white flex justify-between items-center shrink-0 transition-colors duration-300 ${status === 'correct' ? 'bg-green-500' : (status === 'revealed' ? 'bg-amber-500' : 'bg-indigo-600')}`}>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {isSolved ? correctData.name : "Која фигура е ова?"}
                        {isSolved && <button onClick={() => speakText(correctData.name)} className="bg-white/20 p-1 rounded hover:bg-white/30" title="Слушни">🔊</button>}
                    </h2>
                    <div className="flex items-center gap-2">
                        {/* Minimize Button */}
                        <button 
                            onClick={() => setIsMinimized(true)} 
                            className="bg-white/20 p-2 rounded hover:bg-white/30 font-bold text-lg" 
                            title="Минимизирај за да ја видиш патеката"
                        >
                            ➖
                        </button>
                        {gameMode !== 'game' && <button onClick={reset} className="text-white/80 hover:text-white text-2xl font-bold">&times;</button>}
                    </div>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {!isSolved ? (
                        <div>
                            <p className="text-slate-600 mb-4">
                                Следејќи ја <strong>осветлената патека</strong>, запиши го името на фигурата.
                                <br/><span className="text-xs text-indigo-500 mt-1 block">Совет: Кликни (➖) горе за да ја скриеш картичката.</span>
                            </p>
                            <form onSubmit={checkAnswer} className="space-y-4">
                                <input type="text" className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none text-lg" placeholder="Внеси име тука..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
                                <div className="flex gap-3">
                                    <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Провери</button>
                                    {gameMode !== 'game' && <button type="button" onClick={() => setStatus('revealed')} className="px-4 py-3 text-slate-500 font-medium hover:text-slate-700 underline">Се откажувам</button>}
                                </div>
                            </form>
                            
                            <div className="mt-4 border-t pt-4 text-center">
                                {!hintVisible ? (
                                    <button onClick={useHint} className="text-sm text-amber-600 font-medium hover:text-amber-800 flex items-center justify-center gap-1 mx-auto">
                                        <span>💡</span> Сакам помош {gameMode === 'game' ? '(-5 поени)' : ''}
                                    </button>
                                ) : (
                                    <div className="bg-amber-50 p-3 rounded text-amber-800 text-sm animate-popIn">
                                        <strong>Помош:</strong> {correctData.properties[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-800">
                            {status === 'correct' && (
                                <div className="mb-4 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 flex flex-col">
                                    <div className="font-bold flex items-center gap-2"><span>✓</span> Браво! Точен одговор.</div>
                                    {feedbackMsg && <div className="text-sm mt-1 text-green-700 italic">{feedbackMsg}</div>}
                                    {gameMode === 'game' && <div className="text-xs mt-1 text-green-600 font-bold uppercase tracking-wider">Следна форма за 1 секунда...</div>}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <ShapeIcon shapeId={nodeData.id} isRealWorld={false} />
                                <ShapeIcon shapeId={nodeData.id} isRealWorld={true} />
                            </div>
                            {gameMode !== 'game' && (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-lg">Основни карактеристики:</h3>
                                        <button onClick={() => speakText(correctData.description)} className="text-indigo-500 hover:text-indigo-700">🔊</button>
                                    </div>
                                    <p className="text-slate-600 mb-4 italic text-sm">{correctData.description}</p>
                                    <div className="flex gap-4 mb-4 text-sm text-slate-500 bg-slate-50 p-2 rounded">
                                        <div><strong>L</strong> = {correctData.formulas.L}</div>
                                        <div><strong>P</strong> = {correctData.formulas.P}</div>
                                    </div>
                                    {correctData.calcConfig && <Calculator config={correctData.calcConfig} />}
                                    <h3 className="font-bold text-lg mb-2">Дополнителни својства:</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm mb-4">{correctData.properties.map((prop, idx) => <li key={idx}>{prop}</li>)}</ul>
                                    <button onClick={reset} className="w-full mt-2 bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition">Затвори</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;