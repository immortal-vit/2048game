// src/hooks/useGame.ts
// Hlavní herní hook – stav hry, pohyby, localStorage
// TODO Role B – implementace herní logiky
import { useState } from "react";
import type { GameState, Direction } from "../types";

export function useGame() {
    const [state, setState] = useState<GameState | null>(null);

    function newGame() {
        // TODO: inicializace prázdné plochy + 2 náhodné dlaždice
    }

    function move(_direction: Direction) {
        // TODO: posun dlaždic, sloučení, přidání nové dlaždice
    }

    function continueAfterWin() {
        // TODO: nastavit hasWonBefore = true, pokračovat ve hře
    }

    return { state, newGame, move, continueAfterWin };
}