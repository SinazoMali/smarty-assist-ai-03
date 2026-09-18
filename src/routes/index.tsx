import { Link, createFileRoute } from "@tanstack/react-router";
import { BotMessageSquare, CalendarCheck, Newspaper, NotebookPen } from "lucide-react";

import { AppLayout, Disclaimer } from "@/components/AppLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Summarize meetings, plan your tasks, digest articles and chat with an AI workplace assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Summarize meetings, plan your tasks, digest articles and chat with an AI workplace assistant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/meetings",
    icon: NotebookPen,
    title: "Meeting Summarizer",
    text: "Turn raw meeting notes into a summary, key points, decisions, action items and deadlines.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "Task Planner",
    text: "Share your tasks, deadlines and available time to get a prioritised daily or weekly plan.",
  },
  {
    to: "/research",
    icon: Newspaper,
    title: "Article & Topic Summarizer",
    text: "Paste an article, a link or a topic and get insights, key points and recommendations.",
  },
  {
    to: "/chat",
    icon: BotMessageSquare,
    title: "AI Chat",
    text: "Ask anything about planning, writing, research or day-to-day workplace problems.",
  },
] as const;

function Dashboard() {
  return (
    <AppLayout
      title="Dashboard"
      description="Your AI workspace for meetings, planning and research"
    >
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold sm:text-2xl">Get more done, with less admin</h2>
        <p className="mt-2 max-w-2xl text-sm text-primary-foreground/80">
          Every summary, plan and answer here is generated from what you type — nothing is
          pre-written. Your input stays in this session only and is never stored.
        </p>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {TOOLS.map(({ to, icon: Icon, title, text }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold group-hover:text-primary">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <Disclaimer />
      </div>
    </AppLayout>
  );
}
