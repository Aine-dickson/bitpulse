# BitPulse SEO — strategy & runbook

Audit date: 2026-07-28. Owner: Aine. This is the working plan; update it as
things land.

---

## 0. The goal, stated honestly

The brief was "rank on top for any search of a service, product or knowledge."
That specific goal isn't reachable — nobody ranks #1 for everything, and for the
bare term **"BitPulse"** you are competing with at least six unrelated entities
that are all older and better-linked than you (see §3). Chasing it wastes
effort.

What *is* reachable, and what this plan targets:

1. **Own your own name in your own context** — "BitPulse embedded", "BitPulse
   Uganda", "BitPulse firmware", "BitCraft academy". Achievable in ~3 months.
2. **Win the East African embedded/firmware niche** — the competition here is
   genuinely weak (see §2). Achievable in ~6 months.
3. **Rank for long-tail technical knowledge queries** via the blog — this is
   where volume comes from, and it compounds. 6–18 months.
4. **Rank for each product on its own name** — Rux, Mava, BitCraft. Blocked
   until those pages have real content (§4).

Ranking is a function of (a) pages that exist, (b) pages that are crawlable,
(c) content that matches real queries, and (d) other sites linking to you.
The work below is ordered by which of those is most broken.

---

## 1. What was broken, and what is now fixed

Everything in this section is **implemented and verified in the build**, but
**not yet committed or deployed**.

| Problem | Impact | Fix |
|---|---|---|
| No `robots.txt` | Crawlers had no directives, no sitemap pointer | `public/robots.txt` |
| No `sitemap.xml` (404 live) | Google had to guess at 30 URLs | `scripts/generate-sitemap.mjs`, runs post-build |
| Zero structured data on any page | No entity identity, no rich results | `src/utils/structuredData.ts` + wired into every view |
| Blog posts had **no canonical** | Each post competed with its own URL variants | `blogPage.vue` |
| No `robots` meta anywhere | No `max-image-preview:large` → smaller SERP thumbnails | `useSeoMeta.ts` |
| Generic titles ("Services", "Blog") | Matched no real query | Keyword-led titles across all views |
| Footer "Build" links all → `/services` | Wasted internal links; detail pages orphaned | `src/data/site.ts` deep-links to real slugs |
| Google Fonts render-blocking | ~300ms added to LCP | `index.html` preload + `media="print"` swap |
| No RSS feed | No syndication surface | `dist/rss.xml`, linked from `<head>` |
| Products had no pages at all | Cannot rank for what doesn't exist | `/lab/:slug` route + `labDetail.vue` |

**Structured data now emitted** (verified in `dist/`):
`Organization` + `WebSite` on every page; `BreadcrumbList` everywhere;
`Service` on service + sector detail; `BlogPosting` on posts;
`SoftwareApplication` on Lab products; `ProfessionalService`/`LocalBusiness`
on `/contacts`; `ItemList` on all hub pages.

### Deploy checklist (do these in order)

1. Review the diff, then commit and push to `main`. CI deploys to GitHub Pages.
2. **Verify `robots.txt` actually serves.** The live one currently returns only
   Cloudflare's content-signals boilerplate with *no* `User-agent` lines — that
   means Cloudflare's managed robots.txt is intercepting. After deploy, check
   `curl https://bitpulse.dev/robots.txt` shows our `Sitemap:` line. If it
   doesn't, turn off the managed robots.txt in the Cloudflare dashboard
   (Settings → AI Crawl Control / managed robots.txt).
3. Confirm `https://bitpulse.dev/sitemap.xml` returns 200.
4. Do §5 (Search Console).

---

## 2. Keyword & content plan

### Where you actually stand

`site:bitpulse.dev` currently surfaces **essentially only the homepage**. With
30 pages built, that means ~29 pages are unindexed. Fixing indexation (§5) is
worth more than any content you could write this month.

### The opportunity: local/regional is wide open

A search for *embedded systems firmware development company Uganda Kampala*
returns directory spam (Truelancer, Yellow.ug, Afrikta), Facebook pages, and
generalist web-dev shops. **There is no strong incumbent.** A real site with
real technical content wins this within months. Prioritise it.

### Tier 1 — commercial intent, low competition (do first)

