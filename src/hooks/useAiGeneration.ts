import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { generateAiText } from "@/lib/ai.functions";

export function useAiGeneration() {
  const generate = useServerFn(generateAiText);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(system: string, prompt: string) {
    setLoading(true);
    setError(null);
    try {
      const { text } = await generate({ data: { system, prompt } });
      setResult(text.trim());
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error && e.message
          ? `The AI request failed: ${e.message}`
          : "The AI request failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { result, setResult, loading, error, run };
}
