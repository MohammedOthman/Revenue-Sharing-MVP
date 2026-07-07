// Seed script: creates the initial admin account and (with --demo) sample data.
//   node src/seed.js            -> admin account only
//   node src/seed.js --demo     -> admin account + demo partners/contracts/revenue
// Idempotent: safe to run repeatedly.
import crypto from 'crypto';
import { validateEnv } from './config/env.js';

validateEnv();

const { default: pool } = await import('./config/database.js');
const { createTables } = await import('./models/schema.js');
const { hashPassword } = await import('./utils/password.js');

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
// Never default to a known password: generate one and print it once.
const GENERATED_PASSWORD = crypto.randomBytes(9).toString('base64url');
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || GENERATED_PASSWORD;
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || 'Platform Admin';
const withDemo = process.argv.includes('--demo');

const upsertUser = async (email, password, fullName, role) => {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log(`User ${email} already exists, skipping`);
    return existing.rows[0].id;
  }
  const hash = await hashPassword(password);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id',
    [email, hash, fullName, role]
  );
  console.log(`Created ${role} user: ${email}`);
  return result.rows[0].id;
};

const upsertPartner = async (partner) => {
  const existing = await pool.query('SELECT id FROM partners WHERE email = $1', [partner.email]);
  if (existing.rows.length > 0) return existing.rows[0].id;
  const result = await pool.query(
    `INSERT INTO partners (name, email, company, type, status, contact_person, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [partner.name, partner.email, partner.company, partner.type, partner.status, partner.contactPerson, partner.phone]
  );
  console.log(`Created partner: ${partner.name}`);
  return result.rows[0].id;
};

const run = async () => {
  await createTables();

  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.warn(
      `NOTE: SEED_ADMIN_PASSWORD not set — generated a one-time password for ${ADMIN_EMAIL}:\n` +
        `    ${ADMIN_PASSWORD}\n` +
        'Store it now (it is not saved anywhere) and change it after first login.'
    );
  }

  const adminId = await upsertUser(ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, 'admin');

  if (withDemo) {
    const acmeId = await upsertPartner({
      name: 'Acme Referrals', email: 'partners@acme.example', company: 'Acme Corp',
      type: 'referral', status: 'active', contactPerson: 'Sara Al-Rashid', phone: '+966-500-000-001',
    });
    const nimbusId = await upsertPartner({
      name: 'Nimbus Resellers', email: 'alliances@nimbus.example', company: 'Nimbus LLC',
      type: 'reseller', status: 'active', contactPerson: 'Omar Haddad', phone: '+966-500-000-002',
    });

    const contracts = await pool.query('SELECT COUNT(*)::int AS c FROM contracts');
    if (contracts.rows[0].c === 0) {
      const contract = await pool.query(
        `INSERT INTO contracts (partner_id, title, description, start_date, end_date,
           revenue_share_percentage, minimum_payout, payment_terms, status, created_by)
         VALUES ($1, 'Acme Referral Agreement 2026', 'Standard referral revenue share', '2026-01-01', '2026-12-31',
           15.00, 500, 'monthly', 'active', $2) RETURNING id`,
        [acmeId, adminId]
      );
      const contractId = contract.rows[0].id;

      await pool.query(
        `INSERT INTO contracts (partner_id, title, description, start_date,
           revenue_share_percentage, minimum_payout, payment_terms, status, created_by)
         VALUES ($1, 'Nimbus Reseller Agreement', 'Tiered reseller agreement', '2026-03-01',
           20.00, 1000, 'quarterly', 'draft', $2)`,
        [nimbusId, adminId]
      );

      await pool.query(
        `INSERT INTO revenue_shares (contract_id, period_start, period_end, total_revenue, share_percentage, share_amount, status)
         VALUES
           ($1, '2026-05-01', '2026-05-31', 42000, 15.00, 6300, 'paid'),
           ($1, '2026-06-01', '2026-06-30', 55000, 15.00, 8250, 'pending')`,
        [contractId]
      );

      await pool.query(
        `INSERT INTO kpis (contract_id, name, description, target_value, actual_value, unit, period_type, status)
         VALUES
           ($1, 'Monthly Referred Revenue', 'Revenue referred by Acme per month', 50000, 55000, 'USD', 'monthly', 'active'),
           ($1, 'Qualified Leads', 'Qualified leads delivered per month', 40, 28, 'leads', 'monthly', 'active')`,
        [contractId]
      );

      await pool.query(
        `INSERT INTO legal_documents (contract_id, document_type, document_name, version, status, uploaded_by)
         VALUES ($1, 'agreement', 'Acme Referral Agreement — Signed Copy', '1.0', 'signed', $2)`,
        [contractId, adminId]
      );
      console.log('Created demo contracts, revenue shares, KPIs, and documents');
    } else {
      console.log('Contracts already exist, skipping demo data');
    }
  }

  await pool.end();
  console.log('Seed complete');
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
