// src/utils/gameLogic.ts
import type { Board, Direction, MoveResult, Tile } from "../types";

let nextId = 1;

export function createEmptyBoard(): Board {
    return Array.from({ length: 4 }, () => Array(4).fill(null));
}

export function addRandomTile(board: Board): Board {
    const empty: { row: number; col: number }[] = [];
    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
            if (!board[r][c]) empty.push({ row: r, col: c });

    if (empty.length === 0) return board;

    const { row, col } = empty[Math.floor(Math.random() * empty.length)];
    const value = Math.random() < 0.9 ? 2 : 4;

    const newBoard = board.map(r => [...r]) as Board;
    newBoard[row][col] = {
        id: nextId++,
        value,
        position: { row, col },
        isNew: true,
        isMerged: false,
    };
    return newBoard;
}

export function boardToTiles(board: Board): Tile[] {
    const tiles: Tile[] = [];
    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
            if (board[r][c]) tiles.push(board[r][c]!);
    return tiles;
}

function slideRow(row: (Tile | null)[]): { row: (Tile | null)[]; gained: number } {
    const tiles = row.filter(Boolean) as Tile[];
    let gained = 0;

    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].value === tiles[i + 1].value) {
            const merged: Tile = {
                ...tiles[i],
                value: tiles[i].value * 2,
                isMerged: true,
                isNew: false,
            };
            gained += merged.value;
            tiles.splice(i, 1, merged);
            tiles.splice(i + 1, 1);
        }
    }

    while (tiles.length < 4) tiles.push(null as unknown as Tile);
    return { row: tiles as (Tile | null)[], gained };
}

export function performMove(board: Board, direction: Direction): MoveResult {
    let scoreGained = 0;
    let moved = false;

    const rotated = rotateBoard(board, direction);

    const newRows = rotated.map(row => {
        const { row: slid, gained } = slideRow([...row]);
        scoreGained += gained;
        if (!rowsEqual(row, slid)) moved = true;
        return slid;
    });

    const unrotated = unrotateBoard(newRows, direction);
    const newBoard: Board = unrotated.map((row, r) =>
        row.map((tile, c) =>
            tile ? { ...tile, position: { row: r, col: c }, isNew: false } : null
        )
    );

    const tiles = boardToTiles(newBoard);
    return { board: newBoard, tiles, scoreGained, moved };
}

export function isGameOver(board: Board): boolean {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (!board[r][c]) return false;
            if (c < 3 && board[r][c]?.value === board[r][c + 1]?.value) return false;
            if (r < 3 && board[r][c]?.value === board[r + 1][c]?.value) return false;
        }
    }
    return true;
}

export function hasWon(board: Board): boolean {
    return board.some(row => row.some(tile => tile?.value === 2048));
}

function rotateBoard(board: Board, dir: Direction): Board {
    if (dir === "left")  return board;
    if (dir === "right") return board.map(row => [...row].reverse());
    if (dir === "up")    return transpose(board);
    return transpose(board).map(row => [...row].reverse());
}

function unrotateBoard(board: Board, dir: Direction): Board {
    if (dir === "left")  return board;
    if (dir === "right") return board.map(row => [...row].reverse());
    if (dir === "up")    return transpose(board);
    return transpose(board.map(row => [...row].reverse()));
}

function transpose(board: Board): Board {
    return board[0].map((_, c) => board.map(row => row[c]));
}

function rowsEqual(a: (Tile | null)[], b: (Tile | null)[]): boolean {
    return a.every((tile, i) => tile?.value === b[i]?.value);
}