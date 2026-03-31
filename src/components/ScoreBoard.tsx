// src/components/ScoreBoard.tsx
// Zobrazuje aktuální skóre a rekord (best score)
import type { ScoreBoardProps } from "../types";

export default function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
    return (
        <div className="scoreboard">
            <div className="score-box">
                <span className="score-label">SKÓRE</span>
                <span className="score-value">{score}</span>
            </div>
            <div className="score-box">
                <span className="score-label">REKORD</span>
                <span className="score-value">{bestScore}</span>
            </div>
        </div>
    );
}