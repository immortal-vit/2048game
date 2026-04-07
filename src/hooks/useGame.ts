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

export function useGame() {
    const [state, setState] = useState<GameState>(() => {
        const best = Number(localStorage.getItem(BEST_SCORE_KEY) ?? 0);
        return createInitialState(best);
    });

    const newGame = useCallback(() => {
        setState(prev => createInitialState(prev.bestScore));
    }, []);

    const move = useCallback((direction: Direction) => {
        setState(prev => {
            if (prev.isGameOver) return prev;
            if (prev.isWon && !prev.hasWonBefore) return prev; // čeká na volbu hráče

            const result = performMove(prev.board, direction);
            if (!result.moved) return prev;

            const newScore = prev.score + result.scoreGained;
            const newBest = Math.max(prev.bestScore, newScore);
            localStorage.setItem(BEST_SCORE_KEY, String(newBest));

            // přidej novou dlaždici
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
            ArrowUp: "up",
            ArrowDown: "down",
            ArrowLeft: "left",
            ArrowRight: "right",
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

    // Swipe (touch)
    useEffect(() => {
        let startX = 0;
        let startY = 0;

        function onTouchStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        function onTouchEnd(e: TouchEvent) {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

            if (Math.abs(dx) > Math.abs(dy)) {
                move(dx > 0 ? "right" : "left");
            } else {
                move(dy > 0 ? "down" : "up");
            }
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