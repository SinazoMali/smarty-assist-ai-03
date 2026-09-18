import { Link, useRouterState } from "@tanstack/react-router";
import {
  BotMessageSquare,
  CalendarCheck,
  LayoutDashboard,
  Menu,
  NotebookPen,
  Newspaper,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: CalendarCheck },
  { to: "/research", label: "Article & Topic Summarizer", icon: Newspaper },
  { to: "/chat", label: "AI Chat", icon: BotMessageSquare },
] as const;

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      AI-generated content may contain errors or omissions. Review important information before
      using it for workplace, business, legal, financial, or other significant decisions.
    </p>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <BotMessageSquare className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Workplace AI</p>
          <p className="text-xs text-muted-foreground">Productivity Assistant</p>
        </div>
      </div>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto rounded-xl bg-secondary p-3">
        <Disclaimer />
      </div>
    </div>
  );
}

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-card lg:block">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-card shadow-xl">
            <button
              aria-label="Close menu"
              className="absolute right-3 top-4 rounded-md p-1 text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            aria-label="Open menu"
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
