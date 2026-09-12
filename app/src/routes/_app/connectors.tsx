import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { createApiKey, getConnectors, revokeApiKey, sendSampleWebhook, submitAction } from "@/lib/reven/queries";
import { ACTION_TYPES } from "@/lib/reven/catalog";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatWhen } from "@/lib/utils";

export const Route = createFileRoute("/_app/connectors")({ component: ConnectorsPage });

function ConnectorsPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["connectors"], queryFn: () => getConnectors() });
  const [name, setName] = useState("Inbound CRM");
  const [revealed, setRevealed] = useState<string | null>(null);
  const [verb, setVerb] = useState<(typeof ACTION_TYPES)[number]>("register_claim");
  const [json, setJson] = useState('{\n  "partner_name": "Diriyah Digital",\n  "account_name": "Playground deal",\n  "pipeline_amount": 90000\n}');

  const mint = useMutation({
    mutationFn: () => createApiKey({ data: { name } }),
    onSuccess: async (res) => {
      setRevealed(res.raw);
      toast.success("Key minted. Copy it now — it will not be shown again.");
      await qc.invalidateQueries({ queryKey: ["connectors"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const sample = useMutation({
    mutationFn: (actionType: "register_claim" | "record_revenue_fact") =>
      sendSampleWebhook({ data: { actionType } }),
    onSuccess: async (res) => {
      toast.success(`${res.actionType.replace(/_/g, " ")} accepted`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const play = useMutation({
    mutationFn: () => {
      const input = JSON.parse(json) as Record<string, unknown>;
      return submitAction({
        data: {
          actionType: verb,
          input,
          idempotencyKey: `play:${verb}:${Date.now()}`,
        },
      });
    },
    onSuccess: async (res) => {
      toast.success(`${res.actionType} · ${res.status}`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const revoke = useMutation({
    mutationFn: (id: string) => revokeApiKey({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["connectors"] }),
  });

  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Ingress"
        title="Connectors"
        description="Webhooks may only submit evidence. API keys cannot fire attribution, disputes, or payouts. Those desks require a signed operator."
      />

      <section className="grid gap-3 md:grid-cols-3">
        {[
          {
            title: "CRM closed-won",
            verb: "register_claim" as const,
            copy: "Allowed. Ingests a deal as a claim, then preflight.",
          },
          {
            title: "Billing collected",
            verb: "record_revenue_fact" as const,
            copy: "Allowed. Submits collected evidence. Eligibility is server-computed.",
          },
          {
            title: "Bank paid",
            verb: null,
            copy: "Blocked. Payout is a finance verb. Connectors cannot record it.",
          },
        ].map((card) => (
          <article key={card.title} className="rounded-xl border border-border bg-surface p-4">
            <h2 className="text-sm font-medium">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.copy}</p>
            {card.verb ? (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                disabled={sample.isPending}
                onClick={() => sample.mutate(card.verb!)}
              >
                Send sample
              </Button>
            ) : (
              <p className="mt-4 font-mono text-[11px] text-muted">record_payout_milestone refused</p>
            )}
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Tenant API keys</h2>
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            mint.mutate();
          }}
        >
          <input
            className="min-h-11 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={mint.isPending}>
            Mint key
          </Button>
        </form>
        {revealed && (
          <p className="mt-3 break-all rounded-md bg-chip px-3 py-2 font-mono text-xs">{revealed}</p>
        )}
        <ul className="mt-4 divide-y divide-border">
          {q.data!.keys.map((k) => (
            <li key={k.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <div>
                <p>{k.name}</p>
                <p className="font-mono text-xs text-muted">
                  {k.prefix}… · last used {formatWhen(k.last_used_at)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => revoke.mutate(k.id)}>
                Revoke
              </Button>
            </li>
          ))}
          {q.data!.keys.length === 0 && <li className="py-3 text-sm text-muted">No keys yet.</li>}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Actions API</h2>
        <p className="mt-1 font-mono text-xs text-muted">POST /api/v1/actions</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Bearer tenant key. Body is <span className="font-mono">action</span>,{" "}
          <span className="font-mono">idempotency_key</span>, <span className="font-mono">input</span>. Keys may
          register, preflight, bind, post revenue, evaluate, and compose or issue a statement. Attribution, disputes,
          and payout milestones return 403 — those desks are signed operators only. Eligibility is always
          server-computed. A replay of the same key returns the original run.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium">Webhook ingress</h2>
            <p className="mt-1 font-mono text-xs text-muted">POST /api/v1/webhook</p>
          </div>
          <Button variant="outline" onClick={() => sample.mutate("register_claim")} disabled={sample.isPending}>
            Send sample webhook
          </Button>
        </div>
        <p className="mt-3 text-sm text-muted">
          Allowed verbs: {q.data!.allowedActions.join(", ")}. The sample registers a 175,000 SAR claim and the
          webhook_capture recipe runs preflight.
        </p>
        <ul className="mt-4 divide-y divide-border">
          {q.data!.deliveries.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="font-mono text-xs">{d.action_type}</span>
              <Badge tone={statusTone(d.status)}>{d.status}</Badge>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Action playground</h2>
        <p className="mt-1 text-xs text-muted">Signed-in humans may fire any frozen verb. Connectors may not.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <select
            className="min-h-11 rounded-md border border-border bg-bg px-3 text-sm"
            value={verb}
            onChange={(e) => setVerb(e.target.value as typeof verb)}
          >
            {ACTION_TYPES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-32 rounded-md border border-border bg-bg p-3 font-mono text-xs md:col-span-2"
            value={json}
            onChange={(e) => setJson(e.target.value)}
          />
        </div>
        <Button className="mt-3" disabled={play.isPending} onClick={() => play.mutate()}>
          Dispatch
        </Button>
      </section>
    </div>
  );
}
