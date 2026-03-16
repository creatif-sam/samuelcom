import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for reading public data in server components.
 * Does NOT use cookies — safe to use with `cacheComponents: true`.
 * Use this for: published blog posts, published testimonials, and other
 * public data that does not require user authentication.
 */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
