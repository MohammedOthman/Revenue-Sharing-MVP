import { randomUUID } from 'node:crypto';
import pool from '../config/database.js';
import { buildClaimJournal, publicJournal } from '../domain/ledger.js';
import { HttpError } from '../lib/http.js';

function mapJournal(row) {
  return {
    id: row.id,
    event: row.event,
    claim_id: row.claim_id,
    currency: row.currency,
    memo: row.memo,
    idempotency_key: row.idempotency_key,
    metadata: row.metadata,
    created_at: row.created_at,
  };
}

export async function loadJournalsByKey(client, organizationId, idempotencyKey) {
  const journal = await client.query(
    `SELECT id, event, claim_id, currency, memo, idempotency_key, metadata, created_at
       FROM reven_journals
      WHERE organization_id = $1 AND idempotency_key = $2`,
    [organizationId, idempotencyKey],
  );
  if (!journal.rows[0]) return null;
  const lines = await client.query(
    `SELECT id, account, direction, amount_minor, currency
       FROM reven_ledger_entries
      WHERE journal_id = $1
      ORDER BY created_at ASC, account ASC`,
    [journal.rows[0].id],
  );
  return publicJournal(mapJournal(journal.rows[0]), lines.rows);
}

export async function postClaimJournal(client, context, event, claim) {
  const draft = buildClaimJournal(event, claim);
  const existing = await loadJournalsByKey(client, context.organizationId, draft.idempotency_key);
  if (existing) return { journal: existing, reused: true };

  const journalId = randomUUID();
  try {
    await client.query(
      `INSERT INTO reven_journals
        (id, organization_id, claim_id, event, idempotency_key, currency, memo, metadata, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)`,
      [
        journalId,
        context.organizationId,
        draft.claim_id,
        draft.event,
        draft.idempotency_key,
        draft.currency,
        draft.memo,
        JSON.stringify(draft.metadata),
        context.userId || null,
      ],
    );
  } catch (error) {
    if (error?.code === '23505') {
      const raced = await loadJournalsByKey(client, context.organizationId, draft.idempotency_key);
      if (raced) return { journal: raced, reused: true };
    }
    throw error;
  }

  const lines = [];
  for (const item of draft.lines) {
    const result = await client.query(
      `INSERT INTO reven_ledger_entries
        (id, journal_id, organization_id, claim_id, account, direction, amount_minor, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, account, direction, amount_minor, currency`,
      [
        randomUUID(),
        journalId,
        context.organizationId,
        draft.claim_id,
        item.account,
        item.direction,
        item.amount_minor,
        draft.currency,
      ],
    );
    lines.push(result.rows[0]);
  }

  return {
    journal: publicJournal(
      {
        id: journalId,
        event: draft.event,
        claim_id: draft.claim_id,
        currency: draft.currency,
        memo: draft.memo,
        idempotency_key: draft.idempotency_key,
        metadata: draft.metadata,
        created_at: new Date().toISOString(),
      },
      lines,
    ),
    reused: false,
  };
}

export async function listClaimLedger({ organizationId, claimId }) {
  const journals = await pool.query(
    `SELECT id, event, claim_id, currency, memo, idempotency_key, metadata, created_at
       FROM reven_journals
      WHERE organization_id = $1 AND claim_id = $2
      ORDER BY created_at ASC`,
    [organizationId, claimId],
  );
  if (journals.rows.length === 0) return [];

  const lines = await pool.query(
    `SELECT id, journal_id, account, direction, amount_minor, currency, created_at
       FROM reven_ledger_entries
      WHERE organization_id = $1 AND claim_id = $2
      ORDER BY created_at ASC, account ASC`,
    [organizationId, claimId],
  );

  const byJournal = new Map();
  for (const line of lines.rows) {
    const current = byJournal.get(line.journal_id) || [];
    current.push(line);
    byJournal.set(line.journal_id, current);
  }

  return journals.rows.map((journal) => publicJournal(mapJournal(journal), byJournal.get(journal.id) || []));
}

export async function listOrganizationLedger({ organizationId, limit = 100 }) {
  const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 100, 1), 500);
  const journals = await pool.query(
    `SELECT id, event, claim_id, currency, memo, idempotency_key, metadata, created_at
       FROM reven_journals
      WHERE organization_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
    [organizationId, safeLimit],
  );
  if (journals.rows.length === 0) return [];
  const ids = journals.rows.map((row) => row.id);
  const lines = await pool.query(
    `SELECT id, journal_id, account, direction, amount_minor, currency
       FROM reven_ledger_entries
      WHERE organization_id = $1 AND journal_id = ANY($2::uuid[])
      ORDER BY created_at ASC, account ASC`,
    [organizationId, ids],
  );
  const byJournal = new Map();
  for (const line of lines.rows) {
    const current = byJournal.get(line.journal_id) || [];
    current.push(line);
    byJournal.set(line.journal_id, current);
  }
  return journals.rows.map((journal) => publicJournal(mapJournal(journal), byJournal.get(journal.id) || []));
}

export function assertLedgerReadable(claim) {
  if (!claim) throw new HttpError(404, 'RECORD_NOT_FOUND', 'Record not found.');
  return claim;
}
