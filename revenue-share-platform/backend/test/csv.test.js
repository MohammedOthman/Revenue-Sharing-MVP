import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeCsvField, toCsv } from '../src/utils/csv.js';

test('escapeCsvField quotes only when needed and doubles embedded quotes', () => {
  assert.equal(escapeCsvField('plain'), 'plain');
  assert.equal(escapeCsvField('a,b'), '"a,b"');
  assert.equal(escapeCsvField('line\nbreak'), '"line\nbreak"');
  assert.equal(escapeCsvField('say "hi"'), '"say ""hi"""');
  assert.equal(escapeCsvField(null), '');
  assert.equal(escapeCsvField(undefined), '');
  assert.equal(escapeCsvField(0), '0');
  assert.equal(escapeCsvField(false), 'false');
});

test('toCsv writes a header row and escapes each field', () => {
  const rows = [
    { id: 1, name: 'Acme, Inc.', note: 'has "quotes"' },
    { id: 2, name: 'Beta', note: null },
  ];
  const csv = toCsv(rows, [{ key: 'id' }, { key: 'name', header: 'partner' }, { key: 'note' }]);
  const lines = csv.split('\r\n');
  assert.equal(lines[0], 'id,partner,note');
  assert.equal(lines[1], '1,"Acme, Inc.","has ""quotes"""');
  assert.equal(lines[2], '2,Beta,');
});

test('toCsv on an empty set still emits the header', () => {
  assert.equal(toCsv([], [{ key: 'id' }, { key: 'name' }]), 'id,name');
});
