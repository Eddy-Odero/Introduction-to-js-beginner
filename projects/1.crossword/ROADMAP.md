# Crossword Solver — Build Roadmap

Goal: `crosswordSolver(puzzleString, words)` that fills a crossword grid using
backtracking, and prints `'Error'` for invalid/unsolvable/ambiguous puzzles.

Status: all phases complete. See `README.md` for the finished project
summary and usage. This file is kept as a build log.

---

## Project Structure

```
crossword-solver/
├── crosswordSolver.js        entry point required by the spec, wires everything together
├── package.json               npm scripts to run each phase's tests
├── README.md                  finished-project summary
├── ROADMAP.md                 this file
├── src/
│   ├── parseGrid.js           (Phase 2)
│   ├── findSlots.js           (Phase 3, extended in Phase 9)
│   ├── validateWords.js       (Phase 4)
│   ├── solve.js                 (Phase 5 + 6: backtracking + uniqueness)
│   └── formatOutput.js        (Phase 7)
└── test/
    ├── parseGrid.test.js
    ├── findSlots.test.js
    ├── validateWords.test.js
    ├── solve.test.js
    ├── uniqueness.test.js
    ├── formatOutput.test.js
    └── crosswordSolver.test.js   end-to-end (Phase 8)
```

No npm packages needed — everything uses only Node's built-ins
(`assert`, `require`/`module.exports`).

---

## Phase 0 — JS Survival Kit
- [x] `const`/`let`, template strings
- [x] Arrays & array methods (`map`, `every`, `split`)
- [x] Strings as splittable/indexable things
- [x] Functions, arrow functions
- [x] Modules: `module.exports` / `require`, destructuring `{ x }`
- [x] Node's `assert` module
- [x] Recursion and the call stack
- [x] Objects `{ }` for structured data
- [x] `Set` for membership tracking and deduplication
- [x] Reassigning built-in functions (`console.log`) to capture output in tests

## Phase 1 — Understand the Problem Fully
- [x] Manually traced the example puzzle by hand
- [x] Defined what each grid character means (digit / `.` / `\n`)
- [x] Pinned down every Error condition from the spec
- [x] Defined "unique solution" precisely (0 solutions = Error, 2+ = Error)

## Phase 2 — Parse Input → 2D Grid
**Files:** `src/parseGrid.js`, `test/parseGrid.test.js`
- [x] `parseGrid(puzzleString)` → 2D array of single-character strings
- [x] Rejects non-rectangular grids and invalid characters
**Run it:** `npm run test:parseGrid`

## Phase 3 — Detect Word Slots
**Files:** `src/findSlots.js`, `test/findSlots.test.js`
- [x] Detects across/down slot starts from neighbor adjacency
- [x] Computes slot length by walking to the next blocked cell or edge
- [x] Cross-validates each cell's digit against its actual slot count
- [x] (Added in Phase 9) confirms every fillable cell is covered by at
      least one slot, catching orphan cells that no word would ever fill
**Run it:** `npm run test:findSlots`

## Phase 4 — Word/Slot Compatibility
**Files:** `src/validateWords.js`, `test/validateWords.test.js`
- [x] Validates the word list is letters-only
- [x] Validates word count matches slot count
- [x] Validates the length distribution matches exactly, per length
**Run it:** `npm run test:validateWords`

## Phase 5 — Backtracking Solver
**Files:** `src/solve.js`, `test/solve.test.js`
- [x] `canPlaceWord` / `placeWord` / `removeWord` — precise, non-destructive undo
- [x] Recursive `solve` tries each candidate word per slot, backtracks on failure
**Run it:** `npm run test:solve`

## Phase 6 — Uniqueness Check
**Files:** `src/solve.js` (extended), `test/uniqueness.test.js`
- [x] Searches for up to two distinct solutions instead of stopping at the first
- [x] Exactly one distinct solution required; zero or two-plus both → `Error`
**Run it:** `npm run test:uniqueness`

## Phase 7 — Output Formatting
**Files:** `src/formatOutput.js`, `test/formatOutput.test.js`
- [x] `formatGrid(solvedGrid)` → exact puzzle-format output string
**Run it:** `npm run test:formatOutput`

## Phase 8 — Wire It All Together + End-to-End Testing
**Files:** `crosswordSolver.js`, `test/crosswordSolver.test.js`
- [x] Full pipeline composed: parseGrid → findSlots → validateWords → solve → formatOutput
- [x] Every failure point routes to `console.log('Error')`
- [x] Black-box tests capturing actual console output for the real function signature
**Run it:** `npm run test:crosswordSolver`

## Phase 9 — Final Polish
- [x] `npm test` runs all 7 test files, 25 assertions total, all passing
- [x] Line-by-line re-read against the original spec
- [x] Found and fixed a real gap: fillable cells not covered by any slot
      were previously undetected, risking a silently incomplete solved
      grid; now caught and rejected in `findSlots`
- [x] Added `README.md` documenting structure, usage, and known assumptions

---

## Working Rule (as applied throughout)
One phase at a time: learn the concept, write the module, write its test
file, run the test, confirm it's green, snapshot the project, move on.
