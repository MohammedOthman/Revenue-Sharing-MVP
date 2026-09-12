import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  ACTION_TYPES,
  WEBHOOK_ACTIONS,
  dispatchAction,
  mintApiKey,
  nid,
  resumeOutbox,
  runPeriodClose,
  type ActionType,
  type ClaimRow,
} from "./engine";
import { ensureWorkspace } from "./seed";

const actionInput = z.object({
  actionType: z.enum(ACTION_TYPES),
  input: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string().min(4).max(180),
});

export const bootstrapWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    return { ok: true as const };
  });

export const getRuntime = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const userId = context.userId;

    const counts = await sql<{
      claims: number;
      eligible: number;
      failed_preflight: number;
      runs: number;
      recipes_active: number;
    }>`
      select
        (select count(*)::int from claims where user_id = ${userId}) as claims,
        (select count(*)::int from claims where user_id = ${userId} and eligibility_status = 'eligible') as eligible,
        (select count(*)::int from claims where user_id = ${userId} and preflight_status = 'failed') as failed_preflight,
        (select count(*)::int from action_runs where user_id = ${userId}) as runs,
        (select count(*)::int from recipes where user_id = ${userId} and status = 'active') as recipes_active
    `;

    const obligation = await sql<{ due: number; recorded: number }>`
      select
        coalesce(sum(coalesce(eligible_amount_minor, 0)), 0)::int as due,
        coalesce(sum(coalesce(payout_recorded_minor, 0)), 0)::int as recorded
      from claims
      where user_id = ${userId}
    `;

    const runs = await sql<{
      id: string;
      action_type: string;
      status: string;
      actor: string;
      object_id: string | null;
      created_at: string;
    }>`
      select id, action_type, status, actor, object_id, created_at
      from action_runs
      where user_id = ${userId}
      order by created_at desc
      limit 12
    `;

    const volume = await sql<{ action_type: string; n: number }>`
      select action_type, count(*)::int as n
      from action_runs
      where user_id = ${userId}
      group by action_type
      order by n desc
    `;

    const exceptions = await sql<{
      id: string;
      account_name: string;
      partner_name: string;
      preflight_reasons: string | null;
      status: string;
    }>`
      select c.id, c.account_name, p.name as partner_name, c.preflight_reasons, c.status
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.user_id = ${userId} and (c.preflight_status = 'failed' or c.status = 'disputed')
      order by c.created_at desc
      limit 8
    `;

    const desk = await sql<{
      id: string;
      account_name: string;
      partner_name: string;
      pipeline_amount_minor: number;
      currency: string;
      preflight_status: string | null;
    }>`
      select c.id, c.account_name, p.name as partner_name, c.pipeline_amount_minor, c.currency, c.preflight_status
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.user_id = ${userId}
        and c.status = 'registered'
        and c.preflight_status = 'passed'
      order by c.created_at
      limit 8
    `;

    const obligations = await sql<{
      partner_name: string;
      eligible_minor: number;
      recorded_minor: number;
      open_claims: number;
    }>`
      select p.name as partner_name,
        coalesce(sum(coalesce(c.eligible_amount_minor, 0)), 0)::int as eligible_minor,
        coalesce(sum(coalesce(c.payout_recorded_minor, 0)), 0)::int as recorded_minor,
        count(*)::int as open_claims
      from partners p
      left join claims c on c.partner_id = p.id and c.user_id = p.user_id
      where p.user_id = ${userId}
      group by p.id, p.name
      order by eligible_minor desc
    `;

    const outbox = await sql<{
      id: string;
      recipe_key: string;
      status: string;
      created_at: string;
    }>`
      select id, recipe_key, status, created_at
      from outbox where user_id = ${userId}
      order by created_at desc
      limit 8
    `;

    const settlement = await sql<{
      id: string;
      account_name: string;
      partner_name: string;
      eligible_amount_minor: number | null;
      currency: string;
    }>`
      select c.id, c.account_name, p.name as partner_name, c.eligible_amount_minor, c.currency
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.user_id = ${userId}
        and c.status = 'eligible'
        and coalesce(c.payout_recorded_minor, 0) = 0
      order by c.created_at
      limit 8
    `;

    const disputes = await sql<{
      id: string;
      account_name: string;
      partner_name: string;
      eligibility_explanation: string | null;
    }>`
      select c.id, c.account_name, p.name as partner_name, c.eligibility_explanation
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.user_id = ${userId} and c.status = 'disputed'
      order by c.created_at desc
      limit 8
    `;

    const pipeline = await sql<{ status: string; n: number }>`
      select status, count(*)::int as n
      from claims where user_id = ${userId}
      group by status
      order by n desc
    `;

    const statements = await sql<{
      id: string;
      partner_name: string;
      period: string;
      eligible_minor: number;
      recorded_minor: number;
      status: string;
    }>`
      select s.id, p.name as partner_name, s.period, s.eligible_minor, s.recorded_minor, s.status
      from statements s
      join partners p on p.id = s.partner_id and p.user_id = s.user_id
      where s.user_id = ${userId}
      order by s.created_at desc
      limit 6
    `;

    const recipes = await sql<{
      recipe_key: string;
      name: string;
      status: string;
      last_status: string | null;
      run_count: number;
    }>`
      select recipe_key, name, status, last_status, run_count
      from recipes where user_id = ${userId} order by name
    `;

    return {
      metrics: {
        claims: counts[0]?.claims ?? 0,
        eligible: counts[0]?.eligible ?? 0,
        failedPreflight: counts[0]?.failed_preflight ?? 0,
        runs: counts[0]?.runs ?? 0,
        recipesActive: counts[0]?.recipes_active ?? 0,
        obligationMinor: obligation[0]?.due ?? 0,
        recordedMinor: obligation[0]?.recorded ?? 0,
      },
      runs,
      volume,
      exceptions,
      desk,
      obligations,
      outbox,
      recipes,
      settlement,
      disputes,
      pipeline,
      statements,
    };
  });

