import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    platform: string;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

export const Header: React.FC<HeaderProps> = ({ platform, theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="w-full max-w-md flex justify-between items-center text-center p-4">
             <div className="w-12"></div>
            <div>
                 <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-wider uppercase">
                    Mines Predictor
                </h1>
                <p className="font-semibold text-slate-300 flex items-center justify-center gap-2 mt-1">
                    <span className="text-yellow-400 text-lg">⭐</span> CAVEMINES
                </p>
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-brand-dark/50 hover:bg-brand-dark transition-colors duration-200"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        </header>
    );
};