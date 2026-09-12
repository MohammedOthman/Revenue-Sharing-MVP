import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import {
  ACTION_TYPES,
  WEBHOOK_ACTIONS,
  dispatchAction,
  lookupApiKey,
  type ActionType,
} from "@/lib/reven/engine";
import { ensureWorkspace } from "@/lib/reven/seed";

async function authenticate(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const sql = await getSql();
  const key = await lookupApiKey(sql, token);
  if (!key) return null;
  await ensureWorkspace(sql, key.user_id);
  return { sql, userId: key.user_id };
}

async function postAction({ request }: { request: Request }) {
  const auth = await authenticate(request);
  if (!auth) return Response.json({ error: "Invalid API key." }, { status: 401 });

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
  if (!ACTION_TYPES.includes(actionType)) {
    return Response.json({ error: "Unknown action." }, { status: 400 });
  }

  try {
    const result = await dispatchAction({
      sql: auth.sql,
      userId: auth.userId,
      actor: "api",
      actionType,
      input: body.input ?? {},
      idempotencyKey: body.idempotency_key || `api:${actionType}:${crypto.randomUUID()}`,
    });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Action failed.";
    return Response.json({ error: message }, { status: 422 });
  }
}

export const Route = createFileRoute("/api/v1/actions")({
  server: {
    handlers: {
      POST: postAction,
      GET: () =>
        Response.json({
          verbs: ACTION_TYPES,
          webhook_only: WEBHOOK_ACTIONS,
          notice: "Webhook ingress is restricted. This endpoint accepts every frozen verb for the tenant.",
        }),
    },
  },
});
