// Utility to set/update meta tags for social sharing (client-side).
// Note: Most social media scrapers do NOT execute JavaScript, so these
// dynamic tags won't help when sharing unless you prerender or serve
// bot-specific HTML. This is still useful for in-app SEO hints and copy/share.

interface MetaOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
  type?: string // e.g. 'article'
}

function setTag(property: string, content: string, attr: 'name' | 'property' = 'property') {
  if (!content) return
  let selector = attr === 'name' ? `meta[name='${property}']` : `meta[property='${property}']`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function setMeta(opts: MetaOptions) {
  if (opts.title) {
    document.title = opts.title
    setTag('og:title', opts.title)
    setTag('twitter:title', opts.title, 'name')
  }
  if (opts.description) {
    setTag('description', opts.description, 'name')
    setTag('og:description', opts.description)
    setTag('twitter:description', opts.description, 'name')
  }
  if (opts.image) {
    setTag('og:image', opts.image)
    setTag('twitter:image', opts.image, 'name')
  }
  if (opts.url) {
    setTag('og:url', opts.url)
  }
  setTag('og:type', opts.type || 'article')
  setTag('og:site_name', opts.siteName || 'Bitpulse')
  setTag('twitter:card', 'summary_large_image', 'name')
}
