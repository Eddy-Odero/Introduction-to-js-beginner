function getSlotCells(slot) {
  const cells = [];
  for (let i = 0; i < slot.length; i++) {
    if (slot.direction === "across") {
      cells.push([slot.row, slot.col + i]);
    } else {
      cells.push([slot.row + i, slot.col]);
    }
  }
  return cells;
}

function buildWorkingGrid(grid) {
  return grid.map(row => row.map(cell => (cell === "." ? "." : null)));
}

function canPlaceWord(workingGrid, slot, word) {
  const cells = getSlotCells(slot);
  for (let i = 0; i < cells.length; i++) {
    const [row, col] = cells[i];
    const current = workingGrid[row][col];
    if (current !== null && current !== word[i]) {
      return false;
    }
  }
  return true;
}

function placeWord(workingGrid, slot, word) {
  const cells = getSlotCells(slot);
  const newlyFilled = [];

  for (let i = 0; i < cells.length; i++) {
    const [row, col] = cells[i];
    if (workingGrid[row][col] === null) {
      workingGrid[row][col] = word[i];
      newlyFilled.push([row, col]);
    }
  }

  return newlyFilled;
}

function removeWord(workingGrid, newlyFilled) {
  for (const [row, col] of newlyFilled) {
    workingGrid[row][col] = null;
  }
}

function gridKey(workingGrid) {
  return workingGrid.map(row => row.join("")).join("\n");
}

function cloneGrid(workingGrid) {
  return workingGrid.map(row => row.slice());
}

function findSolutions(slots, words, workingGrid, usedWords, index, solutions, maxSolutions) { //recursiom
  if (solutions.length >= maxSolutions) {
    return;
  }

  if (index === slots.length) {
    const key = gridKey(workingGrid);
    const alreadyFound = solutions.some(solution => solution.key === key);
    if (!alreadyFound) {
      solutions.push({ key, grid: cloneGrid(workingGrid) });
    }
    return;
  }

  const slot = slots[index];

  for (const word of words) {
    if (solutions.length >= maxSolutions) return;
    if (usedWords.has(word)) continue;
    if (word.length !== slot.length) continue;
    if (!canPlaceWord(workingGrid, slot, word)) continue;

    const newlyFilled = placeWord(workingGrid, slot, word);//try
    usedWords.add(word);

    findSolutions(slots, words, workingGrid, usedWords, index + 1, solutions, maxSolutions);

    usedWords.delete(word);
    removeWord(workingGrid, newlyFilled);
  }
}

function solveCrossword(grid, slots, words) {//undo backtracking
  const workingGrid = buildWorkingGrid(grid);
  const usedWords = new Set();
  const solutions = [];

  findSolutions(slots, words, workingGrid, usedWords, 0, solutions, 2);

  if (solutions.length === 1) {
    return solutions[0].grid;
  }

  return null;
}

module.exports = {
  solveCrossword,
  getSlotCells,
  buildWorkingGrid,
  canPlaceWord,
  placeWord,
  removeWord,
};
