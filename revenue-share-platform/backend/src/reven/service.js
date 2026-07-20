// Reven Phase-1 "Capture" domain service.
//
// Invariants held here (from the strategy corpus):
//  * No money moves. Eligibility READS/CALCULATES/DISPLAYS; payment is a recorded
//    fact, never an execution.
//  * Attribution of Record is human-decided; re-decisions are new versions.
//  * The share amount is computed server-side from the agreement rule — never
//    accepted from the client (fixing the audited "share trusted from the browser").
//  * Every state change appends a domain event and an audit-log row, inside the
//    same transaction as the write it describes.
import pool from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateTenantToken } from './tenantAuth.js';
import { recordEvent, writeAudit } from './events.js';

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

const withTx = async (fn) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const recordMilestoneOnce = async (client, tenantId, milestone, claimId) => {
  const res = await client.query(
    `INSERT INTO tenant_milestones (tenant_id, milestone, claim_id)
     VALUES ($1,$2,$3)
     ON CONFLICT (tenant_id, milestone) DO NOTHING
     RETURNING id`,
    [tenantId, milestone, claimId]
  );
  return res.rows.length > 0; // true if this was the first time
};

// ---- Onboarding / auth ------------------------------------------------------

export const onboardTenant = ({ tenantName, slug, country, email, password, fullName }) =>
  withTx(async (client) => {
    const existing = await client.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length) throw Object.assign(new Error('User already exists'), { status: 409 });

    const t = await client.query(
      `INSERT INTO tenants (name, slug, country) VALUES ($1,$2,$3) RETURNING *`,
      [tenantName, slug, country || null]
    );
    const tenant = t.rows[0];

    const passwordHash = await hashPassword(password);
    const u = await client.query(
      `INSERT INTO users (email, password_hash, full_name, role, tenant_id)
       VALUES ($1,$2,$3,'owner',$4) RETURNING id, email, full_name, role, tenant_id`,
      [email, passwordHash, fullName, tenant.id]
    );
    const user = u.rows[0];

    await writeAudit(client, {
      tenantId: tenant.id, actorUserId: user.id, action: 'tenant.created',
      entityType: 'tenant', entityId: tenant.id, metadata: { name: tenantName, slug },
    });

    const token = generateTenantToken(user, tenant.id);
    return { tenant, user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role }, token };
  });

export const loginTenantUser = async ({ email, password }) => {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = res.rows[0];
  if (!user || !user.tenant_id) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const token = generateTenantToken(user, user.tenant_id);
  return { user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role }, tenantId: user.tenant_id, token };
};

// ---- Partners (cross-tenant identity + tenant-local record) -----------------

export const createPartner = (tenantId, actor, data) =>
  withTx(async (client) => {
    const { legalName, domain, country, taxId, displayName, partnerType } = data;
    // Reuse a global partner identity when the domain or tax id already exists.
    let identity = null;
    if (domain) identity = (await client.query('SELECT * FROM partner_identities WHERE domain=$1', [domain])).rows[0];
    if (!identity && taxId) identity = (await client.query('SELECT * FROM partner_identities WHERE tax_id=$1', [taxId])).rows[0];
    if (!identity) {
      identity = (await client.query(
        `INSERT INTO partner_identities (legal_name, domain, country, tax_id) VALUES ($1,$2,$3,$4) RETURNING *`,
        [legalName || displayName, domain || null, country || null, taxId || null]
      )).rows[0];
    }

    const tp = await client.query(
      `INSERT INTO tenant_partners (tenant_id, partner_identity_id, display_name, partner_type)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (tenant_id, partner_identity_id) DO UPDATE SET display_name=EXCLUDED.display_name
       RETURNING *`,
      [tenantId, identity.id, displayName || legalName, partnerType || null]
    );
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'partner.created',
      entityType: 'tenant_partner', entityId: tp.rows[0].id, metadata: { identityId: identity.id, domain },
    });
    return { partner: tp.rows[0], identity };
  });

