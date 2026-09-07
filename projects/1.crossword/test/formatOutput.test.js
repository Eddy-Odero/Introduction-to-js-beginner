const assert = require("assert");
const { formatGrid } = require("../src/formatOutput");

const solvedGrid = [
  ["c", "a", "s", "a"],
  ["i", ".", ".", "l"],
  ["a", "n", "t", "a"],
  ["o", ".", ".", "n"],
];

assert.strictEqual(formatGrid(solvedGrid), "casa\ni..l\nanta\no..n");
console.log("formatGrid matches the exact spec output for the example puzzle");

const singleRow = [["c", "a", "t"]];
assert.strictEqual(formatGrid(singleRow), "cat");
console.log("formatGrid handles a single-row grid with no newlines");

const withBlockedRow = [
  ["a", "b"],
  [".", "."],
];
assert.strictEqual(formatGrid(withBlockedRow), "ab\n..");
console.log("formatGrid preserves a fully blocked row");

console.log("\nAll formatOutput tests passed.");
