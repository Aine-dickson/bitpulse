// Post-build: emit dist/sitemap.xml and dist/rss.xml from the same typed data
// the site renders from, so the sitemap can never drift out of sync with the
// routes vite-ssg actually prerendered.
//
// Run after `vite-ssg build` (see package.json → "build-only").

import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const dist = resolve(root, 'dist')

const SITE_URL = 'https://bitpulse.dev'

/** Read slugs out of the TS data files without needing a TS runtime. */
function slugsFrom(relPath) {
  const src = readFileSync(resolve(root, relPath), 'utf8')
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
}

const posts = JSON.parse(readFileSync(resolve(root, 'src/content/posts.json'), 'utf8'))
const serviceSlugs = slugsFrom('src/data/services.ts')
const sectorSlugs = slugsFrom('src/data/sectors.ts')

// Lab products: only the entries marked indexable belong in the sitemap.
// Submitting a noindex URL is a contradiction Search Console reports as an error.
const projectsSrc = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8')
const projectSlugs = [...projectsSrc.matchAll(/slug:\s*'([^']+)'/g)]
  .map((m) => ({ slug: m[1], tail: projectsSrc.slice(m.index, projectsSrc.indexOf('slug:', m.index + 1)) }))
  .filter((p) => !/indexable:\s*false/.test(p.tail))
  .map((p) => p.slug)

// changefreq is advisory only; priority is relative *within* this site. Both are
// weak signals — the value here is completeness and accurate lastmod.
const today = new Date().toISOString().slice(0, 10)

/** @type {{path: string, priority: string, changefreq: string, lastmod?: string}[]} */
const entries = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/innovations', priority: '0.9', changefreq: 'monthly' },
  { path: '/lab', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/why-bitpulse', priority: '0.7', changefreq: 'monthly' },
  // Field services: a direct-entry landing page, but it should still rank for
  // local intent since some visitors search rather than type the URL.
  { path: '/field', priority: '0.9', changefreq: 'monthly' },
  { path: '/contacts', priority: '0.6', changefreq: 'yearly' },
  { path: '/partner', priority: '0.6', changefreq: 'monthly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...sectorSlugs.map((slug) => ({
    path: `/innovations/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...projectSlugs.map((slug) => ({
    path: `/lab/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...posts.map((post) => ({
    path: `/blogs/${post.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: (post.date ?? today).slice(0, 10),
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.path}</loc>
    <lastmod>${e.lastmod ?? today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const escapeXml = (s) =>
  String(s).replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  )

const byNewest = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BitPulse Field Notes</title>
    <link>${SITE_URL}/blogs</link>
    <description>Embedded systems, firmware and systems-software engineering notes from the BitPulse studio.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${byNewest
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}</guid>
      <description>${escapeXml(post.excerpt ?? '')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${(post.tags ?? []).map((t) => `<category>${escapeXml(t)}</category>`).join('')}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`

if (!existsSync(dist)) {
  console.error('[sitemap] dist/ not found — run the build first.')
  process.exit(1)
}

writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
writeFileSync(resolve(dist, 'rss.xml'), rss)
console.log(`[sitemap] wrote ${entries.length} URLs to dist/sitemap.xml`)
console.log(`[rss] wrote ${posts.length} items to dist/rss.xml`)
