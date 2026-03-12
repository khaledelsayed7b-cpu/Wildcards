import { createClient } from '@supabase/supabase-js'

/**
 * Admin / service-role Supabase client.
 * Bypasses RLS — NEVER expose this to the browser or import it in
 * client components. Use only in trusted server-side contexts:
 *   - slug reservation during signup
 *   - admin operations
 *
 * Uses the Supabase connection pooler (port 6543) to prevent
 * connection exhaustion on Vercel serverless functions.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin env vars')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      // Use the pooler URL by swapping port 5432 → 6543 in the connection
      // string when using direct Postgres. For the JS client this is
      // handled transparently via the REST/PostgREST endpoint.
      schema: 'public',
    },
  })
}
