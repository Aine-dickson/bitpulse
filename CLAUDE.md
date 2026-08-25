# BitPulse — project & design guide

BitPulse is a product & R&D studio for embedded hardware, firmware and systems
software. This file is the source of truth for the site's design system and the
decisions behind it. Read it before making visual or architectural changes.

Stack: Vue 3 (`<script setup>` + TS) · Vite · **vite-ssg** (static prerender per
route) · Tailwind **v4** (CSS-first `@theme`) · Pinia (+ persistedstate) ·
@unhead/vue (SEO) · Supabase (blog comments only).

## Design concept — "The Trace"

An instrument/PCB aesthetic: tonal plate depths, mono designators (`R1 · CAP`,
`S-01`), circuit/board diagrams, a heartbeat "pulse" motif. Reference for the
*level of craft* (not a look-alike) was `LabonTecch/labontech-web`.

Hard rules, decided with the owner:
- **Light-first.** Site always loads light; dark is opt-in and persisted. Never
  make dark the default, even when the OS prefers dark.
- **No harsh light→black contrast.** Sections step through *tonal plate depths*
  (`plate-0..3`) within a mode, not white→black jumps.
- **Heavy grotesque display**, never a serif. Display = **Archivo** (700–900);
  body = Archivo; designators/mono = **IBM Plex Mono**.
- **Emerald / PCB-green accent** (orange was tried and rejected).
- Avoid "AI-slop" look; keep it specific and instrument-like.
- **No em dashes in visible copy.** They read as AI-written. Use the punctuation
  a person would actually reach for: a comma, a full stop, a colon for a label
  or list gloss, `·` for mono separators, `|` in page titles. The one exception
  is a quote attribution (`— Name`). This applies to prose, meta descriptions,
  JSON-LD and blog articles; code comments are not visible copy.
- **Don't over-index on Rust.** It is one tool we use, not the pitch. Positioning
  copy names the outcome; language lists stay honest and plural (Rust, C, C++,
  Go, TypeScript). Naming Rust is fine where it is literally the fact.

## Design tokens (source of truth: `src/assets/main.css`)

Tailwind v4 `@theme` defines light tokens; `[data-theme="dark"]` flips them.
`@custom-variant dark` routes Tailwind's `dark:` off the `data-theme` attribute.
Style through tokens (`bg-plate-1`, `text-ink-2`, `text-accent-deep`) — never
hardcode hex in components.

| token        | light     | dark      |
|--------------|-----------|-----------|
| plate-0      | `#F5F5F0` | `#141A16` |
| plate-1      | `#EEEEE6` | `#19201B` |
| plate-2      | `#E6E6DC` | `#1F2721` |
| plate-3      | `#DEDFD3` | `#262F28` |
| surface      | `#FBFBF8` | `#1C231E` |
| ink          | `#1B241F` | `#EAF0EA` |
| ink-2 / ink-3| `#4C554E` / `#7A827B` | `#AAB3AB` / `#7D867E` |
| line / line-2| `#DAD9CC` / `#C9C9B9` | `#2B342D` / `#374139` |
| accent       | `#12924E` | `#31D07E` |
| accent-deep  | `#0B6B39` | `#5BE0A0` |
| accent-soft  | `#E2EFE7` | `#17251C` |
| footer       | `#232A24` | `#0F140F` |

Footer is **always dark** regardless of theme (own footer-* tokens).

## Theming mechanics (don't reintroduce the flash / swap bugs)

- **No-flash script** in `index.html` sets `data-theme` from
  `localStorage['bitpulse-theme']` before first paint; default `light`.
- `src/composables/useTheme.ts` owns a **module-level reactive `theme` ref**
  (singleton). It hydrates once on the client and `apply()`s `data-theme` to
  `<html>`. Everything theme-dependent should read this ref — **not** ad-hoc
  `:global([data-theme])` CSS. (A CSS-only logo swap silently failed to switch;
  the reactive ref is the fix.)
- SSR/SSG safety: register `pinia-plugin-persistedstate` only `if (isClient)`
  in `src/main.ts`, or the prerender crashes on `window is not defined`.

