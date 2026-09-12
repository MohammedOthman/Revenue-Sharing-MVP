import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getRuntime, submitAction } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeskRow, PageHeader, Panel, Segmented, Stat } from "@/components/reven/chrome";
import { formatMoney, formatWhen, humanize } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({ component: RuntimePage });

type Phase = "capture" | "settle" | "orchestrate";

function RuntimePage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["runtime"], queryFn: () => getRuntime() });
  const [phase, setPhase] = useState<Phase>("capture");
  const [pct, setPct] = useState("100");

  const act = useMutation({
    mutationFn: (payload: {
      actionType: "decide_attribution" | "record_payout_milestone" | "resolve_dispute";
      claimId: string;
      decision?: "accept" | "reject";
    }) =>
      submitAction({
        data: {
          actionType: payload.actionType,
          idempotencyKey: `desk:${payload.actionType}:${payload.claimId}:${Date.now()}`,
          input:
            payload.actionType === "decide_attribution"
              ? { claim_id: payload.claimId, decision: payload.decision ?? "accept", percentage: payload.decision === "reject" ? 0 : Number(pct) }
              : payload.actionType === "resolve_dispute"
                ? { claim_id: payload.claimId, note: "Dispute resolved from the desk." }
                : { claim_id: payload.claimId },
        },
      }),
    onSuccess: async (res) => {
      toast.success(res.actionType.replace(/_/g, " "));
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) return <div className="h-72 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;
  const data = q.data!;
  const m = data.metrics;

  return (
    <div className="rise space-y-8">
      <PageHeader
        eyebrow="Partnership OS"
        title="Action runtime"
        description="Capture credit. Settle obligation. Orchestrate recipes. Money never moves inside Reven."
        action={
          <Link
            to="/statements"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 md:w-auto"
          >
            Close period
          </Link>
        }
      />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Claims" value={String(m.claims)} hint="In this book" />
        <Stat label="Eligible" value={formatMoney(m.obligationMinor)} hint="Due to partners" />
        <Stat label="Recorded" value={formatMoney(m.recordedMinor)} hint="Payout milestones" />
        <Stat label="Exceptions" value={String(m.failedPreflight)} hint="Need a human" />
      </section>

      <Segmented
        value={phase}
        onChange={setPhase}
        options={[
          { id: "capture", label: "Capture" },
          { id: "settle", label: "Settle" },
          { id: "orchestrate", label: "Orchestrate" },
        ]}
      />

      {phase === "capture" && (
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium">Attribution desk</h2>
                <p className="mt-1 text-xs text-muted">A named operator decides credit. The model never writes this verb.</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted">
                Share
                <input
                  className="field w-20"
                  type="number"
                  min={0}
                  max={100}
                  value={pct}
                  onChange={(e) => setPct(e.target.value)}
                />
              </label>
            </div>
            {data.desk.length === 0 ? (
              <p className="text-sm text-muted">Queue is clear. Register a claim, or wait for webhook capture.</p>
            ) : (
              <ul className="space-y-2">
                {data.desk.map((row) => (
                  <DeskRow
                    key={row.id}
                    title={row.account_name}
                    meta={`${row.partner_name} · ${formatMoney(row.pipeline_amount_minor, row.currency)}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={act.isPending}
                      onClick={() => act.mutate({ actionType: "decide_attribution", claimId: row.id, decision: "reject" })}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      disabled={act.isPending}
                      onClick={() => act.mutate({ actionType: "decide_attribution", claimId: row.id, decision: "accept" })}
                    >
                      Attribute {pct}%
                    </Button>
                  </DeskRow>
                ))}
              </ul>
            )}
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h2 className="text-sm font-medium">Pipeline</h2>
              <ul className="mt-4 space-y-2.5">
                {data.pipeline.map((row) => (
                  <li key={row.status} className="flex items-center justify-between text-sm">
                    <span>{humanize(row.status)}</span>
                    <span className="tabular-nums text-muted">{row.n}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <h2 className="text-sm font-medium">Exception queue</h2>
              <p className="mt-1 mb-4 text-xs text-muted">Preflight failures and disputes</p>
              <ul className="space-y-3">
                {data.exceptions.length === 0 && <li className="text-sm text-muted">Nothing stuck.</li>}
                {data.exceptions.map((row) => (
                  <li key={row.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{row.account_name}</p>
                      <p className="truncate text-xs text-muted">{row.partner_name}</p>
                    </div>
                    <Badge tone={statusTone(row.status)}>{humanize(row.preflight_reasons || row.status)}</Badge>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      )}

      {phase === "settle" && (
        <div className="space-y-4">
          <Panel>
            <h2 className="text-sm font-medium">Settlement desk</h2>
            <p className="mt-1 mb-4 text-xs text-muted">Eligible obligation waiting for a finance payout milestone. Reven does not pay.</p>
            {data.settlement.length === 0 ? (
              <p className="text-sm text-muted">Nothing due. Attribute, collect, then evaluate eligibility.</p>
            ) : (
              <ul className="space-y-2">
                {data.settlement.map((row) => (
                  <DeskRow
                    key={row.id}
                    title={row.account_name}
                    meta={`${row.partner_name} · ${formatMoney(row.eligible_amount_minor ?? 0, row.currency)}`}
                  >
                    <Button size="sm" disabled={act.isPending} onClick={() => act.mutate({ actionType: "record_payout_milestone", claimId: row.id })}>
                      Record payout
                    </Button>
                  </DeskRow>
                ))}
              </ul>
            )}
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium">Obligation by partner</h2>
                <Link to="/partners" className="text-xs text-muted hover:text-fg">
                  Register
                </Link>
              </div>
              <ul className="space-y-3">
                {data.obligations.map((row) => (
                  <li key={row.partner_name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{row.partner_name}</span>
                    <span className="tabular-nums text-muted">
                      {formatMoney(row.eligible_minor)} due
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium">Statements</h2>
                <Link to="/statements" className="text-xs text-muted hover:text-fg">
                  All
                </Link>
              </div>
              {data.statements.length === 0 ? (
                <p className="text-sm text-muted">None this period.</p>
              ) : (
                <ul className="space-y-2">
                  {data.statements.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate">
                        {s.partner_name} · {s.period}
                      </span>
                      <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          <Panel>
            <h2 className="text-sm font-medium">Disputes</h2>
            <p className="mt-1 mb-4 text-xs text-muted">Payout is frozen until a human resolves the contest.</p>
            {data.disputes.length === 0 ? (
              <p className="text-sm text-muted">No open disputes.</p>
            ) : (
              <ul className="space-y-2">
                {data.disputes.map((row) => (
                  <DeskRow key={row.id} title={row.account_name} meta={row.eligibility_explanation || row.partner_name}>
                    <Button size="sm" variant="outline" disabled={act.isPending} onClick={() => act.mutate({ actionType: "resolve_dispute", claimId: row.id })}>
                      Resolve
                    </Button>
                  </DeskRow>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      )}

      {phase === "orchestrate" && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-5">
            <Panel className="lg:col-span-3">
              <h2 className="text-sm font-medium">Action volume</h2>
              <p className="mt-1 mb-4 text-xs text-muted">Successful and replayed verbs in this book</p>
              <div className="h-48">
                {data.volume.length === 0 ? (
                  <p className="pt-10 text-sm text-muted">No verbs yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.volume} barCategoryGap={18}>
                      <XAxis dataKey="action_type" tick={{ fontSize: 10, fill: "#6d675d" }} interval={0} hide={data.volume.length > 6} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#6d675d" }} width={28} />
                      <Tooltip
                        cursor={{ fill: "#ebe4d6" }}
                        contentStyle={{ background: "#fbf8f1", border: "1px solid #e2dacd", borderRadius: 8, fontSize: 12 }}
                      />
                      <Bar dataKey="n" fill="#1c3a32" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>
            <Panel className="lg:col-span-2">
              <h2 className="text-sm font-medium">Outbox</h2>
              <p className="mt-1 mb-4 text-xs text-muted">Recipe work queued after each verb.</p>
              {data.outbox.length === 0 ? (
                <p className="text-sm text-muted">Empty.</p>
              ) : (
                <ul className="space-y-2">
                  {data.outbox.map((row) => (
                    <li key={row.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-mono text-xs">{row.recipe_key}</span>
                      <Badge tone={statusTone(row.status)}>{row.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium">Recipes</h2>
              <Link to="/recipes" className="text-xs text-muted hover:text-fg">
                Graphs
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {data.recipes.map((r) => (
                <li key={r.recipe_key} className="flex items-center justify-between rounded-md bg-chip px-3 py-2.5 text-sm">
                  <span>{r.name}</span>
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium">Recent runs</h2>
              <Link to="/audit" className="text-xs text-muted hover:text-fg">
                Full log
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs text-muted">
                  <tr className="border-b border-border">
                    <th className="py-2 font-medium">When</th>
                    <th className="py-2 font-medium">Verb</th>
                    <th className="py-2 font-medium">Actor</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.runs.map((run) => (
                    <tr key={run.id} className="border-b border-border/70">
                      <td className="py-2.5 font-mono text-xs tabular-nums">{formatWhen(run.created_at)}</td>
                      <td className="py-2.5 font-mono text-xs">{run.action_type}</td>
                      <td className="py-2.5 text-muted">{run.actor}</td>
                      <td className="py-2.5">
                        <Badge tone={statusTone(run.status)}>{run.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
