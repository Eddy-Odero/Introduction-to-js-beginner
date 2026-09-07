// src/parseGrid.js
//
// PHASE 2
//
// Turns the puzzle string into a 2D array (array of rows, each row an
// array of single characters). Returns null if the input is malformed,
// so the caller can print 'Error' and stop.

function parseGrid(puzzleString) {
  if (typeof puzzleString !== "string" || puzzleString.length === 0) {
    return null;
  }

  const rows = puzzleString.split("\n");
  const grid = rows.map(row => row.split(""));

  // Every row must be the same length (rectangular grid).
  const width = grid[0].length;
  const isRectangular = grid.every(row => row.length === width);
  if (!isRectangular) {
    return null;
  }

  // Every character must be a digit or a dot.
  const validChar = /^[0-9.]$/;
  const allCharsValid = grid.every(row =>
    row.every(char => validChar.test(char))
  );
  if (!allCharsValid) {
    return null;
  }

  return grid;
}

module.exports = { parseGrid };
