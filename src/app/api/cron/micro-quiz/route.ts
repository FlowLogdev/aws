import { NextResponse } from "next/server";

import { buildExam } from "@/lib/content";
import { sendMicroQuizReminderEmail } from "@/lib/email/resend";
import { MICRO_INTERVAL_MS, MICRO_QUIZ_QUESTION_COUNT } from "@/lib/quiz-constants";
import { createAdminClient } from "@/lib/supabase/admin";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createAdminClient();
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  const { data: due, error } = await supabase
    .from("micro_quiz_schedule")
    .select("user_id, email_reminders")
    .lte("next_due_at", nowIso);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let notified = 0;

  for (const row of due ?? []) {
    const exam = buildExam(MICRO_QUIZ_QUESTION_COUNT, now + notified);
    const questionIds = exam.map((q) => q.id);

    await supabase.from("notifications").insert({
      user_id: row.user_id,
      type: "micro_quiz",
      title: "Your micro-quiz is ready",
      body: `${MICRO_QUIZ_QUESTION_COUNT} new questions across all four CLF-C02 domains are waiting. Score 80% or higher to unlock the full exam simulators.`,
      question_ids: questionIds,
    });

    if (row.email_reminders) {
      const { data: userData } = await supabase.auth.admin.getUserById(row.user_id);
      const email = userData?.user?.email;
      if (email) {
        await sendMicroQuizReminderEmail(email);
      }
    }

    await supabase
      .from("micro_quiz_schedule")
      .update({
        last_sent_at: nowIso,
        next_due_at: new Date(now + MICRO_INTERVAL_MS).toISOString(),
      })
      .eq("user_id", row.user_id);

    notified += 1;
  }

  return NextResponse.json({ notified });
}
