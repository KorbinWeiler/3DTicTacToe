import { describe, test, expect } from 'vitest';
import { normalizeToArray } from '../src/Utils/GameBoardUtils.js';

describe('normalizeToArray (client)', () => {
  test('returns null for null/undefined', () => {
    expect(normalizeToArray(null)).toBeNull();
    expect(normalizeToArray(undefined)).toBeNull();
  });
  test('normalizes a JSON-stringified 4x4x4 board with quoted cell values', () => {
    // create 4x4x4 board with quoted cell strings like '\"X\"' so after stringify
    // we get nested quoted values that need double-normalization
    const board = [];
    for (let z = 0; z < 4; z++) {
      const layer = [];
      for (let y = 0; y < 4; y++) {
        const row = [];
        for (let x = 0; x < 4; x++) {
          row.push('\"-\"');
        }
        layer.push(row);
      }
      board.push(layer);
    }
    // set a few cells
    board[0][0][0] = '\"X\"';
    board[1][2][3] = '\"O\"';

    const input = JSON.stringify(board);
    const result = normalizeToArray(input);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
    expect(result[0][0][0]).toBe('X');
    expect(result[1][2][3]).toBe('O');
    expect(result[0][0][1]).toBe('-');
  });

  test('normalizes object with BoardState key', () => {
    const board = [];
    for (let z = 0; z < 4; z++) {
      const layer = [];
      for (let y = 0; y < 4; y++) {
        const row = [];
        for (let x = 0; x < 4; x++) {
          row.push('\"-\"');
        }
        layer.push(row);
      }
      board.push(layer);
    }
    board[2][1][1] = '\"X\"';
    const payload = { BoardState: JSON.stringify(board) };
    const normalized = normalizeToArray(payload);
    expect(Array.isArray(normalized)).toBe(true);
    expect(normalized[2][1][1]).toBe('X');
  });

  test('normalizes numeric-keyed nested objects into arrays (4x4x4)', () => {
    const obj = {};
    for (let z = 0; z < 4; z++) {
      obj[z] = {};
      for (let y = 0; y < 4; y++) {
        obj[z][y] = {};
        for (let x = 0; x < 4; x++) {
          obj[z][y][x] = '\"-\"';
        }
      }
    }
    obj[3][3][3] = '\"O\"';
    const normalized = normalizeToArray(obj);
    expect(Array.isArray(normalized)).toBe(true);
    expect(normalized[3][3][3]).toBe('O');
    expect(normalized[0][0][0]).toBe('-');
  });
});
