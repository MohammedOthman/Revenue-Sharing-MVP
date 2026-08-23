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
  Dispute: ['partner_name', 'dispute_type'],
  Decision: ['title'],
};

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

  if (!partial) {
    for (const field of requirements[type] ?? []) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        throw new HttpError(400, 'INVALID_RECORD', `${field} is required.`);
      }
    }
  }

  if (type === 'PartnerClaim' && data.estimated_value !== undefined) {
    if (typeof data.estimated_value !== 'number' || data.estimated_value < 0) {
      throw new HttpError(400, 'INVALID_RECORD', 'estimated_value must be a non-negative number.');
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
