import { HttpError } from '../lib/http.js';

export const ENTITY_TYPES = Object.freeze([
  'Partner',
  'PartnerProgram',
  'Agreement',
  'PartnerClaim',
  'EcosystemTouchpoint',
  'PartnerStatement',
  'Dispute',
  'Decision',
  'ActionItem',
  'Forecast',
  'Customer',
  'Deal',
  'Activity',
  'LedgerEntry',
  'RevenueEvent',
  'RuleVersion',
  'Evidence',
  'Approval',
  'FXRate',
  'AuditEvent',
]);

const writableTypes = new Set(ENTITY_TYPES.filter((type) => type !== 'AuditEvent'));
const allowedTypes = new Set(ENTITY_TYPES);
const reservedKeys = new Set([
  'id',
  '_id',
  'created_date',
  'updated_date',
  'createdAt',
  'updatedAt',
  'version',
  '__proto__',
  'prototype',
  'constructor',
]);

const requirements = {
  Partner: ['legal_name'],
  PartnerProgram: ['name'],
  Agreement: ['partner_name', 'agreement_type'],
  PartnerClaim: ['partner_name', 'customer_account', 'claim_type', 'estimated_value'],
  EcosystemTouchpoint: ['partner_name', 'customer_account', 'touchpoint_type'],
  PartnerStatement: ['partner_name', 'statement_period'],
  Dispute: ['partner_name', 'dispute_type'],
  Decision: ['title'],
};

const enumFields = {
  Partner: {
    lifecycle_status: ['intake', 'qualifying', 'approved', 'onboarding', 'active', 'at_risk', 'dormant'],
    tier: ['tier_1', 'tier_2', 'tier_3', 'strategic'],
  },
  PartnerProgram: {
    status: ['draft', 'active', 'paused'],
    commercial_model: ['percentage', 'fixed_fee', 'tiered', 'hybrid'],
    attribution_model: ['sourced', 'influenced', 'multi_touch', 'custom'],
  },
  Agreement: {
    status: ['draft', 'pending_approval', 'active', 'expired', 'terminated'],
    payout_trigger: ['closed_won', 'invoiced', 'collected', 'recognized', 'net_revenue'],
  },
  PartnerClaim: {
    claim_status: ['submitted', 'accepted', 'rejected', 'payout_eligible', 'paid', 'needs_information', 'needs_evidence', 'finance_review_required', 'expired', 'duplicate'],
    preflight_status: ['pending', 'passed', 'needs_information', 'duplicate_risk', 'agreement_gap', 'protection_conflict', 'manual_review'],
    attribution_status: ['pending', 'needs_evidence', 'disputed', 'accepted', 'partially_accepted', 'rejected'],
    payout_eligibility_status: ['pending', 'not_eligible', 'missing_evidence', 'eligible'],
    payment_status: ['pending', 'paid'],
    revenue_status: ['pending', 'pipeline', 'closed_won', 'invoiced', 'collected', 'recognized', 'lost'],
  },
  EcosystemTouchpoint: {
    matching_confidence: ['low', 'medium', 'high'],
    status: ['captured', 'review_needed', 'linked_to_claim', 'strategic_influence'],
  },
  PartnerStatement: {
    status: ['draft', 'issued', 'acknowledged', 'finalized'],
  },
  Dispute: {
    priority: ['low', 'medium', 'high', 'urgent'],
    status: ['open', 'under_review', 'escalated', 'resolved', 'closed'],
  },
  Decision: {
    outcome_status: ['pending', 'on_track', 'achieved', 'missed'],
  },
};

const nonNegativeFields = new Set([
  'estimated_value',
  'actual_revenue',
  'estimated_payout',
  'approved_payout',
  'paid_amount',
  'pending_payout',
  'paid_payout',
  'expected_contribution',
  'protection_window_days',
  'open_disputes',
]);
const percentageFields = new Set([
  'attribution_percentage',
  'attribution_recommended_percentage',
  'revenue_share_rate',
  'commission_rate',
]);

