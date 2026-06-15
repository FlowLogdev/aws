import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client for server-only contexts (cron jobs, API routes that
 * need to read/write across all users). Never import this from client code.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
