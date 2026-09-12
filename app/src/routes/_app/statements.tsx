import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closePeriod, getRecipes, submitAction } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/_app/statements")({ component: StatementsPage });

function StatementsPage() {
  const qc = useQueryClient();
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
        description="Period close composes from eligible journals. Issuing is a verb. Nothing here is a bank transfer."
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
              <tr key={s.id} className="border-b border-border/70">
                <td className="px-4 py-3">{s.partner_name}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.period}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(s.eligible_minor)}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(s.recorded_minor)}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.status === "draft" && (
                    <Button size="sm" variant="outline" disabled={issue.isPending} onClick={() => issue.mutate(s.id)}>
                      Issue
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