export const verifyPartnerReadiness = (tenantId, actor, partnerId, { bankVerified, taxVerified, taxProfile }) =>
  withTx(async (client) => {
    const res = await client.query(
      `UPDATE tenant_partners
         SET bank_verified = COALESCE($3, bank_verified),
             tax_verified  = COALESCE($4, tax_verified),
             tax_profile   = COALESCE($5::jsonb, tax_profile)
       WHERE tenant_id=$1 AND id=$2 RETURNING *`,
      [tenantId, partnerId, bankVerified ?? null, taxVerified ?? null, taxProfile ? JSON.stringify(taxProfile) : null]
    );
    if (!res.rows.length) throw Object.assign(new Error('Partner not found'), { status: 404 });
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'partner.readiness_updated',
      entityType: 'tenant_partner', entityId: partnerId, metadata: { bankVerified, taxVerified },
    });
    return res.rows[0];
  });

export const listPartners = (tenantId) =>
  pool.query(
    `SELECT tp.*, pi.legal_name, pi.domain, pi.tax_id
       FROM tenant_partners tp JOIN partner_identities pi ON tp.partner_identity_id = pi.id
      WHERE tp.tenant_id=$1 ORDER BY tp.created_at DESC`,
    [tenantId]
  ).then((r) => r.rows);

// ---- Agreements (rule terms, preview only) ----------------------------------

