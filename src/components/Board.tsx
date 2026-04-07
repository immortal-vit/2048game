// src/components/Board.tsx
export default function Board() {
    return (
        <div className="board">
            {/* 16 prázdných buněk na pozadí */}
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="board__cell" />
            ))}
            {/* tiles.map(tile => <Tile key={tile.id} tile={tile} />) */}
        </div>
    );
}