-- AWS Cloud Practitioner Study Platform - initial schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).

-- =========================================================
-- profiles
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;

  insert into public.micro_quiz_schedule (user_id, next_due_at)
  values (new.id, now())
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- user_progress (lesson completion per study module)
-- =========================================================
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  section_id text not null,
  lesson_id text not null,
  completed boolean not null default true,
  completed_at timestamptz not null default now(),
  unique (user_id, section_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- quiz_attempts
-- =========================================================
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_type text not null check (quiz_type in ('micro', 'section', 'simulator')),
  exam_id text,
  section_id text,
  score int not null,
  total int not null,
  passed boolean not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.quiz_attempts enable row level security;

create policy "Users manage own quiz attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- quiz_attempt_answers
-- =========================================================
create table if not exists public.quiz_attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts (id) on delete cascade,
  question_id text not null,
  selected_indexes int[] not null default '{}',
  is_correct boolean not null
);

alter table public.quiz_attempt_answers enable row level security;

create policy "Users manage own quiz answers"
  on public.quiz_attempt_answers for all
  using (
    auth.uid() = (select user_id from public.quiz_attempts where id = attempt_id)
  )
  with check (
    auth.uid() = (select user_id from public.quiz_attempts where id = attempt_id)
  );

-- =========================================================
-- micro_quiz_schedule (drives the every-2-hours reminder cron)
-- =========================================================
create table if not exists public.micro_quiz_schedule (
  user_id uuid primary key references auth.users (id) on delete cascade,
  next_due_at timestamptz not null default now(),
  last_sent_at timestamptz,
  last_score int,
  best_score_pct numeric,
  simulators_unlocked boolean not null default false,
  email_reminders boolean not null default true
);

alter table public.micro_quiz_schedule enable row level security;

create policy "Users manage own schedule"
  on public.micro_quiz_schedule for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- service role (cron) needs to read/write everyone's schedule
create policy "Service role full access to schedule"
  on public.micro_quiz_schedule for all
  to service_role
  using (true)
  with check (true);

-- =========================================================
-- notifications (in-app notification center)
-- =========================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('micro_quiz', 'system', 'unlock')),
  title text not null,
  body text not null,
  question_ids text[] not null default '{}',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users manage own notifications"
  on public.notifications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Service role full access to notifications"
  on public.notifications for all
  to service_role
  using (true)
  with check (true);

-- =========================================================
-- chat_messages (AI Bot Helper history)
-- =========================================================
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  model text,
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

create policy "Users manage own chat messages"
  on public.chat_messages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- indexes
-- =========================================================
create index if not exists idx_user_progress_user on public.user_progress (user_id);
create index if not exists idx_quiz_attempts_user on public.quiz_attempts (user_id);
create index if not exists idx_quiz_attempt_answers_attempt on public.quiz_attempt_answers (attempt_id);
create index if not exists idx_notifications_user on public.notifications (user_id, read);
create index if not exists idx_chat_messages_user on public.chat_messages (user_id, created_at);