export const createAgreement = (tenantId, actor, data) =>
  withTx(async (client) => {
    const a = await client.query(
      `INSERT INTO agreements
        (tenant_id, tenant_partner_id, name, agreement_type, share_basis, share_rate,
         cap_amount, floor_amount, currency, wht_rate, vat_treatment,
         protection_window_days, protection_scope, effective_from, effective_to, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
      [
        tenantId, data.tenantPartnerId || null, data.name, data.agreementType || null,
        data.shareBasis || 'revenue_share', data.shareRate ?? 0, data.capAmount ?? null,
        data.floorAmount ?? null, data.currency || 'SAR', data.whtRate ?? 0, data.vatTreatment || null,
        data.protectionWindowDays ?? null, data.protectionScope || 'account',
        data.effectiveFrom || null, data.effectiveTo || null, actor.id,
      ]
    );
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'agreement.created',
      entityType: 'agreement', entityId: a.rows[0].id, metadata: { name: data.name, shareRate: data.shareRate },
    });
    return a.rows[0];
  });

export const listAgreements = (tenantId) =>
  pool.query('SELECT * FROM agreements WHERE tenant_id=$1 ORDER BY created_at DESC', [tenantId]).then((r) => r.rows);

// ---- Claim registration + preflight -----------------------------------------

const runPreflight = async (client, tenantId, claim) => {
  // Deterministic duplicate detection on the cleanest keys (account domain / opp id).
  let result = 'pass';
  if (claim.customer_domain || claim.opportunity_id) {
    const dup = await client.query(
      `SELECT id FROM claims
        WHERE tenant_id=$1 AND id<>$2
          AND ( (customer_domain IS NOT NULL AND customer_domain=$3)
             OR (opportunity_id  IS NOT NULL AND opportunity_id=$4) )
          AND status NOT IN ('withdrawn') LIMIT 1`,
      [tenantId, claim.id, claim.customer_domain, claim.opportunity_id]
    );
    if (dup.rows.length) result = 'duplicate_risk';
  }
  if (result === 'pass' && !claim.agreement_id) result = 'agreement_gap';
  if ((result === 'pass' || result === 'agreement_gap') && claim.customer_domain) {
    const conflict = await client.query(
      `SELECT id FROM protection_windows
        WHERE tenant_id=$1 AND status='active' AND scope_ref=$2 AND tenant_partner_id<>$3 LIMIT 1`,
      [tenantId, claim.customer_domain, claim.tenant_partner_id]
    );
    if (conflict.rows.length) result = 'protection_conflict';
  }
  return result;
};

export const registerClaim = (tenantId, actor, data) =>
  withTx(async (client) => {
    const ins = await client.query(
      `INSERT INTO claims
        (tenant_id, tenant_partner_id, partner_role, agreement_id, customer_account_id,
         customer_account_name, customer_domain, customer_tax_id, contact_id, opportunity_id,
         crm_opportunity_url, product, estimated_deal_value, currency, expected_close_date,
         claim_source, status, owner_user_id, submitted_by, submitted_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'submitted',$17,$17,now())
       RETURNING *`,
      [
        tenantId, data.tenantPartnerId, data.partnerRole || null, data.agreementId || null,
        data.customerAccountId || null, data.customerAccountName, data.customerDomain || null,
        data.customerTaxId || null, data.contactId || null, data.opportunityId || null,
        data.crmOpportunityUrl || null, data.product || null, data.estimatedDealValue ?? null,
        data.currency || 'SAR', data.expectedCloseDate || null, data.claimSource || 'internal', actor.id,
      ]
    );
    let claim = ins.rows[0];

    await recordEvent(client, {
      tenantId, claimId: claim.id, eventType: 'claim.submitted', toStatus: 'submitted',
      actorUserId: actor.id, payload: { customer: claim.customer_account_name, value: claim.estimated_deal_value },
    });
    const firstClaim = await recordMilestoneOnce(client, tenantId, 'first_claim', claim.id);

    // Preflight.
    const preflight = await runPreflight(client, tenantId, claim);
    const proceeds = preflight === 'pass' || preflight === 'agreement_gap';
    const newStatus = proceeds ? 'in_attribution' : 'preflight_review';

    // Grant a protection window when the claim proceeds (not on a conflict).
    let protectionStart = null, protectionEnd = null;
    if (proceeds) {
      let days = 90; // default; docs leave the per-type default open, so 90 is our explicit default
      if (claim.agreement_id) {
        const ag = await client.query('SELECT protection_window_days, protection_scope FROM agreements WHERE id=$1', [claim.agreement_id]);
        if (ag.rows[0]?.protection_window_days) days = ag.rows[0].protection_window_days;
      }
      const pw = await client.query(
        `INSERT INTO protection_windows (tenant_id, claim_id, tenant_partner_id, scope, scope_ref, starts_on, ends_on)
         VALUES ($1,$2,$3,'account',$4, CURRENT_DATE, CURRENT_DATE + $5::int)
         RETURNING starts_on, ends_on`,
        [tenantId, claim.id, claim.tenant_partner_id, claim.customer_domain || null, days]
      );
      protectionStart = pw.rows[0].starts_on;
      protectionEnd = pw.rows[0].ends_on;
      await recordEvent(client, {
        tenantId, claimId: claim.id, eventType: 'protection.granted',
        actorUserId: actor.id, payload: { scope: 'account', scopeRef: claim.customer_domain, days },
      });
    }

    const upd = await client.query(
      `UPDATE claims SET preflight_result=$2, status=$3,
              protection_window_start=$4, protection_window_end=$5, updated_at=now()
       WHERE id=$1 RETURNING *`,
      [claim.id, preflight, newStatus, protectionStart, protectionEnd]
    );
    claim = upd.rows[0];

    await recordEvent(client, {
      tenantId, claimId: claim.id, eventType: 'claim.preflight', fromStatus: 'submitted',
      toStatus: newStatus, actorUserId: actor.id, payload: { preflight },
    });
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'claim.registered',
      entityType: 'claim', entityId: claim.id, metadata: { preflight, firstClaim },
    });
    return { claim, preflight, protection: proceeds ? { start: protectionStart, end: protectionEnd } : null };
  });

// ---- Attribution of Record (human-decided, versioned) -----------------------

export const decideAttribution = (tenantId, actor, claimId, data) =>
  withTx(async (client) => {
    const c = await client.query('SELECT * FROM claims WHERE tenant_id=$1 AND id=$2', [tenantId, claimId]);
    if (!c.rows.length) throw Object.assign(new Error('Claim not found'), { status: 404 });
    const claim = c.rows[0];

    const decision = data.decision; // accepted | partial | rejected | duplicate
    if (!['accepted', 'partial', 'rejected', 'duplicate'].includes(decision)) {
      throw Object.assign(new Error('Invalid attribution decision'), { status: 400 });
    }

    // Version bump: mark any prior current row not-current, insert the new one.
    const prev = await client.query(
      'SELECT COALESCE(MAX(version),0) AS v FROM attribution_of_record WHERE claim_id=$1', [claimId]
    );
    const version = prev.rows[0].v + 1;
    await client.query('UPDATE attribution_of_record SET is_current=false WHERE claim_id=$1 AND is_current', [claimId]);

    const aor = await client.query(
      `INSERT INTO attribution_of_record
        (tenant_id, claim_id, version, decision, credited_partner_id, credit_percentage, basis, model_recommendation, decided_by, reason)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10) RETURNING *`,
      [
        tenantId, claimId, version, decision,
        data.creditedPartnerId || claim.tenant_partner_id,
        data.creditPercentage ?? 100, data.basis || claim.partner_role || null,
        JSON.stringify(data.modelRecommendation || { note: 'model stubbed in MVP' }),
        actor.id, data.reason || null,
      ]
    );

    await client.query(
      `UPDATE claims SET attribution_status='decided', status='decided', approver_user_id=$3, updated_at=now()
       WHERE id=$1 AND tenant_id=$2`,
      [claimId, tenantId, actor.id]
    );
    await recordEvent(client, {
      tenantId, claimId, eventType: 'attribution.decided', fromStatus: claim.status, toStatus: 'decided',
      actorUserId: actor.id, reason: data.reason || null, payload: { decision, version, creditPercentage: data.creditPercentage ?? 100 },
    });
    let firstAccepted = false;
    if (['accepted', 'partial'].includes(decision)) {
      firstAccepted = await recordMilestoneOnce(client, tenantId, 'first_accepted_claim', claimId);
    }
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'attribution.decided',
      entityType: 'claim', entityId: claimId, metadata: { decision, version },
    });
    return { attribution: aor.rows[0], firstAccepted };
  });

// ---- Revenue event (recorded/imported, not executed) ------------------------

export const recordRevenue = (tenantId, actor, claimId, data) =>
  withTx(async (client) => {
    const c = await client.query('SELECT * FROM claims WHERE tenant_id=$1 AND id=$2', [tenantId, claimId]);
    if (!c.rows.length) throw Object.assign(new Error('Claim not found'), { status: 404 });

    const re = await client.query(
      `INSERT INTO revenue_events (tenant_id, claim_id, basis, amount, currency, status, invoice_reference, collection_status, source, recorded_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        tenantId, claimId, data.basis || 'closed_won', data.amount, data.currency || 'SAR',
        data.status || 'closed_won', data.invoiceReference || null, data.collectionStatus || null,
        data.source || 'manual', actor.id,
      ]
    );
    await client.query('UPDATE claims SET revenue_status=$3, updated_at=now() WHERE id=$1 AND tenant_id=$2',
      [claimId, tenantId, re.rows[0].status]);
    await recordEvent(client, {
      tenantId, claimId, eventType: 'revenue.recorded', actorUserId: actor.id,
      payload: { amount: data.amount, status: re.rows[0].status, source: re.rows[0].source },
    });
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'revenue.recorded',
      entityType: 'claim', entityId: claimId, metadata: { amount: data.amount, status: re.rows[0].status },
    });
    return re.rows[0];
  });

