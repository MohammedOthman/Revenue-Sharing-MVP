import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import {
  WEBHOOK_ACTIONS,
  dispatchAction,
  lookupApiKey,
  type ActionType,
} from "@/lib/reven/engine";
import { ensureWorkspace } from "@/lib/reven/seed";

async function postWebhook({ request }: { request: Request }) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const sql = await getSql();
  const key = await lookupApiKey(sql, token);
  if (!key) {
    return Response.json({ error: "Invalid API key." }, { status: 401 });
  }
  await ensureWorkspace(sql, key.user_id);

  let body: {
    action?: string;
    idempotency_key?: string;
    input?: Record<string, unknown>;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "JSON body required." }, { status: 400 });
  }

  const actionType = body.action as ActionType;
  if (!WEBHOOK_ACTIONS.includes(actionType)) {
    return Response.json(
      { error: "This connector may only call register_claim or record_revenue_fact." },
      { status: 400 },
    );
  }

  try {
    const result = await dispatchAction({
      sql,
      userId: key.user_id,
      actor: "webhook",
      actionType,
      input: body.input ?? {},
      idempotencyKey: body.idempotency_key || `http:${actionType}:${Date.now()}`,
    });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Action failed.";
    return Response.json({ error: message }, { status: 422 });
  }
}

export const Route = createFileRoute("/api/v1/webhook")({
  server: {
    handlers: {
      POST: postWebhook,
    },
  },
});