export const listClaims = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const rows = await sql<{
      id: string;
      account_name: string;
      partner_name: string;
      partner_id: string;
      pipeline_amount_minor: number;
      attributed_pct: number | null;
      eligible_amount_minor: number | null;
      eligibility_status: string | null;
      status: string;
      preflight_status: string | null;
      preflight_reasons: string | null;
      currency: string;
      created_at: string;
    }>`
      select c.id, c.account_name, p.name as partner_name, c.partner_id,
             c.pipeline_amount_minor, c.attributed_pct, c.eligible_amount_minor,
             c.eligibility_status, c.status, c.preflight_status, c.preflight_reasons,
             c.currency, c.created_at
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.user_id = ${context.userId}
      order by c.created_at desc
    `;
    return rows;
  });

export const getClaim = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const claims = await sql<ClaimRow & { partner_name: string }>`
      select c.*, p.name as partner_name
      from claims c
      join partners p on p.id = c.partner_id and p.user_id = c.user_id
      where c.id = ${data.id} and c.user_id = ${context.userId}
      limit 1
    `;
    const claim = claims[0];
    if (!claim) throw new Error("Claim not found.");
    const journals = await sql<{
      id: string;
      event: string;
      memo: string;
      created_at: string;
    }>`
      select id, event, memo, created_at
      from journals
      where user_id = ${context.userId} and claim_id = ${data.id}
      order by created_at
    `;
    const entries = await sql<{
      journal_id: string;
      account: string;
      direction: string;
      amount_minor: number;
    }>`
      select e.journal_id, e.account, e.direction, e.amount_minor
      from ledger_entries e
      join journals j on j.id = e.journal_id
      where j.user_id = ${context.userId} and j.claim_id = ${data.id}
      order by e.id
    `;
    const partners = await sql<{ id: string; name: string }>`
      select id, name from partners where user_id = ${context.userId} order by name
    `;
    const agreements = await sql<{
      id: string;
      partner_id: string;
      rate_bps: number;
      payout_trigger: string;
      status: string;
    }>`
      select id, partner_id, rate_bps, payout_trigger, status
      from agreements where user_id = ${context.userId}
    `;
    return { claim, journals, entries, partners, agreements };
  });

export const listPartners = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    return sql<{
      id: string;
      name: string;
      partner_type: string;
      lifecycle_status: string;
      rate_bps: number | null;
      payout_trigger: string | null;
      protection_days: number | null;
      agreement_id: string | null;
      claim_count: number;
    }>`
      select p.id, p.name, p.partner_type, p.lifecycle_status,
             a.rate_bps, a.payout_trigger, a.protection_days, a.id as agreement_id,
             (select count(*)::int from claims c where c.user_id = p.user_id and c.partner_id = p.id) as claim_count
      from partners p
      left join agreements a on a.partner_id = p.id and a.user_id = p.user_id and a.status = 'active'
      where p.user_id = ${context.userId}
      order by p.name
    `;
  });

