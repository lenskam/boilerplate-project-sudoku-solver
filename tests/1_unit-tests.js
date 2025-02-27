const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver();

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isTrue(solver.validate(puzzle));
      });
    
      test('Logic handles a puzzle string with invalid characters', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a';
        assert.isFalse(solver.validate(puzzle));
      });
    
      test('Logic handles a puzzle string that is not 81 characters in length', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
        assert.isFalse(solver.validate(puzzle));
      });
    
      test('Logic handles a valid row placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isTrue(solver.checkRowPlacement(puzzle, 0, 1, '3'));
      });
    
      test('Logic handles an invalid row placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isFalse(solver.checkRowPlacement(puzzle, 0, 1, '5'));
      });
    
      test('Logic handles a valid column placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isTrue(solver.checkColPlacement(puzzle, 0, 1, '3'));
      });
    
      test('Logic handles an invalid column placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isFalse(solver.checkColPlacement(puzzle, 0, 1, '2'));
      });
    
      test('Logic handles a valid region placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 1, '3'));
      });
    
      test('Logic handles an invalid region placement', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isFalse(solver.checkRegionPlacement(puzzle, 0, 1, '1'));
      });
    
      test('Valid puzzle strings pass the solver', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.isString(solver.solve(puzzle));
      });
    
      test('Invalid puzzle strings fail the solver', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a';
        assert.isFalse(solver.solve(puzzle));
      });
    
      test('Solver returns the expected solution for an incomplete puzzle', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
        assert.equal(solver.solve(puzzle), solution);
      });
});
