import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiResult } from "@/components/AiResult";
import { AiError, AiLoading, EmptyState } from "@/components/AiStates";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAiGeneration } from "@/hooks/useAiGeneration";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Task Planner | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Enter your tasks, deadlines and available time to get an AI-prioritised daily or weekly schedule.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content:
          "Enter your tasks, deadlines and available time to get an AI-prioritised daily or weekly schedule.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

const SYSTEM = `You are a planning assistant. Build a realistic schedule from the user's ACTUAL tasks,
deadlines, priorities and available time. Never invent tasks that were not given.

Order work by urgency, importance, deadline proximity and total workload, and respect the stated
available time — if the workload does not fit, say so and recommend what to defer, delegate or cut.

Respond in plain text:
PLAN OVERVIEW (2-3 lines)
PRIORITY ORDER (ranked, with a one-line reason each)
SCHEDULE (time blocks per day, including short breaks)
AT RISK / WON'T FIT
SUGGESTIONS

If the input is too vague to schedule, ask one focused clarification question instead.`;

function Planner() {
  const [tasks, setTasks] = useState("");
  const [time, setTime] = useState("");
  const [horizon, setHorizon] = useState<"day" | "week">("day");
  const { result, setResult, loading, error, run } = useAiGeneration();

  const prompt = [
    `Planning horizon: ${horizon === "day" ? "a single day" : "the coming week"}`,
    time.trim() ? `Available working time: ${time.trim()}` : null,
    `Tasks, priorities and deadlines as written by the user:\n${tasks.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <AppLayout title="Task Planner" description="A prioritised plan built from your real workload">
      <div className="grid gap-6">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {(["day", "week"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setHorizon(option)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  horizon === option
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground",
                )}
              >
                {option === "day" ? "Daily plan" : "Weekly plan"}
              </button>
            ))}
          </div>

          <label htmlFor="time" className="mt-5 block text-sm font-semibold">
            Time available
          </label>
          <Input
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 08:30–16:00, with meetings 11:00–12:00"
            className="mt-2"
          />

          <label htmlFor="tasks" className="mt-5 block text-sm font-semibold">
            Your tasks, priorities and deadlines
          </label>
          <Textarea
            id="tasks"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder={"e.g. Finish client proposal (high, due tomorrow)\nReview 3 PRs (medium)\nPrep board slides (due Friday)"}
            className="mt-2 min-h-48"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              disabled={loading || tasks.trim().length === 0}
              onClick={() => void run(SYSTEM, prompt)}
            >
              {loading ? "Building your plan..." : "Generate plan with AI"}
            </Button>
            {tasks && (
              <Button variant="ghost" disabled={loading} onClick={() => setTasks("")}>
                Clear
              </Button>
            )}
          </div>
        </section>

        {loading && <AiLoading label="Prioritising your tasks and blocking out time..." />}
        {error && !loading && <AiError message={error} />}
        {!loading && !error && !result && (
          <EmptyState title="No plan yet">
            Add your tasks and how much time you have — the AI will schedule them for you.
          </EmptyState>
        )}
        {!loading && result && <AiResult value={result} onChange={setResult} />}
      </div>
    </AppLayout>
  );
}