export const createPartner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(2).max(80),
      partnerType: z.enum(["referral", "reseller", "isv", "strategic"]),
      rateBps: z.number().int().min(1).max(10000),
      payoutTrigger: z.enum(["closed_won", "invoiced", "collected", "recognized"]),
      protectionDays: z.number().int().min(0).max(365),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const partnerId = nid("ptr");
    const agreementId = nid("agr");
    await sql`
      insert into partners (id, user_id, name, partner_type, lifecycle_status)
      values (${partnerId}, ${context.userId}, ${data.name}, ${data.partnerType}, ${"active"})
    `;
    await sql`
      insert into agreements (id, user_id, partner_id, rate_bps, payout_trigger, protection_days, status, currency)
      values (${agreementId}, ${context.userId}, ${partnerId}, ${data.rateBps}, ${data.payoutTrigger}, ${data.protectionDays}, ${"active"}, ${"SAR"})
    `;
    return { partnerId, agreementId };
  });

export const submitAction = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(actionInput)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    return dispatchAction({
      sql,
      userId: context.userId,
      actor: "user",
      actionType: data.actionType as ActionType,
      input: data.input,
      idempotencyKey: data.idempotencyKey,
    });
  });

export const getLedger = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const journals = await sql<{
      id: string;
      claim_id: string;
      event: string;
      memo: string;
      currency: string;
      created_at: string;
      account_name: string;
    }>`
      select j.id, j.claim_id, j.event, j.memo, j.currency, j.created_at, c.account_name
      from journals j
      join claims c on c.id = j.claim_id and c.user_id = j.user_id
      where j.user_id = ${context.userId}
      order by j.created_at desc
      limit 40
    `;
    const balances = await sql<{ account: string; debit: number; credit: number }>`
      select account,
        coalesce(sum(case when direction = 'debit' then amount_minor else 0 end), 0)::int as debit,
        coalesce(sum(case when direction = 'credit' then amount_minor else 0 end), 0)::int as credit
      from ledger_entries
      where user_id = ${context.userId}
      group by account
      order by account
    `;
    const entries = await sql<{
      journal_id: string;
      account: string;
      direction: string;
      amount_minor: number;
    }>`
      select journal_id, account, direction, amount_minor
      from ledger_entries
      where user_id = ${context.userId}
      order by id
    `;
    return { journals, balances, entries };
  });

export const getRecipes = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const recipes = await sql<{
      id: string;
      recipe_key: string;
      name: string;
      description: string;
      status: string;
      last_run_at: string | null;
      last_status: string | null;
      run_count: number;
    }>`
      select id, recipe_key, name, description, status, last_run_at, last_status, run_count
      from recipes where user_id = ${context.userId} order by name
    `;
    const statements = await sql<{
      id: string;
      partner_name: string;
      period: string;
      eligible_minor: number;
      recorded_minor: number;
      status: string;
    }>`
      select s.id, p.name as partner_name, s.period, s.eligible_minor, s.recorded_minor, s.status
      from statements s
      join partners p on p.id = s.partner_id and p.user_id = s.user_id
      where s.user_id = ${context.userId}
      order by s.created_at desc
    `;
    return { recipes, statements };
  });

