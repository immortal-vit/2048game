// src/components/Tile.tsx
import type { TileProps } from "../types";

export default function Tile({ tile }: TileProps) {
    return (
        <div
            className={[
                "tile",
                `tile--${tile.value}`,
                tile.isNew    ? "tile--new"    : "",
                tile.isMerged ? "tile--merged" : "",
            ].join(" ").trim()}
            style={{
                // absolutní pozicování přijde ze CSS pomocí --row a --col proměnných
                ["--row" as string]: tile.position.row,
                ["--col" as string]: tile.position.col,
            }}
        >
            {tile.value}
        </div>
    );
}