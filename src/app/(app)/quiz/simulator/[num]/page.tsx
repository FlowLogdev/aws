import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuizRunner } from "@/components/quiz-runner";
import { buildExam } from "@/lib/content";
import { SIMULATOR_COUNT, SIMULATOR_QUESTIONS } from "@/lib/quiz-constants";
import { createClient } from "@/lib/supabase/server";

export default async function SimulatorQuizPage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const simulatorNum = Number(num);

  if (!Number.isInteger(simulatorNum) || simulatorNum < 1 || simulatorNum > SIMULATOR_COUNT) {
    notFound();
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user!;

  const { data: schedule } = await supabase
    .from("micro_quiz_schedule")
    .select("simulators_unlocked")
    .eq("user_id", user.id)
    .single();

  if (!schedule?.simulators_unlocked) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Practice Exam {simulatorNum} is locked</CardTitle>
          <CardDescription>
            Score 80% or higher on a micro-quiz to unlock the full exam
            simulators.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-4" />
          Complete the micro-quiz to unlock this exam.
        </CardContent>
        <CardFooter>
          <Button render={<Link href="/quiz/micro" />}>Take micro-quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  const questions = buildExam(SIMULATOR_QUESTIONS, simulatorNum * 1000);

  return (
    <QuizRunner
      questions={questions}
      quizType="simulator"
      examId={`simulator-${simulatorNum}`}
      title={`Practice Exam ${simulatorNum}`}
      description={`${questions.length} questions, weighted across all four CLF-C02 domains - just like the real exam.`}
    />
  );
}
