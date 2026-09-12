import type { Sql } from "@/lib/db";
import { LEDGER_EVENTS, buildClaimJournal } from "./ledger";
import { nid } from "./engine";

const RECIPES = [
  {
    key: "webhook_capture",
    name: "Deal registered from webhook",
    description: "Inbound connector events call register_claim, then run_preflight.",
  },
  {
    key: "attribution_desk",
    name: "Attribution desk",
    description: "A named human decides credit. The model never writes this verb.",
  },
  {
    key: "eligibility_cascade",
    name: "Revenue confirmed",
    description: "record_revenue_fact automatically evaluates eligibility from the agreement.",
  },
  {
    key: "period_close",
    name: "Period close",
    description: "Compose and issue partner statements from eligible journals.",
  },
  {
    key: "exception_drain",
    name: "Exception drain",
    description: "Failed preflight stays in the queue until agreement or duplicate is resolved.",
  },
  {
    key: "dispute_sla",
    name: "Dispute SLA",
    description: "open_dispute freezes payout-recording until a human resolves it.",
  },
  {
    key: "payout_milestone",
    name: "Payout milestone",
    description: "Finance records that an external payment happened. Reven never moves money.",
  },
  {
    key: "evidence_pack",
    name: "Evidence pack",
    description: "Export the claim timeline, journals, and actor log for finance.",
  },
] as const;

type SeedClaim = {
  account: string;
  partner: number;
  pipeline: number;
  status: string;
  pct?: number;
  revenue?: number;
  stage?: string;
  eligible?: number;
  eligStatus?: string;
  explanation?: string;
  preflight?: string;
  reasons?: string;
  payout?: number;
};

