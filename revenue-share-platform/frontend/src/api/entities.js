import { base44 } from './base44Client';

/**
 * The RevenueOS domain model (Base44 entities). Each exposes the standard
 * entity API: list(sort, limit), filter(query, sort, limit), get(id),
 * create(data), update(id, data), delete(id), bulkCreate(rows).
 */
export const Partner = base44.entities.Partner;
export const PartnerProgram = base44.entities.PartnerProgram;
export const Agreement = base44.entities.Agreement;
export const PartnerClaim = base44.entities.PartnerClaim;
export const EcosystemTouchpoint = base44.entities.EcosystemTouchpoint;
export const PartnerStatement = base44.entities.PartnerStatement;
export const Dispute = base44.entities.Dispute;
export const AuditEvent = base44.entities.AuditEvent;
export const Decision = base44.entities.Decision;
export const ActionItem = base44.entities.ActionItem;
export const Forecast = base44.entities.Forecast;
export const Customer = base44.entities.Customer;
export const Deal = base44.entities.Deal;
export const Activity = base44.entities.Activity;

/* Finance-spine entities (added per the PRD data-layer audit). */
export const LedgerEntry = base44.entities.LedgerEntry;
export const RevenueEvent = base44.entities.RevenueEvent;
export const RuleVersion = base44.entities.RuleVersion;
export const Evidence = base44.entities.Evidence;
export const Approval = base44.entities.Approval;
export const FXRate = base44.entities.FXRate;

/** Built-in auth / user module. */
export const User = base44.auth;
