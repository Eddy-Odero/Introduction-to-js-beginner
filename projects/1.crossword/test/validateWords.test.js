const assert = require("assert");
const { validateWords } = require("../src/validateWords");

const slots = [
  { row: 0, col: 0, direction: "across", length: 4 },
  { row: 0, col: 0, direction: "down", length: 4 },
  { row: 0, col: 3, direction: "down", length: 4 },
  { row: 2, col: 0, direction: "across", length: 4 },
];

assert.strictEqual(validateWords(slots, ["casa", "alan", "ciao", "anta"]), true);
console.log("valid word list passes");

assert.strictEqual(validateWords(slots, ["casa", "alan", "ciao"]), false);
console.log("too few words returns false");

assert.strictEqual(validateWords(slots, ["casa", "alan", "ciao", "anta", "extra"]), false);
console.log("too many words returns false");

assert.strictEqual(validateWords(slots, ["cas1", "alan", "ciao", "anta"]), false);
console.log("word with a non-letter character returns false");

assert.strictEqual(validateWords(slots, ["ab", "alan", "ciao", "anta"]), false);
console.log("word length not matching the required distribution returns false");

assert.strictEqual(validateWords(slots, ["casa", "casa", "ciao", "anta"]), false);
console.log("duplicate word in the word list returns false");

console.log("\nAll validateWords tests passed.");
