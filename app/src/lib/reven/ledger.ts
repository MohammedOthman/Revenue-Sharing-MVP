export const LEDGER_EVENTS = {
  CLAIM_REGISTERED: "claim_registered",
  ATTRIBUTION_DECIDED: "attribution_decided",
  REVENUE_RECORDED: "revenue_recorded",
  ELIGIBILITY_EVALUATED: "eligibility_evaluated",
  PAYOUT_RECORDED: "payout_recorded",
} as const;

export const LEDGER_ACCOUNTS = {
  PIPELINE_VALUE: "pipeline_value",
  PIPELINE_CONTROL: "pipeline_control",
  ATTRIBUTED_VALUE: "attributed_value",
  ATTRIBUTION_CONTROL: "attribution_control",
  ELIGIBLE_OBLIGATION: "eligible_obligation",
  ELIGIBILITY_CONTROL: "eligibility_control",
  RECORDED_PAYOUT: "recorded_payout",
  PAYOUT_CONTROL: "payout_control",
} as const;

export type LedgerEvent = (typeof LEDGER_EVENTS)[keyof typeof LEDGER_EVENTS];

export type LedgerLine = {
  account: string;
  direction: "debit" | "credit";
  amount_minor: number;
};

export function toMinorUnits(amount: number) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Ledger amounts must be finite and non-negative.");
  }
  return Math.round(amount * 100);
}

export function assertJournalBalanced(lines: LedgerLine[]) {
  const debit = lines
    .filter((l) => l.direction === "debit")
    .reduce((s, l) => s + l.amount_minor, 0);
  const credit = lines
    .filter((l) => l.direction === "credit")
    .reduce((s, l) => s + l.amount_minor, 0);
  if (debit !== credit) {
    throw new Error(`Unbalanced journal: debit ${debit} credit ${credit}`);
  }
  return lines;
}

function pair(debit: string, credit: string, amountMinor: number): LedgerLine[] {
  if (amountMinor === 0) return [];
  return [
    { account: debit, direction: "debit", amount_minor: amountMinor },
    { account: credit, direction: "credit", amount_minor: amountMinor },
  ];
}

export function buildClaimJournal(event: LedgerEvent, claim: {
  account_name: string;
  pipeline_amount_minor: number;
  attributed_amount_minor: number | null;
  revenue_amount_minor: number | null;
  eligible_amount_minor: number | null;
  eligibility_status: string | null;
  eligibility_explanation: string | null;
  payout_recorded_minor: number | null;
  attributed_pct: number | null;
}): { lines: LedgerLine[]; memo: string } {
  if (event === LEDGER_EVENTS.CLAIM_REGISTERED) {
    return {
      lines: assertJournalBalanced(
        pair(LEDGER_ACCOUNTS.PIPELINE_VALUE, LEDGER_ACCOUNTS.PIPELINE_CONTROL, claim.pipeline_amount_minor),
      ),
      memo: `Registered claim against ${claim.account_name}.`,
    };
  }
  if (event === LEDGER_EVENTS.ATTRIBUTION_DECIDED) {
    return {
      lines: assertJournalBalanced(
        pair(
          LEDGER_ACCOUNTS.ATTRIBUTED_VALUE,
          LEDGER_ACCOUNTS.ATTRIBUTION_CONTROL,
          claim.attributed_amount_minor ?? 0,
        ),
      ),
      memo: `Attribution recorded at ${claim.attributed_pct ?? 0}%.`,
    };
  }
  if (event === LEDGER_EVENTS.REVENUE_RECORDED) {
    return {
      lines: assertJournalBalanced(
        pair(
          LEDGER_ACCOUNTS.PIPELINE_VALUE,
          LEDGER_ACCOUNTS.PIPELINE_CONTROL,
          claim.revenue_amount_minor ?? 0,
        ),
      ),
      memo: "Revenue evidence posted (server-computed).",
    };
  }
  if (event === LEDGER_EVENTS.ELIGIBILITY_EVALUATED) {
    const eligible =
      claim.eligibility_status === "eligible" ? claim.eligible_amount_minor ?? 0 : 0;
    return {
      lines: assertJournalBalanced(
        pair(LEDGER_ACCOUNTS.ELIGIBLE_OBLIGATION, LEDGER_ACCOUNTS.ELIGIBILITY_CONTROL, eligible),
      ),
      memo: claim.eligibility_explanation ?? "Eligibility evaluated.",
    };
  }
  return {
    lines: assertJournalBalanced(
      pair(LEDGER_ACCOUNTS.RECORDED_PAYOUT, LEDGER_ACCOUNTS.PAYOUT_CONTROL, claim.payout_recorded_minor ?? 0),
    ),
    memo: "Payout milestone recorded. No funds moved.",
  };
}
