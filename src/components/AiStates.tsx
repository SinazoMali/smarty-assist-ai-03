import { AlertTriangle, Loader2, Sparkle } from "lucide-react";
import type { ReactNode } from "react";

export function AiLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-sm">
      <Loader2 className="size-4 animate-spin text-primary" />
      <span className="animate-pulse">{label}</span>
    </div>
  );
}

export function AiError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-card p-5 text-sm shadow-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
      <p className="text-foreground">{message}</p>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
      <Sparkle className="mx-auto size-6 text-primary" />
      <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