Map these onto pages that already exist. Each needs the phrase in the `<h1>`,
the title, and the first paragraph — naturally, not stuffed.

| Target query | Page |
|---|---|
| embedded systems company Uganda | `/services/embedded-iot` |
| firmware development services Africa | `/services` |
| IoT development Kampala | `/services/embedded-iot` |
| Rust embedded development services | `/services/embedded-iot` |
| firmware audit / code review service | `/services/firmware-audit` |
| hardware prototyping Uganda | `/services/rnd-prototyping` |
| embedded systems training Uganda | `/lab/bitcraft` |
| smart metering Uganda | `/innovations/smarter-cities` |

**Gap:** you have no page targeting *"embedded systems company Uganda"* head-on.
Consider a `/services/embedded-systems-uganda` style page, or lean the
`/services` H1 into the geography.

### Tier 2 — knowledge queries (the compounding engine)

Your blog has **4 posts**. That is the single biggest content gap. Four posts
cannot rank for a field. Target: **2 posts/month, 1500+ words, genuinely
technical.** Write what you actually know — depth is the moat, and it is the
thing generic agencies cannot fake.

High-value topics, chosen to match real developer queries and to feed your
service pages with internal links:

1. "Rust on bare metal: `no_std` from scratch on an STM32" — you already rank-adjacent with the Rust vs C++ post
2. "OTA firmware updates that don't brick the fleet" → links to PulseNode
3. "Designing IoT for intermittent connectivity" (genuinely differentiated by your context)
4. "LoRa vs NB-IoT vs GSM for African deployments" — high-intent, almost unserved
5. "Board bring-up checklist: first power-on to blinking LED"
6. "Prepaid smart metering architecture" → links to `/innovations/smarter-cities`
7. "Wokwi for hardware simulation before the PCB arrives"
8. "What a firmware audit actually finds" → links to `/services/firmware-audit`

Each post must: (a) link to ≥2 other posts, (b) link to ≥1 service page,
(c) have a real `datePublished`, (d) target one specific query in the title.

### Content rules

- **One page per query intent.** Don't merge topics; specific pages outrank hubs.
- **Never publish placeholder copy.** The `TODO(owner)` entries in
  `src/data/projects.ts` are `indexable: false` for exactly this reason —
  thin/fake content site-wide drags down every page.
- Update `posts.json` `date` when you materially revise a post; `dateModified`
  flows into schema.

---

## 3. The brand-name collision — read this carefully

**"BitPulse" is heavily contested.** Live entities using the name:

| Entity | Domain | Threat |
|---|---|---|
| Onchain risk/data platform | bitpulse.io | **High** — funded, press coverage (Maple Finance integration) |
| Managed cybersecurity | bitpulse.ca | Medium |
| Coin-reward mobile app | Google Play | Medium — app-store surface |
| Dev monitoring tool | — | Medium |
| Music artist | Apple Music, Discogs | Low but entrenched |
| Video game publication | — | Low |
| LinkedIn company (Belgium) | — | Confuses entity resolution |

**Implication:** ranking #1 for the bare word "BitPulse" is not a realistic
near-term goal, and pursuing it is a trap. Do this instead:

1. **Always qualify the brand in titles.** Never ship a title that is just
   "BitPulse". Use "BitPulse — Embedded, Firmware & Systems Software Studio".
   Already done across the site.
2. **Fill in `sameAs`.** `src/utils/structuredData.ts` has an empty `sameAs`
   array with a TODO. This is the **single highest-leverage brand fix you can
   make.** Add every profile you actually control — GitHub org, LinkedIn,
   X, YouTube, Crunchbase. Google uses `sameAs` to bind the entity together.
   *Only add live URLs you own; wrong ones actively hurt.*
3. **Claim a Google Business Profile** for Kampala. This is what wins the
   knowledge panel for the local entity, and none of the other BitPulses can
   contest a Uganda-local listing.
4. **Be consistent everywhere.** Same name, same address, same phone
   (`+256 706 337924`), same description on every profile and directory. Entity
   confidence comes from repetition across independent sources.
