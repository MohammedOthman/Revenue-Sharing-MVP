export const ACTION_TYPES = [
  "register_claim",
  "run_preflight",
  "bind_agreement",
  "decide_attribution",
  "record_revenue_fact",
  "evaluate_eligibility",
  "record_payout_milestone",
  "compose_statement",
  "issue_statement",
  "open_dispute",
  "resolve_dispute",
] as const;

export type ActionType = (typeof ACTION_TYPES)[number];

export type Actor = "user" | "webhook" | "recipe" | "api";

/** Connectors may submit evidence only. */
export const WEBHOOK_ACTIONS: ActionType[] = ["register_claim", "record_revenue_fact"];

/** Named-human desks. API keys, webhooks, and recipes cannot fire these. */
export const HUMAN_ACTIONS: ActionType[] = [
  "decide_attribution",
  "open_dispute",
  "resolve_dispute",
  "record_payout_milestone",
];

/** Outbox/recipe follow. Period close is an operator button that runs as actor=recipe. */
export const RECIPE_ACTIONS: ActionType[] = [
  "run_preflight",
  "evaluate_eligibility",
  "compose_statement",
  "issue_statement",
];

/** Tenant Actions API — every verb except the human desks. */
export const API_ACTIONS: ActionType[] = ACTION_TYPES.filter(
  (action) => !HUMAN_ACTIONS.includes(action),
);

export function actorMayRun(actor: Actor, action: ActionType): boolean {
  if (actor === "user") return true;
  if (actor === "webhook") return WEBHOOK_ACTIONS.includes(action);
  if (actor === "api") return API_ACTIONS.includes(action);
  if (actor === "recipe") return RECIPE_ACTIONS.includes(action);
  return false;
}

export const RECIPE_MODE = {
  webhook_capture: "follow",
  eligibility_cascade: "follow",
  exception_drain: "follow",
  attribution_desk: "human",
  dispute_sla: "human",
  payout_milestone: "human",
  period_close: "operator",
  evidence_pack: "operator",
} as const;

export type RecipeMode = (typeof RECIPE_MODE)[keyof typeof RECIPE_MODE];

export const RECIPE_STEPS: Record<string, string[]> = {
  webhook_capture: ["register_claim", "run_preflight"],
  attribution_desk: ["decide_attribution"],
  eligibility_cascade: ["record_revenue_fact", "evaluate_eligibility"],
  period_close: ["compose_statement", "issue_statement"],
  exception_drain: ["run_preflight"],
  dispute_sla: ["open_dispute", "resolve_dispute"],
  payout_milestone: ["record_payout_milestone"],
  evidence_pack: [],
};
