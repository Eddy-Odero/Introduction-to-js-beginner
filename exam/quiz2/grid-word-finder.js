function gridWordsFinder(grid, words) {
    if (!grid || grid.length === 0 || !words || words.length === 0) {
        return [];
    }

    const rowsCount = grid.length;
    const colsCount = grid[0].length;
    const lines = [];

    for (let r = 0; r < rowsCount; r++) {
        lines.push(grid[r].join(''));
    }

    for (let c = 0; c < colsCount; c++) {
        let colStr = '';
        for (let r = 0; r < rowsCount; r++) {
            colStr += grid[r][c];
        }
        lines.push(colStr);
    }
    return words.filter(word => {
        return lines.some(line => line.includes(word));
    });
}

// Test cases
const grid = [
  ["c", "a", "t"],
  ["a", "a", "t"],
  ["r", "a", "t"],
  ["d", "o", "g"],
];

console.log(gridWordsFinder(grid, ["cat", "dog", "rat", "tar", "car", "rac", "g"]));
console.log(gridWordsFinder(grid, []));

