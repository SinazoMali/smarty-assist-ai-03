import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiResult } from "@/components/AiResult";
import { AiError, AiLoading, EmptyState } from "@/components/AiStates";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAiGeneration } from "@/hooks/useAiGeneration";

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
  component: Planner;
});

function Planner() {
  return null;
}
