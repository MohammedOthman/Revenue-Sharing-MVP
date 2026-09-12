import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  exportEvidencePack,
  getClaim,
  listClaims,
  listPartners,
  submitAction,
} from "@/lib/reven/queries";
import type { ActionType } from "@/lib/reven/catalog";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatMoney, formatWhen, humanize } from "@/lib/utils";

export const Route = createFileRoute("/_app/claims")({ component: ClaimsPage });

function ClaimsPage() {
  const qc = useQueryClient();
  const claims = useQuery({ queryKey: ["claims"], queryFn: () => listClaims() });
  const partners = useQuery({ queryKey: ["partners"], queryFn: () => listPartners() });
  const [open, setOpen] = useState<string | null>(null);
  const [form, setForm] = useState({ partner_id: "", account_name: "", pipeline_amount: "120000" });
  const [view, setView] = useState<"list" | "board">("list");
  const [filter, setFilter] = useState("");

  const register = useMutation({
    mutationFn: () =>
      submitAction({
        data: {
          actionType: "register_claim",
          idempotencyKey: `ui:register:${form.account_name}:${Date.now()}`,
          input: {
            partner_id: form.partner_id,
            account_name: form.account_name,
            pipeline_amount: Number(form.pipeline_amount),
            currency: "SAR",
          },
        },
      }),
    onSuccess: async (res) => {
      toast.success("Claim registered");
      await qc.invalidateQueries();
      if (res.objectId) setOpen(res.objectId);
      setForm((f) => ({ ...f, account_name: "" }));
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Canonical object"
        title="Claims"
        description="Status never patches in place. Every change is a verb that appends a journal."
      />

      <form
        className="grid gap-3 rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          register.mutate();
        }}
      >
        <label className="text-sm">
          <span className="mb-1 block text-xs text-muted">Partner</span>
          <select
            required
            className="field"
            value={form.partner_id}
            onChange={(e) => setForm((f) => ({ ...f, partner_id: e.target.value }))}
          >
            <option value="">Select</option>
            {(partners.data ?? []).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm md:col-span-2">
          <span className="mb-1 block text-xs text-muted">Account</span>
          <input
            required
            className="field"
            value={form.account_name}
            onChange={(e) => setForm((f) => ({ ...f, account_name: e.target.value }))}
            placeholder="Customer account"
          />
        </label>
        <div className="flex items-end gap-2">
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs text-muted">Pipeline SAR</span>
            <input
              required
              type="number"
              min={1}
              className="field"
              value={form.pipeline_amount}
              onChange={(e) => setForm((f) => ({ ...f, pipeline_amount: e.target.value }))}
            />
          </label>
          <Button type="submit" disabled={register.isPending}>
            Register
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="field flex-1"
          placeholder="Filter account or partner"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex rounded-md bg-chip p-1">
          {(["list", "board"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className={`min-h-9 rounded px-3 text-sm capitalize ${view === id ? "bg-surface" : "text-muted"}`}
              onClick={() => setView(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Partner</th>
              <th className="px-4 py-3 font-medium">Pipeline</th>
              <th className="px-4 py-3 font-medium">Eligible</th>
              <th className="px-4 py-3 font-medium">Preflight</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(claims.data ?? [])
              .filter((row) => {
                const q = filter.trim().toLowerCase();
                if (!q) return true;
                return row.account_name.toLowerCase().includes(q) || row.partner_name.toLowerCase().includes(q);
              })
              .map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-b border-border/70 hover:bg-chip/60"
                onClick={() => setOpen(row.id)}
              >
                <td className="px-4 py-3">
                  <p>{row.account_name}</p>
                  <p className="font-mono text-[11px] text-muted">{row.id.slice(0, 18)}</p>
                </td>
                <td className="px-4 py-3">{row.partner_name}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(row.pipeline_amount_minor, row.currency)}</td>
                <td className="px-4 py-3 tabular-nums">
                  {row.eligible_amount_minor != null ? formatMoney(row.eligible_amount_minor, row.currency) : "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(row.preflight_status)}>{humanize(row.preflight_status)}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(row.status)}>{humanize(row.status)}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <ClaimBoard
          rows={(claims.data ?? []).filter((row) => {
            const q = filter.trim().toLowerCase();
            if (!q) return true;
            return row.account_name.toLowerCase().includes(q) || row.partner_name.toLowerCase().includes(q);
          })}
          onOpen={setOpen}
        />
      )}

      {open && <ClaimDrawer id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ClaimDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["claim", id], queryFn: () => getClaim({ data: { id } }) });
  const [pct, setPct] = useState("100");
  const [stage, setStage] = useState("collected");
  const [amount, setAmount] = useState("");
  const [agreementId, setAgreementId] = useState("");

  const act = useMutation({
    mutationFn: (payload: { actionType: ActionType; input: Record<string, string | number> }) =>
      submitAction({
        data: {
          actionType: payload.actionType,
          input: payload.input,
          idempotencyKey: `ui:${payload.actionType}:${id}:${Date.now()}`,
        },
      }),
    onSuccess: async (res) => {
      toast.success(res.actionType.replace(/_/g, " "));
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const claim = q.data?.claim as Record<string, unknown> | undefined;
  const next = useMemo(() => {
    const status = String(claim?.status ?? "");
    const pre = String(claim?.preflight_status ?? "");
    if (status === "registered") return pre === "passed" ? ["decide_attribution"] : ["run_preflight", "bind_agreement"];
    if (status === "attributed") return ["record_revenue_fact"];
    if (status === "revenue") return ["evaluate_eligibility"];
    if (status === "eligible") return ["record_payout_milestone"];
    if (status === "not_eligible") return ["record_revenue_fact", "open_dispute"];
    if (status === "disputed") return ["resolve_dispute"];
    return [];
  }, [claim]);

  async function downloadPack() {
    const pack = await exportEvidencePack({ data: { claimId: id } });
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reven-evidence-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-fg/20 backdrop-blur-[2px]" onClick={onClose}>
      <aside
        className="sheet-in flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-border bg-surface p-6 shadow-[var(--shadow-soft)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Partner claim</p>
            <h2 className="font-display text-2xl tracking-tight">{String(claim?.account_name ?? "…")}</h2>
            <p className="text-sm text-muted">{String(claim?.partner_name ?? "")}</p>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-md hover:bg-chip" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </div>

        {q.isLoading && <div className="mt-8 h-40 animate-pulse rounded-lg bg-chip" />}
        {claim && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Field label="Pipeline" value={formatMoney(Number(claim.pipeline_amount_minor), String(claim.currency))} />
              <Field label="Status" value={humanize(String(claim.status))} />
              <Field label="Attribution" value={claim.attributed_pct != null ? `${claim.attributed_pct}%` : "—"} />
              <Field label="Eligible" value={claim.eligible_amount_minor != null ? formatMoney(Number(claim.eligible_amount_minor), String(claim.currency)) : "—"} />
            </div>
            {claim.eligibility_explanation ? (
              <p className="mt-4 rounded-md bg-chip px-3 py-2 text-sm leading-relaxed">{String(claim.eligibility_explanation)}</p>
            ) : null}

            <div className="mt-6 space-y-3">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Allowed verbs</p>
              {next.includes("run_preflight") && (
                <Button variant="outline" className="w-full" onClick={() => act.mutate({ actionType: "run_preflight", input: { claim_id: id } })}>
                  Run preflight
                </Button>
              )}
              {next.includes("bind_agreement") && (
                <div className="flex gap-2">
                  <select
                    className="min-h-11 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
                    value={agreementId}
                    onChange={(e) => setAgreementId(e.target.value)}
                  >
                    <option value="">Agreement</option>
                    {(q.data?.agreements ?? [])
                      .filter((a) => a.partner_id === claim.partner_id)
                      .map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.rate_bps / 100}% on {a.payout_trigger}
                        </option>
                      ))}
                  </select>
                  <Button
                    variant="outline"
                    onClick={() => act.mutate({ actionType: "bind_agreement", input: { claim_id: id, agreement_id: agreementId } })}
                  >
                    Bind
                  </Button>
                </div>
              )}
              {next.includes("decide_attribution") && (
                <div className="flex gap-2">
                  <input
                    className="min-h-11 w-24 rounded-md border border-border bg-bg px-3 text-sm"
                    value={pct}
                    onChange={(e) => setPct(e.target.value)}
                    type="number"
                    min={0}
                    max={100}
                  />
                  <Button
                    className="flex-1"
                    onClick={() =>
                      act.mutate({ actionType: "decide_attribution", input: { claim_id: id, decision: "accept", percentage: Number(pct) } })
                    }
                  >
                    Attribute {pct}%
                  </Button>
                </div>
              )}
              {next.includes("record_revenue_fact") && (
                <div className="grid grid-cols-2 gap-2">
                  <select className="min-h-11 rounded-md border border-border bg-bg px-3 text-sm" value={stage} onChange={(e) => setStage(e.target.value)}>
                    <option value="closed_won">closed_won</option>
                    <option value="invoiced">invoiced</option>
                    <option value="collected">collected</option>
                    <option value="recognized">recognized</option>
                  </select>
                  <input
                    className="min-h-11 rounded-md border border-border bg-bg px-3 text-sm"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button
                    className="col-span-2"
                    variant="outline"
                    onClick={() =>
                      act.mutate({
                        actionType: "record_revenue_fact",
                        input: { claim_id: id, revenue_stage: stage, amount: Number(amount || Number(claim.pipeline_amount_minor) / 100) },
                      })
                    }
                  >
                    Record revenue fact
                  </Button>
                </div>
              )}
              {next.includes("evaluate_eligibility") && (
                <Button variant="outline" className="w-full" onClick={() => act.mutate({ actionType: "evaluate_eligibility", input: { claim_id: id } })}>
                  Evaluate eligibility
                </Button>
              )}
              {next.includes("record_payout_milestone") && (
                <Button className="w-full" onClick={() => act.mutate({ actionType: "record_payout_milestone", input: { claim_id: id } })}>
                  Record payout milestone
                </Button>
              )}
              {next.includes("open_dispute") && (
                <Button variant="danger" className="w-full" onClick={() => act.mutate({ actionType: "open_dispute", input: { claim_id: id, reason: "Contested credit" } })}>
                  Open dispute
                </Button>
              )}
              {next.includes("resolve_dispute") && (
                <Button className="w-full" onClick={() => act.mutate({ actionType: "resolve_dispute", input: { claim_id: id, note: "Resolved from claim drawer" } })}>
                  Resolve dispute
                </Button>
              )}
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Journals</p>
              <ul className="mt-2 space-y-2">
                {(q.data?.journals ?? []).map((j) => (
                  <li key={j.id} className="rounded-md border border-border px-3 py-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="font-mono text-xs">{j.event}</span>
                      <span className="text-xs text-muted">{formatWhen(j.created_at)}</span>
                    </div>
                    <p className="mt-1 text-muted">{j.memo}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="ghost" className="mt-6" onClick={() => void downloadPack()}>
              Export evidence pack
            </Button>
          </>
        )}
      </aside>
    </div>
  );
}

function ClaimBoard({
  rows,
  onOpen,
}: {
  rows: {
    id: string;
    account_name: string;
    partner_name: string;
    status: string;
    pipeline_amount_minor: number;
    currency: string;
  }[];
  onOpen: (id: string) => void;
}) {
  const columns = [
    { id: "registered", label: "Intake" },
    { id: "attributed", label: "Credit" },
    { id: "revenue", label: "Evidence" },
    { id: "eligible", label: "Due" },
    { id: "closed", label: "Closed" },
  ] as const;
  const closed = new Set(["recorded", "not_eligible", "disputed", "rejected"]);
  function inCol(status: string, col: string) {
    if (col === "closed") return closed.has(status);
    return status === col;
  }
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {columns.map((col) => {
        const items = rows.filter((r) => inCol(r.status, col.id));
        return (
          <div key={col.id} className="w-56 shrink-0 rounded-xl border border-border bg-surface p-3">
            <p className="mb-2 text-xs text-muted">
              {col.label} · {items.length}
            </p>
            <ul className="space-y-2">
              {items.map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    className="w-full rounded-md bg-chip px-3 py-3 text-left"
                    onClick={() => onOpen(row.id)}
                  >
                    <p className="truncate text-sm">{row.account_name}</p>
                    <p className="truncate text-xs text-muted">{row.partner_name}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-chip px-3 py-2">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="tabular-nums">{value}</p>
    </div>
  );
}
