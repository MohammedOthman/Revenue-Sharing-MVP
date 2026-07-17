-- 001_initial_schema
-- Baseline schema for the Reven Phase 1 Capture workspace.
-- Uses IF NOT EXISTS so an existing database (previously created by the
-- boot-time createTables path) can adopt migration tracking without conflict.

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

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
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

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
);

CREATE TABLE IF NOT EXISTS legal_documents (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500),
  file_url VARCHAR(500),
  version VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contract_amendments (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  article_reference VARCHAR(255),
  amendment_type VARCHAR(100),
  amendment_mechanism VARCHAR(100),
  reason TEXT,
  public_interest_basis TEXT,
  necessity_confirmed BOOLEAN DEFAULT FALSE,
  no_new_contract_confirmed BOOLEAN DEFAULT FALSE,
  no_nature_change_confirmed BOOLEAN DEFAULT FALSE,
  notice_period_days INTEGER,
  authority_source VARCHAR(255),
  decision_date DATE,
  effective_date DATE,
  partner_impact TEXT,
  calculation_method TEXT,
  amendment_letter_reference VARCHAR(255),
  notice_channels JSONB DEFAULT '[]'::jsonb,
  notice_message TEXT,
  notice_message_language VARCHAR(10) DEFAULT 'ar',
  status VARCHAR(50) DEFAULT 'draft',
  notified_at TIMESTAMP,
  acknowledged_at TIMESTAMP,
  acknowledgment_note TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
