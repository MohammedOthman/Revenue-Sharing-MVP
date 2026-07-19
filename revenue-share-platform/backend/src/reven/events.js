// Append-only writers. Two distinct trails (PDRv5 ADR-0002):
//  - claim_events: the domain Event Log (the source of truth, machine-facing)
//  - audit_log:    the human-readable who/what/when/why trail
// Both tables reject UPDATE/DELETE at the database level (see migration 003).
// jsonb values are stringified explicitly so JS arrays are stored as JSON arrays
// (node-postgres would otherwise coerce an array to a Postgres array literal).

export const recordEvent = async (
  client,
  { tenantId, claimId, eventType, fromStatus = null, toStatus = null, actorUserId = null, reason = null, payload = {} }
) => {
  await client.query(
    `INSERT INTO claim_events
       (tenant_id, claim_id, event_type, from_status, to_status, actor_user_id, reason, payload)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb)`,
    [tenantId, claimId, eventType, fromStatus, toStatus, actorUserId, reason, JSON.stringify(payload)]
  );
};

export const writeAudit = async (
  client,
  { tenantId, actorUserId = null, action, entityType, entityId = null, metadata = {} }
) => {
  await client.query(
    `INSERT INTO audit_log (tenant_id, actor_user_id, action, entity_type, entity_id, metadata)
     VALUES ($1,$2,$3,$4,$5,$6::jsonb)`,
    [tenantId, actorUserId, action, entityType, entityId != null ? String(entityId) : null, JSON.stringify(metadata)]
  );
};
