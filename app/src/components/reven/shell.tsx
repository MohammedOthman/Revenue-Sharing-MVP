import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Activity, BookOpen, FileText, GitBranch, Plug, ScrollText, Users, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Runtime", icon: Activity },
  { to: "/claims", label: "Claims", icon: Workflow },
  { to: "/partners", label: "Partners", icon: Users },
  { to: "/ledger", label: "Ledger", icon: BookOpen },
  { to: "/recipes", label: "Recipes", icon: GitBranch },
  { to: "/statements", label: "Statements", icon: FileText },
  { to: "/connectors", label: "Connectors", icon: Plug },
  { to: "/audit", label: "Audit", icon: ScrollText },
] as const;

const MOBILE = ["/", "/claims", "/partners", "/recipes", "/connectors"] as const;

export function AppShell() {
  const { user } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const book = user?.isDevFallback ? "GCC book" : (user?.displayName ?? "Workspace");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-[1400px]">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border px-3 py-7 md:flex">
          <div className="px-3">
            <p className="font-display text-[1.65rem] leading-none tracking-tight">Reven</p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-muted uppercase">Partner OS</p>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-0.5">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex min-h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150",
                    active ? "bg-chip text-fg" : "text-muted hover:bg-chip/70 hover:text-fg",
                  )}
                >
                  {active && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent" />}
                  <Icon className="size-4" strokeWidth={1.7} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mx-1 rounded-lg bg-chip px-3 py-3">
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Workspace</p>
            <p className="mt-1 truncate text-sm">{book}</p>
            <p className="text-xs text-muted">SAR · period open</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
            <div>
              <p className="font-display text-xl leading-none">Reven</p>
              <p className="mt-1 text-[11px] text-muted">{book}</p>
            </div>
          </header>
          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 pb-28 md:px-10 md:py-9 md:pb-12">
            <Outlet />
          </main>
          <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
            {NAV.filter((item) => MOBILE.includes(item.to as (typeof MOBILE)[number])).map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] transition-colors duration-150",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  <Icon className="size-4" strokeWidth={active ? 2 : 1.7} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
