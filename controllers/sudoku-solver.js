class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) return false;
    return /^[1-9.]+$/.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[row * 9 + i] === value.toString()) return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i * 9 + column] === value.toString()) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleString[(startRow + i) * 9 + (startCol + j)] === value.toString()) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return false;

    const solvePuzzle = (puzzle) => {
      const emptyIndex = puzzle.indexOf('.');
      if (emptyIndex === -1) return puzzle;

      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;

      for (let num = 1; num <= 9; num++) {
        if (
          this.checkRowPlacement(puzzle, row, col, num) &&
          this.checkColPlacement(puzzle, row, col, num) &&
          this.checkRegionPlacement(puzzle, row, col, num)
        ) {
          const newPuzzle = puzzle.substring(0, emptyIndex) + num + puzzle.substring(emptyIndex + 1);
          const result = solvePuzzle(newPuzzle);
          if (result) return result;
        }
      }
      return false;
    };

    return solvePuzzle(puzzleString);
  }
}

module.exports = SudokuSolver;