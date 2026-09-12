import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { getLedger } from "@/lib/reven/queries";
import { PageHeader } from "@/components/reven/chrome";
import { formatMoney, formatWhen, humanize } from "@/lib/utils";

export const Route = createFileRoute("/_app/ledger")({ component: LedgerPage });

function LedgerPage() {
  const q = useQuery({ queryKey: ["ledger"], queryFn: () => getLedger() });
  const [open, setOpen] = useState<string | null>(null);
  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;
  const { journals, balances, entries } = q.data!;

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Append-only"
        title="Ledger"
        description="Balanced journals in minor units. Corrections would be reversals, never mutations. Nothing here moves cash."
      />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {balances.map((b) => (
          <div key={b.account} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-mono text-[11px] text-muted">{b.account}</p>
            <p className="mt-2 text-sm tabular-nums">Dr {formatMoney(b.debit)}</p>
            <p className="text-sm tabular-nums text-muted">Cr {formatMoney(b.credit)}</p>
          </div>
        ))}
      </section>
      <section className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Memo</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((j) => {
              const lines = entries.filter((e) => e.journal_id === j.id);
              return (
                <Fragment key={j.id}>
                  <tr
                    className="cursor-pointer border-b border-border/70 hover:bg-chip/60"
                    onClick={() => setOpen(open === j.id ? null : j.id)}
                  >
                    <td className="px-4 py-3 font-mono text-xs tabular-nums">{formatWhen(j.created_at)}</td>
                    <td className="px-4 py-3 font-mono text-xs">{j.event}</td>
                    <td className="px-4 py-3">{j.account_name}</td>
                    <td className="px-4 py-3 text-muted">{humanize(j.memo)}</td>
                  </tr>
                  {open === j.id && (
                    <tr className="border-b border-border/70 bg-chip/40">
                      <td colSpan={4} className="px-4 py-3">
                        <ul className="space-y-1 font-mono text-xs">
                          {lines.map((line, i) => (
                            <li key={`${line.journal_id}-${i}`} className="flex justify-between gap-3">
                              <span>
                                {line.direction} {line.account}
                              </span>
                              <span className="tabular-nums">{formatMoney(line.amount_minor, j.currency)}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
