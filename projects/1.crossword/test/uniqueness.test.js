const assert = require("assert");
const { parseGrid } = require("../src/parseGrid");
const { findSlots } = require("../src/findSlots");
const { solveCrossword } = require("../src/solve");

const ambiguousGrid = parseGrid("100\n...\n100");
const ambiguousSlots = findSlots(ambiguousGrid);
const ambiguousResult = solveCrossword(ambiguousGrid, ambiguousSlots, ["cat", "dog"]);
assert.strictEqual(ambiguousResult, null);
console.log("two independent slots with interchangeable words return null (ambiguous)");

const uniqueGrid = parseGrid("2001\n0..0\n1000\n0..0");
const uniqueSlots = findSlots(uniqueGrid);
const uniqueWords = ["casa", "alan", "ciao", "anta"];
const solved = solveCrossword(uniqueGrid, uniqueSlots, uniqueWords);
assert.deepStrictEqual(solved, [
  ["c", "a", "s", "a"],
  ["i", ".", ".", "l"],
  ["a", "n", "t", "a"],
  ["o", ".", ".", "n"],
]);
console.log("a puzzle with exactly one valid arrangement still returns that solution");

console.log("\nAll uniqueness tests passed.");
