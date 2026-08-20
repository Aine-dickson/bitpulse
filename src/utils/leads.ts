import { supabase, isSupabaseConfigured } from './supabase'

// Lead / enquiry submissions. Every form on the site funnels through here.
//
// The site is a static build, so the Resend API key cannot live in the bundle.
// Submissions POST to a Cloudflare Worker on the same apex domain
// (worker/ in this repo, deployed to api.bitpulse.dev). The Worker sends two
// emails through Resend: the enquiry to the studio inbox, and an
// acknowledgement to the person who filled the form.
//
// Supabase is kept only as a best-effort archive of the same payload. It is
// fire-and-forget: a row in a table nobody reads is not "getting in touch", so
// the Worker call alone decides whether the visitor sees success or the
// email/WhatsApp fallback.
//
// Optional Supabase archive table (run once in the SQL editor):
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

const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || 'https://api.bitpulse.dev/lead'

export interface LeadResult {
  ok: boolean
  error?: string
}

/** Best-effort archive copy. Never throws, never blocks the visible result. */
function archive(type: string, payload: Record<string, unknown>) {
  if (!isSupabaseConfigured) return
  void supabase
    .from('form_submissions')
    .insert({ type, payload })
    .then(({ error }) => {
      if (error) console.warn('[leads] archive failed:', error.message)
    })
}

export async function submitLead(
  type: string,
  payload: Record<string, unknown>,
  meta: Record<string, unknown> = {},
): Promise<LeadResult> {
  archive(type, payload)

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        payload,
        meta: {
          ...meta,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          submitted_at: new Date().toISOString(),
        },
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return { ok: false, error: `HTTP ${res.status} ${detail}`.trim() }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' }
  }
}
