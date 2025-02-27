'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
  if (!puzzle || !coordinate || !value) return res.json({ error: 'Required field(s) missing' });
  if (puzzle.length !== 81) return res.json({ error: 'Expected puzzle to be 81 characters long' }); // Fix: Check length first
  if (!/^[1-9.]+$/.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' }); // Fix: Validate characters

  // Fix: Validate coordinate format (e.g., A1, B2, etc.)
  if (!/^[A-Ia-i][1-9]$/.test(coordinate)) return res.json({ error: 'Invalid coordinate' });
  
  const row = coordinate.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
  const col = parseInt(coordinate[1]) - 1;
  if (isNaN(col) || row < 0 || row >= 9 || col < 0 || col >= 9) return res.json({ error: 'Invalid coordinate' });
  if (isNaN(value) || value < 1 || value > 9) return res.json({ error: 'Invalid value' });
  
   // Fix: Check if the value is already placed at the coordinate
   const currentValue = puzzle[row * 9 + col];
   if (currentValue === value.toString()) return res.json({ valid: true });

  const conflicts = [];
  if (!solver.checkRowPlacement(puzzle, row, col, value)) conflicts.push('row');
  if (!solver.checkColPlacement(puzzle, row, col, value)) conflicts.push('column');
  if (!solver.checkRegionPlacement(puzzle, row, col, value)) conflicts.push('region');

  if (conflicts.length > 0) return res.json({ valid: false, conflict: conflicts });
  res.json({ valid: true });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
  if (!puzzle) return res.json({ error: 'Required field missing' });
  if (puzzle.length !== 81) return res.json({ error: 'Expected puzzle to be 81 characters long' }); // Fix: Check length first
  if (!/^[1-9.]+$/.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' }); // Fix: Validate characters

  const solution = solver.solve(puzzle);
  if (!solution) return res.json({ error: 'Puzzle cannot be solved' });
  res.json({ solution });
    });
};