export function assertEntityType(type, { writable = false } = {}) {
  const set = writable ? writableTypes : allowedTypes;
  if (!set.has(type)) {
    throw new HttpError(404, 'ENTITY_NOT_FOUND', 'The requested entity type does not exist.');
  }
  return type;
}

function cleanValue(value, depth = 0) {
  if (depth > 8) {
    throw new HttpError(400, 'INVALID_RECORD', 'Record data is nested too deeply.');
  }
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new HttpError(400, 'INVALID_RECORD', 'Record numbers must be finite.');
    }
    return value;
  }
  if (typeof value === 'string') {
    if (value.length > 10000) {
      throw new HttpError(400, 'INVALID_RECORD', 'A record field exceeds 10,000 characters.');
    }
    return value.trim();
  }
  if (Array.isArray(value)) {
    if (value.length > 500) {
      throw new HttpError(400, 'INVALID_RECORD', 'A record array exceeds 500 items.');
    }
    return value.map((item) => cleanValue(item, depth + 1));
  }
  if (typeof value === 'object') {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      if (reservedKeys.has(key)) continue;
      if (!/^[A-Za-z][A-Za-z0-9_]{0,99}$/.test(key)) {
        throw new HttpError(400, 'INVALID_RECORD', `Invalid field name: ${key}`);
      }
      if (item !== undefined) result[key] = cleanValue(item, depth + 1);
    }
    return result;
  }
  throw new HttpError(400, 'INVALID_RECORD', 'Record data contains an unsupported value.');
}

export function sanitizeRecordData(type, input, { partial = false } = {}) {
  assertEntityType(type, { writable: true });
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new HttpError(400, 'INVALID_RECORD', 'Record data must be a JSON object.');
  }

  const data = cleanValue(input);
  if (Buffer.byteLength(JSON.stringify(data), 'utf8') > 64 * 1024) {
    throw new HttpError(413, 'RECORD_TOO_LARGE', 'A record cannot exceed 64 KB.');
  }

  for (const field of requirements[type] ?? []) {
    if ((!partial || Object.hasOwn(data, field)) && (data[field] === undefined || data[field] === null || data[field] === '')) {
      throw new HttpError(400, 'INVALID_RECORD', `${field} is required.`);
    }
  }

  for (const [field, allowed] of Object.entries(enumFields[type] ?? {})) {
    if (data[field] !== undefined && !allowed.includes(data[field])) {
      throw new HttpError(400, 'INVALID_RECORD', `${field} has an unsupported value.`);
    }
  }

  for (const [field, value] of Object.entries(data)) {
    if (nonNegativeFields.has(field) && (typeof value !== 'number' || value < 0)) {
      throw new HttpError(400, 'INVALID_RECORD', `${field} must be a non-negative number.`);
    }
    if (percentageFields.has(field) && (typeof value !== 'number' || value < 0 || value > 100)) {
      throw new HttpError(400, 'INVALID_RECORD', `${field} must be between 0 and 100.`);
    }
  }

  if (data.currency !== undefined && !/^[A-Z]{3}$/.test(data.currency)) {
    throw new HttpError(400, 'INVALID_RECORD', 'currency must be a three-letter ISO code.');
  }

  for (const [field, value] of Object.entries(data)) {
    if (field.endsWith('_email') && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new HttpError(400, 'INVALID_RECORD', `${field} must be a valid email address.`);
    }
  }

  return data;
}

export function recordLabel(data) {
  return (
    data.trade_name ||
    data.legal_name ||
    data.name ||
    data.title ||
    data.partner_name ||
    data.customer_account ||
    null
  );
}

export function publicRecord(row) {
  return {
    ...row.data,
    id: row.id,
    _id: row.id,
    created_date: row.created_at,
    updated_date: row.updated_at,
    version: row.version,
  };
}
