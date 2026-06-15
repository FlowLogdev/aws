import {
  convertToModelMessages,
  isTextUIPart,
  streamText,
  type UIMessage,
} from "ai";

import { AI_MODELS, DEFAULT_AI_MODEL, isAiModelKey } from "@/lib/ai/models";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60;

interface ChatRequestBody {
  messages: UIMessage[];
  model?: string;
}

function extractText(message: UIMessage): string {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("\n");
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, model }: ChatRequestBody = await req.json();
  const modelKey = isAiModelKey(model) ? model : DEFAULT_AI_MODEL;
  const modelId = AI_MODELS[modelKey].id;

  const result = streamText({
    model: modelId,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
      const rows: {
        user_id: string;
        role: "user" | "assistant";
        content: string;
        model: string | null;
      }[] = [];

      if (lastUserMessage) {
        rows.push({
          user_id: user.id,
          role: "user",
          content: extractText(lastUserMessage),
          model: null,
        });
      }

      rows.push({
        user_id: user.id,
        role: "assistant",
        content: extractText(responseMessage),
        model: modelId,
      });

      await supabase.from("chat_messages").insert(rows);
    },
  });
}
