// src/components/GameOver.tsx
// Modální okno – zobrazí se při výhře nebo prohře
import type { GameOverProps } from "../types";

export default function GameOver({ isVisible, isWon, score, onRestart, onContinue }: GameOverProps) {
    if (!isVisible) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <h2>{isWon ? "Vyhrál jsi! 🎉" : "Hra skončila!"}</h2>
                <p>Skóre: <strong>{score}</strong></p>

                {isWon && onContinue && (
                    <button onClick={onContinue}>Hrát dál</button>
                )}
                <button onClick={onRestart}>Nová hra</button>
            </div>
        </div>
    );
}