import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiResult } from "@/components/AiResult";
import { AiError, AiLoading, EmptyState } from "@/components/AiStates";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAiGeneration } from "@/hooks/useAiGeneration";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Article & Topic Summarizer | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Paste an article, link or topic and get an AI summary with key insights and practical recommendations.",
      },
      { property: "og:title", content: "AI Article & Topic Summarizer" },
      {
        property: "og:description",
        content:
          "Paste an article, link or topic and get an AI summary with key insights and practical recommendations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Research,
});

const SYSTEM = `You summarise articles and explain topics for working professionals.
Base everything on the user's actual input. Never produce a generic essay unrelated to it.

Respond in plain text:
SUMMARY
KEY INSIGHTS
IMPORTANT POINTS
PRACTICAL RECOMMENDATIONS
WHERE TO READ MORE (name real, well-known sources or platforms; if you are not certain a specific
link exists, name the publication or search term instead of inventing a URL)

If the user gives only a URL, say you cannot open links, summarise what you reliably know about that
source or topic, and ask them to paste the text for an accurate summary.
If the input is too vague, ask one focused clarification question instead.`;

function Research() {
  const [input, setInput] = useState("");
  const { result, setResult, loading, error, run } = useAiGeneration();

  return (
    <AppLayout
      title="Article & Topic Summarizer"
      description="Insights and recommendations from the content you provide"
    >
      <div className="grid gap-6">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <label htmlFor="content" className="text-sm font-semibold">
            Topic, article text or link
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Pasting the full article text gives the most accurate summary.
          </p>
          <Textarea
            id="content"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Paste an article, or type: 'How hybrid teams run effective retrospectives'"
            className="mt-3 min-h-56"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              disabled={loading || input.trim().length === 0}
              onClick={() => void run(SYSTEM, `User input:\n\n${input.trim()}`)}
            >
              {loading ? "Analysing content..." : "Summarize with AI"}
            </Button>
            {input && (
              <Button variant="ghost" disabled={loading} onClick={() => setInput("")}>
                Clear
              </Button>
            )}
          </div>
        </section>

        {loading && <AiLoading label="Reading the content and pulling out the key insights..." />}
        {error && !loading && <AiError message={error} />}
        {!loading && !error && !result && (
          <EmptyState title="Nothing summarised yet">
            Add a topic or paste an article to get a summary tailored to it.
          </EmptyState>
        )}
        {!loading && result && <AiResult value={result} onChange={setResult} />}
      </div>
    </AppLayout>
  );
}
