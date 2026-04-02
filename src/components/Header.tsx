// src/components/Header.tsx
// Záhlaví: nadpis "2048" + SCORE + BEST + tlačítko NEW GAME
import ScoreBoard from "./ScoreBoard";

interface HeaderProps {
    score: number;
    bestScore: number;
    onNewGame: () => void;
}

export default function Header({ score, bestScore, onNewGame }: HeaderProps) {
    return (
        <header className="header">
            <h1 className="header__title">2048</h1>
            <div className="header__controls">
                <ScoreBoard score={score} bestScore={bestScore} />
                <button className="header__btn-new-game" onClick={onNewGame}>
                    NEW GAME
                </button>
            </div>
        </header>
    );
}