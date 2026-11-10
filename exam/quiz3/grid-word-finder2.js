function gridWordFinder2(grid, word) {
  const results = [];
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;

  function checkWord(x, y, dx, dy, index) {
    if (index === word.length) {
      return true;
    }

    if (
      y < 0 ||
      y >= rows ||
      x < 0 ||
      x >= cols ||
      grid[y][x] !== word[index]
    ) {
      return false;
    }

    return checkWord(x + dx, y + dy, dx, dy, index + 1);
  }

  function checkPosition(x, y) {
    if (x >= cols) {
      return checkPosition(0, y + 1);
    }

    if (y >= rows) {
      return;
    }

    if (checkWord(x, y, 1, 0, 0)) {
      results.push({
        x,
        y,
        direction: "horizontal",
      });
    }

    if (checkWord(x, y, 0, 1, 0)) {
      results.push({
        x,
        y,
        direction: "vertical",
      });
    }

    checkPosition(x + 1, y);
  }

  checkPosition(0, 0);

  return results;
}
