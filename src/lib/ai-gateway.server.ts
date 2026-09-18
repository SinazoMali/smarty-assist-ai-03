import { createOpenAI } from "@ai-sdk/openai";

const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;

  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) {
        headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
      }
      const response = await fetch(input, { ...init, headers });
      const next = response.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim();
      if (!runId && next) runId = next;
      return response;
    },
    getRunId: () => runId,
  };
}

/** Creates the Lovable AI Gateway Responses provider. Server-only. */
export function createGateway() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const runIdFetch = createLovableAiGatewayRunIdFetch();

  return createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch as typeof fetch,
  });
}

export const CHAT_MODEL = "openai/gpt-6-astra";

export const REASONING_OPTIONS = {
  openai: {
    forceReasoning: true,
    reasoningEffort: "low",
    store: false,
  },
} as const;
