/**
 * BitPulse lead intake Worker.
 *
 * The site is a static build served through Cloudflare, so there is nowhere in
 * the bundle to keep a Resend API key. Every enquiry form POSTs here instead.
 * For each submission the Worker sends two emails through Resend:
 *
 *   1. the enquiry itself to the studio inbox, with Reply-To set to the person
 *      who filled the form, so hitting reply just works;
 *   2. an acknowledgement to that person, so nobody is left wondering whether
 *      the form did anything.
 *
 * Deploy: see worker/README.md. Secrets: RESEND_API_KEY.
 */

export interface Env {
  /** Resend API key. Set with: wrangler secret put RESEND_API_KEY */
  RESEND_API_KEY: string
  /** Verified Resend sender, e.g. "BitPulse <no-reply@bitpulse.dev>". */
  MAIL_FROM: string
  /** Where enquiries land, e.g. "contact@bitpulse.dev". */
  MAIL_TO: string
  /** Optional KV namespace for rate limiting. Omit and limiting is skipped. */
  LEAD_RATELIMIT?: KVNamespace
}

const ALLOWED_ORIGINS = [
  'https://bitpulse.dev',
  'https://www.bitpulse.dev',
  'http://localhost:5173',
  'http://localhost:4173',
]

/** Form keys the site actually sends. Anything else is rejected. */
const ALLOWED_TYPES = new Set([
  'consultationForm',
  'requestQuoteForm',
  'partnershipForm',
  'earlyAccess',
  'contact',
])

const MAX_BODY_BYTES = 16 * 1024
const MAX_FIELD_CHARS = 5000
const RATE_LIMIT_PER_HOUR = 5

interface LeadBody {
  type?: unknown
  payload?: unknown
  meta?: unknown
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

/** Strip control characters and header-injection vectors out of user text. */
function clean(value: unknown): string {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, 200)
}

/** Same, but keeps newlines and tabs for long-form message bodies. */
function cleanMultiline(value: unknown): string {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_FIELD_CHARS)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 254
}

/** "contact_method" -> "Contact method" */
function humanize(key: string): string {
  const s = key.replace(/[_-]+/g, ' ').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

async function rateLimited(env: Env, ip: string): Promise<boolean> {
  if (!env.LEAD_RATELIMIT || !ip) return false
  const key = `rl:${ip}:${new Date().toISOString().slice(0, 13)}` // per IP, per hour
  const current = Number((await env.LEAD_RATELIMIT.get(key)) ?? '0')
  if (current >= RATE_LIMIT_PER_HOUR) return true
  await env.LEAD_RATELIMIT.put(key, String(current + 1), { expirationTtl: 3600 })
  return false
}

async function sendMail(
  env: Env,
  msg: { to: string; subject: string; html: string; text: string; replyTo?: string },
): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [msg.to],
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  })
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text().catch(() => '')}`)
  }
}

// ---------------------------------------------------------------- templates

const BRAND = '#0B6B39'

function enquiryEmail(
  formTitle: string,
  rows: [string, string][],
  meta: Record<string, string>,
): { html: string; text: string } {
  const tr = rows
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e6e6dc;font:600 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.06em;color:#7a827b;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e6e6dc;font:400 15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#1b241f">${escapeHtml(v).replace(/\n/g, '<br>')}</td>
      </tr>`,
    )
    .join('')

  const metaLine = Object.entries(meta)
    .filter(([, v]) => v)
    .map(([k, v]) => `${escapeHtml(humanize(k))}: ${escapeHtml(v)}`)
    .join(' &middot; ')

  const html = `<div style="background:#f5f5f0;padding:28px 16px">
  <div style="max-width:640px;margin:0 auto;background:#fbfbf8;border:1px solid #dad9cc;border-radius:12px;overflow:hidden">
    <div style="background:${BRAND};padding:18px 22px">
      <div style="font:700 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#a8e9c6">BitPulse &middot; New enquiry</div>
      <div style="font:800 21px/1.3 -apple-system,Segoe UI,Roboto,sans-serif;color:#ffffff;margin-top:4px">${escapeHtml(formTitle)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">${tr}</table>
    ${metaLine ? `<div style="padding:14px 22px;background:#eeeee6;font:400 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:#7a827b">${metaLine}</div>` : ''}
  </div>
</div>`

  const text = [
    `BitPulse — new enquiry`,
    formTitle,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    metaLine.replace(/&middot;/g, '·').replace(/&amp;/g, '&'),
  ].join('\n')

  return { html, text }
}

