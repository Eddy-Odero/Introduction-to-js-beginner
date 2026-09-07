const DIRECTIONS = ["across", "down"];

function slotLength(grid, row, col, direction) {
  const height = grid.length;
  const width = grid[0].length;
  let length = 0;

  if (direction === "across") {
    let c = col;
    while (c < width && grid[row][c] !== ".") {
      length++;
      c++;
    }
  } else {
    let r = row;
    while (r < height && grid[r][col] !== ".") {
      length++;
      r++;
    }
  }

  return length;
}

function findSlots(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const slots = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cell = grid[row][col];
      if (cell === ".") continue;

      const hasLeft = col > 0 && grid[row][col - 1] !== ".";
      const hasRight = col < width - 1 && grid[row][col + 1] !== ".";
      const hasTop = row > 0 && grid[row - 1][col] !== ".";
      const hasBottom = row < height - 1 && grid[row + 1][col] !== ".";

      let startsHere = 0;

      if (!hasLeft && hasRight) {
        slots.push({ row, col, direction: "across", length: slotLength(grid, row, col, "across") });
        startsHere++;
      }

      if (!hasTop && hasBottom) {
        slots.push({ row, col, direction: "down", length: slotLength(grid, row, col, "down") });
        startsHere++;
      }

      const expected = Number(cell);
      if (startsHere !== expected) {
        return null;
      }
    }
  }

  const covered = grid.map(row => row.map(() => false));
  for (const slot of slots) {
    for (let i = 0; i < slot.length; i++) {
      const r = slot.direction === "down" ? slot.row + i : slot.row;
      const c = slot.direction === "across" ? slot.col + i : slot.col;
      covered[r][c] = true;
    }
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (grid[row][col] !== "." && !covered[row][col]) {
        return null;
      }
    }
  }

  return slots;
}

module.exports = { findSlots, slotLength, DIRECTIONS };
