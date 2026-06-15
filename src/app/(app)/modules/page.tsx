import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DOMAIN_LABELS, studySections, type ExamDomain } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

const DOMAINS: ExamDomain[] = [1, 2, 3, 4];

export default async function ModulesPage() {
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Study Modules</h1>
        <p className="text-muted-foreground">
          {studySections.length} sections covering the full CLF-C02
          curriculum. Mark each section complete as you work through it.
        </p>
      </div>

      {DOMAINS.map((domain) => {
        const sections = studySections.filter((s) => s.domain === domain);
        const completed = sections.filter((s) =>
          completedSectionIds.has(s.id),
        ).length;

        return (
          <Card key={domain}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{DOMAIN_LABELS[domain]}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {completed}/{sections.length} complete
                </span>
              </div>
              <Progress value={(completed / sections.length) * 100} />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {sections.map((section) => {
                const done = completedSectionIds.has(section.id);
                return (
                  <Link
                    key={section.id}
                    href={`/modules/${section.id}`}
                    className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
                  >
                    {done ? (
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="size-5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">
                        {section.number}. {section.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {section.summary}
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="size-3" />
                      {section.estMinutes}m
                    </Badge>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