## Brand marks

- **Monogram / favicon** = the pulse-"p": one heartbeat ribbon — flat shelf →
  V-dip → tall spike → the downstroke curls into the bowl of a "p" + descender —
  in the green→teal gradient (`#8FE04F → #33CE7C → #1FC3A8`, round caps/joins,
  stroke-width 22 on viewBox `-4 -6 154 226`). Source of truth:
  `src/components/ui/BrandMark.vue` and `public/favicon.svg`. The BP-tile mark is
  retired. Icon set (`apple-touch`, `android-*`, `favicon-*`, `.ico`) is
  regenerated from this SVG.
- **Wordmark** = transparent PNGs, two arts: `bitpulse_logo-dark.png` (dark
  letters, for light bg) and `bitpulse_logo-light.png` (white letters, for dark
  bg). Rendered via `src/components/ui/BrandWordmark.vue`:
  `variant="auto"` follows theme, `variant="light"` forces white art (footer).
  Keep both arts cropped to the same box so the swap doesn't shift.
- Prose mentions of "BitPulse" stay as text; only the nav/footer lockups use the
  image.

## Architecture notes

- Data layer is typed config in `src/data/*` (services, sectors, programs,
  process, why, projects, site, leadForms). Pages render from these.
- Routes in `src/router/index.ts` (ViteSSG builds the router). Dynamic detail
  pages: `/services/:slug`, `/innovations/:slug` (sectors), `/blogs/:slug`, plus
  `/lab`. `vite.config.ts` `includedRoutes` expands these to static paths.
- **Lead forms** are config-driven: `src/data/leadForms.ts` + `LeadModal.vue` +
  `src/utils/leads.ts` → a Cloudflare Worker (`worker/`, deployed to
  `api.bitpulse.dev`) → Resend. The Worker mails the enquiry to the studio with
  `Reply-To` set to the sender, and auto-acknowledges the sender. Supabase is a
  best-effort archive only; the Worker call alone decides success. On failure
  the modal keeps the answers and offers mailto + WhatsApp, never a dead end.
  Keep the form set small and *reachable* — four unreachable forms were the
  reason quote requests never arrived. `ALLOWED_TYPES` in the Worker must stay
  in sync with the keys in `leadForms.ts`.
- **Forms pre-fill from context.** `uiStore.showModal(name, ctx)` seeds matching
  field names, so a service or sector page never asks what it already knows.
  Same via deep link: `?enquiry=requestQuoteForm&service=Apps%20%26%20Interfaces`.
- **Sector detail pages** render from `constraints` / `signals` / `stack` /
  `outcomes` in `src/data/sectors.ts`. That data is the point of the page: it
  says what makes the sector hard, not just that we serve it.
- **Blog must render without Supabase.** `src/utils/supabase.ts` exports a
  defensive placeholder client + `isSupabaseConfigured`; comments load only when
  configured. Article content never depends on Supabase.
- **SEO/social:** `src/composables/useSeoMeta.ts`. Default share image
  `public/og-image.png` (1200×630, derived from `social_preview.png`). Prerender
  bakes per-page title/canonical/og+twitter into the static HTML. `SITE_URL` in
  `src/config/seo.ts`.

## Field services sub-site (`/field`, `/kits`) — a second audience

BitPulse also runs a hands-on installation business: WiFi, CCTV, hotspot systems
and computer labs around Kampala. It has its own pages, its own look and its own
audience, and it must stay separate from the studio positioning.

**Who it is for.** Head teachers, landlords, bar and hostel owners, facilities
managers. They arrive from a business card, a sticker or a shirt, having already
met Aine in person. They are checking the business is real before calling. They
are not the studio's audience: land them on the R&D homepage and they either get
confused or assume they cannot afford it.

- **Standalone chrome.** Routes carry `meta: { standalone: true }`, and `App.vue`
  drops `AppNav`/`AppFooter` on those routes. A studio nav on these pages only
  gives a warm lead somewhere else to go. `/field` is deliberately kept out of
  the main nav; it is reachable from the studio footer only.
