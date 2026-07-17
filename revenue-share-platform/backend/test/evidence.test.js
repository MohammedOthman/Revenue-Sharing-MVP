import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasAttachment, canModifyItem } from '../src/models/evidenceItem.model.js';
import { canModifyPack, canFinalizePack } from '../src/models/evidencePack.model.js';

test('an evidence item must attach to a claim, amendment, or pack', () => {
  assert.equal(hasAttachment({ claimId: 5 }), true);
  assert.equal(hasAttachment({ amendmentId: 7 }), true);
  assert.equal(hasAttachment({ packId: 9 }), true);
  assert.equal(hasAttachment({}), false);
  assert.equal(hasAttachment({ claimId: null, amendmentId: null, packId: null }), false);
});

test('items in a finalized pack are read-only', () => {
  assert.equal(canModifyItem('draft'), true);
  assert.equal(canModifyItem(null), true); // not in any pack
  assert.equal(canModifyItem('finalized'), false);
});

test('a pack can be edited and finalized only while draft', () => {
  assert.equal(canModifyPack('draft'), true);
  assert.equal(canModifyPack('finalized'), false);
  assert.equal(canFinalizePack('draft'), true);
  assert.equal(canFinalizePack('finalized'), false);
});
