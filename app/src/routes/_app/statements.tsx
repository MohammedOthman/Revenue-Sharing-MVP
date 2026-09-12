import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { closePeriod, getRecipes, getStatement, submitAction } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/_app/statements")({ component: StatementsPage });

function StatementsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState<string | null>(null);
  const q = useQuery({ queryKey: ["recipes"], queryFn: () => getRecipes() });
  const close = useMutation({
    mutationFn: () => closePeriod(),
    onSuccess: async (res) => {
      toast.success(`Issued ${res.issuedCount} statements for ${res.period}`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const issue = useMutation({
    mutationFn: (statementId: string) =>
      submitAction({
        data: {
          actionType: "issue_statement",
          idempotencyKey: `ui:issue:${statementId}`,
          input: { statement_id: statementId },
        },
      }),
    onSuccess: async () => {
      toast.success("Statement issued");
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Settle"
        title="Statements"
        description="Period close composes from eligible journals. Issuing is a verb. This is not a bank transfer."
        action={
          <Button onClick={() => close.mutate()} disabled={close.isPending}>
            {close.isPending ? "Closing…" : "Run period close"}
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Partner</th>
              <th className="px-4 py-3 font-medium">Period</th>
              <th className="px-4 py-3 font-medium">Eligible</th>
              <th className="px-4 py-3 font-medium">Recorded</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {q.data!.statements.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-sm text-muted">
                  None yet. Close the period to compose them from the claim ledger.
                </td>
              </tr>
            )}
            {q.data!.statements.map((s) => (
              <tr
                key={s.id}
                className="cursor-pointer border-b border-border/70 hover:bg-chip/60"
                onClick={() => setOpen(s.id)}
              >
                <td className="px-4 py-3">{s.partner_name}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.period}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(s.eligible_minor)}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(s.recorded_minor)}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.status === "draft" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={issue.isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        issue.mutate(s.id);
                      }}
                    >
                      Issue
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <StatementSheet id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function StatementSheet({ id, onClose }: { id: string; onClose: () => void }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["statement", id], queryFn: () => getStatement({ data: { id } }) });
  const issue = useMutation({
    mutationFn: () =>
      submitAction({
        data: {
          actionType: "issue_statement",
          idempotencyKey: `ui:issue:${id}`,
          input: { statement_id: id },
        },
      }),
    onSuccess: async () => {
      toast.success("Statement issued");
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function download() {
    if (!q.data) return;
    const blob = new Blob([JSON.stringify(q.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reven-statement-${q.data.statement.partner_name}-${q.data.statement.period}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const data = q.data;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-fg/20 backdrop-blur-[2px]" onClick={onClose}>
      <aside
        className="print-sheet sheet-in flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-border bg-surface p-6 shadow-[var(--shadow-soft)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Partner statement</p>
            <h2 className="font-display text-2xl tracking-tight">{data?.statement.partner_name ?? "…"}</h2>
            <p className="font-mono text-xs text-muted">{data?.statement.period}</p>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-md hover:bg-chip" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </div>

        {q.isLoading && <div className="mt-8 h-40 animate-pulse rounded-lg bg-chip" />}
        {data && (
          <>
            <p className="mt-4 rounded-md bg-chip px-3 py-2 text-sm leading-relaxed">{data.notice}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted">Eligible</dt>
                <dd className="tabular-nums">{formatMoney(data.statement.eligible_minor)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Recorded</dt>
                <dd className="tabular-nums">{formatMoney(data.statement.recorded_minor)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Status</dt>
                <dd>
                  <Badge tone={statusTone(data.statement.status)}>{data.statement.status}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Agreement</dt>
                <dd>
                  {data.agreement
                    ? `${data.agreement.rate_bps / 100}% on ${data.agreement.payout_trigger}`
                    : "—"}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs font-medium tracking-wide text-muted uppercase">Eligible claims</p>
            <ul className="mt-2 divide-y divide-border">
              {data.lines.length === 0 && <li className="py-3 text-sm text-muted">No eligible claims in this book.</li>}
              {data.lines.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate">{line.account_name}</p>
                    <p className="text-xs text-muted">
                      {line.attributed_pct ?? 0}% · {line.revenue_stage ?? "no stage"}
                    </p>
                  </div>
                  <p className="tabular-nums">{formatMoney(line.eligible_amount_minor ?? 0, line.currency)}</p>
                </li>
              ))}
            </ul>

            <div className="no-print mt-6 flex flex-wrap gap-2">
              {data.statement.status === "draft" && (
                <Button onClick={() => issue.mutate()} disabled={issue.isPending}>
                  Issue
                </Button>
              )}
              <Button variant="outline" onClick={download}>
                Export JSON
              </Button>
              <Button variant="ghost" onClick={() => window.print()}>
                Print
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
