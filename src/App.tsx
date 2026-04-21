import { useRef } from "react";
import type { CSSProperties, TouchEvent as ReactTouchEvent } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import { useGame } from "./hooks/useGame";
import { COLORS, TILE_COLORS } from "./theme";
import "./App.css";

const themeVariables = {
    "--color-bg": COLORS.background,
    "--color-board": COLORS.gameBoard,
    "--color-cell-empty": COLORS.emptyCell,
    "--color-text": COLORS.textPrimary,
    "--color-text-muted": COLORS.textSecondary,
    "--color-score-box": COLORS.scoreBox,
    ...Object.fromEntries(
        Object.entries(TILE_COLORS).map(([value, color]) => [`--tile-${value}`, color]),
    ),
} as CSSProperties;

export default function App() {
    const { state, newGame, continueAfterWin, move } = useGame();
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const showResultScreen = state.isGameOver || (state.isWon && !state.hasWonBefore);
    const isWinScreen = state.isWon && !state.hasWonBefore;

    function blockPageTouch(event: ReactTouchEvent<HTMLElement>) {
        event.stopPropagation();
    }

    function handleBoardTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
        event.stopPropagation();
        const touch = event.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleBoardTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    function handleBoardTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
        event.stopPropagation();

        const start = touchStartRef.current;
        touchStartRef.current = null;
        if (!start) return;

        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;

        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

        if (Math.abs(dx) > Math.abs(dy)) {
            move(dx > 0 ? "right" : "left");
        } else {
            move(dy > 0 ? "down" : "up");
        }
    }

    return (
        <div
            className="page"
            style={themeVariables}
            onTouchStart={blockPageTouch}
            onTouchMove={blockPageTouch}
            onTouchEnd={blockPageTouch}
        >
            <main className="game">
                {showResultScreen ? (
                    <section className="result-screen" aria-live="polite">
                        <h1 className="result-brand">2048</h1>

                        <div className="result-text">
                            <h2 className="result-title">
                                {isWinScreen ? "YOU WIN!" : "GAMEOVER"}
                            </h2>
                            <div className="result-stats">
                                <p className="result-score">
                                    YOUR SCORE: <strong>{String(state.score).padStart(3, "0")}</strong>
                                </p>
                                <p className="result-score">
                                    BEST SCORE: <strong>{String(state.bestScore).padStart(3, "0")}</strong>
                                </p>
                            </div>
                        </div>

                        <div className="board-panel result-board">
                            <div className="board-frame">
                                <Board tiles={state.tiles} />
                            </div>
                        </div>

                        <div className="result-buttons">
                            {isWinScreen && (
                                <button
                                    type="button"
                                    className="gameover__btn gameover__btn--continue"
                                    onClick={continueAfterWin}
                                >
                                    KEEP GOING
                                </button>
                            )}
                            <button
                                type="button"
                                className="header__btn-new-game result-button"
                                onClick={newGame}
                            >
                                NEW GAME
                            </button>
                        </div>
                    </section>
                ) : (
                    <section className="play-screen">
                        <Header
                            score={state.score}
                            bestScore={state.bestScore}
                            onNewGame={newGame}
                        />

                        <div
                            className="board-panel swipe-board"
                            onTouchStart={handleBoardTouchStart}
                            onTouchMove={handleBoardTouchMove}
                            onTouchEnd={handleBoardTouchEnd}
                        >
                            <div className="board-frame">
                                <Board tiles={state.tiles} />
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
