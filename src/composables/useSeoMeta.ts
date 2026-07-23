import { useHead } from '@unhead/vue'
import { SITE_URL } from '@/config/seo'

export { SITE_URL }

interface SeoMeta {
  title: string
  description?: string
  /** Absolute path for this page, e.g. '/services'. */
  canonical?: string
  /** Path to a share image under /public, e.g. '/social-preview.png'. */
  image?: string
  /** og:type — 'website' (default) or 'article'. */
  type?: string
}

export function useSeoMeta({ title, description, canonical, image, type = 'website' }: SeoMeta) {
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const ogImage = `${SITE_URL}${image ?? '/social-preview.png'}`
  const fullTitle = /bitpulse/i.test(title) ? title : `${title} · BitPulse`

  useHead({
    title: fullTitle,
    meta: [
      ...(description ? [{ name: 'description', content: description }] : []),
      { property: 'og:title', content: fullTitle },
      ...(description ? [{ property: 'og:description', content: description }] : []),
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'BitPulse' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      ...(description ? [{ name: 'twitter:description', content: description }] : []),
      { name: 'twitter:image', content: ogImage },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
