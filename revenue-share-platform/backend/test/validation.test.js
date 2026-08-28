import assert from 'node:assert/strict';
import test from 'node:test';
import { parseOptionalRecordVersion, parseRecordId } from '../src/lib/validation.js';

test('accepts valid record identifiers and concurrency versions', () => {
  assert.equal(
    parseRecordId('0c37ef01-c7e0-481c-b86c-3a3cf76a4be5'),
    '0c37ef01-c7e0-481c-b86c-3a3cf76a4be5',
  );
  assert.equal(parseOptionalRecordVersion(4), 4);
  assert.equal(parseOptionalRecordVersion(undefined), undefined);
});

test('rejects malformed record identifiers and concurrency versions', () => {
  assert.throws(() => parseRecordId('not-a-record-id'));
  assert.throws(() => parseOptionalRecordVersion('4'));
  assert.throws(() => parseOptionalRecordVersion(0));
  assert.throws(() => parseOptionalRecordVersion(1.5));
});
