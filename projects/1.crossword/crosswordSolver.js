const { parseGrid } = require("./src/parseGrid");
const { findSlots } = require("./src/findSlots");
const { validateWords } = require("./src/validateWords");
const { solveCrossword } = require("./src/solve");
const { formatGrid } = require("./src/formatOutput");

function crosswordSolver(puzzleString, words) {
  const grid = parseGrid(puzzleString);

  if (grid === null) {
    console.log("Error");
    return;
  }

  const slots = findSlots(grid);

  if (slots === null) {
    console.log("Error");
    return;
  }

  if (!validateWords(slots, words)) {
    console.log("Error");
    return;
  }

  const solved = solveCrossword(grid, slots, words);

  if (solved === null) {
    console.log("Error");
    return;
  }

  console.log(formatGrid(solved));
}

module.exports = crosswordSolver;

// Only runs when this file is executed directly (`node crosswordSolver.js`),
// not when another file does require('./crosswordSolver.js').
if (require.main === module) {
  const emptyPuzzle = "2001\n0..0\n1000\n0..0";
  const words = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(emptyPuzzle, words);
}
