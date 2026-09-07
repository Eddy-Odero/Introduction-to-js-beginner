const assert = require("assert");
const crosswordSolver = require("../crosswordSolver");

function captureOutput(fn) {
  const originalLog = console.log;
  const lines = [];

  console.log = (...args) => {
    lines.push(args.join(" "));
  };

  try {
    fn();
  } finally {
    console.log = originalLog;
  }

  return lines.join("\n");
}

const solved = captureOutput(() => {
  crosswordSolver("2001\n0..0\n1000\n0..0", ["casa", "alan", "ciao", "anta"]);
});
assert.strictEqual(solved, "casa\ni..l\nanta\no..n");
console.log("solves the spec example and prints the exact expected output");

const raggedGrid = captureOutput(() => {
  crosswordSolver("2001\n0.0\n1000\n0..0", ["casa", "alan", "ciao", "anta"]);
});
assert.strictEqual(raggedGrid, "Error");
console.log("prints Error for a malformed, non-rectangular grid");

const invalidChar = captureOutput(() => {
  crosswordSolver("200x\n0..0\n1000\n0..0", ["casa", "alan", "ciao", "anta"]);
});
assert.strictEqual(invalidChar, "Error");
console.log("prints Error for an invalid character in the grid");

const wrongWordCount = captureOutput(() => {
  crosswordSolver("2001\n0..0\n1000\n0..0", ["casa", "alan", "ciao"]);
});
assert.strictEqual(wrongWordCount, "Error");
console.log("prints Error when the word count does not match the slot count");

const invalidWord = captureOutput(() => {
  crosswordSolver("2001\n0..0\n1000\n0..0", ["cas4", "alan", "ciao", "anta"]);
});
assert.strictEqual(invalidWord, "Error");
console.log("prints Error for a word containing non-letter characters");

const unsolvable = captureOutput(() => {
  crosswordSolver("21\n10", ["ab", "cd", "ef", "gh"]);
});
assert.strictEqual(unsolvable, "Error");
console.log("prints Error when no word arrangement satisfies the crossings");

const ambiguous = captureOutput(() => {
  crosswordSolver("100\n...\n100", ["cat", "dog"]);
});
assert.strictEqual(ambiguous, "Error");
console.log("prints Error when more than one valid arrangement exists");

console.log("\nAll end-to-end crosswordSolver tests passed.");
