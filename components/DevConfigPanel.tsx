import React from 'react';
import type { DevConfig } from '../types';

interface DevConfigPanelProps {
    isOpen: boolean;
    onClose: () => void;
    config: DevConfig;
    setConfig: React.Dispatch<React.SetStateAction<DevConfig>>;
    seed: string;
    onSeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DevConfigPanel: React.FC<DevConfigPanelProps> = ({ isOpen, onClose, config, setConfig, seed, onSeedChange }) => {
    if (!isOpen) return null;
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const [key, subkey] = name.split('.');
        
        if (subkey) {
             setConfig(prevConfig => ({
                ...prevConfig,
                [key]: {
                    ...(prevConfig as any)[key],
                    [subkey]: value,
                }
            }));
        } else {
            setConfig(prevConfig => ({
                ...prevConfig,
                [name]: !isNaN(Number(value)) ? Number(value) : value,
            }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center" onClick={onClose}>
            <div 
                className="bg-slate-800 border border-indigo-500 rounded-lg shadow-2xl p-6 w-full max-w-sm text-white relative animate-pop-in" 
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                <h3 className="text-lg font-bold mb-4 text-indigo-300">Developer Configuration</h3>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="seedInput" className="block text-sm font-medium text-gray-300">Seed</label>
                        <input
                            id="seedInput"
                            type="text"
                            name="seed"
                            value={seed}
                            onChange={onSeedChange}
                            placeholder="Leave blank for random seed"
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="safeCount" className="block text-sm font-medium text-gray-300">Safe Tiles Count</label>
                        <input type="number" name="safeCount" id="safeCount" value={config.safeCount} onChange={handleInputChange} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="indexingOffset" className="block text-sm font-medium text-gray-300">Indexing Offset (0 or 1)</label>
                        <input type="number" name="indexingOffset" id="indexingOffset" value={config.indexingOffset} onChange={handleInputChange} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="safeSymbol" className="block text-sm font-medium text-gray-300">Safe Symbol</label>
                        <input type="text" name="symbolMap.safe" id="safeSymbol" value={config.symbolMap.safe} onChange={handleInputChange} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="unsafeSymbol" className="block text-sm font-medium text-gray-300">Unsafe Symbol</label>
                        <input type="text" name="symbolMap.unsafe" id="unsafeSymbol" value={config.symbolMap.unsafe} onChange={handleInputChange} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};