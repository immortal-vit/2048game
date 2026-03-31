# Strom komponent – 2048

## Struktura

```
App
├── Header
│   ├── <h1> "2048"
│   ├── ScoreBoard
│   │   ├── ScoreBox (skóre)
│   │   └── ScoreBox (rekord)
│   └── <button> Nová hra
│
├── Board
│   ├── EmptyCell × 16  (pozadí mřížky)
│   └── Tile × n        (aktivní dlaždice, absolutně pozicované)
│
└── GameOver (modal overlay)
    ├── <h2> Výhra / Prohra
    ├── <p> Skóre
    ├── <button> Hrát dál  (jen při výhře)
    └── <button> Nová hra
```

## Datový tok

```
useGame() hook
    └── GameState
            ├── tiles[]     → Board → Tile[]
            ├── score       → Header → ScoreBoard
            ├── bestScore   → Header → ScoreBoard
            ├── isGameOver  → GameOver.isVisible
            └── isWon       → GameOver.isWon

Vstup uživatele:
  Klávesnice (ArrowKeys)  ──┐
  Swipe (touch events)    ──┤──→ useGame.move(direction)
  Tlačítko Nová hra       ──┘──→ useGame.newGame()
```

## Soubory

| Soubor | Popis |
|--------|-------|
| `src/App.tsx` | Kořenová komponenta, drží `useGame` |
| `src/components/Header.tsx` | Záhlaví s názvem a skóre |
| `src/components/Board.tsx` | Herní plocha 4×4 |
| `src/components/Tile.tsx` | Jedna dlaždice (číslo + barva) |
| `src/components/ScoreBoard.tsx` | Skóre + rekord |
| `src/components/GameOver.tsx` | Modální okno konce hry |
| `src/hooks/useGame.ts` | Herní logika + stav + localStorage |
| `src/utils/gameLogic.ts` | Čisté funkce (pohyb, sloučení, …) |
| `src/types.ts` | Sdílené TypeScript typy |
| `src/theme.ts` | Barvy a design tokeny |
| `src/data/sampleStates.json` | Vzorové stavy pro testování |