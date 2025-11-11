
export type TileState = 'hidden' | 'safe' | 'unsafe';

export interface DevConfig {
    safeCount: number;
    gridSize: number;
    indexingOffset: number;
    symbolMap: {
        safe: string;
        unsafe: string;
    };
}
