const assert = require("assert");
const { parseGrid } = require("../src/parseGrid");
const { findSlots } = require("../src/findSlots");
const {
  solveCrossword,
  buildWorkingGrid,
  canPlaceWord,
  placeWord,
  removeWord,
} = require("../src/solve");

const grid = parseGrid("2001\n0..0\n1000\n0..0");
const slots = findSlots(grid);

const acrossSlot = slots.find(s => s.direction === "across" && s.row === 0);
const downSlot = slots.find(s => s.direction === "down" && s.col === 0);

const workingGrid = buildWorkingGrid(grid);
const filledByAcross = placeWord(workingGrid, acrossSlot, "casa");
assert.deepStrictEqual(filledByAcross, [[0, 0], [0, 1], [0, 2], [0, 3]]);
console.log("placeWord fills all cells of an empty slot and reports them");

assert.strictEqual(canPlaceWord(workingGrid, downSlot, "ciao"), true);
console.log("canPlaceWord accepts a word matching the shared letter at the crossing");

assert.strictEqual(canPlaceWord(workingGrid, downSlot, "aiao"), false);
console.log("canPlaceWord rejects a word conflicting at the crossing");

const filledByDown = placeWord(workingGrid, downSlot, "ciao");
assert.deepStrictEqual(filledByDown, [[1, 0], [2, 0], [3, 0]]);
console.log("placeWord does not re-report the crossing cell already owned by another word");

removeWord(workingGrid, filledByDown);
assert.strictEqual(workingGrid[0][0], "c");
assert.strictEqual(workingGrid[1][0], null);
console.log("removeWord undoes only its own cells, leaving the crossing letter intact");

const words = ["casa", "alan", "ciao", "anta"];
const solved = solveCrossword(grid, slots, words);
assert.deepStrictEqual(solved, [
  ["c", "a", "s", "a"],
  ["i", ".", ".", "l"],
  ["a", "n", "t", "a"],
  ["o", ".", ".", "n"],
]);
console.log("solveCrossword finds the correct solution for the spec example");

const impossibleGrid = parseGrid("21\n10");
const impossibleSlots = findSlots(impossibleGrid);
const impossibleWords = ["ab", "cd", "ef", "gh"];
const noSolution = solveCrossword(impossibleGrid, impossibleSlots, impossibleWords);
assert.strictEqual(noSolution, null);
console.log("solveCrossword returns null when no word arrangement satisfies the crossings");

console.log("\nAll solve tests passed.");
