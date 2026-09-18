import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import { CHAT_MODEL, REASONING_OPTIONS, createGateway } from "./ai-gateway.server";

const GenerateInput = z.object({
  system: z.string().min(1),
  prompt: z.string().min(1),
});

/**
 * Single generic text generation entry point used by the summarizer,
 * planner and research tools. Always returns model-generated text.
 */
export const generateAiText = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const gateway = createGateway();

    const result = streamText({
      model: gateway.responses(CHAT_MODEL),
      system: data.system,
      prompt: data.prompt,
      providerOptions: REASONING_OPTIONS,
    });

    const text = await result.text;
    return { text };
  });
