import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { AiError } from "@/components/AiStates";
import { AppLayout, Disclaimer } from "@/components/AppLayout";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant about planning, writing, research and productivity questions.",
      },
      { property: "og:title", content: "AI Workplace Chat" },
      {
        property: "og:description",
        content:
          "Chat with an AI workplace assistant about planning, writing, research and productivity questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Chat,
});

const SUGGESTIONS = [
  "Help me write a polite follow-up email about an overdue deliverable",
  "How do I run a 30-minute retro for a remote team?",
  "Turn my rough update into a clear message for leadership",
  "What should I prioritise when everything is marked urgent?",
];

function Chat() {
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <AppLayout title="AI Chat" description="Ask anything about your work — answers are generated live">
      <div className="flex h-[calc(100vh-11rem)] flex-col gap-4">
        <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <Conversation className="h-full">
            <ConversationContent className="gap-4">
              {messages.length === 0 && (
                <ConversationEmptyState
                  title="Start a conversation"
                  description="Ask about planning, writing, meetings or research."
                >
                  <div className="mt-4 grid w-full max-w-xl gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => void sendMessage({ text: s })}
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </ConversationEmptyState>
              )}

              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent>
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <MessageResponse key={i}>{part.text}</MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Shimmer className="px-1 text-sm">Thinking...</Shimmer>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>

        {error && <AiError message="The assistant could not respond. Please try again." />}

        <PromptInput
          onSubmit={(message) => {
            const text = message.text.trim();
            if (!text || busy) return;
            void sendMessage({ text });
          }}
        >
          <PromptInputTextarea ref={textareaRef} autoFocus placeholder="Ask your assistant..." />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>

        <Disclaimer />
      </div>
    </AppLayout>
  );
}
