import type { Sql } from "@/lib/db";
import {
  LEDGER_EVENTS,
  buildClaimJournal,
  type LedgerEvent,
} from "./ledger";
import { ACTION_TYPES, actorMayRun, type ActionType, type Actor } from "./catalog";

export { ACTION_TYPES, WEBHOOK_ACTIONS, RECIPE_STEPS, HUMAN_ACTIONS, API_ACTIONS, actorMayRun, type ActionType, type Actor } from "./catalog";

const TRIGGER_RANK: Record<string, number> = {
  closed_won: 1,
  invoiced: 2,
  collected: 3,
  recognized: 4,
};

export type ActionInput = Record<string, unknown>;

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type ActionResult = {
  runId: string;
  actionType: string;
  status: "succeeded" | "failed" | "replayed";
  objectType: string;
  objectId: string | null;
  result: Json;
  nextActions: string[];
};

export type ClaimRow = {
  // Projection of journals + action_runs for this tenant. The book is append-only;
  // this row is the current view the desks read.
  id: string;
  user_id: string;
  partner_id: string;
  agreement_id: string | null;
  account_name: string;
  pipeline_amount_minor: number;
  attributed_pct: number | null;
  attributed_amount_minor: number | null;
  revenue_amount_minor: number | null;
  revenue_stage: string | null;
  revenue_reference: string | null;
  eligible_amount_minor: number | null;
  eligibility_status: string | null;
  eligibility_explanation: string | null;
  payout_recorded_minor: number | null;
  payout_reference: string | null;
  status: string;
  preflight_status: string | null;
  preflight_reasons: string | null;
  currency: string;
  version: number;
  created_at: string;
};

type PartnerRow = {
  id: string;
  name: string;
  partner_type: string;
  lifecycle_status: string;
};

type AgreementRow = {
  id: string;
  partner_id: string;
  rate_bps: number;
  payout_trigger: string;
  protection_days: number;
  status: string;
  currency: string;
};

