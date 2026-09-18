import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { CHAT_MODEL, REASONING_OPTIONS, createGateway } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are an AI workplace productivity assistant inside a SaaS app.
You help with meetings, planning, prioritisation, writing, summarising and workplace research.

Rules:
- Always analyse the user's actual message and conversation context. Never give generic filler.
- Be specific, concrete and concise. Use short headings and bullets where useful.
- If the request is too vague to answer well, ask one focused clarification question instead of inventing facts.
- Never invent company data, names, numbers or sources. Say when something is unknown.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: UIMessage[] };
          const gateway = createGateway();

          const result = streamText({
            model: gateway.responses(CHAT_MODEL),
            system: SYSTEM_PROMPT,
            messages: convertToModelMessages(messages),
            providerOptions: REASONING_OPTIONS,
          });

          return result.toUIMessageStreamResponse();
        } catch (error) {
          console.error(error);
          const message = error instanceof Error ? error.message : "AI request failed";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