- **Own theme, light-first.** These pages read `data-field-theme` (key
  `bitpulse-field-theme`), stamped before paint by the script in `index.html` and
  toggled by `useFieldTheme` + `FieldThemeToggle.vue`. They never follow the
  studio's `data-theme`: a head teacher should not inherit the dark mode an
  engineer set while reading the Lab.
- **Design system:** `src/assets/field.css`, imported by `main.css`, every rule
  namespaced under `.field`. Palette comes from the printed collateral. Muted is
  `#58655C`, darkened from the collateral's `#66736B` which misses AA at small
  sizes; green `#17803D` is 4.5:1 so it is accents and button fills only, never
  body copy.
- **WhatsApp is the primary channel**, weighted at least equal to the phone.
  Every CTA is a real `<a href>`; nothing essential sits behind JavaScript,
  because these visitors are on mid-range Android over 3G.
- **No contact form.** Forms go unanswered and lose to WhatsApp in this market.
- **No pricing on `/field`.** Prices live on `/kits` only.
- **No invented trust.** No testimonials, client logos or statistics anywhere.
  This visitor has met Aine and can check every claim. Installation photos are
  real jobs dropped into `public/field/` with `ready: true` flipped in
  `src/data/field.ts`; until then the page draws labelled placeholders rather
  than requesting a missing file.

### Kits (`/kits`, `/kits/:slug`)

Configurable, not fixed-price. Built as a cold-visit reference: set the numbers
to match the site you just walked and read out a figure.

- **Prices are owner-maintained** in `src/data/kits.ts`, plain numbers in UGX.
  They are *indicative Kampala rates, not quotes*, and the owner adjusts them.
  Never present them as verified or authoritative. Totals, per-unit lines and
  the volume-discount ladder all recompute from those numbers.
- Per-unit items scale with a count field, so cabling and labour track camera or
  seat count. Capacity limits **warn** and never silently correct a choice.
- **Config sections are tabbed** (`tab` on each field groups them). Count fields
  are never tabbed: quantity sits above the bar and stays visible, because it is
  the number people keep adjusting.
- The WhatsApp link carries the kit name, the full configuration line by line and
  the figure on screen, so the chat opens on a shared spec.

### Share cards

`scripts/generate-og.ts` renders every OG card via headless Edge: one per
service, plus `/og/field.png` and `/og/kits.png`. Run manually with
`bun scripts/generate-og.ts` (bun, so it can import the typed data directly);
output is committed. Regenerate when a name, tag or summary changes. These URLs
spread by being pasted into WhatsApp, so the cards matter more than usual.

## Working agreement

- **Do not commit or push brand/subjective changes without explicit approval.**
  Land only what was asked; feature work merges to `main`.
- Verify visually before shipping: headless Edge screenshots; downscale icons
  from a 512px master via System.Drawing (headless Edge won't render 16/32px).

## Known TODO (owner-side)

- Deploy the lead Worker: verify bitpulse.dev in Resend, `wrangler secret put
  RESEND_API_KEY`, add the `api.bitpulse.dev` DNS record, `wrangler deploy`.
  Full steps in `worker/README.md`. **Done and live**; rotate the key if it was
  ever pasted somewhere public.
- **Field photos.** `public/field/work-0[1-6].webp` are still placeholders. Drop
  real installation photos in and flip `ready: true` in `src/data/field.ts`.
  Instructions in `public/field/README.md`. This is the section that does the
  convincing, so it is the highest-value outstanding item.
- **Kit prices.** The figures in `src/data/kits.ts` are starting estimates and
  need the owner's review against current supplier rates. Same for the discount
  ladder (3/5/8/10% at 5M/12M/25M/50M UGX).
- **LocalBusiness address/geo.** Left as commented TODOs in `src/views/field.vue`
  rather than invented. Fill before submitting to Google Business Profile.
- Swap placeholder Lab items in `src/data/projects.ts` for real ones.
- Optionally set `VITE_SUPABASE_URL` / key and create `form_submissions` for the
  archive copy (blog comments use the same client).
