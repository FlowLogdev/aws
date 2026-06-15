"use client";

import { useState } from "react";
import { Layers, RotateCw, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { allFlashcards, getSectionById } from "@/lib/content";

function randomCard() {
  return allFlashcards[Math.floor(Math.random() * allFlashcards.length)];
}

export function FlashcardPopup() {
  const [card, setCard] = useState(() => randomCard());
  const [flipped, setFlipped] = useState(false);

  function next() {
    setCard(randomCard());
    setFlipped(false);
  }

  const section = getSectionById(card.sectionId);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setCard(randomCard());
          setFlipped(false);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Quick flashcard review"
          />
        }
      >
        <Layers className="size-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick flashcard</DialogTitle>
        </DialogHeader>
        <div
          className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border bg-muted/40 p-6 text-center select-none"
          onClick={() => setFlipped((f) => !f)}
        >
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {section?.title} · {flipped ? "Answer" : "Question"}
          </span>
          <p className="text-base font-medium">
            {flipped ? card.back : card.front}
          </p>
          <span className="text-xs text-muted-foreground">
            Click card to flip
          </span>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
            <RotateCw className="size-4" />
            Flip
          </Button>
          <Button onClick={next}>
            <Shuffle className="size-4" />
            Next card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
