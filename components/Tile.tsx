import React from 'react';
import type { TileState, DevConfig } from '../types';

interface TileProps {
    state: TileState;
    index: number;
    devConfig: DevConfig;
}

export const Tile: React.FC<TileProps> = ({ state, index, devConfig }) => {
    const isRevealed = state !== 'hidden';

    const baseClasses = "aspect-square rounded-lg flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 ease-in-out transform-gpu";
    
    let stateClasses = '';
    let content = null;

    if (isRevealed) {
        stateClasses += ' shadow-tile-revealed ';
        if (state === 'safe') {
            stateClasses += 'bg-green-900/50 border border-green-500';
            content = devConfig.symbolMap.safe;
        } else { // unsafe
            stateClasses += 'bg-red-900/50 border border-red-500';
            content = devConfig.symbolMap.unsafe;
        }
    } else { // hidden
        stateClasses = 'bg-gradient-to-b from-brand-tile-light to-brand-tile border-t-[1px] border-l-[1px] border-brand-tile-light/50 border-b-[1px] border-r-[1px] border-black/20 shadow-tile-hidden cursor-pointer hover:brightness-110 active:brightness-90';
    }
    
    return (
        <div data-idx={devConfig.indexingOffset + index} className={`${baseClasses} ${stateClasses}`}>
           {isRevealed && <span className="animate-pop-in">{content}</span>}
        </div>
    );
};