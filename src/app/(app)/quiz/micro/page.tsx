import { QuizRunner } from "@/components/quiz-runner";
import { buildExam } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function MicroQuizPage() {
  // Intentional per-request randomization for a force-dynamic server
  // component, not a render-time value React needs to keep stable.
  // eslint-disable-next-line react-hooks/purity
  const questions = buildExam(10, Date.now());

  return (
    <QuizRunner
      questions={questions}
      quizType="micro"
      title="Micro-quiz"
      description="10 questions covering all four CLF-C02 domains. Score 80% or higher to unlock the full exam simulators."
    />
  );
}
