import Link from "next/link";
import { BookOpen, ClipboardCheck, Layers, ScrollText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DOMAIN_LABELS,
  DOMAIN_WEIGHTS,
  studySections,
  TOTAL_STUDY_MINUTES,
  type ExamDomain,
} from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

const DOMAINS: ExamDomain[] = [1, 2, 3, 4];

const QUICK_LINKS = [
  {
    href: "/modules",
    title: "Study Modules",
    description: "23 sections",
    icon: BookOpen,
  },
  {
    href: "/flashcards",
    title: "Flashcards",
    description: "Quick review",
    icon: Layers,
  },
  {
    href: "/cheatsheet",
    title: "Cheatsheet",
    description: "Quick reference",
    icon: ScrollText,
  },
  {
    href: "/quiz",
    title: "Quiz Simulators",
    description: "Practice exams",
    icon: ClipboardCheck,
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user!;

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("section_id")
    .eq("user_id", user.id);

  const completedSectionIds = new Set(
    (progressRows ?? []).map((r) => r.section_id),
  );
  const completedCount = studySections.filter((s) =>
    completedSectionIds.has(s.id),
  ).length;
  const progressPct = Math.round(
    (completedCount / studySections.length) * 100,
  );

  const { data: schedule } = await supabase
    .from("micro_quiz_schedule")
    .select("best_score_pct, simulators_unlocked")
    .eq("user_id", user.id)
    .single();

  const studyHours = Math.floor(TOTAL_STUDY_MINUTES / 60);
  const studyMinutes = TOTAL_STUDY_MINUTES % 60;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground">
          Track your progress toward the AWS Certified Cloud Practitioner
          (CLF-C02) exam.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Sections completed</CardDescription>
            <CardTitle className="text-3xl">
              {completedCount} / {studySections.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPct} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total study time</CardDescription>
            <CardTitle className="text-3xl">
              {studyHours}h {studyMinutes}m
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Across {studySections.length} sections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Best micro-quiz score</CardDescription>
            <CardTitle className="text-3xl">
              {schedule?.best_score_pct != null
                ? `${Math.round(schedule.best_score_pct)}%`
                : "--"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Need 80% to unlock simulators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Full simulators</CardDescription>
            <CardTitle className="text-3xl">
              {schedule?.simulators_unlocked ? "Unlocked" : "Locked"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {schedule?.simulators_unlocked
                ? "Great work, take a full exam simulator."
                : "Pass a micro-quiz with 80%+ to unlock."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exam domain breakdown</CardTitle>
            <CardDescription>
              Official CLF-C02 domain weightings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {DOMAINS.map((domain) => {
              const sectionsInDomain = studySections.filter(
                (s) => s.domain === domain,
              );
              const completedInDomain = sectionsInDomain.filter((s) =>
                completedSectionIds.has(s.id),
              ).length;
              return (
                <div key={domain} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {DOMAIN_LABELS[domain]}
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(DOMAIN_WEIGHTS[domain] * 100)}% of exam ·{" "}
                      {completedInDomain}/{sectionsInDomain.length} sections
                    </span>
                  </div>
                  <Progress
                    value={(completedInDomain / sectionsInDomain.length) * 100}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick links</CardTitle>
            <CardDescription>Jump back into your prep</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map((link) => (
              <Button
                key={link.href}
                render={<Link href={link.href} />}
                variant="outline"
                className="h-auto flex-col items-start gap-1 p-4"
              >
                <link.icon className="size-5" />
                <span className="font-medium">{link.title}</span>
                <span className="text-xs text-muted-foreground">
                  {link.description}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
