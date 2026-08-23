import pool, { withTransaction } from './database.js';

const migrations = [
  {
    version: 1,
    name: 'self_hosted_core',
    sql: `
      CREATE TABLE IF NOT EXISTS reven_organizations (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS reven_users (
        id UUID PRIMARY KEY,
        organization_id UUID NOT NULL REFERENCES reven_organizations(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 200),
        role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'operator', 'viewer')),
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_login_at TIMESTAMPTZ
      );
      CREATE UNIQUE INDEX IF NOT EXISTS reven_users_email_unique
        ON reven_users (lower(email));
      CREATE INDEX IF NOT EXISTS reven_users_organization_idx
        ON reven_users (organization_id);

      CREATE TABLE IF NOT EXISTS reven_sessions (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES reven_users(id) ON DELETE CASCADE,
        token_hash CHAR(64) NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        ip_address TEXT,
        user_agent TEXT
      );
      CREATE INDEX IF NOT EXISTS reven_sessions_user_idx ON reven_sessions (user_id);
      CREATE INDEX IF NOT EXISTS reven_sessions_expiry_idx ON reven_sessions (expires_at);

      CREATE TABLE IF NOT EXISTS reven_records (
        id UUID PRIMARY KEY,
        organization_id UUID NOT NULL REFERENCES reven_organizations(id) ON DELETE CASCADE,
        entity_type TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(data) = 'object'),
        version INTEGER NOT NULL DEFAULT 1,
        created_by UUID REFERENCES reven_users(id) ON DELETE SET NULL,
        updated_by UUID REFERENCES reven_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS reven_records_org_type_created_idx
        ON reven_records (organization_id, entity_type, created_at DESC)
        WHERE deleted_at IS NULL;
      CREATE INDEX IF NOT EXISTS reven_records_data_gin_idx
        ON reven_records USING GIN (data jsonb_path_ops)
        WHERE deleted_at IS NULL;

      CREATE TABLE IF NOT EXISTS reven_audit_log (
        id UUID PRIMARY KEY,
        organization_id UUID NOT NULL REFERENCES reven_organizations(id) ON DELETE CASCADE,
        actor_id UUID REFERENCES reven_users(id) ON DELETE SET NULL,
        actor_name TEXT,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        record_id UUID,
        record_label TEXT,
        details TEXT,
        changed_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
        request_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS reven_audit_org_created_idx
        ON reven_audit_log (organization_id, created_at DESC);
    `,
  },
  {
    version: 2,
    name: 'required_password_rotation',
    sql: `
      ALTER TABLE reven_users
        ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT FALSE;
    `,
  },
];

export async function runMigrations() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reven_schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await withTransaction(async (client) => {
    await client.query('SELECT pg_advisory_xact_lock($1)', [772024]);
    const applied = await client.query('SELECT version FROM reven_schema_migrations');
    const versions = new Set(applied.rows.map((row) => row.version));

    for (const migration of migrations) {
      if (versions.has(migration.version)) continue;
      await client.query(migration.sql);
      await client.query(
        'INSERT INTO reven_schema_migrations (version, name) VALUES ($1, $2)',
        [migration.version, migration.name],
      );
    }
  });
}
