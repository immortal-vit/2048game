import type { CSSProperties } from "react";
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
    const { state, newGame, continueAfterWin } = useGame();

    const showResultScreen = state.isGameOver || (state.isWon && !state.hasWonBefore);
    const isWinScreen = state.isWon && !state.hasWonBefore;

    return (
        <div className="page" style={themeVariables}>
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

                        <div className="board-panel">
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