function nid(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function currentPeriod() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

async function loadClaim(sql: Sql, userId: string, id: string) {
  const rows = await sql<ClaimRow>`
    select * from claims where id = ${id} and user_id = ${userId} limit 1
  `;
  const claim = rows[0];
  if (!claim) throw new Error("Claim not found in this tenant.");
  return claim;
}

async function loadPartner(sql: Sql, userId: string, id: string) {
  const rows = await sql<PartnerRow>`
    select * from partners where id = ${id} and user_id = ${userId} limit 1
  `;
  const partner = rows[0];
  if (!partner) throw new Error("Partner not found in this tenant.");
  return partner;
}

async function activeAgreement(sql: Sql, userId: string, partnerId: string, agreementId?: string) {
  if (agreementId) {
    const rows = await sql<AgreementRow>`
      select * from agreements
      where id = ${agreementId} and user_id = ${userId} and partner_id = ${partnerId}
      limit 1
    `;
    return rows[0] ?? null;
  }
  const rows = await sql<AgreementRow>`
    select * from agreements
    where user_id = ${userId} and partner_id = ${partnerId} and status = 'active'
    order by created_at desc
    limit 1
  `;
  return rows[0] ?? null;
}

async function postJournal(
  sql: Sql,
  userId: string,
  claim: ClaimRow,
  event: LedgerEvent,
  key: string,
) {
  const existing = await sql<{ id: string }>`
    select id from journals where user_id = ${userId} and idempotency_key = ${key} limit 1
  `;
  if (existing[0]) return existing[0].id;
  const { lines, memo } = buildClaimJournal(event, claim);
  const journalId = nid("jnl");
  await sql`
    insert into journals (id, user_id, claim_id, event, idempotency_key, currency, memo)
    values (${journalId}, ${userId}, ${claim.id}, ${event}, ${key}, ${claim.currency}, ${memo})
  `;
  for (const line of lines) {
    await sql`
      insert into ledger_entries (journal_id, user_id, account, direction, amount_minor)
      values (${journalId}, ${userId}, ${line.account}, ${line.direction}, ${line.amount_minor})
    `;
  }
  return journalId;
}

export function nextActionsFor(claim: ClaimRow): string[] {
  switch (claim.status) {
    case "registered":
      return claim.preflight_status === "passed"
        ? ["decide_attribution"]
        : ["run_preflight", "bind_agreement"];
    case "attributed":
      return ["record_revenue_fact"];
    case "revenue":
      return ["evaluate_eligibility"];
    case "eligible":
      return ["record_payout_milestone", "compose_statement"];
    case "not_eligible":
      return ["record_revenue_fact", "open_dispute"];
    case "disputed":
      return ["resolve_dispute"];
    default:
      return [];
  }
}

async function runPreflight(sql: Sql, userId: string, claim: ClaimRow) {
  const reasons: string[] = [];
  const agreement = await activeAgreement(sql, userId, claim.partner_id, claim.agreement_id ?? undefined);
  if (!agreement || agreement.status !== "active") {
    reasons.push("agreement_gap");
  }
  const dupes = await sql<{ id: string }>`
    select id from claims
    where user_id = ${userId}
      and partner_id = ${claim.partner_id}
      and account_name = ${claim.account_name}
      and id <> ${claim.id}
      and status not in ('recorded', 'rejected')
    limit 3
  `;
  if (dupes.length) reasons.push("duplicate_risk");
  if (agreement) {
    const windowMs = agreement.protection_days * 86400000;
    const others = await sql<{ id: string; created_at: string }>`
      select id, created_at from claims
      where user_id = ${userId}
        and partner_id = ${claim.partner_id}
        and account_name = ${claim.account_name}
        and id <> ${claim.id}
      limit 8
    `;
    const conflict = others.some((row) => {
      const t = new Date(row.created_at).getTime();
      return Number.isFinite(t) && Date.now() - t < windowMs;
    });
    if (conflict) reasons.push("protection_conflict");
  }
  const status = reasons.length ? "failed" : "passed";
  const reasonsText = reasons.join(",");
  await sql`
    update claims
    set preflight_status = ${status},
        preflight_reasons = ${reasonsText},
        agreement_id = ${agreement?.id ?? claim.agreement_id},
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  return { status, reasons, agreementId: agreement?.id ?? null };
}

async function handleRegister(sql: Sql, userId: string, input: ActionInput) {
  let partnerId = asString(input.partner_id);
  const partnerName = asString(input.partner_name);
  if (!partnerId && partnerName) {
    const found = await sql<PartnerRow>`
      select * from partners where user_id = ${userId} and lower(name) = ${partnerName.toLowerCase()} limit 1
    `;
    partnerId = found[0]?.id ?? "";
  }
  if (!partnerId) throw new Error("A partner_id or matching partner_name is required.");
  await loadPartner(sql, userId, partnerId);

  const account = asString(input.account_name);
  if (!account) throw new Error("account_name is required.");
  const amount = asNumber(input.pipeline_amount);
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("pipeline_amount must be a positive number.");
  const currency = (asString(input.currency) || "SAR").toUpperCase();
  const minor = Math.round(amount * 100);
  const claimId = nid("clm");
  await sql`
    insert into claims (
      id, user_id, partner_id, account_name, pipeline_amount_minor,
      status, currency, preflight_status
    ) values (
      ${claimId}, ${userId}, ${partnerId}, ${account}, ${minor},
      'registered', ${currency}, 'pending'
    )
  `;
  const claim = await loadClaim(sql, userId, claimId);
  const journalId = await postJournal(
    sql,
    userId,
    claim,
    LEDGER_EVENTS.CLAIM_REGISTERED,
    `claim:${claimId}:registered`,
  );
  return {
    objectType: "PartnerClaim",
    objectId: claimId,
    result: { claimId, journalId, status: "registered" },
    event: "claim.registered",
    follow: ["webhook_capture"] as string[],
  };
}

async function handlePreflight(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  const preflight = await runPreflight(sql, userId, claim);
  const next = await loadClaim(sql, userId, claim.id);
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { preflight, nextActions: nextActionsFor(next) },
    event: "claim.preflighted",
    follow: preflight.status === "failed" ? (["exception_drain"] as string[]) : [],
  };
}

async function handleBind(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  const agreementId = asString(input.agreement_id);
  const agreement = await activeAgreement(sql, userId, claim.partner_id, agreementId || undefined);
  if (!agreement) throw new Error("No active agreement to bind.");
  await sql`
    update claims
    set agreement_id = ${agreement.id}, version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  const refreshed = await loadClaim(sql, userId, claim.id);
  const preflight = await runPreflight(sql, userId, refreshed);
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { agreementId: agreement.id, preflight },
    event: "claim.agreement_bound",
    follow: [] as string[],
  };
}

