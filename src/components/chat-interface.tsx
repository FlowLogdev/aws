"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { isTextUIPart, type UIMessage } from "ai";
import { Bot, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AI_MODELS, DEFAULT_AI_MODEL, isAiModelKey, type AiModelKey } from "@/lib/ai/models";
import { cn } from "@/lib/utils";

export function ChatInterface({ initialMessages }: { initialMessages: UIMessage[] }) {
  const [model, setModel] = useState<AiModelKey>(DEFAULT_AI_MODEL);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({ messages: initialMessages });
  const isBusy = status === "submitted" || status === "streaming";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBusy]);

  function handleSend() {
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text }, { body: { model } });
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Ask about any AWS or CLF-C02 topic, or request a practice question.
        </p>
        <Select value={model} onValueChange={(value) => setModel(isAiModelKey(value) ? value : DEFAULT_AI_MODEL)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AI_MODELS).map(([key, info]) => (
              <SelectItem key={key} value={key}>
                {info.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto p-4">
        <div className="flex flex-1 flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Bot className="size-8" />
              <p className="text-sm">
                Ask me anything about EC2, S3, IAM, billing, the Shared
                Responsibility Model, or any other CLF-C02 topic.
              </p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                {message.role === "user" ? (
                  <User className="size-4" />
                ) : (
                  <Bot className="size-4" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                <article className="prose prose-sm prose-neutral max-w-none dark:prose-invert prose-p:my-1 prose-pre:my-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.parts
                      .filter(isTextUIPart)
                      .map((part) => part.text)
                      .join("")}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </Card>

      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AWS Bot Helper a question..."
          className="min-h-12 flex-1 resize-none"
          disabled={isBusy}
        />
        <Button onClick={handleSend} disabled={isBusy || !input.trim()}>
          <Send className="size-4" />
          Send
        </Button>
      </div>
    </div>
  );
}
