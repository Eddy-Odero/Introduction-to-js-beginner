function isValidWord(word) {
  return typeof word === "string" && /^[a-zA-Z]+$/.test(word);
}

function countByLength(numbers) {
  const counts = {};
  for (const n of numbers) {
    counts[n] = (counts[n] || 0) + 1;
  }
  return counts;
}

function validateWords(slots, words) {
  if (!Array.isArray(words) || words.length === 0) {
    return false;
  }

  if (!words.every(isValidWord)) {
    return false;
  }

  if (words.length !== slots.length) {
    return false;
  }

  const uniqueWords = new Set(words);
  if (uniqueWords.size !== words.length) {
    return false;
  }

  const slotLengthCounts = countByLength(slots.map(slot => slot.length));
  const wordLengthCounts = countByLength(words.map(word => word.length));

  const allLengths = new Set([
    ...Object.keys(slotLengthCounts),
    ...Object.keys(wordLengthCounts),
  ]);

  for (const length of allLengths) {
    if (slotLengthCounts[length] !== wordLengthCounts[length]) {
      return false;
    }
  }

  return true;
}

module.exports = { validateWords, isValidWord };
