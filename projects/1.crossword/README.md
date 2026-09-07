# Crossword Solver

Fills an empty crossword grid with a given list of words using a
backtracking algorithm, printing the solved grid or `Error` if the puzzle
is invalid, unsolvable, or ambiguous.

## Usage

```js
const crosswordSolver = require("./crosswordSolver");

const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
// prints:
// casa
// i..l
// anta
// o..n
```

## Running

```
npm install       (no external dependencies; installs nothing, included for completeness)
npm start          # runs crosswordSolver.js against its built-in example
npm test           # runs the full test suite (7 files, run in sequence)
npm run test:<name>  # runs a single phase's test file, e.g. npm run test:solve
node unit-test.js    # runs against different arguments without changing the solver file
```

## Project structure

```
crossword-solver/
├── crosswordSolver.js        entry point required by the spec
├── package.json
├── ROADMAP.md                 phase-by-phase build log
├── src/
│   ├── parseGrid.js           puzzle string -> 2D array, structural validation
│   ├── findSlots.js           detects across/down word slots, validates digit consistency and full cell coverage
│   ├── validateWords.js       validates the word list, its length distribution, and rejects duplicate words
│   ├── solve.js                 backtracking search; enforces a unique solution
│   └── formatOutput.js        solved 2D array -> puzzle-format output string
└── test/
    ├── parseGrid.test.js
    ├── findSlots.test.js
    ├── validateWords.test.js
    ├── solve.test.js
    ├── uniqueness.test.js
    ├── formatOutput.test.js
    └── crosswordSolver.test.js   end-to-end, black-box tests of the full function
```

## Algorithm summary

1. **Parse** the puzzle string into a 2D array of characters, rejecting
   non-rectangular grids or invalid characters.
2. **Detect slots**: for every fillable cell, check whether an across
   and/or down word starts there (no fillable neighbor immediately
   before it, a fillable neighbor immediately after it). Cross-check the
   count against the puzzle's own digit at that cell, and confirm every
   fillable cell is covered by at least one slot.
3. **Validate words**: letters only, and the count of words at each
   length must exactly match the count of slots at that length.
4. **Solve** with backtracking: recursively try each unused, length-matching
   word in the next empty slot; a word can only be placed if it agrees
   with every letter a crossing word has already placed. On failure,
   undo only the cells that word itself newly filled, and try the next
   candidate.
5. **Uniqueness check**: rather than stopping at the first solution,
   keep searching (up to a second, distinct one). Exactly one distinct
   solution is required; zero or two-or-more both result in `Error`.
6. **Format**: convert the solved grid back into the puzzle's string
   format (letters in place of digits, `.` preserved, rows joined by
   `\n`) and print it.

## Known assumptions

- Words are matched case-sensitively; the word list is expected to use
  consistent casing (the spec's example is all lowercase).
- Duplicate words in the word list are explicitly rejected by
  `validateWords` (each word must be usable exactly once, and two
  identical strings can never be told apart).
- Backtracking with uniqueness-checking is exponential in the worst
  case; this is appropriate for typical crossword-sized puzzles but not
  designed for very large grids or word lists.

## Run different arguments
-use the unit-test.js file.
- add your arguments to it 
- run node unit-test.js