import React from 'react';
import { Tile } from './Tile';
import type { TileState, DevConfig } from '../types';

interface GridProps {
    gridState: TileState[];
    devConfig: DevConfig;
}

export const Grid: React.FC<GridProps> = ({ gridState, devConfig }) => {
    return (
        <div className="grid grid-cols-5 gap-2 sm:gap-3 aspect-square p-3 bg-brand-dark rounded-xl border border-brand-border shadow-inner">
            {gridState.map((state, index) => (
                <Tile 
                    key={index} 
                    state={state} 
                    index={index}
                    devConfig={devConfig}
                />
            ))}
        </div>
    );
};