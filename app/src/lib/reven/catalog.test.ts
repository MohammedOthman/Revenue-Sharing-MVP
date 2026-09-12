import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ACTION_TYPES,
  API_ACTIONS,
  HUMAN_ACTIONS,
  RECIPE_ACTIONS,
  WEBHOOK_ACTIONS,
  actorMayRun,
} from "./catalog.ts";

describe("actor policy", () => {
  it("lets a signed operator fire every verb", () => {
    for (const action of ACTION_TYPES) {
      assert.equal(actorMayRun("user", action), true);
    }
  });

  it("restricts webhooks to evidence verbs", () => {
    assert.deepEqual(WEBHOOK_ACTIONS, ["register_claim", "record_revenue_fact"]);
    assert.equal(actorMayRun("webhook", "register_claim"), true);
    assert.equal(actorMayRun("webhook", "record_revenue_fact"), true);
    assert.equal(actorMayRun("webhook", "decide_attribution"), false);
    assert.equal(actorMayRun("webhook", "record_payout_milestone"), false);
  });

  it("blocks API keys from human desks", () => {
    for (const action of HUMAN_ACTIONS) {
      assert.equal(actorMayRun("api", action), false);
      assert.equal(API_ACTIONS.includes(action), false);
    }
    assert.equal(actorMayRun("api", "register_claim"), true);
    assert.equal(actorMayRun("api", "compose_statement"), true);
    assert.equal(actorMayRun("api", "evaluate_eligibility"), true);
  });

  it("lets recipes preflight, evaluate, and close a period — nothing else", () => {
    assert.deepEqual(RECIPE_ACTIONS, [
      "run_preflight",
      "evaluate_eligibility",
      "compose_statement",
      "issue_statement",
    ]);
    assert.equal(actorMayRun("recipe", "run_preflight"), true);
    assert.equal(actorMayRun("recipe", "decide_attribution"), false);
    assert.equal(actorMayRun("recipe", "register_claim"), false);
    assert.equal(actorMayRun("recipe", "record_payout_milestone"), false);
  });
});
