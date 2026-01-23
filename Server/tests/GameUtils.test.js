const { InitializeBlankBoard, TraverseBoard, CheckWin } = require('../utils/GameUtils');
import { test, expect } from 'vitest';

test('InitializeBlankBoard creates a 4x4x4 board filled with "-"', () => {
  const board = InitializeBlankBoard();
  expect(board).toHaveLength(4);
  for (let z = 0; z < 4; z++) {
    expect(board[z]).toHaveLength(4);
    for (let y = 0; y < 4; y++) {
      expect(board[z][y]).toHaveLength(4);
      for (let x = 0; x < 4; x++) {
        expect(board[z][y][x]).toBe('-');
      }
    }
  }
});

test('TraverseBoard detects horizontal (X-axis) wins', () => {
  const board = InitializeBlankBoard();
  board[0][0][0] = 'X';
  board[0][0][1] = 'X';
  board[0][0][2] = 'X';
  board[0][0][3] = 'X';
  expect(TraverseBoard(0, 0, 0, 1, 0, 0, board, 'X')).toBe(true);
  // also ensure starting from middle still detects
  expect(TraverseBoard(2, 0, 0, 1, 0, 0, board, 'X')).toBe(true);
});

test('TraverseBoard detects vertical (Y and Z axis) wins', () => {
  const board = InitializeBlankBoard();
  // Y axis
  board[0][0][2] = 'O';
  board[0][1][2] = 'O';
  board[0][2][2] = 'O';
  board[0][3][2] = 'O';
  expect(TraverseBoard(2, 0, 0, 0, 1, 0, board, 'O')).toBe(true);

  // Z axis
  const boardZ = InitializeBlankBoard();
  boardZ[0][1][1] = 'Z';
  boardZ[1][1][1] = 'Z';
  boardZ[2][1][1] = 'Z';
  boardZ[3][1][1] = 'Z';
  expect(TraverseBoard(1, 1, 0, 0, 0, 1, boardZ, 'Z')).toBe(true);
});

test('TraverseBoard detects layer diagonals (XY) and space diagonals', () => {
  const board = InitializeBlankBoard();
  // XY diagonal on z=0
  board[0][0][0] = 'D';
  board[0][1][1] = 'D';
  board[0][2][2] = 'D';
  board[0][3][3] = 'D';
  expect(TraverseBoard(0, 0, 0, 1, 1, 0, board, 'D')).toBe(true);

  // space diagonal from (0,0,0) to (3,3,3)
  const boardS = InitializeBlankBoard();
  boardS[0][0][0] = 'S';
  boardS[1][1][1] = 'S';
  boardS[2][2][2] = 'S';
  boardS[3][3][3] = 'S';
  expect(CheckWin(3, 3, 3, boardS, 'S')).toBe(true);
});

test('CheckWin returns false for non-winning patterns', () => {
  const board = InitializeBlankBoard();
  board[0][0][0] = 'X';
  board[0][0][1] = 'X';
  board[0][0][2] = 'X';
  // only three in a row
  const result = CheckWin(0, 0, 0, board, 'X');
  expect(result).toBe(false);
  expect(typeof result).toBe('boolean');
});

test('CheckWin always returns a boolean even for edge coordinates', () => {
  const board = InitializeBlankBoard();
  // create a diagonal but call with a coordinate near edge
  board[3][3][3] = 'E';
  const result = CheckWin(3, 3, 3, board, 'E');
  expect(typeof result).toBe('boolean');
});
