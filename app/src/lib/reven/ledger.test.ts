import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { LEDGER_EVENTS, assertJournalBalanced, buildClaimJournal } from "./ledger.ts";

const claim = {
  account_name: "SAMA sandbox",
  pipeline_amount_minor: 1000000,
  attributed_amount_minor: 1000000,
  revenue_amount_minor: 900000,
  eligible_amount_minor: 90000,
  eligibility_status: "eligible",
  eligibility_explanation: "Eligible after collected.",
  payout_recorded_minor: 90000,
  attributed_pct: 100,
};

describe("ledger", () => {
  it("rejects an unbalanced journal", () => {
    assert.throws(() =>
      assertJournalBalanced([
        { account: "a", direction: "debit", amount_minor: 10 },
        { account: "b", direction: "credit", amount_minor: 9 },
      ]),
    );
  });

  it("posts a balanced journal for every claim event", () => {
    for (const event of Object.values(LEDGER_EVENTS)) {
      const { lines } = buildClaimJournal(event, claim);
      const debit = lines.filter((l) => l.direction === "debit").reduce((s, l) => s + l.amount_minor, 0);
      const credit = lines.filter((l) => l.direction === "credit").reduce((s, l) => s + l.amount_minor, 0);
      assert.equal(debit, credit);
    }
  });

  it("records payout without implying funds moved", () => {
    const { memo } = buildClaimJournal(LEDGER_EVENTS.PAYOUT_RECORDED, claim);
    assert.match(memo, /No funds moved/);
  });
});
