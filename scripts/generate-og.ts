/**
 * Per-service Open Graph card generator.
 *
 * Every page used to share the same /og-image.png, so a link to a specific
 * service looked identical to a link to the home page. This renders one
 * 1200x630 card per service, on-brand with The Trace: plate background, mono
 * designator, Archivo display name, the capability icon, pulse motif.
 *
 * Run manually, not in CI, so the build keeps no dependency on a browser:
 *
 *   bun scripts/generate-og.ts
 *
 * Bun is used (rather than node) purely so this can import the typed service
 * data directly instead of duplicating names and summaries that would then
 * drift. Output lands in public/og/services/<slug>.png and is committed.
 *
 * Regenerate whenever a service's name, tag or summary changes.
 */

import { writeFileSync, mkdirSync, existsSync, rmSync, statSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { services } from '../src/data/services'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const outDir = resolve(root, 'public/og/services')
const tmpDir = resolve(root, '.og-tmp')

// Design tokens, mirrored from src/assets/main.css. Kept literal because this
// renders outside the app and never sees the stylesheet.
const T = {
  plate0: '#F5F5F0',
  plate2: '#E6E6DC',
  surface: '#FBFBF8',
  ink: '#1B241F',
  ink2: '#4C554E',
  ink3: '#7A827B',
  line: '#DAD9CC',
  accent: '#12924E',
  accentDeep: '#0B6B39',
  accentSoft: '#E2EFE7',
}

/** Icon inner markup, mirrored from components/ui/CapIcon.vue. */
const ICONS: Record<string, string> = {
  chip: `<rect x="4" y="4" width="16" height="16" rx="1.5"/><circle cx="12" cy="12" r="3"/><path d="M9 1.5v2.5M15 1.5v2.5M9 20v2.5M15 20v2.5M1.5 9h2.5M1.5 15h2.5M20 9h2.5M20 15h2.5"/>`,
  server: `<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>`,
  flask: `<path d="M9 3h6M10 3v5l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3"/><path d="M8 14h8"/>`,
  code: `<path d="M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14"/>`,
  layers: `<path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M2 8v5l10 5 10-5V8"/>`,
  window: `<rect x="2" y="4" width="14" height="11" rx="1.5"/><path d="M2 7.5h14"/><path d="M4.5 5.75h.01M6.75 5.75h.01"/><path d="M6 18.5h5"/><rect x="15" y="11" width="7" height="10.5" rx="1.5"/><path d="M18.2 19.4h.01"/>`,
  legacy: `<ellipse cx="8" cy="5.5" rx="5.5" ry="2.5"/><path d="M2.5 5.5v6c0 1.4 2.5 2.5 5.5 2.5"/><path d="M2.5 11.5v6c0 1.4 2.5 2.5 5.5 2.5"/><path d="M17 21v-8"/><path d="M13.5 16.5 17 13l3.5 3.5"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
}

/** The pulse-"p" monogram, from components/ui/BrandMark.vue. */
const MONOGRAM = `<svg height="44" viewBox="-4 -6 154 226" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:auto">
  <defs><linearGradient id="bpg" x1="84" y1="6" x2="96" y2="204" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#8FE04F"/><stop offset="0.45" stop-color="#33CE7C"/><stop offset="1" stop-color="#1FC3A8"/>
  </linearGradient></defs>
  <g fill="none" stroke="url(#bpg)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 88 L30 88 L56 165 L84 8 L102 86 L96 150 L79 202"/>
    <path d="M99 82 C154 89 154 153 95 151"/>
  </g>
</svg>`

/**
 * Edge returns from --screenshot before the file is finished on disk, so a
 * plain existsSync right after spawn reports failure for a card that renders
 * perfectly. Poll until the size stops growing.
 */
function waitForStablePng(path: string, timeoutMs = 20000): boolean {
  const deadline = Date.now() + timeoutMs
  let last = -1
  let stable = 0
  while (Date.now() < deadline) {
    let size = -1
    try {
      size = statSync(path).size
    } catch {
      size = -1
    }
    if (size > 0 && size === last) {
      if (++stable >= 3) return true
    } else {
      stable = 0
    }
    last = size
    Bun.sleepSync(120)
  }
  return false
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function card(s: (typeof services)[number]): string {
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${T.plate0};
       font-family:Archivo,system-ui,sans-serif;color:${T.ink};overflow:hidden;position:relative}
  /* PCB traces: faint routing behind the card, echoing the board diagrams */
  .traces{position:absolute;inset:0;opacity:.5}
  .card{position:absolute;inset:44px;background:${T.surface};border:1px solid ${T.line};
        border-radius:20px;padding:48px 60px;display:flex;flex-direction:column}
  .top{display:flex;align-items:center;gap:22px}
  .tile{width:84px;height:84px;border-radius:17px;background:${T.accentSoft};
        display:grid;place-items:center;color:${T.accentDeep};flex:0 0 auto}
  .desig{font-family:'IBM Plex Mono',monospace;font-size:19px;font-weight:600;
         letter-spacing:.16em;text-transform:uppercase;color:${T.accentDeep}}
  h1{font-size:${s.name.length > 18 ? 60 : 74}px;font-weight:900;line-height:.98;
     letter-spacing:-.022em;margin-top:30px;max-width:17ch}
  p{font-size:26px;line-height:1.45;color:${T.ink2};margin-top:20px;margin-bottom:24px;
     max-width:34ch;font-weight:500}
  .foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;
        border-top:1px solid ${T.line};padding-top:22px}
  .brand{display:flex;align-items:center;gap:15px}
  .brand b{font-size:29px;font-weight:900;letter-spacing:-.02em}
  .url{font-family:'IBM Plex Mono',monospace;font-size:19px;color:${T.ink3};letter-spacing:.04em}
  /* heartbeat: the same motif as the monogram, run as a baseline */
  .pulse{position:absolute;right:64px;bottom:188px;opacity:.13}
</style></head>
<body>
  <svg class="traces" width="1200" height="630" fill="none" stroke="${T.line}" stroke-width="2">
    <path d="M0 120 H210 L250 160 H430"/>
    <path d="M1200 210 H1010 L960 160 H820"/>
    <path d="M0 520 H160 L200 480 H360"/>
    <path d="M1200 470 H1040 L1000 510 H900"/>
    <circle cx="250" cy="160" r="5" fill="${T.line}" stroke="none"/>
    <circle cx="960" cy="160" r="5" fill="${T.line}" stroke="none"/>
    <circle cx="200" cy="480" r="5" fill="${T.line}" stroke="none"/>
    <circle cx="1000" cy="510" r="5" fill="${T.line}" stroke="none"/>
  </svg>

  <div class="card">
    <div class="top">
      <div class="tile">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[s.icon] ?? ''}</svg>
      </div>
      <div class="desig">${escapeHtml(s.ref)} &middot; ${escapeHtml(s.tag)}</div>
    </div>

    <h1>${escapeHtml(s.name)}</h1>
    <p>${escapeHtml(s.summary)}</p>

    <svg class="pulse" width="300" height="90" viewBox="0 0 300 90" fill="none"
         stroke="${T.accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0 62 H70 L96 88 L130 8 L156 62 H300"/>
    </svg>

    <div class="foot">
      <div class="brand">${MONOGRAM}<b>BitPulse</b></div>
      <div class="url">bitpulse.dev</div>
    </div>
  </div>
</body></html>`
}

// ------------------------------------------------------------------- render

const EDGE_CANDIDATES = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
]
const browser = EDGE_CANDIDATES.find((p) => existsSync(p))
if (!browser) {
  console.error('[og] No Edge/Chrome found. Add its path to EDGE_CANDIDATES.')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })
mkdirSync(tmpDir, { recursive: true })

let made = 0
for (const s of services) {
  const html = resolve(tmpDir, `${s.slug}.html`)
  const png = resolve(outDir, `${s.slug}.png`)
  writeFileSync(html, card(s), 'utf8')
  // Remove any previous card, so a failed render cannot pass as a fresh one.
  if (existsSync(png)) unlinkSync(png)

  const res = spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      // A per-card profile: Edge keeps the previous one locked, which silently
      // kills every launch after the first.
      `--user-data-dir=${resolve(tmpDir, `profile-${s.slug}`)}`,
      // Give webfonts time to land, or the card renders in a fallback face.
      '--virtual-time-budget=6000',
      '--window-size=1200,630',
      `--screenshot=${png}`,
      `file:///${html.replace(/\\/g, '/')}`,
    ],
    { stdio: 'ignore' },
  )

  if (res.error || !waitForStablePng(png)) {
    console.error(`[og] FAILED ${s.slug}`, res.error ?? 'no screenshot written')
    continue
  }
  console.log(`[og] ${s.slug}.png  ${statSync(png).size} bytes`)
  made++
}

// Edge can still hold a lock on its profile dirs; a leftover temp folder is
// not worth failing the run over.
try {
  rmSync(tmpDir, { recursive: true, force: true })
} catch {
  console.warn('[og] could not remove .og-tmp (browser still holding it); safe to delete manually')
}
console.log(`[og] wrote ${made}/${services.length} cards to public/og/services/`)
if (made !== services.length) process.exit(1)