// ---- Eligibility preview (calculate + explain; never pay) --------------------

const buildExplanation = ({ verdict, gross, net, wht, currency, missing, ruleApplied, base }) => {
  const parts = [];
  if (ruleApplied && ruleApplied.share_rate != null && base != null) {
    const creditNote = ruleApplied.credit_percentage !== 100 ? ` at ${ruleApplied.credit_percentage}% attribution credit` : '';
    parts.push(
      `Base ${currency} ${ruleApplied.base_amount} (${ruleApplied.base_source}) × ${(ruleApplied.share_rate * 100).toFixed(2)}%` +
      `${creditNote} = gross ${currency} ${gross}. Withholding ${(ruleApplied.wht_rate * 100).toFixed(2)}% = ${currency} ${wht}. ` +
      `Net preview ${currency} ${net}.`
    );
  } else {
    parts.push('Estimated amount not computed: missing an agreement rule or a deal/revenue value.');
  }
  if (verdict === 'eligible') {
    parts.push('All conditions met: attribution accepted, agreement covers the claim, revenue validated, and partner bank + tax verified. This is a PREVIEW — no payment is executed in Phase 1.');
  } else {
    parts.push(`Not payout-ready. Outstanding: ${missing.join('; ')}.`);
  }
  return parts.join(' ');
};

