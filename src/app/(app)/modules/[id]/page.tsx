import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, Clock, Layers } from "lucide-react";

import { MarkCompleteButton } from "@/components/mark-complete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DOMAIN_LABELS,
  getSectionBundle,
  studySections,
} from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bundle = getSectionBundle(id);
  if (!bundle) notFound();

  const { section, flashcards } = bundle;

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user!;

  const { data: progress } = await supabase
    .from("user_progress")
    .select("section_id")
    .eq("user_id", user.id)
    .eq("section_id", id)
    .eq("lesson_id", "overview")
    .maybeSingle();

  const isComplete = !!progress;

  const index = studySections.findIndex((s) => s.id === id);
  const prev = index > 0 ? studySections[index - 1] : null;
  const next = index < studySections.length - 1 ? studySections[index + 1] : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{DOMAIN_LABELS[section.domain]}</Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="size-3" />
            {section.estMinutes} min
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold">
          {section.number}. {section.title}
        </h1>
        <p className="text-muted-foreground">{section.summary}</p>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-table:text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.content}
        </ReactMarkdown>
      </article>

      <div className="flex flex-wrap items-center gap-3 border-t pt-4">
        <MarkCompleteButton sectionId={id} initialComplete={isComplete} />
        <Button
          variant="outline"
          render={<Link href={`/flashcards?section=${id}`} />}
        >
          <Layers className="size-4" />
          Review {flashcards.length} flashcards
        </Button>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        {prev ? (
          <Button variant="ghost" render={<Link href={`/modules/${prev.id}`} />}>
            <ArrowLeft className="size-4" />
            {prev.number}. {prev.title}
          </Button>
        ) : (
          <div />
        )}
        {next ? (
          <Button variant="ghost" render={<Link href={`/modules/${next.id}`} />}>
            {next.number}. {next.title}
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