async function handleAttribution(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  if (claim.preflight_status !== "passed") {
    throw new Error("Attribution requires a passing preflight.");
  }
  const decision = asString(input.decision) || "accept";
  const pct = Math.round(asNumber(input.percentage));
  if (decision === "accept" && (pct < 0 || pct > 100 || Number.isNaN(pct))) {
    throw new Error("percentage must be 0–100.");
  }
  const applied = decision === "reject" ? 0 : pct;
  const basis = claim.revenue_amount_minor && claim.revenue_amount_minor > 0
    ? claim.revenue_amount_minor
    : claim.pipeline_amount_minor;
  const attributed = Math.round((basis * applied) / 100);
  await sql`
    update claims
    set attributed_pct = ${applied},
        attributed_amount_minor = ${attributed},
        status = ${decision === "reject" ? "rejected" : "attributed"},
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  const next = await loadClaim(sql, userId, claim.id);
  const journalId = await postJournal(
    sql,
    userId,
    next,
    LEDGER_EVENTS.ATTRIBUTION_DECIDED,
    `claim:${claim.id}:attribution:v${next.version}`,
  );
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { journalId, attributed_pct: applied, attributed_amount_minor: attributed },
    event: "claim.attributed",
    follow: [] as string[],
  };
}

async function handleRevenue(sql: Sql, userId: string, input: ActionInput) {
  const claimId = asString(input.claim_id);
  const claim = await loadClaim(sql, userId, claimId);
  const stage = asString(input.revenue_stage);
  if (!TRIGGER_RANK[stage]) throw new Error("revenue_stage must be closed_won, invoiced, collected, or recognized.");
  const amount = asNumber(input.amount);
  if (!Number.isFinite(amount) || amount < 0) throw new Error("amount must be a non-negative number.");
  const minor = Math.round(amount * 100);
  const reference = asString(input.reference) || null;
  await sql`
    update claims
    set revenue_amount_minor = ${minor},
        revenue_stage = ${stage},
        revenue_reference = ${reference},
        status = 'revenue',
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  const next = await loadClaim(sql, userId, claim.id);
  const journalId = await postJournal(
    sql,
    userId,
    next,
    LEDGER_EVENTS.REVENUE_RECORDED,
    `claim:${claim.id}:revenue:${stage}:${reference ?? "unspecified"}`,
  );
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { journalId, revenue_stage: stage, revenue_amount_minor: minor },
    event: "claim.revenue_recorded",
    follow: ["eligibility_cascade"] as string[],
  };
}