const computeEligibility = ({ claim, agreement, attribution, revenueEvent, partner }) => {
  const missing = [];
  const currency = agreement?.currency || claim.currency || 'SAR';

  const attrOk = attribution && ['accepted', 'partial'].includes(attribution.decision);
  if (!attribution) missing.push('Attribution of Record not yet decided by a human');
  else if (attribution.decision === 'rejected') missing.push('Attribution was rejected');
  else if (attribution.decision === 'duplicate') missing.push('Claim marked duplicate in attribution');

  if (!agreement) missing.push('No agreement coverage for this claim');

  const revenueValidated = revenueEvent && ['closed_won', 'invoiced', 'collected', 'recognized'].includes(revenueEvent.status);
  if (!revenueEvent) missing.push('No revenue event recorded');
  else if (!revenueValidated) missing.push(`Revenue not yet validated (status: ${revenueEvent.status})`);

  if (!partner?.bank_verified) missing.push('Partner bank details not verified');
  if (!partner?.tax_verified) missing.push('Partner tax details not verified');

  let gross = null, wht = null, net = null, ruleApplied = {};
  const base = revenueEvent?.amount != null ? Number(revenueEvent.amount)
    : claim.estimated_deal_value != null ? Number(claim.estimated_deal_value) : null;
  if (agreement && base != null) {
    const rate = Number(agreement.share_rate) || 0;
    let g = base * rate;
    if (agreement.cap_amount != null && g > Number(agreement.cap_amount)) g = Number(agreement.cap_amount);
    if (agreement.floor_amount != null && g < Number(agreement.floor_amount)) g = Number(agreement.floor_amount);
    const creditPct = attribution?.credit_percentage != null ? Number(attribution.credit_percentage) : 100;
    g = g * (creditPct / 100);
    const whtRate = Number(agreement.wht_rate) || 0;
    gross = round2(g); wht = round2(g * whtRate); net = round2(g - g * whtRate);
    ruleApplied = {
      share_basis: agreement.share_basis, share_rate: rate, cap_amount: agreement.cap_amount,
      floor_amount: agreement.floor_amount, credit_percentage: creditPct, wht_rate: whtRate,
      base_amount: round2(base), base_source: revenueEvent?.amount != null ? 'revenue_event' : 'estimated_deal_value',
    };
  }

  let verdict;
  if (missing.length === 0) verdict = 'eligible';
  else if (attrOk && agreement && revenueValidated) verdict = 'finance_review_required';
  else verdict = 'not_eligible';

  const explanation = buildExplanation({ verdict, gross, net, wht, currency, missing, ruleApplied, base });
  return { verdict, estimated_gross: gross, estimated_wht: wht, estimated_net: net, currency, missing_conditions: missing, agreement_rule_applied: ruleApplied, explanation };
};

