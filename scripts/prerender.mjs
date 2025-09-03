#!/usr/bin/env bun
// Simple prerender script to generate static HTML pages for blog posts at /blogs/<slug>/
// Reads the built dist/index.html as a template and injects per-post meta tags.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Load posts from JSON source (decoupled from runtime Pinia store)
const __dirname = dirname(fileURLToPath(import.meta.url))
const postsPath = join(__dirname, '..', 'src', 'content', 'posts.json')
const posts = JSON.parse(await readFile(postsPath, 'utf8'))
// Dist/template paths
const distDir = join(__dirname, '..', 'dist')
const templatePath = join(distDir, 'index.html')

const rawTemplate = await readFile(templatePath, 'utf8')

// Extract default values from placeholders e.g. <!--OG_TITLE:Some Title-->
const defaultValues = {}
const placeholderPattern = /<!--(OG_[A-Z_]+|PAGE_TITLE):(.*?)-->/g
let match
while ((match = placeholderPattern.exec(rawTemplate))) {
  defaultValues[match[1]] = match[2].trim()
}

const baseUrl = 'https://bitpulse.dev'

function applyMeta(baseHtml, map) {
  let html = baseHtml
  for (const [key, value] of Object.entries(map)) {
    const safe = (val) => (val ? String(val).replace(/</g, '&lt;') : '')
    html = html.replace(new RegExp(`<!--${key}:(.*?)-->`, 'g'), safe(value))
  }
  return html
}

function buildBlogHtml(post) {
  const imageAbsolute =
    post.image && post.image.startsWith('http')
      ? post.image
      : `${baseUrl}/${post.image.replace(/^\//, '')}`
  const url = `${baseUrl}/blogs/${post.slug}/`
  const map = {
    ...defaultValues,
    OG_TITLE: post.title,
    OG_DESC: post.excerpt,
    OG_IMAGE: imageAbsolute,
    OG_URL: url,
    OG_TYPE: 'article',
    PAGE_TITLE: `${post.title} | BitPulse`,
  }
  let html = applyMeta(rawTemplate, map)
  if (!/rel="canonical"/.test(html)) {
    html = html.replace('<head>', `<head>\n<link rel="canonical" href="${url}">`)
  }
  return html
}

// Generate blog pages
for (const post of posts) {
  const outDir = join(distDir, 'blogs', post.slug)
  await mkdir(outDir, { recursive: true })
  const html = buildBlogHtml(post)
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  console.log('Prerendered', outDir)
}

// Overwrite root index.html with defaults (so placeholders removed for site root preview)
const rootHtml = applyMeta(rawTemplate, {
  OG_TITLE: defaultValues.OG_TITLE || 'BitPulse',
  OG_DESC:
    defaultValues.OG_DESC || 'Driving innovation through technology — one solution at a time.',
  OG_IMAGE: defaultValues.OG_IMAGE || `${baseUrl}/social-preview.png`,
  OG_URL: defaultValues.OG_URL || baseUrl + '/',
  OG_TYPE: defaultValues.OG_TYPE || 'website',
  PAGE_TITLE: defaultValues.PAGE_TITLE || 'BitPulse',
})
await writeFile(templatePath, rootHtml, 'utf8')

console.log('Prerender complete (blogs + root meta applied).')
