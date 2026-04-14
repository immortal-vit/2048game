// src/hooks/useGame.ts
import { useState, useEffect, useCallback } from "react";
import type { GameState, Direction } from "../types";
import {
    createEmptyBoard,
    addRandomTile,
    boardToTiles,
    performMove,
    isGameOver,
    hasWon,
} from "../utils/gameLogic";

const BEST_SCORE_KEY = "2048_bestScore";
const GAME_STATE_KEY = "2048_gameState";

// Bezpečné čtení z localStorage – necrashne v private mode
function lsGet(key: string): string | null {
    try { return localStorage.getItem(key); }
    catch { return null; }
}

function lsSet(key: string, value: string): void {
    try { localStorage.setItem(key, value); }
    catch { /* private mode – tiše ignorujeme */ }
}

function createInitialState(bestScore: number): GameState {
    let board = createEmptyBoard();
    board = addRandomTile(board);
    board = addRandomTile(board);
    return {
        board,
        tiles: boardToTiles(board),
        score: 0,
        bestScore,
        isGameOver: false,
        isWon: false,
        hasWonBefore: false,
        moveCount: 0,
    };
}

function loadSavedState(): GameState | null {
    try {
        const raw = lsGet(GAME_STATE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as GameState;
        // Základní validace – musí mít board 4×4
        if (!parsed.board || parsed.board.length !== 4) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function useGame() {
    const [state, setState] = useState<GameState>(() => {
        const saved = loadSavedState();
        if (saved) return saved;
        const best = Number(lsGet(BEST_SCORE_KEY) ?? 0);
        return createInitialState(best);
    });

    // Ukládej stav při každé změně
    useEffect(() => {
        lsSet(GAME_STATE_KEY, JSON.stringify(state));
        lsSet(BEST_SCORE_KEY, String(state.bestScore));
    }, [state]);

    const newGame = useCallback(() => {
        setState(prev => createInitialState(prev.bestScore));
    }, []);

    const move = useCallback((direction: Direction) => {
        setState(prev => {
            if (prev.isGameOver) return prev;
            if (prev.isWon && !prev.hasWonBefore) return prev;

            const result = performMove(prev.board, direction);
            if (!result.moved) return prev;

            const newScore = prev.score + result.scoreGained;
            const newBest = Math.max(prev.bestScore, newScore);

            const boardWithNew = addRandomTile(result.board);
            const tiles = boardToTiles(boardWithNew);

            const won = !prev.hasWonBefore && hasWon(boardWithNew);
            const over = isGameOver(boardWithNew);

            return {
                board: boardWithNew,
                tiles,
                score: newScore,
                bestScore: newBest,
                isGameOver: over,
                isWon: won || prev.isWon,
                hasWonBefore: prev.hasWonBefore,
                moveCount: prev.moveCount + 1,
            };
        });
    }, []);

    const continueAfterWin = useCallback(() => {
        setState(prev => ({ ...prev, hasWonBefore: true, isWon: false }));
    }, []);

    // Klávesnice
    useEffect(() => {
        const keyMap: Record<string, Direction> = {
            ArrowUp: "up", ArrowDown: "down",
            ArrowLeft: "left", ArrowRight: "right",
        };
        function onKey(e: KeyboardEvent) {
            const dir = keyMap[e.key];
            if (!dir) return;
            e.preventDefault();
            move(dir);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [move]);

    // Swipe
    useEffect(() => {
        let startX = 0, startY = 0;
        function onTouchStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        function onTouchEnd(e: TouchEvent) {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
            if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
            else move(dy > 0 ? "down" : "up");
        }
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [move]);

    return { state, newGame, move, continueAfterWin };
}