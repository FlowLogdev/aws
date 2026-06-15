import type { UIMessage } from "ai";

import { ChatInterface } from "@/components/chat-interface";
import { createClient } from "@/lib/supabase/server";

export default async function AiBotPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user!;

  const { data: history } = await supabase
    .from("chat_messages")
    .select("id, role, content")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(50);

  const initialMessages: UIMessage[] = (history ?? []).map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    parts: [{ type: "text", text: m.content }],
  }));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">AWS Bot Helper</h1>
        <p className="text-muted-foreground">
          Your AI study assistant for the CLF-C02 exam, powered by Claude and
          GPT.
        </p>
      </div>
      <ChatInterface initialMessages={initialMessages} />
    </div>
  );
}
