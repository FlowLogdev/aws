import Link from "next/link";
import { CheckCircle2, Lock, XCircle } from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studySections } from "@/lib/content";
import { SIMULATOR_COUNT, SIMULATOR_QUESTIONS } from "@/lib/quiz-constants";
import { createClient } from "@/lib/supabase/server";

export default async function QuizPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user!;

  const [{ data: schedule }, { data: attempts }] = await Promise.all([
    supabase
      .from("micro_quiz_schedule")
      .select("best_score_pct, simulators_unlocked, last_score, next_due_at")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("quiz_attempts")
      .select("id, quiz_type, exam_id, section_id, score, total, passed, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(10),
  ]);

  const unlocked = Boolean(schedule?.simulators_unlocked);
  const bestPct = schedule?.best_score_pct ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Quiz Simulators</h1>
        <p className="text-muted-foreground">
          Practice with micro-quizzes, section quizzes, and full-length
          CLF-C02 exam simulators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Micro-quiz</CardTitle>
          <CardDescription>
            10 mixed questions covering all four exam domains. Score 80% or
            higher to unlock the full exam simulators.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge variant={unlocked ? "default" : "outline"}>
            {unlocked ? "Simulators unlocked" : "Simulators locked"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Best score: {Math.round(bestPct)}%
          </span>
        </CardContent>
        <CardFooter>
          <Button render={<Link href="/quiz/micro" />}>Start micro-quiz</Button>
        </CardFooter>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Full exam simulators</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          {SIMULATOR_QUESTIONS} questions each, weighted across the four
          CLF-C02 domains, just like the real exam.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SIMULATOR_COUNT }, (_, i) => i + 1).map((num) => (
            <Card key={num}>
              <CardHeader>
                <CardTitle>Practice Exam {num}</CardTitle>
                <CardDescription>
                  {SIMULATOR_QUESTIONS} questions &middot; ~90 minutes
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {unlocked ? (
                  <Button
                    variant="outline"
                    render={<Link href={`/quiz/simulator/${num}`} />}
                  >
                    Start exam
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    <Lock className="size-4" />
                    Locked
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Practice by section</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {studySections.map((section) => (
            <Link
              key={section.id}
              href={`/quiz/section/${section.id}`}
              className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              {section.number}. {section.title}
            </Link>
          ))}
        </div>
      </div>

      {attempts && attempts.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Recent attempts</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell className="capitalize">
                      {attempt.quiz_type}
                      {attempt.section_id ? ` · ${attempt.section_id}` : ""}
                      {attempt.exam_id ? ` · ${attempt.exam_id}` : ""}
                    </TableCell>
                    <TableCell>
                      {attempt.score} / {attempt.total}
                    </TableCell>
                    <TableCell>
                      {attempt.passed ? (
                        <span className="inline-flex items-center gap-1 text-primary">
                          <CheckCircle2 className="size-4" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-destructive">
                          <XCircle className="size-4" /> Not passed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {attempt.completed_at
                        ? new Date(attempt.completed_at).toLocaleString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </div>
  );
}
