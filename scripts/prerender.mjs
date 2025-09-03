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

const template = await readFile(templatePath, 'utf8')

function injectMeta(baseHtml, { title, excerpt, image, slug }) {
  const baseUrl = 'https://bitpulse.dev'
  const url = `${baseUrl}/blogs/${slug}/`
  const safe = (val) => (val ? String(val).replace(/</g, '&lt;') : '')
  let html = baseHtml
  html = html.replace(/<!--OG_TITLE:[^-]*?-->/g, safe(title))
  html = html.replace(/<!--OG_DESC:[^-]*?-->/g, safe(excerpt))
  html = html.replace(
    /<!--OG_IMAGE:[^-]*?-->/g,
    image.startsWith('http') ? image : `${baseUrl}/${image.replace(/^\//, '')}`,
  )
  html = html.replace(/<!--OG_URL:[^-]*?-->/g, url)
  html = html.replace(/<!--OG_TYPE:[^-]*?-->/g, 'article')
  html = html.replace(/<!--PAGE_TITLE:[^-]*?-->/g, `${safe(title)} | BitPulse`)
  // Optional canonical
  if (!/rel="canonical"/.test(html)) {
    html = html.replace('<head>', `<head>\n<link rel="canonical" href="${url}">`)
  }
  return html
}

for (const post of posts) {
  const outDir = join(distDir, 'blogs', post.slug)
  await mkdir(outDir, { recursive: true })
  const html = injectMeta(template, post)
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  console.log('Prerendered', outDir)
}

console.log('Prerender complete.')
