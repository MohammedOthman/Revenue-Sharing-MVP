import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  default: "bg-chip text-muted",
  ok: "bg-ok/10 text-ok",
  warn: "bg-warn/10 text-warn",
  danger: "bg-danger/10 text-danger",
  ink: "bg-accent text-accent-fg",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string | null | undefined): keyof typeof tones {
  if (!status) return "default";
  if (/eligible|passed|succeeded|issued|active|recorded/.test(status)) return "ok";
  if (/pending|queued|draft|registered|attributed|revenue/.test(status)) return "warn";
  if (/fail|dispute|reject|not_eligible|paused/.test(status)) return "danger";
  return "default";
}
