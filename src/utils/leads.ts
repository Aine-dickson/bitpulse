import { supabase } from './supabase'

// Lead / enquiry submissions. Every form on the site funnels through here into
// a single Supabase table, keyed by `type`, with the fields kept as JSON.
//
// Required Supabase setup (run once in the SQL editor):
//
//   create table if not exists public.form_submissions (
//     id         uuid primary key default gen_random_uuid(),
//     type       text not null,
//     payload    jsonb not null,
//     created_at timestamptz not null default now()
//   );
//   alter table public.form_submissions enable row level security;
//   create policy "anon can submit" on public.form_submissions
//     for insert to anon with check (true);
//
// Until that table + policy exist (or VITE_SUPABASE_* are set), submitLead
// resolves with { ok: false } and the caller shows an error state — it never
// throws or reloads the page.

export interface LeadResult {
  ok: boolean
  error?: string
}

export async function submitLead(
  type: string,
  payload: Record<string, unknown>,
): Promise<LeadResult> {
  try {
    const { error } = await supabase.from('form_submissions').insert({ type, payload })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' }
  }
}