export async function ensureWorkspace(sql: Sql, userId: string) {
  const partnersExisting = await sql<{ n: number }>`
    select count(*)::int as n from partners where user_id = ${userId}
  `;
  if ((partnersExisting[0]?.n ?? 0) > 0) {
    await sql`
      insert into workspaces (user_id, name) values (${userId}, ${"Reven workspace"})
      on conflict (user_id) do nothing
    `;
    return;
  }

  await sql`
    insert into workspaces (user_id, name) values (${userId}, ${"Reven workspace"})
    on conflict (user_id) do nothing
  `;

  const partnerDefs = [
    { name: "Diriyah Digital", type: "referral" },
    { name: "Elm Alliance", type: "reseller" },
    { name: "Nearpay Channel", type: "isv" },
    { name: "Return · ANB", type: "strategic" },
  ];
  const partnerIds: string[] = [];
  for (const p of partnerDefs) {
    const id = nid("ptr");
    partnerIds.push(id);
    await sql`
      insert into partners (id, user_id, name, partner_type, lifecycle_status)
      values (${id}, ${userId}, ${p.name}, ${p.type}, ${"active"})
    `;
  }

  const agr = [
    { partner: 0, bps: 1200, trigger: "collected", days: 90 },
    { partner: 1, bps: 800, trigger: "invoiced", days: 60 },
    { partner: 2, bps: 1500, trigger: "collected", days: 120 },
    { partner: 3, bps: 1000, trigger: "recognized", days: 90 },
  ];
  const agreementIds: string[] = [];
  for (const a of agr) {
    const id = nid("agr");
    agreementIds.push(id);
    await sql`
      insert into agreements (id, user_id, partner_id, rate_bps, payout_trigger, protection_days, status, currency)
      values (${id}, ${userId}, ${partnerIds[a.partner]}, ${a.bps}, ${a.trigger}, ${a.days}, ${"active"}, ${"SAR"})
    `;
  }

  const claims: SeedClaim[] = [
    {
      account: "SAMA Treasury programme",
      partner: 0,
      pipeline: 240000,
      status: "registered",
      preflight: "passed",
    },
    {
      account: "Al Rajhi Digital onboarding",
      partner: 2,
      pipeline: 1150000,
      status: "eligible",
      pct: 70,
      revenue: 980000,
      stage: "collected",
      eligible: 102900,
      eligStatus: "eligible",
      explanation: "Eligible: 15% of attributed 980,000 after collected met trigger collected.",
      preflight: "passed",
    },
    {
      account: "stc Pay merchant desk",
      partner: 1,
      pipeline: 420000,
      status: "not_eligible",
      pct: 100,
      revenue: 420000,
      stage: "closed_won",
      eligible: 0,
      eligStatus: "not_eligible",
      explanation: "Not eligible: revenue is closed_won, agreement pays on invoiced.",
      preflight: "passed",
    },
    {
      account: "SAMA Treasury programme",
      partner: 0,
      pipeline: 88000,
      status: "registered",
      preflight: "failed",
      reasons: "duplicate_risk,protection_conflict",
    },
    {
      account: "Jadwa co-sell book",
      partner: 3,
      pipeline: 310000,
      status: "recorded",
      pct: 50,
      revenue: 310000,
      stage: "recognized",
      eligible: 15500,
      eligStatus: "eligible",
      explanation: "Eligible: 10% of attributed 310,000 after recognized met trigger recognized.",
      preflight: "passed",
      payout: 15500,
    },
    {
      account: "NEOM campus fit-out",
      partner: 3,
      pipeline: 640000,
      status: "disputed",
      pct: 80,
      revenue: 640000,
      stage: "recognized",
      eligible: 0,
      eligStatus: "not_eligible",
      explanation: "Partner contests credit split with Diriyah Digital.",
      preflight: "passed",
    },
    {
      account: "SNB cards alliance",
      partner: 1,
      pipeline: 95000,
      status: "attributed",
      pct: 40,
      preflight: "passed",
    },
  ];

  for (const spec of claims) {
    const id = nid("clm");
    const pipelineMinor = spec.pipeline * 100;
    const attributed = spec.pct != null ? Math.round((pipelineMinor * spec.pct) / 100) : null;
    await sql`
      insert into claims (
        id, user_id, partner_id, agreement_id, account_name, pipeline_amount_minor,
        attributed_pct, attributed_amount_minor, revenue_amount_minor, revenue_stage,
        eligible_amount_minor, eligibility_status, eligibility_explanation,
        payout_recorded_minor, status, preflight_status, preflight_reasons, currency
      ) values (
        ${id}, ${userId}, ${partnerIds[spec.partner]}, ${agreementIds[spec.partner]},
        ${spec.account}, ${pipelineMinor},
        ${spec.pct ?? null}, ${attributed},
        ${spec.revenue != null ? spec.revenue * 100 : null}, ${spec.stage ?? null},
        ${spec.eligible != null ? spec.eligible * 100 : null}, ${spec.eligStatus ?? null},
        ${spec.explanation ?? null},
        ${spec.payout != null ? spec.payout * 100 : null},
        ${spec.status}, ${spec.preflight ?? null}, ${spec.reasons ?? null}, ${"SAR"}
      )
    `;

    const claim = {
      account_name: spec.account,
      pipeline_amount_minor: pipelineMinor,
      attributed_amount_minor: attributed,
      revenue_amount_minor: spec.revenue != null ? spec.revenue * 100 : null,
      eligible_amount_minor: spec.eligible != null ? spec.eligible * 100 : null,
      eligibility_status: spec.eligStatus ?? null,
      eligibility_explanation: spec.explanation ?? null,
      payout_recorded_minor: spec.payout != null ? spec.payout * 100 : null,
      attributed_pct: spec.pct ?? null,
    };

    const events: { event: (typeof LEDGER_EVENTS)[keyof typeof LEDGER_EVENTS]; key: string }[] = [
      { event: LEDGER_EVENTS.CLAIM_REGISTERED, key: `claim:${id}:registered` },
    ];
    if (spec.pct != null) events.push({ event: LEDGER_EVENTS.ATTRIBUTION_DECIDED, key: `claim:${id}:attribution:v1` });
    if (spec.revenue != null) events.push({ event: LEDGER_EVENTS.REVENUE_RECORDED, key: `claim:${id}:revenue:${spec.stage}:seed` });
    if (spec.eligStatus) events.push({ event: LEDGER_EVENTS.ELIGIBILITY_EVALUATED, key: `claim:${id}:eligibility:v1` });
    if (spec.payout != null) events.push({ event: LEDGER_EVENTS.PAYOUT_RECORDED, key: `claim:${id}:payout:seed` });

    for (const ev of events) {
      const { lines, memo } = buildClaimJournal(ev.event, claim);
      const jid = nid("jnl");
      await sql`
        insert into journals (id, user_id, claim_id, event, idempotency_key, currency, memo)
        values (${jid}, ${userId}, ${id}, ${ev.event}, ${ev.key}, ${"SAR"}, ${memo})
      `;
      for (const line of lines) {
        await sql`
          insert into ledger_entries (journal_id, user_id, account, direction, amount_minor)
          values (${jid}, ${userId}, ${line.account}, ${line.direction}, ${line.amount_minor})
        `;
      }
    }

    const runId = nid("run");
    await sql`
      insert into action_runs (
        id, user_id, action_type, object_type, object_id, status, idempotency_key, actor, result_json
      ) values (
        ${runId}, ${userId}, ${"register_claim"}, ${"PartnerClaim"}, ${id}, ${"succeeded"},
        ${`seed:register:${id}`}, ${"user"}, ${JSON.stringify({ claimId: id })}
      )
    `;
  }

  for (const recipe of RECIPES) {
    const id = nid("rcp");
    await sql`
      insert into recipes (id, user_id, recipe_key, name, description, status)
      values (${id}, ${userId}, ${recipe.key}, ${recipe.name}, ${recipe.description}, ${"active"})
    `;
  }
}
