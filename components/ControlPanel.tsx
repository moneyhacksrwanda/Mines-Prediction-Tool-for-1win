import React from 'react';

interface ControlPanelProps {
    onPredict: () => void;
    onReset: () => void;
    isPredicted: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    onPredict,
    onReset,
    isPredicted,
}) => {
    return (
        <div className="mt-6">
            <button
                id={isPredicted ? 'resetBtn' : 'predictBtn'}
                onClick={isPredicted ? onReset : onPredict}
                className="w-full px-6 py-4 font-bold text-lg text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-brand-dark-secondary bg-brand-accent-blue hover:bg-blue-500 ring-blue-400 shadow-lg shadow-brand-accent-blue/20"
            >
                {isPredicted ? 'Play Again' : 'Predict Safe Mines'}
            </button>
        </div>
    );
};