import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RECIPE_MODE, RECIPE_STEPS } from "@/lib/reven/catalog";
import { closePeriod, getRecipes, toggleRecipe } from "@/lib/reven/queries";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reven/chrome";
import { formatWhen } from "@/lib/utils";

export const Route = createFileRoute("/_app/recipes")({ component: RecipesPage });

function RecipesPage() {
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
  const tog = useMutation({
    mutationFn: (p: { recipeKey: string; status: "active" | "paused" }) => toggleRecipe({ data: p }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recipes"] }),
  });

  if (q.isLoading) return <div className="h-48 animate-pulse rounded-xl bg-chip" />;
  if (q.error) return <p className="text-danger">{(q.error as Error).message}</p>;

  return (
    <div className="rise space-y-6">
      <PageHeader
        eyebrow="Orchestrate"
        title="Recipes"
        description="Follow recipes fire from the outbox. Human desks never auto-run. Pause holds work until you unpause."
        action={
          <div className="flex gap-2">
            <Link to="/statements" className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm">
              Statements
            </Link>
            <Button onClick={() => close.mutate()} disabled={close.isPending}>
              {close.isPending ? "Closing…" : "Run period close"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 md:grid-cols-2">
        {q.data!.recipes.map((r) => {
          const steps = RECIPE_STEPS[r.recipe_key] ?? [];
          const mode = RECIPE_MODE[r.recipe_key as keyof typeof RECIPE_MODE] ?? "operator";
          return (
            <article key={r.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] text-muted">{r.recipe_key}</p>
                  <h2 className="text-lg font-medium tracking-tight">{r.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={mode === "human" ? "warn" : mode === "follow" ? "ok" : "default"}>
                    {mode}
                  </Badge>
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.description}</p>
              {steps.length > 0 && (
                <ol className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px]">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded-md bg-chip px-2 py-1 font-mono">{step}</span>
                      {i < steps.length - 1 && <span className="text-muted">→</span>}
                    </li>
                  ))}
                </ol>
              )}
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>
                  {r.run_count} runs
                  {r.last_run_at ? ` · ${formatWhen(r.last_run_at)}` : ""}
                </span>
                <button
                  type="button"
                  className="min-h-9 rounded-md px-3 hover:bg-chip"
                  onClick={() =>
                    tog.mutate({ recipeKey: r.recipe_key, status: r.status === "active" ? "paused" : "active" })
                  }
                >
                  {r.status === "active" ? "Pause" : "Activate"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
