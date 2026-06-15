"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allFlashcards, studySections } from "@/lib/content";

// `seed` is unused by the algorithm itself; including it as an argument lets
// callers force a fresh shuffle (e.g. from a useMemo dependency) without
// disabling the exhaustive-deps lint rule.
function shuffle<T>(items: T[], seed?: number): T[] {
  void seed;
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function FlashcardStudy({ initialSectionId }: { initialSectionId?: string }) {
  const [sectionId, setSectionId] = useState<string>(initialSectionId ?? "all");
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(() => {
    if (sectionId === "all") return allFlashcards;
    return allFlashcards.filter((f) => f.sectionId === sectionId);
  }, [sectionId]);

  const deck = useMemo(() => shuffle(pool, shuffleSeed), [pool, shuffleSeed]);

  const [prevDeck, setPrevDeck] = useState(deck);
  if (deck !== prevDeck) {
    setPrevDeck(deck);
    setIndex(0);
    setFlipped(false);
  }

  const current = deck[index];

  function goTo(newIndex: number) {
    if (deck.length === 0) return;
    setFlipped(false);
    setIndex(((newIndex % deck.length) + deck.length) % deck.length);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={sectionId}
          onValueChange={(value) => setSectionId(value ?? "all")}
        >
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="All sections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All sections ({allFlashcards.length})
            </SelectItem>
            {studySections.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.number}. {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setShuffleSeed((s) => s + 1)}>
          <Shuffle className="size-4" />
          Shuffle
        </Button>
        <span className="ml-auto text-sm text-muted-foreground">
          {deck.length > 0 ? `${index + 1} / ${deck.length}` : "0 / 0"}
        </span>
      </div>

      {current ? (
        <Card
          className="flex min-h-64 cursor-pointer items-center justify-center p-8 text-center select-none"
          onClick={() => setFlipped((f) => !f)}
        >
          <CardContent className="flex flex-col items-center gap-3 p-0">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {flipped ? "Answer" : "Question"}
            </span>
            <p className="text-lg font-medium">
              {flipped ? current.back : current.front}
            </p>
            <span className="text-xs text-muted-foreground">
              Click card to flip
            </span>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex min-h-64 items-center justify-center p-8 text-muted-foreground">
          No flashcards for this section.
        </Card>
      )}

      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          onClick={() => goTo(index - 1)}
          disabled={deck.length === 0}
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setFlipped((f) => !f)}
          disabled={deck.length === 0}
        >
          <RotateCw className="size-4" />
          Flip
        </Button>
        <Button onClick={() => goTo(index + 1)} disabled={deck.length === 0}>
          Next
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