async function handleEligibility(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  if (!claim.attributed_pct && claim.attributed_pct !== 0) {
    throw new Error("Eligibility requires an attribution of record.");
  }
  const agreement = await activeAgreement(sql, userId, claim.partner_id, claim.agreement_id ?? undefined);
  if (!agreement) throw new Error("No governing agreement. Bind one first.");
  const stage = claim.revenue_stage;
  if (!stage) throw new Error("No revenue evidence on this claim.");
  const triggerMet = (TRIGGER_RANK[stage] ?? 0) >= (TRIGGER_RANK[agreement.payout_trigger] ?? 99);
  const basis = claim.revenue_amount_minor && claim.revenue_amount_minor > 0
    ? claim.revenue_amount_minor
    : claim.pipeline_amount_minor;
  const attributed = Math.round((basis * (claim.attributed_pct ?? 0)) / 100);
  const eligible = triggerMet ? Math.round((attributed * agreement.rate_bps) / 10000) : 0;
  const explanation = triggerMet
    ? `Eligible: ${agreement.rate_bps / 100}% of attributed ${basis / 100} after ${stage} met trigger ${agreement.payout_trigger}.`
    : `Not eligible: revenue is ${stage}, agreement pays on ${agreement.payout_trigger}. Amount previewed, not due.`;
  const status = triggerMet ? "eligible" : "not_eligible";
  await sql`
    update claims
    set eligible_amount_minor = ${eligible},
        eligibility_status = ${status},
        eligibility_explanation = ${explanation},
        attributed_amount_minor = ${attributed},
        status = ${status},
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  const next = await loadClaim(sql, userId, claim.id);
  const journalId = await postJournal(
    sql,
    userId,
    next,
    LEDGER_EVENTS.ELIGIBILITY_EVALUATED,
    `claim:${claim.id}:eligibility:v${next.version}`,
  );
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { journalId, eligibility_status: status, eligible_amount_minor: eligible, explanation },
    event: "claim.eligibility_evaluated",
    follow: [] as string[],
  };
}

async function handlePayout(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  if (claim.eligibility_status !== "eligible") {
    throw new Error("A payout milestone can only be recorded on an eligible claim.");
  }
  const reference = asString(input.reference) || `EXT-${claim.id.slice(-6).toUpperCase()}`;
  const amount = claim.eligible_amount_minor ?? 0;
  await sql`
    update claims
    set payout_recorded_minor = ${amount},
        payout_reference = ${reference},
        status = 'recorded',
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  const next = await loadClaim(sql, userId, claim.id);
  const journalId = await postJournal(
    sql,
    userId,
    next,
    LEDGER_EVENTS.PAYOUT_RECORDED,
    `claim:${claim.id}:payout:${reference}`,
  );
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { journalId, payout_reference: reference, recorded: amount },
    event: "claim.payout_recorded",
    follow: [] as string[],
  };
}

async function handleCompose(sql: Sql, userId: string, input: ActionInput) {
  const partnerId = asString(input.partner_id);
  await loadPartner(sql, userId, partnerId);
  const period = asString(input.period) || currentPeriod();
  const totals = await sql<{ eligible: number; recorded: number }>`
    select
      coalesce(sum(coalesce(eligible_amount_minor, 0)), 0)::int as eligible,
      coalesce(sum(coalesce(payout_recorded_minor, 0)), 0)::int as recorded
    from claims
    where user_id = ${userId} and partner_id = ${partnerId}
      and eligibility_status = 'eligible'
  `;
  const eligible = totals[0]?.eligible ?? 0;
  const recorded = totals[0]?.recorded ?? 0;
  const existing = await sql<{ id: string; status: string }>`
    select id, status from statements
    where user_id = ${userId} and partner_id = ${partnerId} and period = ${period}
    limit 1
  `;
  let statementId = existing[0]?.id;
  if (statementId) {
    await sql`
      update statements
      set eligible_minor = ${eligible}, recorded_minor = ${recorded}
      where id = ${statementId} and user_id = ${userId} and status = 'draft'
    `;
  } else {
    statementId = nid("stm");
    await sql`
      insert into statements (id, user_id, partner_id, period, eligible_minor, recorded_minor, status)
      values (${statementId}, ${userId}, ${partnerId}, ${period}, ${eligible}, ${recorded}, 'draft')
    `;
  }
  return {
    objectType: "PartnerStatement",
    objectId: statementId,
    result: { statementId, period, eligible_minor: eligible, recorded_minor: recorded, status: existing[0]?.status ?? "draft" },
    event: "statement.composed",
    follow: [] as string[],
  };
}

