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

export const WEBHOOK_ACTIONS: ActionType[] = ["register_claim", "record_revenue_fact"];

export const RECIPE_STEPS: Record<string, string[]> = {
  webhook_capture: ["register_claim", "run_preflight"],
  attribution_desk: ["decide_attribution"],
  eligibility_cascade: ["record_revenue_fact", "evaluate_eligibility"],
  period_close: ["compose_statement", "issue_statement"],
  exception_drain: ["bind_agreement", "run_preflight"],
  dispute_sla: ["open_dispute", "resolve_dispute"],
  payout_milestone: ["record_payout_milestone"],
  evidence_pack: ["export evidence"],
};
