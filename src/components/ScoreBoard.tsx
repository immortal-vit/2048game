// src/components/ScoreBoard.tsx
// Dva boxy vedle sebe: SCORE a BEST
import type { ScoreBoardProps } from "../types";

export default function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
    return (
        <div className="scoreboard">
            <div className="scoreboard__box">
                <span className="scoreboard__label">SCORE:</span>
                <span className="scoreboard__value">{String(score).padStart(3, "0")}</span>
            </div>
            <div className="scoreboard__box">
                <span className="scoreboard__label">BEST:</span>
                <span className="scoreboard__value">{String(bestScore).padStart(3, "0")}</span>
            </div>
        </div>
    );
}