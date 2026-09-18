import { Check, Copy, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { Disclaimer } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * Displays an AI-generated result, clearly separated from the user's input,
 * and lets the user edit it in place (session-only).
 */
export function AiResult({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          AI-generated result
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing((e) => !e)}>
            <Pencil className="mr-1.5 size-3.5" />
            {editing ? "Done editing" : "Edit"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void navigator.clipboard.writeText(value);
              setCopied(true);
            }}
          >
            {copied ? (
              <Check className="mr-1.5 size-3.5" />
            ) : (
              <Copy className="mr-1.5 size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {editing ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[24rem] font-mono text-sm"
        />
      ) : (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{value}</div>
      )}

      <Disclaimer className="mt-5 border-t border-border pt-4" />
    </section>
  );
}
