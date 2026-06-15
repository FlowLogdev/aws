export const AI_MODELS = {
  claude: {
    id: "anthropic/claude-sonnet-4.6",
    label: "Claude (Anthropic)",
  },
  gpt: {
    id: "openai/gpt-5.1",
    label: "GPT (OpenAI)",
  },
} as const;

export type AiModelKey = keyof typeof AI_MODELS;

export const DEFAULT_AI_MODEL: AiModelKey = "claude";

export function isAiModelKey(value: unknown): value is AiModelKey {
  return typeof value === "string" && value in AI_MODELS;
}
