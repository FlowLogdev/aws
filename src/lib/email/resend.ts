import { Resend } from "resend";

import { MICRO_QUIZ_QUESTION_COUNT } from "@/lib/quiz-constants";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "AWS Bot Helper <noreply@aws.flowlog.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aws.flowlog.dev";

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

export async function sendMicroQuizReminderEmail(to: string): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;

  const quizUrl = `${SITE_URL}/quiz/micro`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your CLF-C02 micro-quiz is ready (${MICRO_QUIZ_QUESTION_COUNT} questions)`,
    html: `
      <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #0f172a;">Time for your micro-quiz!</h2>
        <p style="color: #334155; line-height: 1.6;">
          ${MICRO_QUIZ_QUESTION_COUNT} new questions covering all four AWS Certified
          Cloud Practitioner (CLF-C02) domains are ready for you on
          AWS Bot Helper.
        </p>
        <p style="color: #334155; line-height: 1.6;">
          Score 80% or higher to unlock the full exam simulators.
        </p>
        <p style="margin: 24px 0;">
          <a href="${quizUrl}"
             style="background-color: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            Take the micro-quiz
          </a>
        </p>
        <p style="color: #94a3b8; font-size: 12px;">
          You're receiving this because you're studying for the CLF-C02 exam on
          aws.flowlog.dev. You can turn off email reminders from your dashboard.
        </p>
      </div>
    `,
    text: `Time for your micro-quiz! ${MICRO_QUIZ_QUESTION_COUNT} new questions covering all four CLF-C02 domains are ready. Score 80% or higher to unlock the full exam simulators. Take it here: ${quizUrl}`,
  });
}
