import { createClient } from '@supabase/supabase-js'

// Comments/newsletter run on Supabase. If the env vars are missing (e.g. a
// fresh clone without a .env), fall back to a harmless placeholder client so a
// missing backend never blanks a whole page — network calls simply no-op/fail
// gracefully and are handled at the call site.
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_KEY,
)

const url = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const key = import.meta.env.VITE_SUPABASE_KEY || 'placeholder-anon-key'

if (!isSupabaseConfigured) {
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_KEY not set — comments are disabled.')
}

export const supabase = createClient(url, key)
