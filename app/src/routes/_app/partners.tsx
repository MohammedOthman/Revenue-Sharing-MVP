import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { createPartner, listClaims, listPartners, submitAction } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatMoney, humanize } from "@/lib/utils";

export const Route = createFileRoute("/_app/partners")({ component: PartnersPage });

function PartnersPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["partners"], queryFn: () => listPartners() });
  const claims = useQuery({ queryKey: ["claims"], queryFn: () => listClaims() });
  const [open, setOpen] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    partnerType: "referral" as "referral" | "reseller" | "isv" | "strategic",
    rateBps: "1200",
    payoutTrigger: "collected" as "closed_won" | "invoiced" | "collected" | "recognized",
    protectionDays: "90",
  });

  const create = useMutation({
    mutationFn: () =>
      createPartner({
        data: {
          name: form.name,
          partnerType: form.partnerType,
          rateBps: Number(form.rateBps),
          payoutTrigger: form.payoutTrigger,
          protectionDays: Number(form.protectionDays),
        },
      }),
    onSuccess: async () => {
      toast.success("Partner registered with an active agreement");
      setForm((f) => ({ ...f, name: "" }));
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const compose = useMutation({
    mutationFn: (partnerId: string) =>
      submitAction({
        data: {
          actionType: "compose_statement",
          idempotencyKey: `ui:compose:${partnerId}:${new Date().toISOString().slice(0, 7)}`,
          input: { partner_id: partnerId },
        },
      }),
    onSuccess: async (res) => {
      toast.success(`Statement ${res.status === "replayed" ? "already on file" : "composed"}`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;
  const selected = (q.data ?? []).find((p) => p.id === open);

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Who can originate"
        title="Partners"
        description="A claim is illegal without a partner of record. The agreement is the rate, trigger, and protection window."
      />

      <form
        className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-6"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <label className="text-sm md:col-span-2">
          <span className="mb-1 block text-xs text-muted">Name</span>
          <input
            required
            className="field"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-muted">Type</span>
          <select
            className="field"
            value={form.partnerType}
            onChange={(e) => setForm((f) => ({ ...f, partnerType: e.target.value as typeof form.partnerType }))}
          >
            <option value="referral">referral</option>
            <option value="reseller">reseller</option>
            <option value="isv">isv</option>
            <option value="strategic">strategic</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-muted">Rate bps</span>
          <input
            type="number"
            min={1}
            className="field"
            value={form.rateBps}
            onChange={(e) => setForm((f) => ({ ...f, rateBps: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-muted">Pays on</span>
          <select
            className="field"
            value={form.payoutTrigger}
            onChange={(e) => setForm((f) => ({ ...f, payoutTrigger: e.target.value as typeof form.payoutTrigger }))}
          >
            <option value="closed_won">closed_won</option>
            <option value="invoiced">invoiced</option>
            <option value="collected">collected</option>
            <option value="recognized">recognized</option>
          </select>
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full" disabled={create.isPending}>
            Register
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Partner</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Agreement</th>
              <th className="px-4 py-3 font-medium">Protection</th>
              <th className="px-4 py-3 font-medium">Claims</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(q.data ?? []).map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-b border-border/70 hover:bg-chip/60"
                onClick={() => setOpen(row.id)}
              >
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.partner_type}</td>
                <td className="px-4 py-3 tabular-nums">
                  {row.rate_bps != null ? `${row.rate_bps / 100}% on ${row.payout_trigger}` : "—"}
                </td>
                <td className="px-4 py-3 tabular-nums">{row.protection_days != null ? `${row.protection_days}d` : "—"}</td>
                <td className="px-4 py-3 tabular-nums">{row.claim_count}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(row.lifecycle_status)}>{row.lifecycle_status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <section className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl tracking-tight">{selected.name}</h2>
              <p className="text-sm text-muted">
                {selected.partner_type} · {selected.rate_bps != null ? `${selected.rate_bps / 100}% on ${selected.payout_trigger}` : "no agreement"}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Button
                variant="outline"
                disabled={compose.isPending}
                onClick={() => compose.mutate(selected.id)}
              >
                Compose this period
              </Button>
              <button type="button" className="min-h-11 px-3 text-sm text-muted" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {(claims.data ?? [])
              .filter((c) => c.partner_id === selected.id)
              .map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="truncate">{c.account_name}</span>
                  <span className="flex items-center gap-3">
                    <span className="tabular-nums text-muted">{formatMoney(c.pipeline_amount_minor, c.currency)}</span>
                    <Badge tone={statusTone(c.status)}>{humanize(c.status)}</Badge>
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