5. **Consider "BitPulse Engineering" or "BitPulse.dev" as the spoken brand.**
   You already have `legalName: 'BitPulse Engineering Ltd'` — leaning on it in
   external profiles buys you a far less contested string to rank for.

---

## 4. Products (Rux, Mava, SMS, BitCraft)

**Decision taken:** products live at `/lab/<slug>` on the main domain, so all
authority concentrates on bitpulse.dev rather than being split across subdomains.

Built and live in the build:

| Product | Route | Status |
|---|---|---|
| BitCraft | `/lab/bitcraft` | **Indexed** — real copy written, canonical home for the academy |
| PulseNode | `/lab/pulsenode` | Indexed |
| Markdown Engine | `/lab/markdown-engine` | Indexed |
| Smart Metering Pilot | `/lab/smart-metering` | Indexed |
| Rux | `/lab/rux` | **noindex** — placeholder copy |
| Mava | `/lab/mava` | **noindex** — placeholder copy |
| SMS | `/lab/sms` | **noindex** — placeholder copy |

### What you need to do

Fill in the `TODO(owner)` fields in `src/data/projects.ts` for Rux, Mava and
SMS — `blurb`, `detail`, `features`, `goodFor`, `keywords` — then flip
`indexable: true`. They'll enter the sitemap automatically on the next build.
**Nothing about these products can rank until this is done.** I deliberately did
not invent descriptions: fabricated product copy would get indexed as fact.

Two naming notes:

- **"SMS" is unrankable as a bare term** — it collides with the messaging
  protocol, which has effectively infinite search competition. Give it a
  distinct product name, or qualify it ("BitPulse SMS Gateway").
- **"Mava ecosystem"** — if it's several products, split it into one page per
  product. Hub pages consistently rank worse than specific ones.

### BitCraft / craft.bitpulse.dev

The subdomain serves a client-rendered shell: `<title>BitCraft</title>`, empty
`<div id="app">`, no meta description, `lang=""`, last modified May 2025. It is
**invisible to search** and will stay that way until it's prerendered.

Handled by making `/lab/bitcraft` the canonical, indexable home for the academy,
linking out to the subdomain. That's the right call while the subdomain is a
placeholder. When BitCraft is built out for real, either (a) prerender it with
the same vite-ssg setup used here, or (b) keep the marketing content on
bitpulse.dev and treat the subdomain as a pure logged-in app. Option (b) is
better for ranking; option (a) is better if BitCraft becomes its own brand.

The BitCraft `features` list still has `TODO(owner)` entries — add the real
training tracks.

---

## 5. Search Console & analytics — do this immediately after deploy

Nothing in this document matters until Google knows the pages exist.

1. **Google Search Console** → add property `bitpulse.dev`. Verify by DNS TXT
   (Cloudflare) — that covers all subdomains including `craft.`.
2. Submit `https://bitpulse.dev/sitemap.xml`.
3. Use **URL Inspection → Request Indexing** on the ~8 most important pages
   (home, `/services`, each service detail, `/lab/bitcraft`). Don't do all 30;
   the quota is limited and internal links will carry the rest.
4. Add **Bing Webmaster Tools** — it can import directly from Search Console,
   takes 2 minutes, and feeds ChatGPT/Copilot search results.
5. Set up analytics. Given the Cloudflare setup, **Cloudflare Web Analytics** is
   free, privacy-friendly and needs no cookie banner — a better fit than GA4
   unless you specifically need GA4's reporting.
6. **Check back in Search Console after 2 weeks**, not 2 days. Look at
   *Pages → Why pages aren't indexed*. That report tells you exactly what to fix
   next, and it beats guessing.

---

## 6. Core Web Vitals — images (done, one manual step left)

### What was wrong

`public/` shipped **16.7 MB of images**. They weren't oversized dimensionally
(all ~1024px) — they were photographic/illustrated art saved as **PNG**, which
is the wrong codec for that content. `profile.png` was 1.9 MB for an avatar
rendered at **24×24 px**.

### What was done

Converted with ImageMagick at q82/q86, verified side-by-side against the
originals — output is visually indistinguishable, text stays crisp.

