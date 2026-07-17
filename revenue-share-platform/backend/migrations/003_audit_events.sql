-- 003_audit_events
-- Append-only audit trail. A core pilot-readiness requirement: "audit history
-- is immutable" and "legal can see who changed or sent what and when."
--
-- Immutability is enforced at the database level by a trigger that rejects any
-- UPDATE or DELETE, so recorded events cannot be altered after the fact.

CREATE TABLE IF NOT EXISTS audit_events (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  actor_user_id INTEGER REFERENCES users(id),
  entity_type VARCHAR(100) NOT NULL,     -- e.g. amendment, contract, partner
  entity_id INTEGER,
  action VARCHAR(100) NOT NULL,          -- e.g. created, updated, deleted, notice_sent, acknowledged
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_events_entity ON audit_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_tenant ON audit_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_actor  ON audit_events(actor_user_id);

-- Enforce append-only: reject UPDATE and DELETE at the database level.
CREATE OR REPLACE FUNCTION audit_events_immutable() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'audit_events is append-only; % is not allowed', TG_OP;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS audit_events_no_mutate ON audit_events;
CREATE TRIGGER audit_events_no_mutate
  BEFORE UPDATE OR DELETE ON audit_events
  FOR EACH ROW EXECUTE FUNCTION audit_events_immutable();
