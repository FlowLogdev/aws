# Deploying aws.flowlog.dev

This is a private (login-required) CLF-C02 study platform: Next.js (App Router)
on Vercel, Supabase for auth/data, Vercel AI Gateway for the AI Bot Helper, and
Resend for email reminders.

## 1. Database (Supabase)

Project: `syfmnddltokmhfregwaa` (https://syfmnddltokmhfregwaa.supabase.co)

Run the schema once, via the Supabase SQL Editor or the CLI:

```bash
supabase login
supabase link --project-ref syfmnddltokmhfregwaa
supabase db push   # applies supabase/migrations/0001_init.sql
```

`0001_init.sql` creates `profiles`, `user_progress`, `quiz_attempts`,
`quiz_attempt_answers`, `micro_quiz_schedule`, `notifications`, and
`chat_messages`, all with RLS policies, plus a trigger that seeds a profile
and `micro_quiz_schedule` row for every new `auth.users` signup.

## 2. Environment variables

Copy `.env.example` to `.env.local` for local development. The same keys must
be set as Environment Variables on the Vercel project (Project Settings ->
Environment Variables) for Production (and Preview, if desired).

| Variable | Where to get it | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project -> Settings -> API | `https://syfmnddltokmhfregwaa.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project -> Settings -> API | publishable key (`sb_publishable_...`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project -> Settings -> API | secret key (`sb_secret_...`), used by cron/admin client only |
| `AI_GATEWAY_API_KEY` | Not needed on Vercel | On Vercel, AI Gateway auth happens automatically via OIDC. For local dev, run `vercel env pull` or create a key at vercel.com/ai-gateway |
| `RESEND_API_KEY` | https://resend.com/api-keys | requires the sending domain (`flowlog.dev`) to be verified in Resend |
| `RESEND_FROM_EMAIL` | n/a | `AWS Bot Helper <noreply@aws.flowlog.dev>` |
| `CRON_SECRET` | generate any random string | Vercel automatically sends it as `Authorization: Bearer <value>` to cron routes once set |
| `NEXT_PUBLIC_SITE_URL` | n/a | `https://aws.flowlog.dev` (used in email links) |
| `SIGNUP_INVITE_CODE` | optional | if set, `/signup` requires this code - keeps self-signup closed |

## 3. Local development

```bash
npm install
cp .env.example .env.local   # fill in the values from the table above
npm run dev
```

Visit http://localhost:3000 - you'll be redirected to `/login`. Use `/signup`
to create the first account (set `SIGNUP_INVITE_CODE` first if you want to
keep signup closed to the public).

## 4. Deploy to Vercel

Repo: https://github.com/FlowLogdev/aws
Vercel project: https://vercel.com/flowlogdev-s-projects/aws

```bash
git push origin main
```

Vercel auto-deploys on push (project is already linked to the GitHub repo).
After the first deploy:

1. Add all variables from the table above under Project Settings ->
   Environment Variables (Production). `AI_GATEWAY_API_KEY` can stay empty -
   the AI Gateway authenticates automatically via Vercel OIDC in production.
2. Project Settings -> Domains -> add `aws.flowlog.dev` and point its DNS
   (CNAME/A record, as instructed by Vercel) at the project.
3. Redeploy if you added env vars after the first build, so they're picked up.

## 5. Cron jobs (micro-quiz reminders)

`vercel.json` schedules `GET /api/cron/micro-quiz` every 2 hours
(`0 */2 * * *`). Once `CRON_SECRET` is set as an env var, Vercel signs each
cron request with `Authorization: Bearer <CRON_SECRET>`, which the route
validates before doing any work.

Each run:
- Finds every user whose `micro_quiz_schedule.next_due_at <= now()`.
- Builds a fresh 10-question, domain-weighted exam and writes an in-app
  notification (shown via the bell icon).
- Sends an email reminder via Resend if `email_reminders` is true for that
  user and `RESEND_API_KEY` is configured.
- Pushes `next_due_at` forward by 2 hours.

New signups get `next_due_at = now()`, so their first reminder fires on the
next cron tick after signup.

## 6. AI Bot Helper

`/ai-bot` streams responses from Claude and GPT through the Vercel AI Gateway
(`anthropic/claude-sonnet-4.6`, `openai/gpt-5.1` - see `src/lib/ai/models.ts`).
No provider API keys are needed on Vercel; the AI Gateway authenticates via
OIDC for projects deployed on Vercel. Chat history is persisted per user in
`chat_messages`.
