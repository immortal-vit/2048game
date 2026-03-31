// src/components/Tile.tsx
// Jedna dlaždice – zobrazuje hodnotu, barvu a animace
import type { TileProps } from "../types";

export default function Tile({ tile }: TileProps) {
    return (
        <div
            className={`tile tile-${tile.value} ${tile.isNew ? "tile-new" : ""} ${tile.isMerged ? "tile-merged" : ""}`}
            // TODO: absolutní pozicování dle tile.position + animace
        >
            {tile.value}
        </div>
    );
}