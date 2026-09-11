# Phase 1 claim ledger

This is the first system-of-record primitive Reven can actually defend.

The partner-claim row remains the working register (status, explanation, version).
The **ledger** is the immutable economic history. Money fields on the claim can
still change through dedicated workflow actions; those changes now also append a
balanced journal. There is no `UPDATE` or `DELETE` path on journal or entry
rows — Postgres triggers reject mutation.

## What Phase 1 records

| Event | Debit | Credit | Amount |
|---|---|---|---|
| Claim registered | `pipeline_value` | `pipeline_control` | Estimated deal value |
| Attribution decided | `attributed_value` | `attribution_control` | Basis × attribution % |
| Revenue recorded | `pipeline_value` | `pipeline_control` | Actual revenue evidence |
| Eligibility evaluated | `eligible_obligation` | `eligibility_control` | Server-calculated payout if eligible, else 0 |
| Payout recorded | `recorded_payout` | `payout_control` | First-payout *milestone* |

Payout recording is still **not settlement**. It writes a finance-reviewable
milestone. No rail, no disbursement, no clearance.

## Invariants

- Amounts are stored as integer minor units.
- Every journal is balanced before insert.
- Posts are idempotent on `(organization_id, idempotency_key)`.
- Attribution keys are versioned (`claim:{id}:attribution:vN`) so a later
  decision appends; it never overwrites.
- Claim records cannot be hard-deleted once they exist.

## API

- `GET /api/claims/:id/ledger` — journals for one claim
- `GET /api/claims/ledger` — recent organization journals
- Existing workflow `POST`s now return `{ record, journal }`
