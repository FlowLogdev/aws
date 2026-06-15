import { notFound } from "next/navigation";

import { QuizRunner } from "@/components/quiz-runner";
import { getQuestionsBySection, getSectionById } from "@/lib/content";

export default async function SectionQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = getSectionById(id);
  const questions = getQuestionsBySection(id);

  if (!section || questions.length === 0) {
    notFound();
  }

  return (
    <QuizRunner
      questions={questions}
      quizType="section"
      sectionId={id}
      title={`${section.number}. ${section.title} - Practice quiz`}
      description={`${questions.length} questions covering this section.`}
    />
  );
}
