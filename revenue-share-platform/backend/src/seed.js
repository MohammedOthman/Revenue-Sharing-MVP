/**
 * Demo seed / reset for the Reven Phase 1 Capture workspace.
 *
 * Run with:  npm run seed
 *
 * This RESETS the domain tables (partners, contracts, amendments, revenue,
 * KPIs, legal documents) and inserts a coherent Saudi/GCC revenue-sharing
 * demo dataset, plus the demo admin login. The users table is not wiped; the
 * admin is upserted by email.
 *
 * Demo login:  admin@example.com  /  password123
 */
import pool from './config/database.js';
import { runMigrations } from './migrate.js';
import { hashPassword } from './utils/password.js';

const seed = async () => {
  await runMigrations();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Reset domain data in FK-safe order.
    await client.query('DELETE FROM contract_amendments');
    await client.query('DELETE FROM revenue_shares');
    await client.query('DELETE FROM kpis');
    await client.query('DELETE FROM legal_documents');
    await client.query('DELETE FROM contracts');
    await client.query('DELETE FROM partners');

    // Demo admin (upsert by unique email).
    const passwordHash = await hashPassword('password123');
    const adminRes = await client.query(
      `INSERT INTO users (email, password_hash, full_name, role)
       VALUES ($1, $2, $3, 'admin')
       ON CONFLICT (email)
       DO UPDATE SET password_hash = EXCLUDED.password_hash, full_name = EXCLUDED.full_name, role = 'admin'
       RETURNING id`,
      ['admin@example.com', passwordHash, 'Reven Admin']
    );
    const adminId = adminRes.rows[0].id;

    // All seeded data belongs to the default tenant (created by migration 002),
    // so it is visible under row-level security enforcement.
    const tenantId = (await client.query("SELECT id FROM tenants WHERE slug = 'default'")).rows[0].id;

    // The admin must be a member of the default tenant, otherwise tenant
    // resolution denies every request once enforcement is on.
    await client.query(
      `INSERT INTO memberships (user_id, tenant_id, role, status)
       VALUES ($1, $2, 'admin', 'active')
       ON CONFLICT (user_id, tenant_id) DO UPDATE SET role = 'admin', status = 'active'`,
      [adminId, tenantId]
    );

    // Partners
    const partnerRows = [
      ['Saudi Digital Payments Co.', 'partners@sdp.com.sa', 'Saudi Digital Payments Co.', 'strategic', 'active', 'Layla Al-Harbi', '+966 11 200 3000', 'Riyadh, Saudi Arabia'],
      ['Gulf Fintech Partners', 'deals@gulffintech.com', 'Gulf Fintech Partners', 'reseller', 'active', 'Omar Nasser', '+966 13 400 5000', 'Dammam, Saudi Arabia'],
      ['Najd Commerce Solutions', 'hello@najdcommerce.sa', 'Najd Commerce Solutions', 'affiliate', 'pending', 'Sara Al-Otaibi', '+966 11 600 7000', 'Riyadh, Saudi Arabia'],
    ];
    const partnerIds = [];
    for (const [name, email, company, type, status, contact, phone, address] of partnerRows) {
      const r = await client.query(
        `INSERT INTO partners (name, email, company, type, status, contact_person, phone, address, tenant_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
        [name, email, company, type, status, contact, phone, address, tenantId]
      );
      partnerIds.push(r.rows[0].id);
    }

    // Contracts (SAR revenue-sharing agreements)
    const contractRows = [
      [partnerIds[0], 'Payment Gateway Revenue Share 2026', 'Revenue share on processed payment volume.', '2026-01-01', '2026-12-31', 12.5, 5000, 'monthly', 'active'],
      [partnerIds[1], 'Reseller Program — Eastern Province', 'Reseller revenue share for the Eastern Province.', '2026-03-01', '2027-02-28', 20.0, 3000, 'quarterly', 'active'],
      [partnerIds[2], 'Affiliate Referral Agreement', 'Referral commission on closed merchant accounts.', '2026-02-15', null, 8.0, 1000, 'monthly', 'draft'],
    ];
    const contractIds = [];
    for (const [pid, title, desc, start, end, share, minPayout, terms, status] of contractRows) {
      const r = await client.query(
        `INSERT INTO contracts (partner_id, title, description, start_date, end_date, revenue_share_percentage, minimum_payout, payment_terms, status, created_by, tenant_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
        [pid, title, desc, start, end, share, minPayout, terms, status, adminId, tenantId]
      );
      contractIds.push(r.rows[0].id);
    }

    // Revenue-share records (recorded / pending — no money movement)
    const revenueRows = [
      [contractIds[0], '2026-01-01', '2026-01-31', 480000, 12.5, 60000, 'paid', '2026-02-05'],
      [contractIds[0], '2026-02-01', '2026-02-28', 520000, 12.5, 65000, 'pending', null],
      [contractIds[1], '2026-03-01', '2026-03-31', 210000, 20.0, 42000, 'pending', null],
    ];
    for (const [cid, ps, pe, total, share, amount, status, paidAt] of revenueRows) {
      await client.query(
        `INSERT INTO revenue_shares (contract_id, period_start, period_end, total_revenue, share_percentage, share_amount, status, paid_at, tenant_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [cid, ps, pe, total, share, amount, status, paidAt, tenantId]
      );
    }

    // KPIs
    const kpiRows = [
      [contractIds[0], 'Monthly Processed Volume (SAR)', 'Total payment volume processed per month.', 600000, 520000, 'SAR', 'monthly', 'on-track'],
      [contractIds[1], 'Active Merchants Onboarded', 'Merchants activated in the Eastern Province.', 50, 18, 'merchants', 'quarterly', 'at-risk'],
      [contractIds[0], 'Settlement Accuracy', 'Reconciliation accuracy of recorded shares.', 100, 99, '%', 'monthly', 'on-track'],
    ];
    for (const [cid, name, desc, target, actual, unit, period, status] of kpiRows) {
      await client.query(
        `INSERT INTO kpis (contract_id, name, description, target_value, actual_value, unit, period_type, status, tenant_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [cid, name, desc, target, actual, unit, period, status, tenantId]
      );
    }

    // Legal documents (metadata / evidence links)
    const docRows = [
      [contractIds[0], 'agreement', 'Payment Gateway Revenue Share Agreement', '1.0', 'approved'],
      [contractIds[1], 'agreement', 'Reseller Program Master Agreement', '1.0', 'signed'],
    ];
    for (const [cid, type, name, version, status] of docRows) {
      await client.query(
        `INSERT INTO legal_documents (contract_id, document_type, document_name, version, status, uploaded_by, tenant_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [cid, type, name, version, status, adminId, tenantId]
      );
    }

    // Amendment journeys — one fully ready-to-notify, one partial draft.
    const readyChannels = JSON.stringify(['platform', 'email']);
    await client.query(
      `INSERT INTO contract_amendments (
         contract_id, article_reference, amendment_type, amendment_mechanism, reason,
         public_interest_basis, necessity_confirmed, no_new_contract_confirmed,
         no_nature_change_confirmed, notice_period_days, authority_source, decision_date,
         effective_date, partner_impact, calculation_method, amendment_letter_reference,
         notice_channels, notice_message, notice_message_language, status, created_by, tenant_id
       ) VALUES (
         $1,'Article 12','value','amendment_letter',
         'Adjust the revenue-share percentage in line with revised processing costs.',
         'Aligns pricing with the actual cost of service in the public interest.',
         TRUE, TRUE, TRUE, 30, 'Board Resolution 2026/14', '2026-04-01', '2026-05-01',
         'Revenue-share percentage changes from 12.5% to 11.0% going forward.',
         'New percentage applied to processed volume from the effective date.',
         'AL-2026-014', $2::jsonb,
         'نُبلغكم بتعديل نسبة المشاركة في الإيرادات وفقاً للمادة 12 من العقد اعتباراً من تاريخ النفاذ.',
         'ar', 'ready', $3, $4
       )`,
      [contractIds[0], readyChannels, adminId, tenantId]
    );

    await client.query(
      `INSERT INTO contract_amendments (
         contract_id, article_reference, amendment_type, amendment_mechanism, reason,
         notice_period_days, notice_channels, notice_message_language, status, created_by, tenant_id
       ) VALUES (
         $1, 'Article 5', 'duration', 'addendum',
         'Extend the reseller term by twelve months.',
         14, '["platform"]'::jsonb, 'ar', 'draft', $2, $3
       )`,
      [contractIds[1], adminId, tenantId]
    );

    await client.query('COMMIT');

    console.log('Seed complete.');
    console.log(`  Admin login: admin@example.com / password123`);
    console.log(`  ${partnerIds.length} partners, ${contractIds.length} contracts, ${revenueRows.length} revenue records, ${kpiRows.length} KPIs, ${docRows.length} documents, 2 amendment journeys.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  await pool.end();
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
