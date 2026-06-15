"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

import { submitQuizAttempt, type SubmitQuizResult } from "@/lib/actions/quiz";
import { DOMAIN_LABELS, type QuizQuestion } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuizRunnerProps {
  questions: QuizQuestion[];
  quizType: "micro" | "section" | "simulator";
  examId?: string;
  sectionId?: string;
  title: string;
  description?: string;
}

export function QuizRunner({
  questions,
  quizType,
  examId,
  sectionId,
  title,
  description,
}: QuizRunnerProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<SubmitQuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const question = questions[index];
  const answeredCount = Object.keys(answers).length;

  function setSingleAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: [optionIndex] }));
  }

  function toggleMultiAnswer(questionId: string, optionIndex: number, checked: boolean) {
    setAnswers((prev) => {
      const current = new Set(prev[questionId] ?? []);
      if (checked) {
        current.add(optionIndex);
      } else {
        current.delete(optionIndex);
      }
      return { ...prev, [questionId]: Array.from(current).sort((a, b) => a - b) };
    });
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const res = await submitQuizAttempt({
        quizType,
        examId,
        sectionId,
        questionIds: questions.map((q) => q.id),
        answers,
      });
      if ("error" in res) {
        setError(res.error);
        return;
      }
      setResult(res);
    });
  }

  function handleRetake() {
    setAnswers({});
    setIndex(0);
    setResult(null);
    router.refresh();
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {result.score} / {result.total} ({pct}%)
            </CardTitle>
            <CardDescription>Passing score: {result.passThreshold}%</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Badge variant={result.passed ? "default" : "destructive"} className="w-fit">
              {result.passed ? "Passed" : "Not passed"}
            </Badge>
            {quizType === "micro" && (
              <p className="text-sm text-muted-foreground">
                {result.passed
                  ? "Nice work, scoring 80%+ unlocks the full exam simulators."
                  : "Score 80% or higher on a micro-quiz to unlock the full exam simulators."}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleRetake}>Try again</Button>
            <Button variant="outline" render={<Link href="/quiz" />}>
              Back to quizzes
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-4">
          {questions.map((q, i) => {
            const selected = answers[q.id] ?? [];
            const isCorrect = result.correctness[q.id];
            return (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-medium">
                      {i + 1}. {q.question}
                    </CardTitle>
                    {isCorrect ? (
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    ) : (
                      <XCircle className="size-5 shrink-0 text-destructive" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {q.options.map((option, optIdx) => {
                    const isCorrectOption = q.correct.includes(optIdx);
                    const isSelected = selected.includes(optIdx);
                    return (
                      <div
                        key={optIdx}
                        className={cn(
                          "rounded-md border px-3 py-2 text-sm",
                          isCorrectOption && "border-primary bg-primary/5",
                          isSelected &&
                            !isCorrectOption &&
                            "border-destructive bg-destructive/5",
                        )}
                      >
                        {option}
                        {isCorrectOption && (
                          <span className="ml-2 text-xs text-primary">Correct</span>
                        )}
                        {isSelected && !isCorrectOption && (
                          <span className="ml-2 text-xs text-destructive">
                            Your answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {q.explanation}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Progress value={((index + 1) / questions.length) * 100} className="flex-1" />
        <span className="text-sm whitespace-nowrap text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{DOMAIN_LABELS[question.domain]}</Badge>
            <Badge variant="outline">{question.difficulty}</Badge>
          </div>
          <CardTitle className="text-base font-medium">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {question.correct.length === 1 ? (
            <RadioGroup
              value={String(answers[question.id]?.[0] ?? "")}
              onValueChange={(value: string) =>
                setSingleAnswer(question.id, Number(value))
              }
              className="flex flex-col gap-3"
            >
              {question.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={String(optIdx)}
                    id={`${question.id}-${optIdx}`}
                  />
                  <Label htmlFor={`${question.id}-${optIdx}`} className="font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground">
                Select {question.correct.length} answers.
              </p>
              {question.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <Checkbox
                    id={`${question.id}-${optIdx}`}
                    checked={(answers[question.id] ?? []).includes(optIdx)}
                    onCheckedChange={(checked) =>
                      toggleMultiAnswer(question.id, optIdx, checked === true)
                    }
                  />
                  <Label htmlFor={`${question.id}-${optIdx}`} className="font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {answeredCount}/{questions.length} answered
        </span>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit quiz"}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "flex size-7 items-center justify-center rounded-md border text-xs transition-colors",
              i === index ? "border-primary" : "border-border",
              answers[q.id] ? "bg-muted" : "bg-transparent",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
