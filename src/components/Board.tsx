// src/components/Board.tsx
import type { BoardProps } from "../types";
import Tile from "./Tile";

export default function Board({ tiles }: BoardProps) {
    return (
        <div className="board">
            {}
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="board__cell" />
            ))}
            {}
            {tiles.map(tile => (
                <Tile key={tile.id} tile={tile} />
            ))}
        </div>
    );
}