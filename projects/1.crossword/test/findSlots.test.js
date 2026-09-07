const assert = require("assert");
const { findSlots } = require("../src/findSlots");

const grid = [
  ["2", "0", "0", "1"],
  ["0", ".", ".", "0"],
  ["1", "0", "0", "0"],
  ["0", ".", ".", "0"],
];

const slots = findSlots(grid);
assert.deepStrictEqual(slots, [
  { row: 0, col: 0, direction: "across", length: 4 },
  { row: 0, col: 0, direction: "down", length: 4 },
  { row: 0, col: 3, direction: "down", length: 4 },
  { row: 2, col: 0, direction: "across", length: 4 },
]);
console.log("slots detected correctly for the example puzzle");

const overstatedDigit = [
  ["1", "0", "0", "1"],
  ["0", ".", ".", "0"],
  ["1", "0", "0", "0"],
  ["0", ".", ".", "0"],
];
assert.strictEqual(findSlots(overstatedDigit), null);
console.log("digit lower than actual slot count returns null");

const understatedDigit = [
  ["0", "0", "0", "1"],
  ["0", ".", ".", "0"],
  ["1", "0", "0", "0"],
  ["0", ".", ".", "0"],
];
assert.strictEqual(findSlots(understatedDigit), null);
console.log("digit of 0 where a word actually starts returns null");

const orphanCell = [["0"]];
assert.strictEqual(findSlots(orphanCell), null);
console.log("a fillable cell with no slot coverage in either direction returns null");

console.log("\nAll findSlots tests passed.");
