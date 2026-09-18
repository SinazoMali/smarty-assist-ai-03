import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiResult } from "@/components/AiResult";
import { AiError, AiLoading, EmptyState } from "@/components/AiStates";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAiGeneration } from "@/hooks/useAiGeneration";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get an AI summary with key points, decisions, action items and deadlines.",
      },
      { property: "og:title", content: "AI Meeting Notes Summarizer" },
      {
        property: "og:description",
        content:
          "Paste raw meeting notes and get an AI summary with key points, decisions, action items and deadlines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Meetings,
});

const SYSTEM = `You summarise real meeting notes for busy professionals.
Analyse ONLY the notes provided and never invent attendees, dates, numbers or decisions.

Respond in plain text with these sections, in this order:
SUMMARY
KEY DISCUSSION POINTS
DECISIONS
ACTION ITEMS (owner — task — due date if stated, otherwise "no date given")
DEADLINES

If a section has nothing in the notes, write "None mentioned in the notes".
If the notes are too short or unclear to summarise, reply with one focused clarification question instead.`;

function Meetings() {
  const [notes, setNotes] = useState("");
  const { result, setResult, loading, error, run } = useAiGeneration();

  return (
    <AppLayout
      title="Meeting Summarizer"
      description="Turn messy notes into a clear, actionable record"
    >
      <div className="grid gap-6">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <label htmlFor="notes" className="text-sm font-semibold">
            Your meeting notes
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Paste anything — bullet points, transcript fragments or rough typing.
          </p>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Standup 9am — Thabo: API auth blocked, needs review by Thu. Agreed to move launch to 12 Oct..."
            className="mt-3 min-h-56"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              disabled={loading || notes.trim().length === 0}
              onClick={() => void run(SYSTEM, `Meeting notes:\n\n${notes.trim()}`)}
            >
              {loading ? "Analysing notes..." : "Summarize with AI"}
            </Button>
            {notes && (
              <Button variant="ghost" onClick={() => setNotes("")} disabled={loading}>
                Clear
              </Button>
            )}
          </div>
        </section>

        {loading && <AiLoading label="Reading your notes and drafting the summary..." />}
        {error && !loading && <AiError message={error} />}
        {!loading && !error && !result && (
          <EmptyState title="No summary yet">
            Paste your notes above and the AI will summarise exactly what was discussed.
          </EmptyState>
        )}
        {!loading && result && <AiResult value={result} onChange={setResult} />}
      </div>
    </AppLayout>
  );
}
