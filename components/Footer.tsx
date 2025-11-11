import React from 'react';
import { TelegramIcon } from './icons/TelegramIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full max-w-md mt-8 text-center text-slate-400">
            <div className="flex justify-center gap-4 mb-4">
                <a 
                    href="#" 
                    id="joinTelegram"
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-sky-500/80 rounded-lg shadow-lg hover:scale-105 hover:bg-sky-500 transition-all duration-300"
                >
                    <TelegramIcon /> Join Telegram
                </a>
                <a 
                    href="#"
                    id="joinYouTube" 
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-red-600/80 rounded-lg shadow-lg hover:scale-105 hover:bg-red-600 transition-all duration-300"
                >
                    <YouTubeIcon /> Join YouTube
                </a>
            </div>
            <p className="text-sm">⚡ Created by MONEY HACKS RWANDA</p>
        </footer>
    );
};