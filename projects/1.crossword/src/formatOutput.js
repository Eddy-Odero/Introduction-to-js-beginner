function formatGrid(solvedGrid) {
  return solvedGrid.map(row => row.join("")).join("\n");
}

module.exports = { formatGrid };
