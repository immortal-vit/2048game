// src/utils/gameLogic.ts
// Čistá funkce herní logiky (bez side efektů) – snadno testovatelné
import type { Board, Direction, MoveResult } from "../types";

/** Vytvoří prázdnou 4×4 plochu */
export function createEmptyBoard(): Board {
    return Array.from({ length: 4 }, () => Array(4).fill(null));
}

/** Přidá náhodnou dlaždici (90 % = 2, 10 % = 4) na volné místo */
export function addRandomTile(_board: Board): Board {
    // TODO
    return _board;
}

/** Provede pohyb v daném směru, vrátí výsledek */
export function performMove(_board: Board, _direction: Direction): MoveResult {
    // TODO
    return { board: _board, tiles: [], scoreGained: 0, moved: false };
}

/** Zkontroluje, zda je hra u konce (žádný platný tah) */
export function isGameOver(_board: Board): boolean {
    // TODO
    return false;
}

/** Zkontroluje, zda plocha obsahuje dlaždici 2048 */
export function hasWon(_board: Board): boolean {
    // TODO
    return false;
}