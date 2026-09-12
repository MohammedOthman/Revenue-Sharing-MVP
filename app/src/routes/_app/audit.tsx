import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAudit } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { PageHeader } from "@/components/reven/chrome";
import { formatWhen } from "@/lib/utils";

export const Route = createFileRoute("/_app/audit")({ component: AuditPage });

function AuditPage() {
  const q = useQuery({ queryKey: ["audit"], queryFn: () => getAudit() });
  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Replayable"
        title="Audit"
        description="Every verb leaves a run and an event. Idempotent retries replay the original result."
      />
      <section className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Verb</th>
              <th className="px-4 py-3 font-medium">Actor</th>
              <th className="px-4 py-3 font-medium">Object</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {q.data!.runs.map((r) => (
              <tr key={r.id} className="border-b border-border/70">
                <td className="px-4 py-3 font-mono text-xs tabular-nums">{formatWhen(r.created_at)}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.action_type}</td>
                <td className="px-4 py-3">{r.actor}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted">{r.object_id?.slice(0, 18) ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Events</h2>
        <ul className="mt-3 space-y-2">
          {q.data!.events.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="font-mono text-xs">{e.type}</span>
              <span className="text-xs text-muted">{formatWhen(e.created_at)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
