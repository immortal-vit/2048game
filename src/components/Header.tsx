// src/components/Header.tsx
// Záhlaví aplikace – název, skóre, tlačítko nové hry
import ScoreBoard from "./ScoreBoard";

interface HeaderProps {
    score: number;
    bestScore: number;
    onNewGame: () => void;
}

export default function Header({ score, bestScore, onNewGame }: HeaderProps) {
    return (
        <header className="header">
            <h1 className="title">2048</h1>
            <div className="header-right">
                <ScoreBoard score={score} bestScore={bestScore} />
                <button className="btn-new-game" onClick={onNewGame}>
                    Nová hra
                </button>
            </div>
        </header>
    );
}