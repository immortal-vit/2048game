// =============================================
//  src/types.ts – sdílené TypeScript typy pro 2048
// =============================================

/** Pozice dlaždice na hrací ploše (0-3) */
export interface Position {
    row: number;
    col: number;
}

/** Jedna dlaždice na herní ploše */
export interface Tile {
    id: number;          // unikátní ID pro React key + animace
    value: number;       // 2, 4, 8, 16 ... 2048
    position: Position;
    isNew: boolean;      // právě přidaná → spustí animaci pop-in
    isMerged: boolean;   // právě sloučená → spustí animaci merge
}

/** Herní plocha – 4×4 mřížka, null = prázdné pole */
export type Board = (Tile | null)[][];

/** Směr pohybu dlaždic */
export type Direction = "up" | "down" | "left" | "right";

/** Celkový stav hry */
export interface GameState {
    board: Board;
    tiles: Tile[];       // flat seznam pro snazší vykreslování
    score: number;
    bestScore: number;
    isGameOver: boolean;
    isWon: boolean;      // hráč dosáhl 2048
    hasWonBefore: boolean; // nezobrazovat vítězství víckrát
    moveCount: number;
}

/** Props pro komponentu Tile */
export interface TileProps {
    tile: Tile;
}

/** Props pro komponentu Board */
export interface BoardProps {
    tiles: Tile[];
}

/** Props pro ScoreBoard */
export interface ScoreBoardProps {
    score: number;
    bestScore: number;
}

/** Props pro GameOver modal */
export interface GameOverProps {
    isVisible: boolean;
    isWon: boolean;
    score: number;
    onRestart: () => void;
    onContinue?: () => void; // jen při výhře
}

/** Výsledek jednoho tahu */
export interface MoveResult {
    board: Board;
    tiles: Tile[];
    scoreGained: number;
    moved: boolean;      // false = tah byl neplatný (nic se nepohnulo)
}