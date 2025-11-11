import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Grid } from './components/Grid';
import { Footer } from './components/Footer';
import { DevConfigPanel } from './components/DevConfigPanel';
import { CogIcon } from './components/icons/CogIcon';
import type { TileState, DevConfig } from './types';
import { cyrb128, mulberry32, fisherYatesShuffle } from './utils/prng';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [seed, setSeed] = useState<string>('');
    const [gridState, setGridState] = useState<TileState[]>(() => Array(25).fill('hidden'));
    const [isPredicted, setIsPredicted] = useState<boolean>(false);
    const [platform] = useState<string>('1win');
    
    const [isDevPanelOpen, setIsDevPanelOpen] = useState<boolean>(false);
    const [devConfig, setDevConfig] = useState<DevConfig>({
        safeCount: 5,
        gridSize: 25,
        indexingOffset: 0,
        symbolMap: {
            safe: '💎',
            unsafe: '💣',
        },
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handlePredict = useCallback(() => {
        let currentSeed = seed;
        if (!currentSeed) {
            currentSeed = Math.random().toString(36).substring(2, 15);
            setSeed(currentSeed); // Update state so the used seed appears in the dev panel
        }

        const hash = cyrb128(currentSeed);
        const prng = mulberry32(hash[0]);
        
        const indices = Array.from({ length: devConfig.gridSize }, (_, i) => i);
        fisherYatesShuffle(indices, prng);

        const safeIndices = new Set(indices.slice(0, devConfig.safeCount));

        const newGridState = Array(devConfig.gridSize).fill('hidden').map((_, index) => {
            return safeIndices.has(index) ? 'safe' : 'unsafe';
        });
        
        setGridState(newGridState);
        setIsPredicted(true);

    }, [seed, devConfig]);

    const handleReset = useCallback(() => {
        setGridState(Array(devConfig.gridSize).fill('hidden'));
        setIsPredicted(false);
    }, [devConfig.gridSize]);
    
    const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(e.target.value);
    };

    return (
        <div className="relative min-h-screen bg-brand-dark dark:bg-black overflow-hidden font-sans">
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
                <main className="w-full max-w-7xl mx-auto flex flex-col items-center">
                    <Header platform={platform} theme={theme} setTheme={setTheme} />

                    <div className="w-full max-w-md bg-brand-dark-secondary rounded-2xl shadow-2xl p-6 sm:p-8 mt-8 text-center border border-brand-border">
                        <Grid gridState={gridState} devConfig={devConfig} />
                        <ControlPanel
                            onPredict={handlePredict}
                            onReset={handleReset}
                            isPredicted={isPredicted}
                        />
                    </div>

                    <Footer />
                </main>
            </div>
            
            <button
                onClick={() => setIsDevPanelOpen(!isDevPanelOpen)}
                className="fixed bottom-4 right-4 z-50 p-3 bg-slate-700/80 backdrop-blur-md rounded-full text-white hover:bg-slate-600/80 transition-colors border border-brand-border"
                aria-label="Open developer settings"
            >
                <CogIcon />
            </button>
            <DevConfigPanel
                isOpen={isDevPanelOpen}
                onClose={() => setIsDevPanelOpen(false)}
                config={devConfig}
                setConfig={setDevConfig}
                seed={seed}
                onSeedChange={handleSeedChange}
            />
        </div>
    );
};

export default App;