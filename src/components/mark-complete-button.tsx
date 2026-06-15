"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { setSectionComplete } from "@/lib/actions/progress";

export function MarkCompleteButton({
  sectionId,
  initialComplete,
}: {
  sectionId: string;
  initialComplete: boolean;
}) {
  const [completed, setCompleted] = useState(initialComplete);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next = !completed;
    setCompleted(next);
    startTransition(async () => {
      const result = await setSectionComplete(sectionId, next);
      if (result?.error) {
        setCompleted(!next);
      }
    });
  }

  return (
    <Button variant={completed ? "default" : "outline"} onClick={toggle} disabled={isPending}>
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Check className="size-4" />
      )}
      {completed ? "Completed" : "Mark section as complete"}
    </Button>
  );
}
