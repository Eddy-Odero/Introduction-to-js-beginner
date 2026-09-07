// test/parseGrid.test.js
//
// PHASE 2 TESTS
// Run with: node test/parseGrid.test.js
// (or: npm run test:parseGrid)

const assert = require("assert");
const { parseGrid } = require("../src/parseGrid");

// Test 1: valid grid parses into the expected 2D array
const valid = parseGrid("2001\n0..0\n1000\n0..0");
assert.deepStrictEqual(valid, [
  ["2", "0", "0", "1"],
  ["0", ".", ".", "0"],
  ["1", "0", "0", "0"],
  ["0", ".", ".", "0"],
]);
console.log("valid grid parses correctly");

// Test 2: ragged (non-rectangular) grid returns null
const ragged = parseGrid("2001\n0.0\n1000\n0..0");
assert.strictEqual(ragged, null);
console.log("ragged grid returns null");

// Test 3: invalid character returns null
const badChar = parseGrid("200x\n0..0\n1000\n0..0");
assert.strictEqual(badChar, null);
console.log("invalid character returns null");

// Test 4: empty string returns null
const empty = parseGrid("");
assert.strictEqual(empty, null);
console.log("empty string returns null");

console.log("\nAll parseGrid tests passed.");
