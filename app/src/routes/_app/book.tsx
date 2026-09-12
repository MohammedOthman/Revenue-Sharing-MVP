import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ACTION_TYPES,
  API_ACTIONS,
  HUMAN_ACTIONS,
  RECIPE_ACTIONS,
  RECIPE_MODE,
  WEBHOOK_ACTIONS,
} from "@/lib/reven/catalog";
import { getRuntime } from "@/lib/reven/queries";
import { PageHeader } from "@/components/reven/chrome";

export const Route = createFileRoute("/_app/book")({ component: BookPage });

function BookPage() {
  const q = useQuery({ queryKey: ["runtime"], queryFn: () => getRuntime() });
  const period = new Date().toISOString().slice(0, 7);

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Contract"
        title="The book"
        description="Journals are the book. Claim rows are a projection. Connectors submit evidence. Humans decide credit. Nothing here moves money."
      />

      <section className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Period</p>
          <p className="mt-2 font-display text-2xl tabular-nums tracking-tight">{period}</p>
          <p className="mt-1 text-sm text-muted">UTC month. Period close issues statements for it.</p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Runs</p>
          <p className="mt-2 font-display text-2xl tabular-nums tracking-tight">{q.data?.metrics.runs ?? "—"}</p>
          <p className="mt-1 text-sm text-muted">Every verb writes an action run.</p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Recipes live</p>
          <p className="mt-2 font-display text-2xl tabular-nums tracking-tight">{q.data?.metrics.recipesActive ?? "—"}</p>
          <p className="mt-1 text-sm text-muted">Pause holds the outbox. Unpause drains it.</p>
        </article>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-lg font-medium tracking-tight">Who may fire what</h2>
        <p className="mt-1 text-sm text-muted">Enforced in dispatch. The Actions API returns 403 on human desks.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-muted">
              <tr className="border-b border-border">
                <th className="py-2 pr-3 font-medium">Verb</th>
                <th className="py-2 pr-3 font-medium">Operator</th>
                <th className="py-2 pr-3 font-medium">API key</th>
                <th className="py-2 pr-3 font-medium">Webhook</th>
                <th className="py-2 font-medium">Recipe</th>
              </tr>
            </thead>
            <tbody>
              {ACTION_TYPES.map((verb) => (
                <tr key={verb} className="border-b border-border/70">
                  <td className="py-2 pr-3 font-mono text-xs">{verb}</td>
                  <td className="py-2 pr-3">yes</td>
                  <td className="py-2 pr-3">{API_ACTIONS.includes(verb) ? "yes" : "no"}</td>
                  <td className="py-2 pr-3">{WEBHOOK_ACTIONS.includes(verb) ? "yes" : "no"}</td>
                  <td className="py-2">{RECIPE_ACTIONS.includes(verb) ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          Human desks: {HUMAN_ACTIONS.join(", ")}.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-lg font-medium tracking-tight">Recipe modes</h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {Object.entries(RECIPE_MODE).map(([key, mode]) => (
            <li key={key} className="flex items-center justify-between rounded-md bg-chip px-3 py-2 text-sm">
              <span className="font-mono text-xs">{key}</span>
              <span className="text-muted">{mode}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link to="/connectors" className="underline decoration-border underline-offset-4">
            Mint a key
          </Link>
          {" · "}
          <Link to="/ledger" className="underline decoration-border underline-offset-4">
            Open the ledger
          </Link>
        </p>
      </section>
    </div>
  );
}
