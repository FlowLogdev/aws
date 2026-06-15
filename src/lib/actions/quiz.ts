"use server";

import { revalidatePath } from "next/cache";

import { allQuestions } from "@/lib/content";
import { MICRO_INTERVAL_MS, MICRO_PASS_THRESHOLD } from "@/lib/quiz-constants";
import { createClient } from "@/lib/supabase/server";

const STANDARD_PASS_THRESHOLD = 70;

export interface SubmitQuizInput {
  quizType: "micro" | "section" | "simulator";
  examId?: string;
  sectionId?: string;
  questionIds: string[];
  answers: Record<string, number[]>;
}

export interface SubmitQuizResult {
  attemptId: string;
  score: number;
  total: number;
  passed: boolean;
  passThreshold: number;
  correctness: Record<string, boolean>;
}

function arraysEqual(a: number[], b: number[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export async function submitQuizAttempt(
  input: SubmitQuizInput,
): Promise<SubmitQuizResult | { error: string }> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return { error: "Not authenticated." };

  const questionMap = new Map(allQuestions.map((q) => [q.id, q]));
  const correctness: Record<string, boolean> = {};
  let score = 0;

  const answerRows = input.questionIds.map((questionId) => {
    const question = questionMap.get(questionId);
    const selected = [...(input.answers[questionId] ?? [])].sort((a, b) => a - b);
    const correctIndexes = question
      ? [...question.correct].sort((a, b) => a - b)
      : [];
    const isCorrect = question ? arraysEqual(selected, correctIndexes) : false;

    if (isCorrect) score += 1;
    correctness[questionId] = isCorrect;

    return {
      question_id: questionId,
      selected_indexes: selected,
      is_correct: isCorrect,
    };
  });

  const total = input.questionIds.length;
  const pct = total > 0 ? (score / total) * 100 : 0;
  const passThreshold =
    input.quizType === "micro" ? MICRO_PASS_THRESHOLD : STANDARD_PASS_THRESHOLD;
  const passed = pct >= passThreshold;

  const { data: attempt, error: attemptError } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      quiz_type: input.quizType,
      exam_id: input.examId ?? null,
      section_id: input.sectionId ?? null,
      score,
      total,
      passed,
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    return { error: attemptError?.message ?? "Failed to save quiz attempt." };
  }

  const { error: answersError } = await supabase
    .from("quiz_attempt_answers")
    .insert(answerRows.map((row) => ({ ...row, attempt_id: attempt.id })));

  if (answersError) {
    return { error: answersError.message };
  }

  if (input.quizType === "micro") {
    const { data: schedule } = await supabase
      .from("micro_quiz_schedule")
      .select("best_score_pct, simulators_unlocked")
      .eq("user_id", user.id)
      .single();

    const bestPct = Math.max(schedule?.best_score_pct ?? 0, pct);
    const unlocked = Boolean(schedule?.simulators_unlocked) || pct >= MICRO_PASS_THRESHOLD;

    await supabase
      .from("micro_quiz_schedule")
      .update({
        last_score: score,
        best_score_pct: bestPct,
        simulators_unlocked: unlocked,
        last_sent_at: new Date().toISOString(),
        next_due_at: new Date(Date.now() + MICRO_INTERVAL_MS).toISOString(),
      })
      .eq("user_id", user.id);
  }

  revalidatePath("/quiz");
  revalidatePath("/dashboard");

  return {
    attemptId: attempt.id as string,
    score,
    total,
    passed,
    passThreshold,
    correctness,
  };
}