| Asset | Before | After | Saving |
|---|---|---|---|
| `prototyping.png` → `.webp` | 2962 KB | 68.7 KB | −97.7% |
| `African_tech_evolution.png` → `.webp` | 2785 KB | 80.3 KB | −97.1% |
| `opensource.png` → `.webp` | 2376 KB | 58.1 KB | −97.6% |
| `rust_vs_cpp.png` → `.webp` | 2010 KB | 36.2 KB | −98.2% |
| `profile.png` → `.webp` (320px) | 1938 KB | 4.9 KB | −99.7% |
| `og-image.png` (stripped, still PNG) | 326 KB | 262 KB | −20% |

**Social cards fixed too.** The blog art is portrait (800×1200); as an
`og:image` its title got cropped off in every social preview. Each post now has
a proper landscape **1200×630 `-og.jpg`** built from the same art on a blurred,
colour-matched backdrop — full artwork visible, ~55–87 KB each. Wired via a new
`ogImage` field in `posts.json` + `Blog` type; `og:image`, `twitter:image` and
the `BlogPosting` schema all use it, with `og-image.png` as fallback.

Also applied: `loading="lazy"` + `decoding="async"` on below-fold images,
`fetchpriority="high"` on the two LCP candidates (blog featured card, article
hero), explicit `width`/`height` everywhere to reserve space (CLS), and **real
`alt` text on blog card images** — they were `alt=""`, forfeiting image-search
traffic.

New in-use assets total **542 KB**, replacing 12.1 MB.

### ⚠️ One manual step — delete the orphans

I could not delete files (blocked by a permission rule). **15.5 MB of images
are now referenced by nothing** but still deploy on every build. Verified
unreferenced across `src/`, `index.html` and all data files; all are tracked in
git, so this is fully reversible.

```bash
cd ~/bitpulse
git rm public/prototyping.png public/African_tech_evolution.png        public/opensource.png public/rust_vs_cpp.png public/profile.png        public/iot.png public/bitpulse_logo_monogram.png
```

- The first five are **superseded** by the `.webp` conversions.
- `iot.png` (1.4 MB) and `bitpulse_logo_monogram.png` (2.0 MB) were **already
  dead** before this work — referenced nowhere. The monogram is superseded by
  `BrandMark.vue` / `favicon.svg` per CLAUDE.md.

Restore any of them with `git checkout HEAD -- public/<file>`.

Once deleted, `dist/` image weight drops from **17.3 MB → ~1.7 MB**.

### Also worth doing

- `social_preview.png` (567 KB) is the *source master* for `og-image.png`, not a
  runtime asset, but it sits in `public/` so it deploys. Move it out of
  `public/` (update the CLAUDE.md reference) to stop shipping it.
- `bitpulselogo_transparent.png` (190 KB) is used only by `mail.html`, which
  isn't part of the site build. Harmless, but it deploys.

### JS is fine

`app.js` 140 KB, `supabase.js` 112 KB (correctly lazy-loaded via `LeadModal`),
`blogPage.js` 84 KB. No action needed.

### Already fixed earlier

Google Fonts no longer render-blocking (`index.html`).

## 7. Off-page — the part code can't do

You can have perfect technical SEO and still not rank, because **links from
other sites are the strongest remaining signal** and none of it happens in this
repo. Highest value first:

1. **Open-source the Markdown Engine and Rux on GitHub**, with a README linking
   to bitpulse.dev. Developer tools earn organic links better than anything else
   you can do.
2. **Write where your audience already is** — Hashnode, dev.to, Hacker News,
   r/embedded. Cross-post the technical articles with a canonical link back to
   bitpulse.dev.
3. **Local/regional directories** — Afrikta, TechBehemoths, Uganda tech
   listings. Low quality individually, but they establish entity consistency.
4. **Speak/teach.** BitCraft is a natural fit — meetups and university
   partnerships produce .edu-adjacent links and local coverage.
5. **Case studies with named clients**, published with the client's permission
   and a link from their site. Highest-quality links available to a studio.

---

## 8. Maintenance

- Sitemap and RSS regenerate on every build — no manual step, and they can't
  drift from the routes.
- Adding a service/sector/product/post automatically creates its page, sitemap
  entry and schema. Just fill the data file.
- Re-check Search Console monthly; the "why pages aren't indexed" report is the
  best next-action list you'll get.
