import { FlashcardStudy } from "@/components/flashcard-study";
import { allFlashcards, studySections } from "@/lib/content";

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Flashcards</h1>
        <p className="text-muted-foreground">
          {allFlashcards.length} flashcards across {studySections.length}{" "}
          sections. Click a card to flip it, or shuffle for random review.
        </p>
      </div>
      <FlashcardStudy initialSectionId={section} />
    </div>
  );
}