export const toggleRecipe = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ recipeKey: z.string(), status: z.enum(["active", "paused"]) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update recipes set status = ${data.status}
      where user_id = ${context.userId} and recipe_key = ${data.recipeKey}
    `;
    if (data.status === "active") {
      await resumeOutbox(sql, context.userId);
    }
    return { ok: true as const };
  });

export const closePeriod = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    return runPeriodClose(sql, context.userId);
  });

export const getAudit = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const runs = await sql<{
      id: string;
      action_type: string;
      status: string;
      actor: string;
      object_type: string;
      object_id: string | null;
      error: string | null;
      created_at: string;
    }>`
      select id, action_type, status, actor, object_type, object_id, error, created_at
      from action_runs
      where user_id = ${context.userId}
      order by created_at desc
      limit 50
    `;
    const events = await sql<{
      id: string;
      type: string;
      run_id: string | null;
      created_at: string;
    }>`
      select id, type, run_id, created_at
      from events where user_id = ${context.userId}
      order by created_at desc
      limit 50
    `;
    return { runs, events };
  });

export const getConnectors = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const keys = await sql<{
      id: string;
      name: string;
      prefix: string;
      last_used_at: string | null;
      created_at: string;
    }>`
      select id, name, prefix, last_used_at, created_at
      from api_keys where user_id = ${context.userId}
      order by created_at desc
    `;
    const deliveries = await sql<{
      id: string;
      action_type: string;
      status: string;
      run_id: string | null;
      error: string | null;
      created_at: string;
    }>`
      select id, action_type, status, run_id, error, created_at
      from webhook_deliveries
      where user_id = ${context.userId}
      order by created_at desc
      limit 20
    `;
    return { keys, deliveries, allowedActions: WEBHOOK_ACTIONS };
  });

export const createApiKey = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ name: z.string().min(2).max(60) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const minted = await mintApiKey();
    const id = `key_${minted.hash.slice(0, 16)}`;
    await sql`
      insert into api_keys (id, user_id, name, prefix, hash)
      values (${id}, ${context.userId}, ${data.name}, ${minted.prefix}, ${minted.hash})
    `;
    return { id, prefix: minted.prefix, raw: minted.raw };
  });

export const revokeApiKey = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      delete from api_keys where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const sendSampleWebhook = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      actionType: z.enum(["register_claim", "record_revenue_fact"]),
      partnerId: z.string().optional(),
      claimId: z.string().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureWorkspace(sql, context.userId);
    const partners = await sql<{ id: string; name: string }>`
      select id, name from partners where user_id = ${context.userId} order by name limit 1
    `;
    const partnerId = data.partnerId || partners[0]?.id;
    if (!partnerId) throw new Error("Create a partner first.");
    const deliveryId = `wh_${Date.now()}`;
    try {
      if (data.actionType === "register_claim") {
        const result = await dispatchAction({
          sql,
          userId: context.userId,
          actor: "webhook",
          actionType: "register_claim",
          input: {
            partner_id: partnerId,
            account_name: `Inbound ${new Date().toISOString().slice(5, 16)}`,
            pipeline_amount: 175000,
            currency: "SAR",
          },
          idempotencyKey: `webhook:register:${deliveryId}`,
        });
        await sql`
          insert into webhook_deliveries (id, user_id, action_type, run_id, status, payload_json)
          values (${deliveryId}, ${context.userId}, ${"register_claim"}, ${result.runId}, ${"succeeded"}, ${"{}"})
        `;
        return result;
      }
      const claimId = data.claimId
        || (
          await sql<{ id: string }>`
            select id from claims
            where user_id = ${context.userId}
              and status in ('attributed', 'revenue', 'eligible')
            order by created_at desc
            limit 1
          `
        )[0]?.id;
      if (!claimId) throw new Error("Attribute a claim first, then billing can submit a collected fact.");
      const result = await dispatchAction({
        sql,
        userId: context.userId,
        actor: "webhook",
        actionType: "record_revenue_fact",
        input: {
          claim_id: claimId,
          revenue_stage: "collected",
          amount: 175000,
          reference: `WH-${deliveryId.slice(-6)}`,
        },
        idempotencyKey: `webhook:revenue:${claimId}:${deliveryId}`,
      });
      await sql`
        insert into webhook_deliveries (id, user_id, action_type, run_id, status, payload_json)
        values (${deliveryId}, ${context.userId}, ${"record_revenue_fact"}, ${result.runId}, ${"succeeded"}, ${"{}"})
      `;
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Webhook failed.";
      await sql`
        insert into webhook_deliveries (id, user_id, action_type, status, error, payload_json)
        values (${deliveryId}, ${context.userId}, ${data.actionType}, ${"failed"}, ${message}, ${"{}"})
      `;
      throw error;
    }
  });

export const exportEvidencePack = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ claimId: z.string() }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const claims = await sql<ClaimRow & { partner_name: string }>`
      select c.*, p.name as partner_name
      from claims c
      join partners p on p.id = c.partner_id
      where c.id = ${data.claimId} and c.user_id = ${context.userId}
      limit 1
    `;
    const claim = claims[0];
    if (!claim) throw new Error("Claim not found.");
    const journals = await sql<{
      id: string;
      event: string;
      memo: string;
      currency: string;
      created_at: string;
    }>`
      select id, event, memo, currency, created_at from journals
      where user_id = ${context.userId} and claim_id = ${data.claimId}
      order by created_at
    `;
    const entries = await sql<{
      account: string;
      direction: string;
      amount_minor: number;
      journal_id: string;
    }>`
      select e.account, e.direction, e.amount_minor, e.journal_id
      from ledger_entries e
      join journals j on j.id = e.journal_id
      where j.user_id = ${context.userId} and j.claim_id = ${data.claimId}
      order by e.id
    `;
    const runs = await sql<{
      action_type: string;
      actor: string;
      status: string;
      created_at: string;
    }>`
      select action_type, actor, status, created_at
      from action_runs
      where user_id = ${context.userId} and object_id = ${data.claimId}
      order by created_at
    `;
    return {
      generatedAt: new Date().toISOString(),
      notice: "Reven records payout milestones. It does not move money.",
      claim,
      journals,
      entries,
      runs,
    };
  });