async function handleIssue(sql: Sql, userId: string, input: ActionInput) {
  const statementId = asString(input.statement_id);
  const rows = await sql<{ id: string; status: string }>`
    select id, status from statements where id = ${statementId} and user_id = ${userId} limit 1
  `;
  const statement = rows[0];
  if (!statement) throw new Error("Statement not found in this tenant.");
  if (statement.status === "issued") {
    return {
      objectType: "PartnerStatement",
      objectId: statementId,
      result: { statementId, status: "issued" },
      event: "statement.issued",
      follow: [] as string[],
    };
  }
  await sql`
    update statements set status = 'issued' where id = ${statementId} and user_id = ${userId}
  `;
  return {
    objectType: "PartnerStatement",
    objectId: statementId,
    result: { statementId, status: "issued" },
    event: "statement.issued",
    follow: [] as string[],
  };
}

async function handleDispute(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  const reason = asString(input.reason) || "Contested attribution or eligibility.";
  await sql`
    update claims
    set status = 'disputed',
        eligibility_explanation = ${reason},
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { status: "disputed", reason },
    event: "claim.disputed",
    follow: [] as string[],
  };
}

async function handleResolveDispute(sql: Sql, userId: string, input: ActionInput) {
  const claim = await loadClaim(sql, userId, asString(input.claim_id));
  if (claim.status !== "disputed") throw new Error("Only a disputed claim can be resolved.");
  const nextStatus = claim.attributed_pct != null ? "attributed" : "registered";
  const note = asString(input.note) || "Dispute resolved. Re-enter the verb sequence from attribution.";
  await sql`
    update claims
    set status = ${nextStatus},
        eligibility_explanation = ${note},
        version = version + 1
    where id = ${claim.id} and user_id = ${userId}
  `;
  return {
    objectType: "PartnerClaim",
    objectId: claim.id,
    result: { status: nextStatus, note },
    event: "claim.dispute_resolved",
    follow: [] as string[],
  };
}

const HANDLERS: Record<
  ActionType,
  (sql: Sql, userId: string, input: ActionInput) => Promise<{
    objectType: string;
    objectId: string | null;
    result: Json;
    event: string;
    follow: string[];
  }>
> = {
  register_claim: handleRegister,
  run_preflight: handlePreflight,
  bind_agreement: handleBind,
  decide_attribution: handleAttribution,
  record_revenue_fact: handleRevenue,
  evaluate_eligibility: handleEligibility,
  record_payout_milestone: handlePayout,
  compose_statement: handleCompose,
  issue_statement: handleIssue,
  open_dispute: handleDispute,
  resolve_dispute: handleResolveDispute,
};

async function bumpRecipe(sql: Sql, userId: string, key: string, status: string) {
  await sql`
    update recipes
    set last_run_at = now(), last_status = ${status}, run_count = run_count + 1
    where user_id = ${userId} and recipe_key = ${key}
  `;
}

async function enqueueOutbox(
  sql: Sql,
  userId: string,
  eventId: string,
  keys: string[],
  payload: Json,
) {
  for (const recipeKey of keys) {
    const id = nid("obx");
    await sql`
      insert into outbox (id, user_id, event_id, recipe_key, payload_json, status)
      values (${id}, ${userId}, ${eventId}, ${recipeKey}, ${JSON.stringify(payload)}, ${"pending"})
    `;
  }
}

async function drainOutbox(sql: Sql, userId: string, depth: number) {
  if (depth >= 3) return;
  const rows = await sql<{
    id: string;
    recipe_key: string;
    payload_json: string;
    event_id: string;
  }>`
    select o.id, o.recipe_key, o.payload_json, o.event_id
    from outbox o
    join recipes r
      on r.user_id = o.user_id and r.recipe_key = o.recipe_key
    where o.user_id = ${userId}
      and o.status = 'pending'
      and r.status = 'active'
    order by o.created_at
    limit 20
  `;
  for (const row of rows) {
    const payload = JSON.parse(row.payload_json || "{}") as { claimId?: string };
    try {
      const rec = await sql<{ status: string }>`
        select status from recipes where user_id = ${userId} and recipe_key = ${row.recipe_key} limit 1
      `;
      if (!rec[0] || rec[0].status !== "active") {
        // Hold the work. Unpausing drains it. Do not discard.
        continue;
      }

      if (row.recipe_key === "webhook_capture" && payload.claimId) {
        await dispatchAction({
          sql,
          userId,
          actor: "recipe",
          actionType: "run_preflight",
          input: { claim_id: payload.claimId },
          idempotencyKey: `recipe:preflight:${payload.claimId}`,
          depth: depth + 1,
        });
      } else if (row.recipe_key === "eligibility_cascade" && payload.claimId) {
        await dispatchAction({
          sql,
          userId,
          actor: "recipe",
          actionType: "evaluate_eligibility",
          input: { claim_id: payload.claimId },
          idempotencyKey: `recipe:eligibility:${payload.claimId}:${row.event_id}`,
          depth: depth + 1,
        });
      } else if (row.recipe_key === "exception_drain" && payload.claimId) {
        await dispatchAction({
          sql,
          userId,
          actor: "recipe",
          actionType: "run_preflight",
          input: { claim_id: payload.claimId },
          idempotencyKey: `recipe:exception:${payload.claimId}:${row.event_id}`,
          depth: depth + 1,
        });
      }

      await bumpRecipe(sql, userId, row.recipe_key, "succeeded");
      await sql`
        update outbox set status = 'processed', processed_at = now(), attempts = attempts + 1
        where id = ${row.id} and user_id = ${userId}
      `;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Outbox drain failed.";
      await sql`
        update outbox
        set status = 'failed', last_error = ${message}, attempts = attempts + 1
        where id = ${row.id} and user_id = ${userId}
      `;
    }
  }
}

export async function resumeOutbox(sql: Sql, userId: string) {
  await drainOutbox(sql, userId, 0);
}

export async function retryFailedOutbox(sql: Sql, userId: string) {
  await sql`
    update outbox
    set status = 'pending', last_error = null
    where user_id = ${userId} and status = 'failed'
  `;
  await drainOutbox(sql, userId, 0);
  const pending = await sql<{ n: number }>`
    select count(*)::int as n from outbox where user_id = ${userId} and status = 'pending'
  `;
  const failed = await sql<{ n: number }>`
    select count(*)::int as n from outbox where user_id = ${userId} and status = 'failed'
  `;
  return { pending: pending[0]?.n ?? 0, failed: failed[0]?.n ?? 0 };
}

export async function dispatchAction(params: {
  sql: Sql;
  userId: string;
  actor: Actor;
  actionType: ActionType;
  input: ActionInput;
  idempotencyKey: string;
  depth?: number;
}): Promise<ActionResult> {
  const { sql, userId, actor, actionType, input } = params;
  const depth = params.depth ?? 0;
  const key = params.idempotencyKey.slice(0, 180);
  if (!ACTION_TYPES.includes(actionType)) {
    throw new Error(`Unknown action ${actionType}.`);
  }
  if (!actorMayRun(actor, actionType)) {
    throw new Error(`${actionType} cannot be fired by ${actor}.`);
  }

  const prior = await sql<{
    id: string;
    status: string;
    object_type: string;
    object_id: string | null;
    result_json: string;
  }>`
    select id, status, object_type, object_id, result_json
    from action_runs
    where user_id = ${userId} and idempotency_key = ${key}
    limit 1
  `;
  if (prior[0] && prior[0].status === "succeeded") {
    return {
      runId: prior[0].id,
      actionType,
      status: "replayed",
      objectType: prior[0].object_type,
      objectId: prior[0].object_id,
  result: JSON.parse(prior[0].result_json || "{}") as Json,
      nextActions: [],
    };
  }

  const runId = nid("run");
  await sql`
    insert into action_runs (
      id, user_id, action_type, object_type, object_id, status, idempotency_key, actor, input_json
    ) values (
      ${runId}, ${userId}, ${actionType}, 'unknown', null, 'queued', ${key}, ${actor}, ${JSON.stringify(input)}
    )
  `;

  try {
    const handled = await HANDLERS[actionType](sql, userId, input);
    await sql`
      update action_runs
      set status = 'succeeded',
          object_type = ${handled.objectType},
          object_id = ${handled.objectId},
          result_json = ${JSON.stringify(handled.result)}
      where id = ${runId} and user_id = ${userId}
    `;
    const eventId = nid("evt");
    await sql`
      insert into events (id, user_id, run_id, type, payload_json)
      values (${eventId}, ${userId}, ${runId}, ${handled.event}, ${JSON.stringify(handled.result)})
    `;
    const claimId =
      handled.objectType === "PartnerClaim" ? handled.objectId : asString(input.claim_id) || null;
    await enqueueOutbox(sql, userId, eventId, handled.follow, { claimId });
    if (depth === 0) await drainOutbox(sql, userId, depth);
    let next: string[] = [];
    if (handled.objectType === "PartnerClaim" && handled.objectId) {
      const claim = await loadClaim(sql, userId, handled.objectId);
      next = nextActionsFor(claim);
    }
    return {
      runId,
      actionType,
      status: "succeeded",
      objectType: handled.objectType,
      objectId: handled.objectId,
      result: handled.result,
      nextActions: next,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Action failed.";
    await sql`
      update action_runs
      set status = 'failed', error = ${message}
      where id = ${runId} and user_id = ${userId}
    `;
    throw error;
  }
}

export async function runPeriodClose(sql: Sql, userId: string) {
  const rec = await sql<{ status: string }>`
    select status from recipes where user_id = ${userId} and recipe_key = 'period_close' limit 1
  `;
  if (!rec[0] || rec[0].status !== "active") {
    throw new Error("The period_close recipe is paused.");
  }
  const partners = await sql<{ id: string }>`
    select id from partners where user_id = ${userId}
  `;
  const period = currentPeriod();
  const issued: string[] = [];
  for (const partner of partners) {
    const composed = await dispatchAction({
      sql,
      userId,
      actor: "recipe",
      actionType: "compose_statement",
      input: { partner_id: partner.id, period },
      idempotencyKey: `recipe:compose:${partner.id}:${period}`,
    });
    const statementId =
      typeof composed.result === "object" && composed.result && !Array.isArray(composed.result)
        ? String(composed.result.statementId ?? composed.objectId ?? "")
        : String(composed.objectId ?? "");
    if (statementId) {
      await dispatchAction({
        sql,
        userId,
        actor: "recipe",
        actionType: "issue_statement",
        input: { statement_id: statementId },
        idempotencyKey: `recipe:issue:${statementId}`,
      });
      issued.push(statementId);
    }
  }
  await bumpRecipe(sql, userId, "period_close", "succeeded");
  return { period, issuedCount: issued.length, statementIds: issued };
}

export async function hashApiKey(raw: string) {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(raw).digest("hex");
}

export async function mintApiKey() {
  const { createHash, randomBytes } = await import("node:crypto");
  const raw = `rvn_${randomBytes(24).toString("base64url")}`;
  const hash = createHash("sha256").update(raw).digest("hex");
  return { raw, hash, prefix: raw.slice(0, 12) };
}

export async function lookupApiKey(sql: Sql, raw: string) {
  if (!raw.startsWith("rvn_")) return null;
  const hash = await hashApiKey(raw);
  const rows = await sql<{ id: string; user_id: string }>`
    select id, user_id from api_keys where hash = ${hash} limit 1
  `;
  const key = rows[0];
  if (!key) return null;
  await sql`update api_keys set last_used_at = now() where id = ${key.id}`;
  return key;
}

export { currentPeriod, nid };