export const evaluateEligibility = (tenantId, actor, claimId) =>
  withTx(async (client) => {
    const c = await client.query('SELECT * FROM claims WHERE tenant_id=$1 AND id=$2', [tenantId, claimId]);
    if (!c.rows.length) throw Object.assign(new Error('Claim not found'), { status: 404 });
    const claim = c.rows[0];

    const agreement = claim.agreement_id
      ? (await client.query('SELECT * FROM agreements WHERE id=$1', [claim.agreement_id])).rows[0] : null;
    const attribution = (await client.query(
      'SELECT * FROM attribution_of_record WHERE claim_id=$1 AND is_current', [claimId])).rows[0] || null;
    const revenueEvent = (await client.query(
      'SELECT * FROM revenue_events WHERE claim_id=$1 ORDER BY event_time DESC LIMIT 1', [claimId])).rows[0] || null;
    const partner = (await client.query(
      'SELECT * FROM tenant_partners WHERE id=$1', [claim.tenant_partner_id])).rows[0];

    const evalResult = computeEligibility({ claim, agreement, attribution, revenueEvent, partner });

    const prev = await client.query('SELECT COALESCE(MAX(version),0) AS v FROM eligibility_evaluations WHERE claim_id=$1', [claimId]);
    const version = prev.rows[0].v + 1;
    await client.query('UPDATE eligibility_evaluations SET is_current=false WHERE claim_id=$1 AND is_current', [claimId]);

    const ev = await client.query(
      `INSERT INTO eligibility_evaluations
        (tenant_id, claim_id, version, verdict, estimated_gross, estimated_wht, estimated_net, currency,
         agreement_rule_applied, missing_conditions, explanation, evaluated_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12) RETURNING *`,
      [
        tenantId, claimId, version, evalResult.verdict, evalResult.estimated_gross, evalResult.estimated_wht,
        evalResult.estimated_net, evalResult.currency, JSON.stringify(evalResult.agreement_rule_applied),
        JSON.stringify(evalResult.missing_conditions), evalResult.explanation, actor.id,
      ]
    );

    await client.query('UPDATE claims SET eligibility_status=$3, updated_at=now() WHERE id=$1 AND tenant_id=$2',
      [claimId, tenantId, evalResult.verdict]);
    await recordEvent(client, {
      tenantId, claimId, eventType: 'eligibility.evaluated', actorUserId: actor.id,
      payload: { verdict: evalResult.verdict, net: evalResult.estimated_net, version },
    });

    // On an eligible verdict, accrue on the append-only ledger (Accrued -> Eligible).
    // These are RECORDING states only; no payment is approved or executed.
    if (evalResult.verdict === 'eligible' && evalResult.estimated_net != null) {
      for (const state of ['accrued', 'eligible']) {
        await client.query(
          `INSERT INTO ledger_entries (tenant_id, claim_id, eligibility_id, state, entry_type, amount, currency, created_by)
           VALUES ($1,$2,$3,$4,'credit',$5,$6,$7)`,
          [tenantId, claimId, ev.rows[0].id, state, evalResult.estimated_net, evalResult.currency, actor.id]
        );
        await recordEvent(client, {
          tenantId, claimId, eventType: `ledger.${state}`, actorUserId: actor.id,
          payload: { amount: evalResult.estimated_net, currency: evalResult.currency },
        });
      }
    }
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'eligibility.evaluated',
      entityType: 'claim', entityId: claimId, metadata: { verdict: evalResult.verdict, net: evalResult.estimated_net },
    });
    return ev.rows[0];
  });

// ---- First-payout milestone (RECORDED, never executed) ----------------------

