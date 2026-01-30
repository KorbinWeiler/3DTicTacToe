const fs = require('fs');
const path = require('path');
const vm = require('vm');
import { test, describe, expect } from 'vitest';

function loadNormalize() {
  const filePath = path.resolve(__dirname, '..', '..', 'Client', 'src', 'Utils', 'GameBoardUtils.js');
  const code = fs.readFileSync(filePath, 'utf8') + '\nmodule.exports = { normalizeToArray };';
  const sandbox = { module: {}, exports: {}, require, console };
  vm.runInNewContext(code, sandbox);
  return sandbox.module.exports.normalizeToArray;
}

describe('normalizeToArray', () => {
  const normalizeToArray = loadNormalize();

  test('returns null for null/undefined', () => {
    expect(normalizeToArray(null)).toBeNull();
    expect(normalizeToArray(undefined)).toBeNull();
  });

  test('normalizes nested JSON-quoted strings into plain values', () => {
    const nested = JSON.stringify([[['"-"','"X"'],['"O"','"-"']]]);
    const result = normalizeToArray(nested);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0][0][0]).toBe('-');
    expect(result[0][0][1]).toBe('X');
    expect(result[0][1][0]).toBe('O');
  });

  test('normalizes numeric-keyed objects to arrays', () => {
    const obj = { '0': { '0': { '0': '"-"' }, '1': '"X"' }, '1': { '0': '"O"' } };
    const normalized = normalizeToArray(obj);
    expect(Array.isArray(normalized)).toBe(true);
    expect(normalized[0][0][0]).toBe('-');
    expect(normalized[0][0][1]).toBe('X');
    expect(normalized[1][0]).toBe('O');
  });
});
