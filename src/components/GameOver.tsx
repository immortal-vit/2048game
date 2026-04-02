// src/components/GameOver.tsx
// Obrazovka 2 z wireframu: overlay s GAMEOVER / výhrou
import type { GameOverProps } from "../types";

export default function GameOver({ isVisible, isWon, score, onRestart, onContinue }: GameOverProps) {
    if (!isVisible) return null;

    return (
        <div className="gameover-overlay">
            <div className="gameover">
                <h2 className="gameover__title">
                    {isWon ? "YOU WIN! 🎉" : "GAME OVER"}
                </h2>
                <p className="gameover__score">
                    YOUR SCORE: <strong>{String(score).padStart(3, "0")}</strong>
                </p>
                {isWon && onContinue && (
                    <button className="gameover__btn gameover__btn--continue" onClick={onContinue}>
                        KEEP GOING
                    </button>
                )}
                <button className="gameover__btn gameover__btn--new" onClick={onRestart}>
                    NEW GAME
                </button>
            </div>
        </div>
    );
}