export const recordPayment = (tenantId, actor, claimId, data) =>
  withTx(async (client) => {
    const c = await client.query('SELECT id FROM claims WHERE tenant_id=$1 AND id=$2', [tenantId, claimId]);
    if (!c.rows.length) throw Object.assign(new Error('Claim not found'), { status: 404 });

    // This records that a payout happened out-of-band (manual entry or import).
    // Phase 1 does not move money, integrate a rail, or write a ledger 'paid' state.
    const firstPayout = await recordMilestoneOnce(client, tenantId, 'first_payout_recorded', claimId);
    await recordEvent(client, {
      tenantId, claimId, eventType: 'payment.recorded', actorUserId: actor.id,
      payload: { amount: data.amount, paidDate: data.paidDate || null, externalRef: data.externalRef || null, source: data.source || 'manual', note: 'recorded, not executed' },
    });
    await writeAudit(client, {
      tenantId, actorUserId: actor.id, action: 'payment.recorded',
      entityType: 'claim', entityId: claimId, metadata: { amount: data.amount, firstPayout, executed: false },
    });
    return { recorded: true, firstPayout };
  });

// ---- Reads ------------------------------------------------------------------

export const getClaim = async (tenantId, claimId) => {
  const claim = (await pool.query('SELECT * FROM claims WHERE tenant_id=$1 AND id=$2', [tenantId, claimId])).rows[0];
  if (!claim) return null;
  const [attribution, eligibility, events, protection] = await Promise.all([
    pool.query('SELECT * FROM attribution_of_record WHERE claim_id=$1 AND is_current', [claimId]).then((r) => r.rows[0] || null),
    pool.query('SELECT * FROM eligibility_evaluations WHERE claim_id=$1 AND is_current', [claimId]).then((r) => r.rows[0] || null),
    pool.query('SELECT event_type, from_status, to_status, reason, payload, created_at FROM claim_events WHERE claim_id=$1 ORDER BY id', [claimId]).then((r) => r.rows),
    pool.query('SELECT * FROM protection_windows WHERE claim_id=$1 ORDER BY created_at DESC LIMIT 1', [claimId]).then((r) => r.rows[0] || null),
  ]);
  return { claim, attribution, eligibility, protection, events };
};

export const listClaims = (tenantId) =>
  pool.query(
    `SELECT c.*, tp.display_name AS partner_name
       FROM claims c JOIN tenant_partners tp ON c.tenant_partner_id = tp.id
      WHERE c.tenant_id=$1 ORDER BY c.created_at DESC`,
    [tenantId]
  ).then((r) => r.rows);

// ---- Phase-1 exit-gate metrics ----------------------------------------------

export const getGateMetrics = async (tenantId) => {
  const [claims, accepted, partners, eligible, milestones, firstClaimAge] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS n FROM claims WHERE tenant_id=$1', [tenantId]).then((r) => r.rows[0].n),
    pool.query(`SELECT COUNT(*)::int AS n FROM attribution_of_record WHERE tenant_id=$1 AND is_current AND decision IN ('accepted','partial')`, [tenantId]).then((r) => r.rows[0].n),
    pool.query('SELECT COUNT(*)::int AS n FROM tenant_partners WHERE tenant_id=$1', [tenantId]).then((r) => r.rows[0].n),
    pool.query(`SELECT COUNT(*)::int AS n FROM eligibility_evaluations WHERE tenant_id=$1 AND is_current AND verdict='eligible'`, [tenantId]).then((r) => r.rows[0].n),
    pool.query('SELECT milestone, occurred_at FROM tenant_milestones WHERE tenant_id=$1', [tenantId]).then((r) => r.rows),
    pool.query(`SELECT EXTRACT(EPOCH FROM (MIN(occurred_at) - (SELECT created_at FROM tenants WHERE id=$1)))/86400 AS days
                  FROM tenant_milestones WHERE tenant_id=$1 AND milestone='first_claim'`, [tenantId]).then((r) => r.rows[0]?.days ?? null),
  ]);
  return {
    // Phase-1 exit gate: 100+ real claims, 3-5 design partners w/ finance-accepted
    // evidence pack, time-to-first-claim < ~14 days.
    claims: { count: claims, target: 100, met: claims >= 100 },
    accepted_claims: accepted,
    partners: { count: partners, target: 3 },
    eligible_previews: eligible,
    time_to_first_claim_days: firstClaimAge != null ? round2(firstClaimAge) : null,
    time_to_first_claim_target_days: 14,
    milestones,
  };
};
