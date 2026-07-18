import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateShareAmount } from '../src/models/revenue.model.js';

test('computes a whole-number share', () => {
  assert.equal(calculateShareAmount(480000, 12.5), 60000);
  assert.equal(calculateShareAmount(100, 10), 10);
});

test('rounds to 2 decimals (currency-safe)', () => {
  assert.equal(calculateShareAmount(100.10, 12.5), 12.51); // 12.5125 -> 12.51
  assert.equal(calculateShareAmount(33.33, 33.33), 11.11); // 11.108... -> 11.11
});

test('coerces string inputs', () => {
  assert.equal(calculateShareAmount('1000', '15'), 150);
});

test('zero revenue or percentage yields zero', () => {
  assert.equal(calculateShareAmount(0, 20), 0);
  assert.equal(calculateShareAmount(5000, 0), 0);
});

test('non-finite inputs yield zero, never NaN', () => {
  assert.equal(calculateShareAmount(undefined, 10), 0);
  assert.equal(calculateShareAmount(1000, null), 0);
  assert.equal(calculateShareAmount('abc', 10), 0);
});