function ackEmail(name: string, formTitle: string): { html: string; text: string } {
  const first = escapeHtml(name.split(' ')[0] || 'there')
  const html = `<div style="background:#f5f5f0;padding:28px 16px">
  <div style="max-width:560px;margin:0 auto;background:#fbfbf8;border:1px solid #dad9cc;border-radius:12px;padding:28px 26px">
    <div style="font:700 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:${BRAND}">BitPulse</div>
    <h1 style="font:800 24px/1.25 -apple-system,Segoe UI,Roboto,sans-serif;color:#1b241f;margin:12px 0 0">We got it, ${first}.</h1>
    <p style="font:400 15px/1.65 -apple-system,Segoe UI,Roboto,sans-serif;color:#4c554e">
      Your <strong>${escapeHtml(formTitle.toLowerCase())}</strong> request has reached the studio. A real
      engineer reads every one of these, so the reply you get back will be about your project
      specifically, not a template.
    </p>
    <p style="font:400 15px/1.65 -apple-system,Segoe UI,Roboto,sans-serif;color:#4c554e">
      Expect to hear from us within one to two working days. If it is urgent, reply to this email
      or reach us on WhatsApp at +256 777 532858.
    </p>
    <p style="font:400 15px/1.65 -apple-system,Segoe UI,Roboto,sans-serif;color:#4c554e;margin-bottom:0">
      Talk soon,<br><strong style="color:#1b241f">The BitPulse team</strong><br>
      <span style="font:400 13px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#7a827b">Kampala, Uganda &middot; bitpulse.dev</span>
    </p>
  </div>
</div>`

  const text = `BitPulse

We got it, ${name.split(' ')[0] || 'there'}.

Your ${formTitle.toLowerCase()} request has reached the studio. A real engineer reads every one of these, so the reply you get back will be about your project specifically, not a template.

Expect to hear from us within one to two working days. If it is urgent, reply to this email or reach us on WhatsApp at +256 777 532858.

Talk soon,
The BitPulse team
Kampala, Uganda · bitpulse.dev`

  return { html, text }
}

// ------------------------------------------------------------------ handler

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin')
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }
    if (url.pathname === '/health') {
      return json({ ok: true }, 200, origin)
    }
    if (url.pathname !== '/lead') {
      return json({ ok: false, error: 'Not found' }, 404, origin)
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405, origin)
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ ok: false, error: 'Origin not allowed' }, 403, origin)
    }

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'Payload too large' }, 413, origin)
    }

    let body: LeadBody
    try {
      body = JSON.parse(raw) as LeadBody
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400, origin)
    }

    const type = clean(body.type)
    if (!ALLOWED_TYPES.has(type)) {
      return json({ ok: false, error: 'Unknown form type' }, 400, origin)
    }

    const payload = (body.payload ?? {}) as Record<string, unknown>
    const metaIn = (body.meta ?? {}) as Record<string, unknown>

    const email = clean(payload.email).toLowerCase()
    const name = clean(payload.name) || 'Someone'
    if (!isEmail(email)) {
      return json({ ok: false, error: 'A valid email address is required' }, 400, origin)
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? ''
    if (await rateLimited(env, ip)) {
      return json({ ok: false, error: 'Too many submissions. Try again later.' }, 429, origin)
    }

    // Long-form answers keep their line breaks; everything else is single-line.
    const longFields = new Set(['message', 'scope', 'success'])
    const rows: [string, string][] = Object.entries(payload)
      .filter(([k, v]) => v !== '' && v != null && k !== 'honeypot')
      .map(([k, v]) => [humanize(k), longFields.has(k) ? cleanMultiline(v) : clean(v)])

    const formTitle = clean(metaIn.form) || humanize(type)
    const meta: Record<string, string> = {
      page: clean(metaIn.page),
      referrer: clean(metaIn.referrer),
      submitted_at: clean(metaIn.submitted_at),
      country: clean(request.headers.get('CF-IPCountry')),
    }

    const enquiry = enquiryEmail(formTitle, rows, meta)
    const subjectBits = [clean(payload.service), clean(payload.topic)].filter(Boolean)
    const subject = `[BitPulse] ${formTitle}${subjectBits.length ? ` — ${subjectBits[0]}` : ''} — ${name}`

    try {
      // The studio copy is the one that must land. Await it, and let its failure
      // surface to the visitor so they get the fallback instead of a false
      // "thanks, we'll be in touch".
      await sendMail(env, {
        to: env.MAIL_TO,
        subject,
        html: enquiry.html,
        text: enquiry.text,
        replyTo: email,
      })
    } catch (e) {
      console.error('[lead] studio send failed:', e)
      return json({ ok: false, error: 'Could not deliver the enquiry' }, 502, origin)
    }

    // The acknowledgement is a nicety. If Resend rejects it the lead is still
    // safely in the inbox, so it must never turn a good submission into an error.
    const ack = ackEmail(name, formTitle)
    ctx.waitUntil(
      sendMail(env, {
        to: email,
        subject: `We received your ${formTitle.toLowerCase()} — BitPulse`,
        html: ack.html,
        text: ack.text,
        replyTo: env.MAIL_TO,
      }).catch((e) => console.error('[lead] ack send failed:', e)),
    )

    return json({ ok: true }, 200, origin)
  },
}
