# BitPulse lead intake Worker

Every enquiry form on bitpulse.dev POSTs here. The Worker sends two emails
through Resend:

1. **The enquiry** to `MAIL_TO` (the studio inbox), with `Reply-To` set to the
   person who submitted, so hitting reply in your mail client reaches them
   directly.
2. **An acknowledgement** to the submitter, so nobody is left guessing whether
   the form did anything.

The site is a static build, so this exists purely to hold the Resend API key
somewhere the browser cannot read it.

## Endpoints

| Method | Path      | Purpose                          |
|--------|-----------|----------------------------------|
| `POST` | `/lead`   | Submit an enquiry                 |
| `GET`  | `/health` | Liveness check, returns `{ok:true}` |

Request body:

```json
{
  "type": "requestQuoteForm",
  "payload": { "name": "…", "email": "…", "service": "…", "scope": "…" },
  "meta": { "form": "Request a quote", "page": "/services/embedded-iot" }
}
```

Responses are `{ "ok": true }` on success, or `{ "ok": false, "error": "…" }`
with a 4xx/5xx status. The site treats anything other than a 2xx as a failure
and shows the visitor an email/WhatsApp fallback with their answers intact.

## Protections

- Origin allowlist (`bitpulse.dev`, `www.`, and the two local dev ports).
- `type` must be one of the known form keys.
- `email` must parse, or the submission is rejected before any send.
- 16 KB body cap, 200 chars per short field, 5000 per long field.
- Control characters stripped from every value, and all values HTML-escaped
  into the templates, so no submission can inject headers or markup.
- Optional per-IP rate limit of 5/hour once a KV namespace is bound.

## One-time setup

```bash
cd worker
npm install            # or: bun install

# 1. Verify bitpulse.dev in Resend (Domains → Add → add the DKIM/SPF records
#    to the bitpulse.dev zone in Cloudflare, then wait for "Verified").

# 2. Create an API key in Resend with send permission, then:
npx wrangler secret put RESEND_API_KEY

# 3. Optional, enables rate limiting:
npx wrangler kv namespace create LEAD_RATELIMIT
#    paste the printed id into the [[kv_namespaces]] block in wrangler.toml

# 4. In the Cloudflare dashboard, add a DNS record for api.bitpulse.dev
#    (proxied AAAA -> 100:: is the standard placeholder for a Worker route).

# 5. Ship it:
npx wrangler deploy
```

Verify:

```bash
curl https://api.bitpulse.dev/health
```

## Local development

```bash
npx wrangler dev          # serves on http://localhost:8787
```

Point the site at it by adding to the repo root `.env.local`:

```
VITE_LEAD_ENDPOINT=http://localhost:8787/lead
```

Note that `wrangler dev` reads secrets from `.dev.vars` (git-ignored):

```
RESEND_API_KEY=re_...
```

Without a key the Worker returns 502 and the site shows its fallback, which is
also a useful way to check that the fallback path looks right.

## Watching it in production

```bash
npx wrangler tail
```

Failed sends log as `[lead] studio send failed:` with the Resend error. A failed
acknowledgement logs separately and never affects the visitor's result, because
by that point the enquiry is already in the inbox.
