import pool from '../config/database.js';

// Idempotent schema bootstrap: CREATE IF NOT EXISTS for tables, guarded
// ALTERs for columns/constraints so existing databases upgrade in place.
export const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        company VARCHAR(255),
        type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        contact_person VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS contracts (
        id SERIAL PRIMARY KEY,
        partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        revenue_share_percentage DECIMAL(5,2) NOT NULL,
        minimum_payout DECIMAL(10,2) DEFAULT 0,
        payment_terms VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        signed_at TIMESTAMP,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS revenue_shares (
        id SERIAL PRIMARY KEY,
        contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        total_revenue DECIMAL(12,2) NOT NULL,
        share_percentage DECIMAL(5,2) NOT NULL,
        share_amount DECIMAL(12,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        paid_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS kpis (
        id SERIAL PRIMARY KEY,
        contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        target_value DECIMAL(12,2) NOT NULL,
        actual_value DECIMAL(12,2) DEFAULT 0,
        unit VARCHAR(50),
        period_type VARCHAR(50) DEFAULT 'monthly',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS legal_documents (
        id SERIAL PRIMARY KEY,
        contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
        document_type VARCHAR(100) NOT NULL,
        document_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500),
        file_url VARCHAR(500),
        version VARCHAR(50),
        status VARCHAR(50) DEFAULT 'draft',
        expiry_date DATE,
        notes TEXT,
        uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        user_email VARCHAR(255),
        method VARCHAR(10) NOT NULL,
        path VARCHAR(500) NOT NULL,
        entity VARCHAR(100),
        entity_id INTEGER,
        status_code INTEGER,
        request_body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(64) NOT NULL,
        purpose VARCHAR(20) NOT NULL DEFAULT 'reset',
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Columns added after the original release (no-ops on fresh installs).
    await client.query(`ALTER TABLE legal_documents ADD COLUMN IF NOT EXISTS expiry_date DATE`);
    await client.query(`ALTER TABLE legal_documents ADD COLUMN IF NOT EXISTS notes TEXT`);

    // Existing databases created before ON DELETE SET NULL was added: rebuild
    // the two user FKs so deleting a user no longer fails with an FK violation.
    await client.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'contracts_created_by_fkey' AND confdeltype = 'a'
        ) THEN
          ALTER TABLE contracts DROP CONSTRAINT contracts_created_by_fkey;
          ALTER TABLE contracts ADD CONSTRAINT contracts_created_by_fkey
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
        END IF;
        IF EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'legal_documents_uploaded_by_fkey' AND confdeltype = 'a'
        ) THEN
          ALTER TABLE legal_documents DROP CONSTRAINT legal_documents_uploaded_by_fkey;
          ALTER TABLE legal_documents ADD CONSTRAINT legal_documents_uploaded_by_fkey
            FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL;
        END IF;
      END $$;
    `);

    // Data-integrity guardrails for financial fields.
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contracts_share_pct_range') THEN
          ALTER TABLE contracts ADD CONSTRAINT contracts_share_pct_range
            CHECK (revenue_share_percentage >= 0 AND revenue_share_percentage <= 100);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contracts_min_payout_nonneg') THEN
          ALTER TABLE contracts ADD CONSTRAINT contracts_min_payout_nonneg
            CHECK (minimum_payout >= 0);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'revenue_shares_pct_range') THEN
          ALTER TABLE revenue_shares ADD CONSTRAINT revenue_shares_pct_range
            CHECK (share_percentage >= 0 AND share_percentage <= 100);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'revenue_shares_amounts_nonneg') THEN
          ALTER TABLE revenue_shares ADD CONSTRAINT revenue_shares_amounts_nonneg
            CHECK (total_revenue >= 0 AND share_amount >= 0);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'revenue_shares_period_order') THEN
          ALTER TABLE revenue_shares ADD CONSTRAINT revenue_shares_period_order
            CHECK (period_end >= period_start);
        END IF;
      END $$;
    `);

    // Indexes for the hot lookup paths (FK joins + status filters).
    await client.query(`CREATE INDEX IF NOT EXISTS idx_contracts_partner_id ON contracts(partner_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_revenue_shares_contract_id ON revenue_shares(contract_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_revenue_shares_status ON revenue_shares(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_kpis_contract_id ON kpis(contract_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_legal_documents_contract_id ON legal_documents(contract_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_prt_token_hash ON password_reset_tokens(token_hash)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_contracts_end_date ON contracts(end_date)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_legal_documents_expiry ON legal_documents(expiry_date)`);

    console.log('Database schema is up to date');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};
